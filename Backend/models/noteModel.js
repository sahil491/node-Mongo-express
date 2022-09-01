const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")
const noteSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"User"
        },
    },
    {
        timestamps:true
    }
);
noteSchema.plugin(mongoosePaginate)
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;