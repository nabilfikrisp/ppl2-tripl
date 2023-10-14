import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

export default function Cards() {
  return (
    <div className='cards'>
      <h1>Apa yang Akan Anda Lakukan Hari Ini?</h1>
      <div className="card">
        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <h2 className="card-title">Explore</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p>
            </div>
        </div>
        <div className="card">
        <img src='./assets/images/img-3.jpg' alt="Image Description" className="card-image"></img>
            <div className="card-content">
            <h2 className="card-title">Planner</h2>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, ligula at fringilla tincidunt, felis libero laoreet ex.</p>
            </div>
        </div>
      {/* <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../assets/images/img-9.jpg'
              text='Explore the hidden waterfall deep inside the Curug Putri'
              label='Adventure'
              path='/planner'
            />
            <CardItem
              src='../assets/images/img-2.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/planner'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='../assets/images/img-3.jpg'
              text='Set Sail in the Pantai Pangandaran visiting Uncharted Waters'
              label='Mystery'
              path='/planner'
            />
            <CardItem
              src='../assets/images/img-4.jpg'
              text='Experience Football on Top of the Jatinangor Parks'
              label='Adventure'
              path='/planner'
            />
            <CardItem
              src='../assets/images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/planner'
            />
          </ul>
        </div>
      </div> */}
    </div>
  );
}

