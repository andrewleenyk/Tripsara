require("dotenv").config({ path: ".env.test" });

// Set test environment variables
process.env.NODE_ENV = "test";
process.env.DB_NAME = "tripfundr_test";
process.env.DB_USER = "postgres";
process.env.DB_PASSWORD = "postgres";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "5432";
process.env.JWT_SECRET = "test_secret";
