const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser.js"); // For Middleware
const Note = require("../models/Note.js"); //Importing notes model
const { body, validationResult } = require("express-validator"); //Expreess- validator:We need this ki koi bhi kuch bhi notes add na krde
//ROUTE 1 : Get request : Create a user using : POST "/api/note/fetchallnotes". login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }); // req.user contain user which we get from our middleware
    // console.log(notes);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error  occur ");
  }
});

//ROUTE 2 : post request : Add a new notes using: POST "/api/note/addnote".login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleat 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errrors ,  return Bad request and errrors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error  occur ");
    }
  }
);

// Route 3  : Update an existing note   using : : PUT "/api/note/updatenote ". login required.
// For updation we use put request
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a new note

    const newNote = {};
    /// agar koi bhi hamare request m aari h to use update kr do
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be added and update it
    let note = await Note.findById(req.params.id); // ye jo hamare put request m id h wo waali id find kr raha h
    //agr us id ka note hi exist nhi krta ho
    if (!note) {
      return req.status(404).send("Not found");
    }

    //agr note mil gaya  to hm check krenge user ki id same hi h kya . Mtlb user apne note ko update kr skta h
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Otherwise now we are allowed
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    ); // for update notes
    // in above we gamve id of note we want to update , and we set newnote
    // console.log(note.user);
    // console.log(req.user.id);
    // console.log(req.params.id);
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error  occur ");
  }
});

// Route 4  : Delete an existing note   using : Delete "/api/note/deletenote ". login required.
// For updation we use put request
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    
      // Find the note to be deleted
      let note = await Note.findById(req.params.id); // ye jo hamare put request m id h wo waali id find kr raha h
      //agr us id ka note hi exist nhi krta ho
      if (!note) {
        return req.status(404).send("Not found");
      }
    
      //agr note mil gaya  to hm check krenge user ki id same hi h kya . Mtlb user apne note ko hi delete kr skta h
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }
    
      // Otherwise now we are allowed
      note = await Note.findByIdAndDelete(req.params.id); // for delete notes
      res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error occur ");
  }
});
module.exports = router;
