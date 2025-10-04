const pool = require("../config/db");

const createUserTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      provider VARCHAR(50) NOT NULL,
      provider_id VARCHAR(255) NOT NULL,
      display_name VARCHAR(255),
      email VARCHAR(255),
      avatar_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE (provider, provider_id)
    );
  `;

  await pool.query(createTableQuery);
  console.log("Users table created or already exists.");

  const checkIndexQuery = `
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'users_provider_providerid_idx'
        AND n.nspname = 'public'
      ) THEN
        CREATE UNIQUE INDEX users_provider_providerid_idx
        ON users(provider, provider_id);
      END IF;
    END$$;
  `;

  await pool.query(checkIndexQuery);
  console.log("Unique index ensured.");
};

//pg_class stores all the information about tables and indexes in the database
//pg_namespace stores information about schemas like public schemas. Our tables are stored in public schema

module.exports = {
  createUserTable,
};
