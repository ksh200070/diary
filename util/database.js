import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin:ksh1010@ksh20007.iurcg.mongodb.net/forum?retryWrites=true&w=majority&appName=ksh20007";

let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(uri).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(uri).connect();
}

export { connectDB };
