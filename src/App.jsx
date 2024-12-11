import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css"; // Add styles for the theme in this file
import image1 from "./assets/IMG_0640.JPG";
import image2 from "./assets/DSC09571.JPG"; 
import image3 from "./assets/DSC09569.JPG";
import image4 from "./assets/DSC09262.JPG";
import CheckHoursPage from "./components/CheckHoursPage"; // Import CheckHoursPage component
import NssPage from "./components/NssPage"; // Import Login component
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import HoursPortal from "./components/HoursPortal";

// Define Routes
const router = createBrowserRouter([
  {
    path: "/", // Root page
    element: (
      <div className="container">
        <header className="header">
          <h1 className="title">NSS IIIT Raichur</h1>
        </header>

        <main className="main-content">
          <div className="button-container">
            {/* Use meaningful paths */}
            <Link to="/check-hours">
              <button className="custom-button">Check Hours</button>
            </Link>
            <Link to="/nss">
              <button className="custom-button">NSS Constitution</button>
            </Link>
            <Link to="/signup">
             <button className="custom-button">SignUp</button>
            </Link>
            <Link to="/home">
             <button className="custom-button">User DashBoard</button>
            </Link>

          </div>
        </main>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
  <div className="card" style={{ width: "18rem" }}>
    <img className="card-img-top image" src={image1} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">Tree Plantation</h5>
      <p className="card-text">
      As part of our commitment to the environment, NSS volunteers actively participate in tree plantation drives to enhance green cover and promote ecological balance
      </p>
    </div>
  </div>

  <div className="card" style={{ width: "18rem" }}>
    <img className="card-img-top" src={image2} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">NSS Cleaning Drive 1</h5>
      <p className="card-text">
      A clean campus for a better tomorrow! NSS volunteers organize cleaning drives to ensure a hygienic and eco-friendly environment.
      </p>
    </div>
  </div>

  <div className="card" style={{ width: "18rem" }}>
    <img className="card-img-top" src={image3} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">NSS Cleaning Drive 2</h5>
      <p className="card-text">
      Continuing the mission for cleanliness, volunteers conducted another cleaning drive, emphasizing waste segregation and community awareness.
      </p>
    </div>
  </div>

  <div className="card" style={{ width: "18rem" }}>
    <img className="card-img-top" src={image4} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">Orphanage Visit</h5>
      <p className="card-text">
      Spreading smiles and making memories, NSS volunteers visit orphanages to spend quality time with children and provide essential resources.
      </p>
    </div>
  </div>
</div>

<Footer></Footer>
      </div>
    ),
  },
  {
    path: "/check-hours", // Path for Check Hours page
    element: <CheckHoursPage />,
  },
  {
    path: "/nss", // Path for Login page
    element: <NssPage />,
  },
  {
    path: "/signup", // Path for Login page
    element: <Signup />,
  },
  {
    path: "/home", // Path for Login page
    element: <HoursPortal />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

