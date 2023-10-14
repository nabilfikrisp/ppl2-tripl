import React, { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Button } from './Button';
import './Information.css';

// export default function Information() {

const images = ['../assets/images/img-1.jpg', '../assets/images/img-2.jpg', '../assets/images/img-3.jpg']; 

const Information = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    
    <div className='container'>
    <div className='hero-content'>
    <div className="hero-slideshow">
      <img src={images[currentSlide]} alt={`Slide ${currentSlide}`} />
    </div>
    <button onClick={prevSlide} className="prev-button">
      <i class="fa fa-chevron-left"></i>
      </button>
      <button onClick={nextSlide} className="next-button">
      <i class="fa fa-chevron-right"></i>
      </button>
      <h1>Pulau Padar - Padar Island, Nusa Tenggara Timur</h1>
    </div>
        <div className='info-header'>
        <h1>Tentang</h1>
            <div className='info-desc'>
            <div className='info-tentang'>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum lectus eu eleifend tristique. Nulla facilisi. Proin quis est id lectus fermentum venenatis. Vivamus vel massa in leo venenatis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum lectus eu eleifend tristique. Nulla facilisi. Proin quis est id lectus fermentum venenatis. Vivamus vel massa in leo venenatis varius. 
            </p>
            </div>
            </div>
        </div>
         
        <div className='info-header'>
        <h1>Alamat</h1>
            <div className='info-desc'>
            <p>Komodo, Kec. Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Tim.</p>
            </div>
        </div>

        <div className='info-header'>
        <h1>Rating</h1>
            <div className='info-desc'>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            </div>
        </div>

        <div className='info-header'>
            <div className='info-maps'>
            <p>Telusuri di Maps <i class="fa fa-compass"></i></p>
            </div>
        </div>
      </div>
  );
}

export default Information;


