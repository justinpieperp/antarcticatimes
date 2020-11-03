import React from 'react'
import banner from '../assets/images/DSC01748.JPG'

function Home () {
    return (
        <main className="home">

            <section className="banner-container">
                <img className="banner" src={banner} alt="" />
            </section>
        </main>
    )
}

export default Home
