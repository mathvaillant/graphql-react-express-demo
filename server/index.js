const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

// const port = process.env.PORT || "3004";
const port = 3004;
const app = express();

// Connect to MongoDB
connectDB();

app.use("/graphql", graphqlHTTP({
  schema,
  // graphiql: process.env.NODE_ENV === "development",
  graphiql: true,
}));

app.listen(port, console.log(`Running on PORT: ${port}`));
