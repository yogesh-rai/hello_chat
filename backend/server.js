const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();
const app = express();

// to accept json data
app.use(express.json());


app.get('/', (req, res)=> {
    res.send('API is running');
});

app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`server started on port ${PORT}`));