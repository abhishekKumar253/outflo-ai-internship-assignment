import React, { useState } from "react";
import api from "../api";

interface FormState {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

const MessageGenerator: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
  });

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/personalized-message", form);
      setMessage(res.data.message);
    } catch {
      setError("Failed to generate message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-2">Generate Outreach Message</h2>
      <div className="space-y-2">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <input
              name={key}
              value={form[key as keyof FormState]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full p-2 border rounded mb-2"
            />
          </div>
        ))}
        <button
          onClick={handleGenerate}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {message && <p className="mt-4 bg-gray-100 p-3 rounded">{message}</p>}
      </div>
    </div>
  );
};

export default MessageGenerator;
