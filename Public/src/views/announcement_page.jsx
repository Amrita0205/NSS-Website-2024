import React from 'react'

import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Announcement from '../components/announcement'



const Announcement_page = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>NSS IIIT Raichur</title>
      </Helmet>
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Footer></Footer>
    </div>
  )
}

export default Announcement_page
