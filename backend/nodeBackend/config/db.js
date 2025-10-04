require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If using SSL:
  // ssl: { rejectUnauthorized: false }
});

pool.on('error', (err) => {
  console.error('Unexpected PG error', err);
  process.exit(-1);
});

module.exports = pool;

// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", err.message || err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
