import express from "express";
import auth from "../middleware/auth.js"
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNoteById);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

export default router;
