import express from "express";
import path from "path";
import bodyParser from "body-parser";
import approutes from "./routes/app.routes.js";
import env from "./config/environment.js";
import { connectDB } from "./config/db.js";

/** CONFIGURATION */
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

if (env === "production") {
  // Serve static files from the client's build/dist folder
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Route for serving the React app
  app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

/** ROUTES */
app.use("/", approutes);

app.all("/*", (req, res) => {
  return res.status(400).json({
    success: false,
    error: "no api found",
  });
});

const port = env.port;

connectDB()
  .then((connectedDb) => {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
      console.log(`connected to DB :: ${connectedDb.name}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
