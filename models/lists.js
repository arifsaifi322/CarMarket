const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
    title : {
        type :String
    },description : {
        type : String
    }, image: {
        filename: {
            type: String,
            default: "listingimage", // or any default filename you want
             set: v => v === "" 
                ? "listingimage"
                : v
        },
        url: {
            type: String,
            default: "https://images.adsttc.com/media/images/5ec5/5ce3/b357/657a/0500/035f/newsletter/Vernadah_House2.jpg?1589992621",
            set: v => v === "" 
                ? "https://images.adsttc.com/media/images/5ec5/5ce3/b357/657a/0500/035f/newsletter/Vernadah_House2.jpg?1589992621"
                : v
        }
    },price : {
        type : Number,
    },quantity : {
        type : Number,
        default : 1
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review"
    }],

    owner : {
        type : Schema.Types.ObjectId,
        ref : "user"
    }
})

listSchema.post("findOneAndDelete",async(list) => {
    if(list){
        await reviews.deleteMany({_id : {$in : list.reviews}});
    }
});

let List = new mongoose.model("List",listSchema);
module.exports = List;
