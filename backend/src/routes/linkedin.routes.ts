import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { url } = req.body;

  if (url) {
    return res.json({
      name: "John Doe",
      job_title: "Full Stack Developer",
      company: "Google",
      location: "Bangalore, India",
      summary:
        "Experienced Full Stack developer skilled in React, Node.js, and MongoDB.",
    });
  }

  return res.status(400).json({ message: "Invalid URL" });
});

export default router;
