import { useState } from "react";
import api from "../api";

interface CampaignData {
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  leads: string;
  accountIDs: string;
}

interface ApiError {
  response?: {
    data: {
      error: string;
    };
  };
}

const CampaignForm: React.FC = () => {
  const [form, setForm] = useState<CampaignData>({
    name: "",
    description: "",
    status: "ACTIVE",
    leads: "",
    accountIDs: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.description || !form.leads || !form.accountIDs) {
      setError("Please fill all the fields.");
      return;
    }

    const payload = {
      ...form,
      leads: form.leads.split(",").map((lead) => lead.trim()),
      accountIDs: form.accountIDs.split(",").map((id) => id.trim()),
    };

    setLoading(true);
    setError(null);

    try {
      await api.post("/campaigns", payload);
      alert("Campaign Created Successfully");
      setForm({
        name: "",
        description: "",
        status: "ACTIVE",
        leads: "",
        accountIDs: "",
      });
    } catch (err) {
      const error = err as ApiError;
      setError(
        error?.response?.data?.error ||
          "There was an error creating the campaign."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow p-4 rounded"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Campaign Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>
      <input
        name="leads"
        value={form.leads}
        onChange={handleChange}
        placeholder="Leads (comma separated)"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="accountIDs"
        value={form.accountIDs}
        onChange={handleChange}
        placeholder="Account IDs (comma separated)"
        className="w-full p-2 border rounded"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Campaign"}
      </button>
    </form>
  );
};

export default CampaignForm;
