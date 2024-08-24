import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import pokedexRoutes from "./routes/pokedex";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 3000;

app.use("/api", pokedexRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
