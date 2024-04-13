import '../../assets/css/style.css';
import './Products.css'

import React, { useState, useEffect } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';

import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from './ProductCard';

function NewProductsSwiper() {
    const [productArray, setProductArray] = useState([])
    const { url } = useAuth()
    const [ reload, setReload ] = useState();
    const getProducts = async () => {
        try {
            const response = await axios.get(`${url}api/products`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch products');
            }

            const productsData = response.data;
            const lastSixProducts = productsData.slice(-6);

            setProductArray(lastSixProducts);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            setProductArray([]);
        }
    };

    useEffect(() => {
        getProducts();
    }, [])
    return (
        <Container fluid className='my-3' style={{ maxWidth: '1024px' }}>
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
                {productArray.map(product => (
                    <SwiperSlide className='mb-4' key={product.id}>
                        <ProductCard
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            img={product.imgurl}
                            reload={reload} setReload={setReload}
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </Container>
    )
}

export default NewProductsSwiper
