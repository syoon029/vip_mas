import React, { useState } from "react";

const ComplaintForm = ({ setScreen }) => {
  const [formData, setFormData] = useState({
    category: "",
    dateTime: "",
    place: "",
    concern: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Complaint Submitted: " + JSON.stringify(formData, null, 2));
    setFormData({ category: "", dateTime: "", place: "", concern: "" }); // Reset form
  };

  return (
    <div className="complaint-screen">
      <h2>Submit Your Complaint</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <label>Select Your Category:</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Urgent Issue">Urgent Issue</option>
          <option value="General Issue">General Issue</option>
          <option value="Feedback">Feedback</option>
        </select>

        <label>Date and Time:</label>
        <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />

        <label>Place:</label>
        <input type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Enter location" required />

        <label>What is Your Concern?</label>
        <textarea name="concern" value={formData.concern} onChange={handleChange} placeholder="Describe your issue..." required></textarea>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <button onClick={() => setScreen("title")} className="back-btn">Back to Home</button>
    </div>
  );
};

export default ComplaintForm;
