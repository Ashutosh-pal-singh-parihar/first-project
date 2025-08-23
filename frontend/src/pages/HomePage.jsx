import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { useAuth } from "../context/AuthContext"; // ✅ to check login
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth(); // ✅ from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // if no user, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes"); // ✅ will send cookie (withCredentials)
        console.log("Fetched notes:", res.data);

        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error.response);

        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          navigate("/login");
        } else if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Loader */}
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}

        {/* No Notes */}
        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

        {/* Notes Grid */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
