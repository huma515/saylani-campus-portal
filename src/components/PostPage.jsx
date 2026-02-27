import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import supabase from "../config/supabse";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(""); // Lost / Found / Complaint
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleImageChange = (e) => setImages([...e.target.files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in!");
    if (!category || !title || !description) {
      return toast.error("Please fill all required fields!");
    }

    setLoading(true);
    let imageUrls = [];

    try {
      // Upload images
      for (let img of images) {
        const fileName = `${Date.now()}_${img.name}`;
        const { error: uploadError } = await supabase.storage
          .from("posts-images")
          .upload(fileName, img);

        if (uploadError) throw uploadError;

        // Correctly get public URL
        const { data: urlData } = supabase.storage
          .from("posts-images")
          .getPublicUrl(fileName);

        imageUrls.push(urlData.publicUrl);
      }

      // Insert post into mypost table
      const { error: insertError } = await supabase.from("mypost").insert([
        {
          user_id: user.id,
          username: user.email,
          category,
          title,
          description,
          status: category !== "Complaint" ? status || null : null,
          location: category !== "Complaint" ? location || null : null,
          severity: category === "Complaint" ? severity || null : null,
          images: imageUrls.length > 0 ? imageUrls : null,
          created_at: new Date(),
        },
      ]);

      if (insertError) throw insertError;

      toast.success("Post created successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 profile-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card post-form-card p-4 mb-5 shadow-sm">
        <h5 className="mb-4 fw-bold">Create New Post</h5>

        <form onSubmit={handleSubmit}>
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
              {(category === "Lost" || category === "Found") && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Item Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <select
                        className="form-select form-select-lg"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
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
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {category === "Complaint" && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Complaint Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Describe your issue"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select form-select-lg"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                    >
                      <option value="">Select Severity</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </>
              )}

              {/* Image Upload */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Attach Image(s)</label>
                <input
                  type="file"
                  className="form-control form-control-lg"
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn submit-btn w-100 fw-bold"
                disabled={loading}
              >
                {loading ? "Posting..." : "Submit"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostPage;