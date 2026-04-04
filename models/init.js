const mongoose = require("mongoose");
// const {type} = require("os");
const initData = require("./data.js");
const list = require("./lists.js");
const { object } = require("joi");

let mongoUrl = "mongodb://127.0.0.1:27017/AirBnB";

main()
.then((res)=>{
    console.log("Connection Sucessfull")
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(mongoUrl);
}

const initDB = async()=>{

    // to restart the data in database
    await list.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner : "68b70091c1e9ab27ad286b36"}));
    await list.insertMany(initData.data);
    console.log("Data Was initialized !");
};

initDB();
