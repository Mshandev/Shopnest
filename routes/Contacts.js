const express=require('express');
const { createContact, fetchAllContacts, deleteContact } = require('../controller/Contact');
const router=express.Router();

router.post('/',createContact).get("/", fetchAllContacts)
.delete("/:id",deleteContact);;

exports.router=router;