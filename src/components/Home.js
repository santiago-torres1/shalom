import React from 'react';
import logo from '../logo.svg';
import '../assets/css/style.css';
import Slider from './Slider'
import NewProductsSwiper from './Products/NewProductsSwiper';

const Home = () => {
    return (
        <div>
            <section className = "slider_section">
                <Slider />
            </section>
            <NewProductsSwiper />
        </div>
      );
}

export default Home