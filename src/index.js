const app = require("./app");
const connectDB = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI);

app.listen(PORT);

console.log(`Server is listening on port ${PORT}...`);
