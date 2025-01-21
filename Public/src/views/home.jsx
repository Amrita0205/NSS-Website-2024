import React from "react";
import { useRef } from "react"


import { Helmet } from "react-helmet";

import Navbar from "../components/navbar";
import Intro from "../components/intro";
import About from "../components/about";
import Hero from "../components/hero";
import Contact from "../components/contact";
import Footer from "../components/footer";
import App_event from "./App_event";

const Home = () => {
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const App_eventRef = useRef(null);
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <div className="home-container">
      <Helmet>
        <title>NSS IIIT Raichur</title>
      </Helmet>
      <Navbar/>
      <section id="Intro" ref={introRef}>
        <Intro />
      </section>
      <section id="About" ref={aboutRef}>
        <About />
      </section>
      <section id="App_event" ref={App_eventRef}>
        <App_event />
      </section>
      <section id="Hero" ref={heroRef}>
        <Hero />
      </section>
      <section id="Contact" ref={contactRef}>
        <Contact />
      </section>
      <section id="Footer" ref={footerRef}>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
