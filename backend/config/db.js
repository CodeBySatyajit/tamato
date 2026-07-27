import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://satyjeetgaikwad39_db_user:LFJpcFpqy5XtEF6Q@tomato.26ue1cn.mongodb.net/?appName=tomato",
  ).then(() => {
    console.log('DB Connected')
  });
};
