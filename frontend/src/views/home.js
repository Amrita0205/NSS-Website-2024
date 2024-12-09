import React from 'react'

import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Intro from '../components/intro'
import About from '../components/about'
import Hero from '../components/hero'
import CTA from '../components/cta'
import Contact from '../components/contact'
import Footer from '../components/footer'


const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>NSS IIIT Raichur</title>
      </Helmet>
      <Navbar></Navbar> 
      <div id="Intro">
        <Intro></Intro>
      </div>
      <div id="About">
      <About></About>
      </div>
      <div id="Hero">
      <Hero></Hero>
      </div>
      <div id="CTA">
      <CTA></CTA>
      </div>
      <div id="Contact">
      <Contact></Contact>
      </div> 
      <div id="Footer">
      <Footer></Footer>
      </div> 
    </div>
  )
}

export default Home
