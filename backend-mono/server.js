const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const user_routes = require("./routes/user.routes");
const listing_routes = require("./routes/listing.routes");
const booking_routes = require("./routes/booking.routes");

const app = express()

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.get('/', async (req, res) => {
  res.json({ message: 'backend monolith' });
})

app.use("/api/user", user_routes);
app.use("/api/listings", listing_routes);
app.use("/api/booking", booking_routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
