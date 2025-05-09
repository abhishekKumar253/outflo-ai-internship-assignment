import express from "express";
import campaignRoutes from "./routes/campaign.routes";
import messageRoutes from "./routes/message.routes";
import linkedinRouter from "./routes/linkedin.routes";

const app = express();
app.use(express.json());

app.use("/campaigns", campaignRoutes);
app.use("/personalized-message", messageRoutes);
app.use("/linkedin-parse", linkedinRouter)

export default app;
