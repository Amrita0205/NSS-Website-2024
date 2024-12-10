import React from 'react'

import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Hours from '../components/hours'



const Hours_page = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>NSS IIIT Raichur</title>
      </Helmet>
      <Navbar></Navbar>
      <Hours></Hours>
      <Footer></Footer>
    </div>
  )
}

export default Hours_page
