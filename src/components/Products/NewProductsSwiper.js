import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/style.css';
import './Products.css'

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container, Row} from 'react-bootstrap';

import products from './Products';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from './ProductCard';

function NewProductsSwiper() {
    const newProducts = products;
    return(
        <Container fluid className='my-3' style={{maxWidth: '1024px'}}>
            <h2 className='my-5'>Nuevos Productos!</h2>
                <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                pagination={{
                    dynamicBullets: true,
                  }}
                slidesPerView={2}
                loop={true}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                }
                }}
                >
                    {newProducts.map(product => (
                        <SwiperSlide className='mb-4'>
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                img={product.img}
                            />
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
        </Container>
    )
}

export default NewProductsSwiper
