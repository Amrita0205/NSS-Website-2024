import React from "react";
import "./HoursComplaint.css"; // Add styles for this page here or inline below.

function HoursComplaint() {
  return (
    <div className="hours-complaint-container">
      <header className="hours-complaint-header">
        <h1>Hours Complaint</h1>
      </header>

      <main className="hours-complaint-content">
        <ul className="guidelines-list">
          <li>
            Hours for regular volunteering opportunities will be updated only during mid-sem and end-sem. So, if you
            volunteer in a project, please wait until this duration for the hours to be uploaded.
          </li>
          <li>No complaints would be entertained regarding the hours for projects after 1 month of corresponding semester end.</li>
          <li>
            Please complain only if you have a genuine issue. Hours are provided based on the time, effort, and dedication
            you put into the activity.
          </li>
          <li>
            Any complaints related to hours for volunteering activities would be entertained within the same semester of
            completion of the activity. No arguments would be entertained in this regard.
          </li>
          <li>
            Once you send a complaint, it takes time to process it and discuss it with the person concerned. Please do not
            become impatient and start making redundant complaints. Multiple complaints do not help you get it resolved.
          </li>
          <li>
            If a complaint that you register is not resolved within 1 month, please drop a mail at
            <a href="mailto:nsshours@gmail.com"> nsshours@gmail.com</a>.
          </li>
        </ul>

        <button className="complaint-button">HOURS COMPLAINT</button>

        <p className="note">
          <strong>Note:</strong> Please read the Hours Complaint guidelines carefully before registering an hours
          complaint.
        </p>
      </main>
    </div>
  );
}

export default HoursComplaint;
