const express = require("express");
const { getNotes, createNote, getNoteById, updateNote, deleteNote, getNoteByTitle, getNoteByAll } = require("../controllers/notesController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect,getNotes); 
router.route('/create').post(protect,createNote);
router.route('/:id').get(protect,getNoteById)
.put(protect, updateNote) 
.delete(protect,deleteNote)
// router.route('/search/:title').get(protect,getNoteByTitle)
router.route('/search/:key').get(protect,getNoteByAll)
module.exports = router;