const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Get all the notes using get:/api/notes/fetchallnotes "login req"
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error occur");
  }
});

//  route2 add new notes using post:/api/notes/addnote "login req"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),

    body("discription", "enter a valid discription").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, discription, tag } = req.body;
      //if there are error return the  bad status
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        discription,
        tag,
        user: req.user.id,
      });
      const savenotes = await note.save();
      res.json(savenotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal error occur");
    }
  }
);

//  route3 to update note using put:/api/notes/updatenote/:id "login req"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, discription, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (discription) {
      newNote.discription = discription;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the note to be upodated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error occur");
  }
});

//  route4 to delete note using delete:/api/notes/deletenote/:id "login req"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be upodated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ sucess: "note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error occur");
  }
});

module.exports = router;
