const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const routes = require("./routes/booking.routes");

const app = express()

app.use(cors());

app.get('/', async (req, res) => {
  res.json({ message: 'Booking Service!!' });
})

app.use("/api/booking", routes)

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
