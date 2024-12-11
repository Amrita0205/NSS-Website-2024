import React from "react";
import "./HoursPortal.css";

const HoursPortal = () => {
  const user = {
    name: "ANUJA GUPTA",
    Rollno: "CS23B1008",
    profilePicture: "https://via.placeholder.com/150",
    totalHours: 120,
    hoursRemaining: 30,
    activities: [
      { date: "2024-12-01", activity: "Tree Plantation", hours: 4 },
      { date: "2024-11-25", activity: "Health Camp Assistance", hours: 5 },
      { date: "2024-11-20", activity: "Cleanliness Drive", hours: 3 },
    ],
  };

  return (
    <div className="hours-portal-container">
        <div>USER DASHBOARD</div>
        <br></br>
      <header className="profile-header">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <div>
          <h1>{user.name}</h1>
          <p>NSS ID: {user.Rollno}</p>
        </div>
      </header>

      <section className="hours-summary">
        <div className="summary-card">
          <h3>Total Hours</h3>
          <p>{user.totalHours}</p>
        </div>
        <div className="summary-card">
          <h3>Hours Remaining</h3>
          <p>{user.hoursRemaining}</p>
        </div>
        <div className="summary-card">
          <h3>Activities Completed</h3>
          <p>{user.activities.length}</p>
        </div>
      </section>

      <section className="activities-list">
        <h2>Recent Activities</h2>
        <ul>
          {user.activities.map((activity, index) => (
            <li key={index}>
              <span>{activity.date}</span>
              <span>{activity.activity}</span>
              <span>{activity.hours} hours</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HoursPortal;
