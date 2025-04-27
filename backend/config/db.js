// const {MongoClient,ServerApiVersion}=require('mongodb'); 
// require('dotenv').config();

// const uri = process.env.MONGODB_URI;


// const client = new MongoClient(
//     uri,{serverApi:{
//         version:ServerApiVersion.v1
//     }}
// )


// let db;

// const connectDB = async ()=>{

//     try{
//         await client.connect();
//         db = client.db(process.env.DB_NAME);
//         await db.command({ ping: 1 });
//         console.log('Successfully connected to MongoDB');
//     }
//     catch(err){
//         console.error('MongoDB connection error:', err);
//         process.exit(1);


//     }
// }


// const getDB = () => {
//     if (!db) {
//       throw new Error('Database not initialized. Call connectDB first.');
//     }
//     return db;
//   };
  
// module.exports = { connectDB, getDB };


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
