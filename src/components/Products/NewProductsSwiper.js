import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/style.css';
import './Products.css'

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import products from './Products';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from './ProductCard';

function NewProductsSwiper() {
    const newProducts = products;
    return(
        <div className='custom-swiper-container'>
            <h1>Nuevos Productos!</h1>
            <div>
                <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                navigation
                slidesPerView={1}
                loop={true}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                }
                }}
                >
                    {newProducts.map(product => (
                        <SwiperSlide>
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                img={product.img}
                            />
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>
        </div>
    )
}

export default NewProductsSwiper
