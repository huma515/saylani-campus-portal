import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabse";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUser();
    fetchPosts();

    // Realtime insert
    const insertSub = supabase
      .channel("public:mypost")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mypost" },
        (payload) => {
          setPosts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // Realtime delete
    const deleteSub = supabase
      .channel("public:mypost-delete")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "mypost" },
        (payload) => {
          setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      insertSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }, []);

  // ================= USER =================
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) setUser(data.user);
  };

  // ================= FETCH POSTS =================
  const fetchPosts = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("mypost")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg("Failed to load posts");
      console.log(error);
    } else {
      setPosts(data);
    }

    setLoading(false);
  };

  // ================= DELETE POST =================
  const handleDelete = async (postId) => {
    setErrorMsg("");
    setDeletingId(postId);

    const { error } = await supabase
      .from("mypost")
      .delete()
      .eq("id", postId)
      .eq("user_id", user.id);

    if (error) {
      setErrorMsg("Delete failed, try again!");
      console.log(error);
    }

    setDeletingId(null);
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ================= FILTER =================
  const filteredPosts =
    filter === "All"
      ? posts
      : posts.filter((post) => post.category === filter);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="container my-5 main-ui-container" style={{ color: "#0057a8" }}>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <img
            src="https://lms.saylanimit.com/assets/logo.6lrMPvRL.png"
            alt="Logo"
            className="logo-img"
          />
          {user && (
            <p className="text-muted mb-0">
              Logged in as:{" "}
              <strong style={{ color: "#0057a8" }}>{user.email}</strong>
            </p>
          )}
        </div>

        <div className="d-flex gap-2">
          {user && (
            <button
              className="btn"
              style={{ backgroundColor: "#66b032", color: "#fff" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <button
            className="btn"
            style={{ backgroundColor: "#0057a8", color: "#fff" }}
            onClick={() => navigate("/profile")}
          >
            Create Post
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="mb-4">
        {["All", "Lost", "Found", "Complaint"].map((cat) => (
          <button
            key={cat}
            className={`btn me-2`}
            style={{
              backgroundColor: filter === cat ? "#66b032" : "#fff",
              color: filter === cat ? "#fff" : "#0057a8",
              border: "2px solid #66b032",
            }}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ERROR MESSAGE */}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {/* POSTS */}
      <div className="row">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-muted">No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="col-md-6 mb-4">
              <div
                className="card shadow-sm"
                style={{
                  // border: "2px solid #66b032",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                {/* IMAGE */}
                {post.images && (
                  <img
                    src={Array.isArray(post.images) ? post.images[0] : post.images}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/500x250?text=No+Image")
                    }
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                    alt="post"
                  />
                )}

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 style={{ color: "#0057a8" }}>{post.title}</h5>
                    {post.category !== "Complaint" ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#66b032",
                          color: "#fff",
                        }}
                      >
                        {post.status}
                      </span>
                    ) : (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#0057a8",
                          color: "#fff",
                        }}
                      >
                        {post.severity}
                      </span>
                    )}
                  </div>

                  <p className="text-muted small">
                    {post.category} • {post.location} •{" "}
                    {new Date(post.created_at).toLocaleString()}
                  </p>

                  <p>{post.description}</p>

                  <p className="text-muted small">Posted by: {post.username}</p>

                  {/* OWNER CONTROLS */}
                  {user && user.id === post.user_id && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={deletingId === post.id}
                        onClick={() => handleDelete(post.id)}
                        style={{ backgroundColor: "#66b032", borderColor: "#66b032" }}
                      >
                        {deletingId === post.id ? "Deleting..." : "Delete"}
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
                       onClick={() => navigate("/profile", { state: { post } })} 
                        style={{ backgroundColor: "#0057a8", borderColor: "#0057a8", color: "#fff" }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Main;