const {createUserTable} = require("./migration");

const initializeDatabase = async () => {
  try {
    await createUserTable();
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

module.exports = initializeDatabase;