import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Admin = () => {
  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }}>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 text-white" style={{ backgroundColor: "#0057a8", borderRadius: "10px" }}>
            <h6>Total Users</h6>
            <h3>540</h3>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 text-white" style={{ backgroundColor: "#f39c12", borderRadius: "10px" }}>
            <h6>Lost Items</h6>
            <h3>12</h3>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 text-white" style={{ backgroundColor: "#27ae60", borderRadius: "10px" }}>
            <h6>Found Items</h6>
            <h3>8</h3>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 text-white" style={{ backgroundColor: "#c0392b", borderRadius: "10px" }}>
            <h6>Complaints</h6>
            <h3>6</h3>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Posts Table */}
        <div className="col-md-9 mb-4">
          <div className="card shadow-sm p-3" style={{ borderRadius: "10px" }}>
            <h5 className="mb-3">Posts Management</h5>
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Lost</td>
                  <td>Lost Wallet</td>
                  <td>Ali</td>
                  <td>Karachi</td>
                  <td><span className="badge bg-warning text-dark">Pending</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Found</td>
                  <td>Found Laptop</td>
                  <td>Sara</td>
                  <td>Lahore</td>
                  <td><span className="badge bg-success">Active</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Complaint</td>
                  <td>Late Delivery</td>
                  <td>Zain</td>
                  <td>Islamabad</td>
                  <td><span className="badge bg-danger">Resolved</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm p-3" style={{ borderRadius: "10px", height: "100%" }}>
            <h5 className="mb-3">Notifications</h5>
            
            <div className="d-flex mb-3 p-2 border rounded align-items-center">
              <div style={{ width: "20px", height: "20px", backgroundColor: "#f0ad4e", borderRadius: "50%", marginRight: "10px" }}></div>
              <div>
                <p className="mb-0">Ali posted a Lost Item</p>
                <small>5m ago</small>
              </div>
            </div>

            <div className="d-flex mb-3 p-2 border rounded align-items-center">
              <div style={{ width: "20px", height: "20px", backgroundColor: "#27ae60", borderRadius: "50%", marginRight: "10px" }}></div>
              <div>
                <p className="mb-0">Sara posted a Found Item</p>
                <small>10m ago</small>
              </div>
            </div>

            <div className="d-flex mb-3 p-2 border rounded align-items-center">
              <div style={{ width: "20px", height: "20px", backgroundColor: "#c0392b", borderRadius: "50%", marginRight: "10px" }}></div>
              <div>
                <p className="mb-0">Zain submitted a Complaint</p>
                <small>15m ago</small>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;