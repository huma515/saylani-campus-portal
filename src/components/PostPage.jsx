import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";


const PostPage = () => {
  return (
    <div className="container my-5 profile-page">
      {/* Profile Header */}
      <div className="d-flex align-items-center mb-4 user-header">
        <img
          src="https://thumbs.dreamstime.com/b/city-park-pond-shore-alley-20238927.jpg"
          alt="User"
          className="user-img me-3"
        />
        <div>
          <h4 className="user-name">Ayesha Khan</h4>
          <p className="user-location text-muted">Karachi</p>
        </div>
      </div>

      {/* New Post Form */}
      <div className="card post-form-card p-4 mb-5 shadow-sm">
        <h5 style={{ color: "#0057a8" }}>Create New Post</h5>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Post Title"
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-3">
            <select className="form-select">
              <option value="">Select Category</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
              <option value="Complaint">Complaint</option>
            </select>
          </div>

          <div className="mb-3">
            <select className="form-select">
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Found">Found</option>
              <option value="Claimed">Claimed</option>
              <option value="In Review">In Review</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Attach Image</label>
            <input type="file" className="form-control" />
          </div>

          <button type="submit" className="btn submit-btn">
            Post
          </button>
        </form>
      </div>

      {/* User Posts Feed */}
      <div className="row">
        {[1, 2].map((i) => (
          <div key={i} className="col-md-6 mb-4">
            <div className="card post-card shadow-sm">
              <img
                src="https://thumbs.dreamstime.com/b/city-park-pond-shore-alley-20238927.jpg"
                alt="Post"
                className="card-img-top"
                style={{
                  borderRadius: "10px 10px 0 0",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="post-title">Post Title Example</h5>
                  <span className="badge bg-warning text-dark">Pending</span>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">
                  Lost • Karachi
                </h6>
                <p className="card-text">
                  Description of the post goes here. Example text for UI.
                </p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-sm edit-btn me-2">Edit</button>
                  <button className="btn btn-sm delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;