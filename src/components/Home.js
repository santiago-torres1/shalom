import React from 'react';
import '../assets/css/style.css';
import Slider from './Slider/Slider';
import NewProductsSwiper from './Products/NewProductsSwiper';

const Home = ({reload, setReload}) => {
    return (
        <div>
            <section className = "slider_section">
                <Slider />
            </section>
            <NewProductsSwiper reload={reload} setReload={setReload}/>
        </div>
      );
}

export default Home