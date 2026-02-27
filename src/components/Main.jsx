import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";
import supabase from "../config/supabse";

const Main = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Get current user
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();

    // Fetch posts from Supabase
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("mypost")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setPosts(data);
    };
    fetchPosts();

    // Real-time subscription for new posts
    const subscription = supabase
      .channel("public:mypost")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mypost" },
        (payload) => {
          setPosts((prev) => [payload.new, ...prev]); // prepend new post
        }
      )
      .subscribe();

    // Auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") setUser(session.user);
        if (event === "SIGNED_OUT") setUser(null);
      }
    );

    return () => {
      subscription.unsubscribe();
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleFilter = (cat) => setFilter(cat);

  // Filter posts based on category
  const filteredPosts =
    filter === "All" ? posts : posts.filter((post) => post.category === filter);

  return (
    <div className="container my-5 main-ui-container">
      {/* Header & User Info */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <img
            src="https://lms.saylanimit.com/assets/logo.6lrMPvRL.png"
            alt="Logo"
            className="logo-img"
          />
          {user && (
            <p className="text-muted mb-0">
              Logged in as: <strong>{user.email}</strong>
            </p>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          {user && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
          <Link to="/profile">
            <button className="btn create-post-btn">Create Post</button>
          </Link>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 filter-btns">
        {["All", "Lost", "Found", "Complaint"].map((cat) => (
          <button
            key={cat}
            className={`btn filter-btn ${filter === cat ? "btn-primary" : ""}`}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="row">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="col-md-6 mb-4">
              <div className="card post-card shadow-sm">
                {/* IMAGE FIX */}
                {Array.isArray(post.images) && post.images.length > 0 && post.images[0] && (
                  <img
                    src={post.images[0]}
                    className="card-img-top"
                    alt="Post"
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="post-title">{post.title}</h5>
                    {post.category !== "Complaint" && (
                      <span className="badge bg-success">{post.status}</span>
                    )}
                    {post.category === "Complaint" && (
                      <span className="badge bg-warning">{post.severity}</span>
                    )}
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {post.category} • {post.location} •{" "}
                    {new Date(post.created_at).toLocaleString()}
                  </h6>
                  <p className="card-text">{post.description}</p>
                  <p className="text-muted small">Posted by: {post.username}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No posts found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Main;