import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const PostPage = () => {
  const [category, setCategory] = useState(""); // Lost, Found, Complaint

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container my-5 profile-page">
      {/* Profile Header */}
      <div className="d-flex align-items-center mb-5 p-3 user-header shadow-sm rounded">
        <img
          src="https://thumbs.dreamstime.com/b/city-park-pond-shore-alley-20238927.jpg"
          alt="User"
          className="user-img me-3"
        />
        <div>
          <h4 className="user-name mb-1">Ayesha Khan</h4>
          <p className="user-location text-muted mb-0">Karachi, Pakistan</p>
        </div>
      </div>

      {/* Post Form Card */}
      <div className="card post-form-card p-4 mb-5 shadow-sm">
        <h5 className="mb-4 fw-bold">Create New Post</h5>

        <form>
          {/* Category Dropdown */}
          <div className="mb-4">
            <select
              className="form-select form-select-lg"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              <option value="Lost">Lost Item</option>
              <option value="Found">Found Item</option>
              <option value="Complaint">Complaint</option>
            </select>
          </div>

          {/* Dynamic Fields */}
          {category && (
            <>
              {/* Lost / Found Item Form */}
              {(category === "Lost" || category === "Found") && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Item Title"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <select className="form-select form-select-lg">
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Found">Found</option>
                        <option value="Claimed">Claimed</option>
                        <option value="In Review">In Review</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Attach Image</label>
                    <input type="file" className="form-control form-control-lg" />
                  </div>
                </>
              )}

              {/* Complaint Form */}
              {category === "Complaint" && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Complaint Title"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Describe your issue"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <select className="form-select form-select-lg">
                      <option value="">Select Severity</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Attach Image</label>
                    <input type="file" className="form-control form-control-lg" />
                  </div>
                </>
              )}
            </>
          )}

          {/* Submit Button */}
          {category && (
            <button type="submit" className="btn submit-btn w-100 fw-bold">
              Submit
            </button>
          )}
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