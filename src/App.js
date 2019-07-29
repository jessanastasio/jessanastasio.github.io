import React, { useState, useEffect, useRef } from 'react';
import resume from './resume.pdf';
import './App.css';


const App = () => {

  const importAllFaceImgs = (r) => {
    let images = [];
    r.keys().map((item) => { images.push(r(item)); });
    return images;
  }

  const faceImgs = importAllFaceImgs(require.context('./images/myface', false, /\.(png|jpe?g|svg)$/));
  const colors = ['#24d05a', '#eb4888', '#10a2f5', '#e9bc3f'];

  // image component that will update w random image URL
  const RotatingPhoto = () => {
    const firstImageURL = getRandomImageURL(faceImgs);
    const [imageURL, setImageURL] = useState(firstImageURL);
    
    useInterval(() => {
      let newImageURL = getRandomImageURL(faceImgs);
      setImageURL(newImageURL);
    }, 3000);

    return (
      <img src={imageURL} alt="Jess Anastasio" />
    );
  }
  
  // given array of images, choose random index
  const getRandomImageURL = (faceImgs) => {
    return faceImgs[Math.floor(Math.random() * faceImgs.length)];    
  }

  const getRandomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const Links = () => {
    const [linkColor, setLinkColor] = useState(colors[0]);

    useInterval(() => {
      let newLinkColor = getRandomColor(colors);
      setLinkColor(newLinkColor);
    }, 3000);

    let linkStyle = { color: linkColor };

    return (
      <div className="links">
        <a style={linkStyle} href="http://twitter.com/jessanastasio">twitter</a>
        <a style={linkStyle} href="http://linkedin.com/in/jessicaanastasio">linkedin</a>
        <a style={linkStyle} href="http://github.com/jessanastasio">github</a>
        <a style={linkStyle} href={resume}>resume</a>
        <a style={linkStyle} href="mailto:jessicaanastasio39@gmail.com">email</a>
      </div>
    );
  }

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="img-container">
          <RotatingPhoto/>
        </div>
        <div className="about-me">
          <h2>Hi, I'm Jess!</h2>
          <ol>
            <li><span className="about-emoji" role="img" aria-label="star">🌟</span> software engineer in nyc</li>
            <li><span className="about-emoji" role="img" aria-label="heart">💕</span> loves javascript</li>
            <li><span className="about-emoji" role="img" aria-label="disk">💾</span> huge tech nerd</li>
            <li><span className="about-emoji" role="img" aria-label="mic">🎤</span> karaoke fan</li>
          </ol>
        </div>
      </div>

      <Links />

      {/* <div className="more">
        <button>keep clickin to learn more</button>
      </div> */}

    </div>
  );
}

export default App;
