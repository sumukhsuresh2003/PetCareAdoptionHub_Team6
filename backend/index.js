//D:\Surabhi\workspace\express-proj
const express=require ('express');
var bodyParser = require('body-parser');
const app= express();
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";

//var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });



var obj;

const { v4: uuidv4 } = require('uuid');

// app.get('/api/order',(req,res)=>
// {
//   res.send(uuidv4());
// });

app.post('/api/createacc',jsonParser,(req,res)=>{
    //console.log(req.body);
    //res.send("apple");
       obj=req.body;
       //res.send(uuidv4());
  
   add_data_create(obj);
    
});

// app.post('/api/login',jsonParser,(req,res)=>{
//   //console.log(req.body);
//   //res.send("apple");
//      obj=req.body;
//      //res.send(uuidv4());

//  add_data_login(obj);
  
// });
//////////////////////////////////////////////////
// Assuming you've set up your Express app and MongoDB connection

app.get('/api/checkPetId', async (req, res) => {
  const { petId } = req.query;

  try {
    // Assuming 'pets' is your MongoDB collection
    const pet = await dbo.collection('pet_profile').findOne({ _id: parseInt(petId) });

    if (pet) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking petId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


function loginUser(email, password, callback) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return;
    }

    try {
      const db = client.db('se_proj_pets');
      const usersCollection = db.collection('create_acc');

      const user = await usersCollection.findOne({ email });

      if (!user) {
        callback({ message: 'User does not exist. Create an account.' }, null, 'notFound');
        return;
      }

      if (user.password === password) {
        callback(null, { message: 'Login successful' }, 'success');
      } else {
        callback({ message: 'Invalid email or password' }, null, 'invalidCredentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      callback({ message: 'Server error' }, null, 'serverError');
    } finally {
      client.close();
    }
  });
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  loginUser(email, password, (error, result, status) => {
    if (status === 'notFound') {
      // return res.status(404).json(error);
      res.send('user does not exist');
    } else if (status === 'success') {
      res.send('successful login');
    } else if (status === 'invalidCredentials') {
      // return res.status(401).json(error);
      res.send('Invalid credential');
    } else {
      return res.status(500).json(error);
    }
  });
});








 //var dbo=db.db("se_proj_pets");

// const usersCollection = dbo.collection('create_acc');
// app.post('/api/login',jsonParser, async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await usersCollection.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the hashed password in the database
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (passwordMatch) {
//       return res.status(200).json({ message: 'Login successful' });
//     } else {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// function loginUser(email, password, callback) {
//   MongoClient.connect(url, async (err, client) => {
//     if (err) {
//       console.error('Error connecting to MongoDB:', err);
//       return;
//     }

//     try {
//       const db = client.db('se_proj_pets');
//       const usersCollection = db.collection('create_acc');

//       const user = await usersCollection.findOne({ email });

//       if (!user) {
//         callback({ message: 'Invalid email or password' }, null);
//         return;
//       }

//       // Compare the provided password with the hashed password in the database
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (passwordMatch) {
//         callback(null, { message: 'Login successful' });
//       } else {
//         callback({ message: 'Invalid email or password' }, null);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       callback({ message: 'Server error' }, null);
//     } finally {
//       client.close();
//     }
//   });
// }

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await dbo.collection("create_acc").findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User does not exist. Create an account.' });
//     }

//     // Compare the provided password with the hashed password in the database
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (passwordMatch) {
//       return res.status(200).json({ message: 'Login successful' });
//     } else {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });



function add_data_petprofile (item)
{
  MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("se_proj_pets");

  //  var myobj={name:"abc",age:"20"};
  dbo.collection("pet_profile").insertOne(item,function(err,res){
      if(err) throw err;
      console.log("mongo document created");
      db.close();
  });
})}


function add_data_create (item)
{
  MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("se_proj_pets");

  //  var myobj={name:"abc",age:"20"};
  dbo.collection("create_acc").insertOne(item,function(err,res){
      if(err) throw err;
      console.log("mongo document created");
      db.close();
  });
})}

function add_data_login (item)
{
  MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("se_proj_pets");

  //  var myobj={name:"abc",age:"20"};
  dbo.collection("login").insertOne(item,function(err,res){
      if(err) throw err;
      console.log("mongo document created");
      db.close();
  });
})}



////////////////////////////////////////////////////////////////////////////////////////////////
function add_data_adopt (item)
{
  MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("se_proj_pets");

  //  var myobj={name:"abc",age:"20"};
  dbo.collection("adopt").insertOne(item,function(err,res){
      if(err) throw err;
      console.log("mongo document created");
      db.close();
  });
})}

app.post('/api/adopt', jsonParser,(req, res) => { // Adjusted route to /api/adopt
  const obj = req.body;

  try {
    add_data_adopt(obj);
    // Respond with a success message
    res.json({ message: 'Adoption form submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.post('/api/lost',jsonParser,(req,res)=>{
    //console.log(req.body);
    //res.send("apple");
       obj=req.body;
       //res.send(uuidv4());
  
   add_data_lost(obj);
    
});

app.post('/api/petprofile',jsonParser,(req,res)=>{
  //console.log(req.body);
  //res.send("apple");
     obj=req.body;
     //res.send(uuidv4());

 add_data_petprofile(obj);
  
});

app.post('/api/found',jsonParser,(req,res)=>{
  //console.log(req.body);
  //res.send("apple");
     obj=req.body;
     //res.send(uuidv4());

 add_data_found(obj);
  
});

app.post('/api/volunteer',jsonParser,(req,res)=>{
  //console.log(req.body);
  //res.send("apple");
     obj=req.body;
     //res.send(uuidv4());

 add_data_vol(obj);
  
});
// app.get('/api/adopt', (req, res) => {
//   const pets = get_data();
//   res.json(pets);
// });
app.get('/api/adopt', (req, res) => {
  get_data_adopt((data) => {
    // Once the data is retrieved, send it as a response
    res.json(data);
  });
});

app.get('/api/volunteer', (req, res) => {
  get_data_vol((data) => {
    // Once the data is retrieved, send it as a response
    res.json(data);
  });
});

app.get('/api/lost', (req, res) => {
  get_data_lost((data) => {
    // Once the data is retrieved, send it as a response
    res.json(data);
  });
});


function add_data_vol (item)
{
  MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("se_proj_pets");

  //  var myobj={name:"abc",age:"20"};
  dbo.collection("volunteer").insertOne(item,function(err,res){
      if(err) throw err;
      console.log("mongo document created");
      db.close();
  });
})}



function add_data_found (item)
{
  MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("se_proj_pets");

  //  var myobj={name:"abc",age:"20"};
  dbo.collection("found_pets").insertOne(item,function(err,res){
      if(err) throw err;
      console.log("mongo document created");
      db.close();
  });
})}
//const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL

function get_data_adopt(callback) {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return;
    }
    
    const db = client.db("se_proj_pets");

    // Assuming your collection name is "pets_adoption"
    db.collection("pet_profile").find({}).toArray(function(err, result) {
      if (err) {
        console.error('Error fetching data:', err);
        client.close();
        return;
      }
      
      console.log("Retrieved data:");
      console.log(result);
      callback(result);
      client.close();
    });
  });
}
function get_data_vol(callback) {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return;
    }
    
    const db = client.db("se_proj_pets");

    // Assuming your collection name is "pets_adoption"
    db.collection("volunteer").find({}).toArray(function(err, result) {
      if (err) {
        console.error('Error fetching data:', err);
        client.close();
        return;
      }
      
      console.log("Retrieved data:");
      // console.log(result);
      callback(result);
      client.close();
    });
  });
}
function get_data_lost(callback) {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return;
    }
    
    const db = client.db("se_proj_pets");

    // Assuming your collection name is "pets_adoption"
    db.collection("lost_pets").find({}).toArray(function(err, result) {
      if (err) {
        console.error('Error fetching data:', err);
        client.close();
        return;
      }
      
      console.log("Retrieved data:");
      // console.log(result);
      callback(result);
      client.close();
    });
  });
}
// Example of using get_data
get_data_lost((result) => {
  // Handle the retrieved data here
  console.log("Handling retrieved data...");
  // console.log(result);
});

// function get_data(callback) {
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("se_proj_pets");

//     // Assuming your collection name is "pets"
//     dbo.collection("pets_adoption").find({}).toArray(function(err, result) {
//       if (err) throw err;
//       console.log("Retrieved data:");
//       console.log(result);
//       callback(result);
//       db.close();
//     });
//   });
// }
// Assuming you're using get_data function

///////////////////////////////////

// get_data((result) => {
//   // Handle the retrieved data here
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("se_proj_pets");

//     // Assuming your collection name is "pets"
//     dbo.collection("pets_adoption").find({}).toArray(function(err, result) {
//       if (err) throw err;
//       console.log("Retrieved data:");
//       console.log(result);
//       callback(result);
//       db.close();
//     });
//   });
//   console.log("Handling retrieved data...");
//   console.log(result);
// });


function add_data_lost (item)
{
  MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("se_proj_pets");

  //  var myobj={name:"abc",age:"20"};
  dbo.collection("lost_pets").insertOne(item,function(err,res){
      if(err) throw err;
      console.log("mongo document created");
      db.close();
  });
})}

// app.get('/api/order/:order_id',(req,res)=>
// {
//     res.send(req.params.order_id);
// });

// const port=process.env.PORT ;
const port=5000;
app.listen(port,()=>console.log(`hi port ${port}`));
