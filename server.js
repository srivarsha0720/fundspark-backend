import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import supabase from "./config/supabaseClient.js";
import { protect } from "./middlewares/authMiddleware.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("FundSpark backend running 🚀");
});

// db test route
app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.json(error);
  res.json(data);
});

app.use("/api/auth", authRoutes);

app.get("/api/test/protected", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

app.use("/api/projects", projectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));