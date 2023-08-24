const express = require('express')
const app = express()
const port = 3000
const cors = require('cors'); 
const mongoose = require('mongoose');

app.use(cors()); 
app.use(express.urlencoded())
main().catch(err => console.log(err));

// Connecting to the MongoDb
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/task');
  console.log('connected')
 
}

main(); 


// Schema for Contact Us Database 
const kittySchema = new mongoose.Schema({
  Name: String,
  Email : String,
  Other : String,
  Pho : {
    type:Number,
    required:true
  }
});
const Contacts = mongoose.model('Contact', kittySchema);


app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Listend The Post Request of a user Who Want to Contact 
app.post('/' ,async(req,res)=>{
  const cont = new Contacts({Name : req.body.name , Email : req.body.email,Other : req.body.desc , Pho: req.body.number})
  await cont.save(); 

  
  res.send('Hello'); 

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})