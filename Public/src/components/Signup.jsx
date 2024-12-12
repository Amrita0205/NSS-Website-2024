import React from "react";
import "mdb-ui-kit/css/mdb.min.css"; // MDB styles
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome icons
import image5 from "/images/nss-inverted.png";
import { Link } from 'react-router-dom';
import "./Signup.css"; 

function Signup() {
  return (
    <div className="col-lg-12 col-xl-11">
    <div className="card signup-card text-black">
      <div className="card-body p-md-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
            <p className="signup-form-title">Sign up</p>
            <form className="signup-form">
              <div className="signup-input-group">
                <i className="fas fa-user signup-input-icon"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="form-control signup-form-control"
                  />
                  <label
                    className="form-label signup-form-label"
                    htmlFor="form3Example1c"
                  >
                    Your Name
                  </label>
                </div>
              </div>
              <div className="signup-input-group">
                <i className="fas fa-envelope signup-input-icon"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="email"
                    id="form3Example3c"
                    className="form-control signup-form-control"
                  />
                  <label
                    className="form-label signup-form-label"
                    htmlFor="form3Example3c"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              <div className="signup-input-group">
                <i className="fas fa-lock signup-input-icon"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="password"
                    id="form3Example4c"
                    className="form-control signup-form-control"
                  />
                  <label
                    className="form-label signup-form-label"
                    htmlFor="form3Example4c"
                  >
                    Password
                  </label>
                </div>
              </div>
              <div className="signup-input-group">
                <i className="fas fa-key signup-input-icon"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="password"
                    id="form3Example4cd"
                    className="form-control signup-form-control"
                  />
                  <label
                    className="form-label signup-form-label"
                    htmlFor="form3Example4cd"
                  >
                    Repeat your password
                  </label>
                </div>
              </div>
              <div className="signup-checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example3c"
                />
                <label className="form-check-label" htmlFor="form2Example3c">
                  I agree to all statements in{" "}
                  <a href="#!">Terms of service</a>
                </label>
              </div>
              <div className="signup-submit-btn">
                <button type="submit" className="btn btn-primary btn-lg">
                  Register
                </button>
              </div>
              <div className="signup-link">
                <Link to="/login">Already have an account? Log in</Link>
              </div>
            </form>
          </div>
          <div className="col-md-10 col-lg-6 col-xl-7 order-1 order-lg-2 signup-image-container">
            <img
              src={image5}
              className="signup-image"
              alt="Sample"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  );
}

export default Signup;

  