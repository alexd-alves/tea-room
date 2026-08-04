// server/db/conn.js

import mongoose from 'mongoose';
export default function connectDatabase() {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
