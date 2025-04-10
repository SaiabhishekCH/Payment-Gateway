import express  from "express";
import router from "./main";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user" , router);

app.listen(8080);