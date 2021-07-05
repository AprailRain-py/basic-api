const express = require("express");

const app = express();
const mainRoute = require("./routes");

// Parse requests of content-type - application/json
app.use(express.json());

// register all routes
app.use(mainRoute);

// initiate redis as DB
require("./service/redis");

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// start application
app.listen(6000, async () => {
  console.log(`\n🚀 Server is running on port 6000.\n`);
});
