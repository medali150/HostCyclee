import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Liste des origines autorisées
const allowedOrigins = [
  "http://localhost:3000", // Développement local
  "https://host-cycle.vercel.app", // URL de production
];

// Middleware CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Autoriser les cookies et en-têtes sécurisés
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware pour gérer les requêtes préflight OPTIONS
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Middlewares de sécurité et utilitaires
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes API
app.get("/", (req, res) => res.send("Hello, server is running 🚀"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Démarrer le serveur
app.listen(port, () => console.log(`✅ Serlver started on port: ${port}`));




/*
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config(); // Charger les variables d'environnement dès le début
connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Configurer CORS avec une approche plus dynamique
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000', // For local testing
  'https://host-cycle.vercel.app', // Vercel production URL
];
app.use(cors({
  origin: allowedOrigins, // Allow these origins
  credentials: true, // Allow sending cookies
}));

// Middleware de sécurité
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // Logger les requêtes

// API Endpoints
app.get("/", (req, res) => res.send("Hello, server is running 🚀"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(port, () => console.log(`✅ Server started on port: ${port}`));
*/