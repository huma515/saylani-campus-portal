import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Main = () => {
  return (
    <div className="container my-5 main-ui-container">
      
      {/* Header & Create Post Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="main-ui-header">TraceZone</h2>
        <button className="btn create-post-btn">Create Post</button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 filter-btns">
        {["All", "Lost", "Found", "Complaint"].map((cat) => (
          <button key={cat} className="btn filter-btn">{cat}</button>
        ))}
      </div>

      {/* Posts */}
      <div className="row">
        {[1, 2, 3, 4].map((post) => (
          <div key={post} className="col-md-6 mb-4">
            <div className="card post-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="post-title">Post Title Here</h5>
                  <span className="badge bg-success post-status">Status</span>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">
                  Category • Date • Location
                </h6>
                <p className="card-text">
                  This is a sample description of the post content.
                </p>
                <p className="text-muted small">Posted by: User Name</p>
              </div>
            </div>
          </div>
        ))}

        <p className="text-center text-muted">No posts found in this category.</p>
      </div>
    </div>
  );
};

export default Main;