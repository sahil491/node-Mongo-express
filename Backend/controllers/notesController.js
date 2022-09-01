const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
const { response } = require("express");

const getNotes = asyncHandler(
    async (req,res)=>{
        Note.paginate({},{page: req.query.page, limit:req.query.limit})
        .then(response=>{
            res.json({
                response
            })
            .catch(error=>{
                res.json({
                    message:"An error Occured"+error
                })
            })
        })
    }
)

const createNote = asyncHandler(
    async (req,res)=> {
        const {title, content, category} = req.body;
        if(!title || !content || !category){
            res.status(400);
            throw new Error("Please Fill all the fields");
        } else{
            const note = new Note({user:req.user._id,title,content,category});
            const createdNote = await note.save();
            res.status(201).json(createdNote)
        }
    }
)

const getNoteById = asyncHandler(
    async (req,res)=>{
           const note = await Note.findById(req.params.id);

           if(note){
               res.json(note);
           } else{
               res.status(404).json({message: "Note not found"});
           }
    }
)

const updateNote = asyncHandler(
    async (req,res)=>{
        const {title, content, category} = req.body;
        const note = await Note.findById(req.params.id);

        if(note.user.toString() !== req.user._id.toString()){
            res.status(401);
            throw new Error("You can't perform this action");
        }
        if(note){
            note.title=title;
            note.content=content;
            note.category=category;

            const updatedNote = await note.save();
            res.json(updatedNote) 
        } else{
            res.status(404);
            throw new Error("Note not found")
        }
    }
)

const deleteNote = asyncHandler(
    async (req,res)=>{
        const note = await Note.findById(req.params.id);

        if(note.user.toString() !== req.user._id.toString()){
            res.status(401);
            throw new Error("You can't perform this action");
        }
        if(note){
            await note.remove();
            res.json({message: "Note Deleted"})
        }
    }
)
// search with only title
// const getNoteByTitle = asyncHandler(
//     async (req,res)=>{
//         var regex = new RegExp(req.params.title,'i')
//         Note.find({title:regex}).then((result)=>{
//             res.status(200).json(result);
//         })
//     }
// )
// search with all properties
const getNoteByAll = asyncHandler(
    async (req,res)=>{
        console.log(req.params.key)
     let data = await Note.find(
         {
             "$or":[
                     { "name":{$regex:req.params.key}}
             ]
         }
     )
     console.log(data)
     res.send(data);
    }
)
module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote,getNoteByAll}