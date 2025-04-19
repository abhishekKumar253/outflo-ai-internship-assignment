import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";
import MessageGenerator from "../components/MessageGenerator";

const Home: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">OutFlo AI Assignment Dashboard</h1>
      <CampaignForm/>
      <CampaignList/>
      <MessageGenerator/>
    </div>
  );
};

export default Home;
