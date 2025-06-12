import express, { Application, Request, Response } from "express";
import "dotenv/config";
import Routes from "./routes/index.js";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7000;
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
import { connectkafkaProducer } from "./config/kafka.config.js";
import { consumeMessages } from "./helper.js";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  adapter: createAdapter(redis),
});

setupSocket(io);
export { io };

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", Routes);


connectkafkaProducer().catch((err)=>{
console.log("Error to Connecting Kafka",err)
})
consumeMessages(process.env.KAFKA_TOPIC).catch((err)=>{
console.log("The consumer error is",err)
})

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
