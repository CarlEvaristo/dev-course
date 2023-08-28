import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import "./home.css"

export default function Home() {

    return (
        <>
            <Hero />
            <section>
                <Carousel />
            </section>
        </>
    )
}
