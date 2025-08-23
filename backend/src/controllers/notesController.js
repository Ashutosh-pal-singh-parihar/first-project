import Note from "../models/Note.js";

// ✅ Get all notes of logged-in user
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get single note (only if it belongs to logged-in user)
export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Create new note linked to logged-in user
export const createNote = async (req, res) => {
  try {
    console.log("Creating note for user:", req.user); // 👈 Debug log
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update note only if it belongs to the user
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // ownership check
      { title, content },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Delete note only if it belongs to the user
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
