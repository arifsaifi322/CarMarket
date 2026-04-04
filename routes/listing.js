const express = require("express");
const router = express.Router();
const wrapAsync = require("../models/wrapAsync.js");
const list = require("../models/lists.js");
const {listingSchema} = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingControllor = require("./../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

const validateListing = (req,res, next) => {
  let { error } = listingSchema.validate(req.body);  

  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);  
  } else {
    next();  
  }
};

router.route("/")
.get(validateListing,listingControllor.index)
.post(isLoggedIn,upload.single("listing[image]"),listingControllor.create)

/*
  .post(  (req,res) => {
  res.send(req.file);
  })
// */

// .get(listingControllor.health)

router.route("/edit/:id")
.patch(isOwner,upload.single("image"), listingControllor.updateList)
.get(isLoggedIn,isOwner,listingControllor.edit_link)

// // get All (List) : 
// router.get ("/ol",listingControllor.OL_index);
// Read by Id (Read)
router.get("/:id",listingControllor.readById);
// delete by id
router.delete("/delete/:id",isLoggedIn,isOwner,wrapAsync(listingControllor.deleteById));

// <-----------------------links------------------------------->

//  new route   -    redirect to new post
router.get("/new/newform",isLoggedIn,listingControllor.newRoute);
 
module.exports = router;