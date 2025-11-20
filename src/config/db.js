import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToMongoDB = async () => {
  const connInstance = await mongoose.connect(`${config.MONGO_URI}`, {
    dbName: config.DB_NAME,
    retryWrites: true,
    w: "majority",
    appName: "Cluster0",
    maxPoolSize: 10, // Maintain up to 10 simultaneous DB connections
    socketTimeoutMS: 30000, // Kill inactive sockets after 30s
    serverSelectionTimeoutMS: 5000, // Timeout after 5s if no server is available
  });
  console.log(`MongoDB connected: ${connInstance.connection.name}`);
};
