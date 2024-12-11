import React from "react";
import './styles.css';  // Import the external CSS file

const NssPage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>National Service Scheme (NSS) - IIIT Raichur</h1>
        <p style={styles.motto}>"Not me, but you"</p>
      </header>
      <main style={styles.main}>
        <section className="section">
          <h2 style={styles.heading}>Our Vision</h2>
          <p style={styles.text}>
            NSS at IIIT Raichur aims to provide each student with a significant context to reach a deeper understanding of social reality in India today. NSS encourages the meaning of life through service in today's changing world.
          </p>
        </section>
        <section className="section">
          <h2 style={styles.heading}>Our Belief</h2>
          <p style={styles.text}>
            The motto of NSS, "Not me, but you", is a showcase of the belief in selflessness. It reflects in the volunteers' work to ensure everyone in need gets help, making true the words that "we rise by uplifting others."
          </p>
        </section>
        <section className="section">
          <h2 style={styles.heading}>Activities</h2>
          <ul style={styles.list}>
            <li>Vidyadaan</li>
            <li>Cloth Donation</li>
            <li>Blood Donation Camps</li>
            <li>Orphanage Visits</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.6,
    color: "#333",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5em",
    color: "#2c3e50",
  },
  motto: {
    fontSize: "1.2em",
    color: "#16a085",
    fontStyle: "italic",
  },
  main: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "1.8em",
    color: "#2980b9",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.1em",
    color: "#555",
  },
  list: {
    fontSize: "1.1em",
    color: "#555",
    paddingLeft: "20px",
    listStyleType: "disc",
  },
};

export default NssPage;
