import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Button } from './Button';
import './ExploreHome.css';

export default function PlannerHome() {
  return (
    
    <div>
         <div class="navigator">
        <a href="/" class="nav-link-1">Home</a> <span class="separator">&gt;</span> <a href="#" class="nav-link-2">Planner</a>
        </div>
      <section className='footer-subscription'>
        <h1 className='header-title'>CATATAN PERJALANANMU</h1>
        <div className="card">
        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <h2 className="card-title">Pulau Padar - Padar Island, Nusa Tenggara Timur</h2>
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
        <div className="card-add">
        {/* <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img> */}
            <div className="card-content">
            <div className='btn-add-content'>
            <Button buttonStyle='btn--add'>
                + Catatan Baru 
            </Button>
            </div>
            {/* <h2 className="card-title">Padar Island, Nusa Tenggara Timur</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p> */}
            </div>
        </div>
        {/* <div className="card">
        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <h2 className="card-title">Padar Island, Nusa Tenggara Timur</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p>
            </div>
        </div> */}
      </section>
      </div>
   
      
    

   
  );
}


