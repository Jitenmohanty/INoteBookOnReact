const Notes = require("../models/Notes");

module.exports.getAllNotes = async (req, res, next) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        return res.json({ msg: "Error on fetching notes", status: false })
    }
}

module.exports.addNotes = async (req, res, next) => {
    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        return res.json({ status: true, saveNote });
    } catch (ex) {
        return res.json({ msg: "Error on add Note", status: false })
        next(ex);
    }
}

module.exports.updateNotes = async (req, res, next) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        // find the note to be update and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") };

        //Allow updation If user own this notes.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note })
    } catch (error) {
        return res.json({ msg: "Error on update notes", status: false })
    }
}

module.exports.deleteNotes = async (req, res, next) => {
    try {
        // find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") };

        //Allow deletion If user own this notes.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        // note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ msg:"Note deleted sucess fully" ,status:'true',note:note })
    } catch (error) {
        return res.json({ msg: "Error on delete note", status: false })
    }
}