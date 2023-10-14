import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Button } from './Button';
import './ExploreHome.css';

export default function ExploreHome() {
  return (
    
    <div>
        <div class="navigator">
        <a href="/" class="nav-link-1">Home</a> <span class="separator">&gt;</span> <a href="#" class="nav-link-2">Explore</a>
        </div>
      <section className='footer-subscription'>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='search'
              type='search'
              placeholder='Telusuri destinasi'
            />
            <Button buttonStyle='btn--search'>
                <i class="fa fa-search" aria-hidden="true"></i>
            </Button>
          </form>
        </div>
        <div className='btn-switch'>
        <Button buttonStyle='btn--category'>
                Semua
            </Button>
            <Button buttonStyle='btn--category'>
                Wisata
            </Button>
            <Button buttonStyle='btn--category'>
                Restoran
            </Button>
            <Button buttonStyle='btn--category' >
                Penginapan
            </Button>
            </div>
        <div className="card">

        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <a href="/explore-detail"> 
            <h2 className="card-title">Pulau Padar - Padar Island, Nusa Tenggara Timur</h2>
            </a>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p>
            </div>
        </div>
        <div className="card">
        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <h2 className="card-title">Padar Island, Nusa Tenggara Timur</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p>
            </div>
        </div>
        <div className="card">
        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <h2 className="card-title">Padar Island, Nusa Tenggara Timur</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p>
            </div>
        </div>
        <div className="card">
        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <h2 className="card-title">Padar Island, Nusa Tenggara Timur</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p>
            </div>
        </div>
      </section>
      </div>
   
      
    

   
  );
}


