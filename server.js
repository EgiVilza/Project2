// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");

// Create an instance of the express app.
const app = express();
app.use("/public", express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Start our server so that it can begin listening to client requests.
// Log (server-side) when our server has started
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`)
);
