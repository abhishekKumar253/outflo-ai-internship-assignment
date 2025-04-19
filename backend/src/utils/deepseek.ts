import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateMessage = async (data: {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}): Promise<string> => {
  const prompt = `Write a personalized outreach message for ${data.name}, a ${data.job_title} at ${data.company} based in ${data.location}. Summary: ${data.summary}`;

   console.log("Prompt:", prompt);

  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("DeepSeek Response:", response.data);
    
    return (
      response.data.choices?.[0]?.message?.content || "No response generated."
    );
  } catch (error: any) {
    console.error("Error generating message:", error?.message || error);
    return "Failed to generate message due to an error.";
  }
};
