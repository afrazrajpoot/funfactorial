require("dotenv").config();
const app = require("./app");
const dbConnection = require("./db/connection");
dbConnection();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
