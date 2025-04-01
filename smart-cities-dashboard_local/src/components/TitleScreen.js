import React from "react";

const TitleScreen = ({ setScreen }) => {
  return (
    <div className="title-screen">
      <h1>Welcome to the Smart City Dashboard!</h1>
      <div className="button-container">
        <button onClick={() => setScreen("complaint")} className="submit-complaint-btn">
          Submit Your Complaints
        </button>
        <button onClick={() => setScreen("dashboard")} className="go-dashboard-btn">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TitleScreen;
