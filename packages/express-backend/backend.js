import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

mongoose.set("debug", true);
mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  try {
    let docs;
    if (name && job) {
      docs = await userServices.findUsersByNameAndJob(name, job);
    } else {
      docs = await userServices.getUsers(name, job);
    }
    res.send({ users_list: docs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await userServices.findUserById(req.params.id);
    if (!user) return res.status(404).send("Resource not found");
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/users", async (req, res) => {
  try {
    const saved = await userServices.addUser(req.body);
    res.status(201).send(saved);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await userServices.deleteUserById(req.params.id);
    if (deleted) res.send("User deleted successfully");
    else res.status(404).send("User not found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});