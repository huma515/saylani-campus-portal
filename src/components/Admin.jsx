import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import supabase from "../config/supabse";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // ===== FETCH ALL DATA =====
  const fetchData = async () => {
    const { data: postData, error: postError } = await supabase
      .from("mypost")
      .select("*")
      .order("created_at", { ascending: false });

    if (postError) console.log("Error fetching posts:", postError);
    else if (postData) setPosts(postData);

    const { count, error: userError } = await supabase
      .from("profile")
      .select("*", { count: "exact", head: true });

    if (userError) console.log("Error fetching users count:", userError);
    else setUsersCount(count || 0);
  };

  // ===== DELETE POST =====
  const deletePost = async (id) => {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    const { error } = await supabase.from("mypost").delete().eq("id", id);
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `Post ID ${id} deleted`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    }
  };

  // ===== APPROVE / REJECT =====
  const toggleApprove = async (post) => {
    const { error } = await supabase
      .from("mypost")
      .update({ is_approved: !post.is_approved })
      .eq("id", post.id);

    if (!error) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, is_approved: !post.is_approved } : p
        )
      );
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `${post.title} ${!post.is_approved ? "approved" : "rejected"}`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    }
  };

  // ===== RESOLVE COMPLAINT =====
  const resolveComplaint = async (post) => {
    const { error } = await supabase
      .from("mypost")
      .update({ is_resolved: true })
      .eq("id", post.id);

    if (!error) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, is_resolved: true } : p))
      );
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `${post.title} complaint resolved`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    }
  };

  // ===== REALTIME =====
  useEffect(() => {
    fetchData(); // initial load

    const channel = supabase
      .channel("public:mypost")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mypost" },
        (payload) => {
          if (!payload.new) return;

          const newPost = payload.new;
          setPosts((prev) => [newPost, ...prev]);
          setNotifications((prev) => [
            {
              id: Date.now(),
              message: `${newPost.username || "A user"} posted a ${newPost.category}`,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "mypost" },
        (payload) => {
          if (!payload.new) return;

          const updatedPost = payload.new;
          setPosts((prev) =>
            prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
          );
          setNotifications((prev) => [
            {
              id: Date.now(),
              message: `${updatedPost.title} updated`,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "mypost" },
        (payload) => {
          if (!payload.old) return;

          setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
          setNotifications((prev) => [
            {
              id: Date.now(),
              message: `Post ID ${payload.old.id} deleted`,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ]);
        }
      )
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  return (
    <div
      className="container-fluid p-4"
      style={{ background: "#f5f6fa", minHeight: "100vh" }}
    >
      <div className="row">
        {/* ===== MAIN DASHBOARD ===== */}
        <div className="col-md-9">
          {/* ===== STATS ===== */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card p-3 text-white bg-primary shadow-sm">
                <h6>Total Users</h6>
                <h3>{usersCount}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-white bg-warning shadow-sm">
                <h6>Lost</h6>
                <h3>{posts.filter((p) => p.category === "Lost").length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-white bg-success shadow-sm">
                <h6>Found</h6>
                <h3>{posts.filter((p) => p.category === "Found").length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-white bg-danger shadow-sm">
                <h6>Complaints</h6>
                <h3>{posts.filter((p) => p.category === "Complaint").length}</h3>
              </div>
            </div>
          </div>

          {/* ===== POSTS TABLE ===== */}
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Posts Management</h5>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>{post.username}</td>

                    <td>
                      {post.category === "Complaint"
                        ? post.is_resolved
                          ? "Resolved"
                          : "Pending"
                        : post.is_approved
                        ? "Approved"
                        : "Pending"}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => deletePost(post.id)}
                      >
                        Delete
                      </button>

                      {post.category !== "Complaint" && (
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => toggleApprove(post)}
                        >
                          {post.is_approved ? "Reject" : "Approve"}
                        </button>
                      )}

                      {post.category === "Complaint" && !post.is_resolved && (
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => resolveComplaint(post)}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== NOTIFICATION SIDEBAR ===== */}
        <div className="col-md-3">
          <div
            className="card shadow-sm p-3"
            style={{ height: "100%", overflowY: "auto" }}
          >
            <h5>Live Notifications</h5>

            {notifications.length === 0 && (
              <p className="text-muted">No new activity</p>
            )}

            {notifications.map((n) => (
              <div key={n.id} className="border rounded p-2 mb-2 bg-white">
                <strong>{n.message}</strong>
                <br />
                <small className="text-muted">{n.time}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;