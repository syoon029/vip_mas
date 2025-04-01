import React from "react";
import ZoomableMap from "../ZoomableMap";
import pieChartImage from "../assets/pie-chart-holder.jpg";
import barChartImage from "../assets/bar-graph-holder.png";

const Dashboard = ({ setScreen }) => {
  return (
    <div className="app-container">
      <h1 className="dashboard-title">Smart City Dashboard</h1>

      {/* MAP SECTION */}
      <div className="box">
        <div className="map-section">
          <h2>District 98</h2>
          <ZoomableMap />
        </div>
      </div>

      {/* COMPLAINTS LIST SECTION */}
      <div className="complaints-list">
        <h3>Top Issues</h3>
        <ul>
          <li><span>Potholes</span> <span className="complaint-count">20</span></li>
          <li><span>Street Lights</span> <span className="complaint-count">15</span></li>
          <li><span>Waste Collection</span> <span className="complaint-count">10</span></li>
          <li><span>Garbage</span> <span className="complaint-count">5</span></li>
        </ul>
      </div>

      {/* STATUS SECTION */}
      <div className="status-section">
        <div className="status-summary">
          <h3>Today's Complaints</h3>
          <p>103</p>
        </div>
        <div className="status-summary">
          <h3>Resolved Complaints</h3>
          <p>4003</p>
        </div>
      </div>

      {/* GARBAGE COLLECTION SECTION */}
      <div className="garbage-section">
        <div className="status-chart">
          <h3>Status</h3>
          <div className="chart-placeholder">
            <img src={pieChartImage} alt="Pie Chart" />
          </div>
        </div>
        <div className="garbage-collection-chart">
          <h3>Garbage Collection</h3>
          <div className="chart-placeholder">
            <img src={barChartImage} alt="Bar Chart" />
          </div>
        </div>
        <div className="garbage-collection-chart">
          <h3>Garbage Collection</h3>
          <div className="chart-placeholder">
            <img src={barChartImage} alt="Bar Chart" />
          </div>
        </div>
      </div>
        <button onClick={() => setScreen("title")} className="back-btn">
          Back to Home
        </button>
    </div>
  );
};

export default Dashboard;
