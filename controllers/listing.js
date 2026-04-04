const list = require("../models/lists");

module.exports.index = async(req,res)=>{
    let AllLists = await list.find().populate("reviews").populate("owner");
    // console.log(AllLists);
    res.render("listings/home.ejs",{AllLists});
}

module.exports.OL_index = async(req,res)=>{
    let AllLists = await list.find();
    res.render("listings/list.ejs",{AllLists});
}

module.exports.create = async(req,res,next)=>{
    try{
        let url = req.file.path;
        let filename = req.file.filename;

        console.log(url);
        console.log(filename);
    //     let {title,description,imageUrl,price,location,country} = req.body;
        
    //     await list.create({
    //     title,
    //     description,
    //     image : {
    //         filename : imageUrl,
    //         url : imageUrl
    //     },
    //     price,
    //     location,
    //     country,
    // });

    const newList = new list(req.body);
    newList.owner = req.user._id;
    newList.image = {url,filename}


    // let e1 = new list(req.body.listings);
    await newList.save();


    req.flash("success","New List created sucessfully!");
    res.redirect("/home")
    }catch(err){
        next(err);
    }
}

module.exports.readById = async(req,res)=>{
    let {id} = req.params;
    let data = await list.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner");
    if(!data){
        req.flash("errorr","listing does not exist");
        res.redirect("/home");
    }
    // console.log(data);
    res.render("listings/show.ejs",{data});
}

module.exports.updateList =  async(req,res)=>{
    let {id} = req.params;

    let listing = await list.findByIdAndUpdate(id,{...req.body});

    console.log(req.body);
    
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = {url,filename};
            await listing.save();
        }
        req.flash("success","List Updated sucessfully!");
        
    res.redirect(`/home/${id}`);
}

module.exports.deleteById = async(req,res)=>{
    let {id} = req.params;
    await list.findByIdAndDelete(id);
    req.flash("success","List Deleted sucessfully!");

    res.redirect("/home")
}

// module.exports.health = (req,res)=>{
//     // console.log()
//     res.send("yeas app is working just fine!")
// }

module.exports.edit_link = async(q,s)=>{
    let {id} = q.params;
    let data = await list.findById(id);
    // console.log(data);
    if(!data){
        q.flash("errorr","listing does not exist");
        s.redirect("/home");
    }
    let original_Image_url = data.image.url;
    original_Image_url =  original_Image_url.replace("/upload","/upload/w_300");
    s.render("listings/edit.ejs",{data,original_Image_url});
}

module.exports.newRoute = (req,res)=>{
    res.render("listings/new.ejs");
}