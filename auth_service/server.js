const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const routes = require("./routes/user.routes");

const app = express()

app.use(cors());

app.get('/', async (req, res) => {
  res.json({ message: 'Hello World' });
})

app.use("/api/user", routes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
