import { useState } from "react";
import api from "../api";

interface FormData {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
  linkedin_url: string;
}

interface MessageResponse {
  message: string;
}

const MessageGenerator: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
    linkedin_url: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchFromLinkedIn = async () => {
    if (!form.linkedin_url) return;
    setLoading(true);
    try {
      const res = await api.post<FormData>("/linkedin-parse", {
        url: form.linkedin_url,
      });
      setForm({ ...form, ...res.data }); 
    } catch {
      alert("Failed to fetch LinkedIn data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post<MessageResponse>(
        "/personalized-message",
        form
      );
      setMessage(res.data.message);
    } catch {
      alert("Failed to generate message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">🤖 AI Message Generator</h2>
      <input
        name="linkedin_url"
        value={form.linkedin_url}
        onChange={handleChange}
        placeholder="Paste LinkedIn Profile URL"
        className="input"
      />
      <button
        onClick={fetchFromLinkedIn}
        className="bg-indigo-600 text-white px-3 py-1 mt-2 rounded"
      >
        Fetch from LinkedIn
      </button>

      <div className="grid grid-cols-1 gap-2 mt-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input"
        />
        <input
          name="job_title"
          value={form.job_title}
          onChange={handleChange}
          placeholder="Job Title"
          className="input"
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="input"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="input"
        />
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="input"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        {loading ? "Generating..." : "Generate Message"}
      </button>

      {message && (
        <div className="bg-gray-100 p-3 rounded mt-3 whitespace-pre-line">
          {message}
        </div>
      )}
    </div>
  );
};

export default MessageGenerator;
