const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

startServer();

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`running at port ${PORT}`);
  });
}

async function connectDB() {
  const conn = await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected : ${conn.connection.host}`);
}
