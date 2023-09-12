const router = require("express").Router();
const fetchuser = require('../Middleware/userCredential');
const { getAllNotes, addNotes, updateNotes, deleteNotes } = require('../Controller/noteController')


router.get('/getallnotes',fetchuser,getAllNotes);
router.post('/addnote',fetchuser,addNotes);
router.put('/updatenote/:id',fetchuser,updateNotes);
router.delete('/deletenote/:id',fetchuser,deleteNotes);

module.exports = router;