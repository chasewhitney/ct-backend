const express = require("express");
const app = express();

require("./startup/routes")(app);

app.listen(5001, () => {
  console.log("Listening on port", 5001);
});
