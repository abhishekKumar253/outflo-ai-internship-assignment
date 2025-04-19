import { useEffect, useState } from "react";
import api from "../api";

interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
}

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchCampaigns = async () => {
    const res = await api.get("/campaigns");
    setCampaigns(res.data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const toggleStatus = async (id: string, status: string) => {
    const newStatus = status === "active" ? "inactive" : "active";
    await api.put(`/campaigns/${id}`, { status: newStatus });
    fetchCampaigns();
  };

  const deleteCampaign = async (id: string) => {
    await api.delete(`/campaigns/${id}`);
    fetchCampaigns();
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Campaigns</h2>
      <div className="grid gap-4">
        {campaigns.map((c) => (
          <div key={c._id} className="border p-4 rounded bg-gray-50 shadow">
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <p>{c.description}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => toggleStatus(c._id, c.status)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                {c.status === "active" ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => deleteCampaign(c._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
