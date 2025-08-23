import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent card click navigation
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation(); // prevent card click navigation
    navigate(`/note/${id}/edit`);
  };

  const handleCardClick = () => {
    navigate(`/note/${note._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] cursor-pointer"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-xs"
              onClick={(e) => handleEdit(e, note._id)}
              title="Edit Note"
            >
              <PenSquareIcon className="size-4" />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
              title="Delete Note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
