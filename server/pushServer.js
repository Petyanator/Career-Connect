import cors from "cors";
import express from "express";
import webPush from "web-push";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const publicVapidKey =
  "BNlSuaicW0_l4LG__BMqjDKNNgBbQwjz9UN9_7K5vd0FXwRu2wEY_EW3tOZlis7TB6Mnktfr9YTodvXmKYHKVNk";
const privateVapidKey = "HVhw1cR-yQ66MyZ1ISwMadsmY1VOg7-NFL4PWHCYlHY";

webPush.setVapidDetails(
  "mailto:sjerdiv@gmail.com",
  publicVapidKey,
  privateVapidKey
);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Job Alert",
    body: "A new job has been posted!",
  });

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
