import express from "express";
import path from "path";
import approutes from "./routes/app.routes.js";
import env from "./config/environment.js";
import { connectDB } from "./config/db.js";

/** CONFIGURATION */
const __dirname = path.resolve();
const app = express();

// // Serve static files from the client's build/dist folder
// app.use(express.static(path.join(__dirname, "client", "dist")));

// // // Route for serving the React app
// app.get("/", (req, res) => {
//   return res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

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
  .then((connection) => {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
      console.log(`connected to DB :: ${connection.name}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
