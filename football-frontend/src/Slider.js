import React, { useState, useEffect } from 'react';
import './Slider.css';
import img1 from './9.jpeg';
import img2 from './10.jpg';
import img3 from './11.jpg';

const footballInfo = [
  {
    title: 'Football History',
    description: 'Football, known as soccer in some countries, has a long and fascinating history that dates back to the 19th century, originating in the United Kingdom. It has become the most popular sport globally.'
  },
  {
    title: 'Football Rules',
    description: 'Football is played between two teams of 11 players each. The objective is to score by getting the ball into the opposing team’s goal. The game is played with a spherical ball on a rectangular field.'
  },
  {
    title: 'Famous Players',
    description: 'Some of the most famous football players include Lionel Messi, Cristiano Ronaldo, Pelé, and Diego Maradona, each of whom has made a significant impact on the sport.'
  },
  {
    title: 'Football Tournaments',
    description: 'The most prestigious football tournament is the FIFA World Cup, held every four years. Other major tournaments include the UEFA Champions League and Copa América.'
  },
];

const footballQuotes = [
  "“The more difficult the victory, the greater the happiness in winning.” – Pelé",
  "“Football is the ballet of the masses.” – Dmitri Shostakovich",
  "“The ball is round, the game lasts 90 minutes, and everything else is just theory.” – Sepp Herberger",
  "“In football, the worst things are excuses. The best things are football.” – Roberto Baggio"
];

const Slider = () => {
  const images = [img1, img2, img3];
  const [currentImage, setCurrentImage] = useState(0);
  const [currentInfo, setCurrentInfo] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    setCurrentInfo((prevInfo) => (prevInfo + 1) % footballInfo.length);
    setCurrentQuote((prevQuote) => (prevQuote + 1) % footballQuotes.length);
  };

  const prevSlide = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    setCurrentInfo((prevInfo) => (prevInfo - 1 + footballInfo.length) % footballInfo.length);
    setCurrentQuote((prevQuote) => (prevQuote - 1 + footballQuotes.length) % footballQuotes.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-box">
      <div className="slider-text">
        <h2>{footballInfo[currentInfo].title}</h2>
        <p>{footballInfo[currentInfo].description}</p>
      </div>

      <div className="slider-container">
        <div className="slider">
          <img
            src={images[currentImage]}
            alt={`Football Image ${currentImage + 1}`}
            className="slider-image"
          />
          <button className="slider-button prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="slider-button next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator-dot ${currentImage === index ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)} 
            ></span>
          ))}
        </div>
      </div>

      <div className="slider-footer">
        <p className="slider-quote">{footballQuotes[currentQuote]}</p>
      </div>
    </div>
  );
};

export default Slider;
