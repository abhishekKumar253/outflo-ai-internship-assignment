import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body;

  if (url) {
    res.json({
      name: "Abhishek Kumar",
      job_title: "Full Stack Developer",
      company: "Google",
      location: "India",
      summary:
        "Passionate developer skilled in MERN stack and AI integrations.",
    });
    return;
  }

  res.status(400).json({ message: "Invalid URL" });
});

export default router;
