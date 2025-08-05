import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { fetchAgentDetails } from './sample1'
import { Agent } from '../../types/agent'
import NotFound from '../NotFound'  // Adjust the import path as needed

const AgentPage = () => {
  // You should tell TypeScript that `username` is a string (not string | undefined)
  const { username } = useParams<{ username: string }>()
  const [agent, setAgent] = useState<Agent | null>(null)

  const fetchAgentDetails = async (username) => {
  try {
    const response = await fetch(`https://offplan-backend.onrender.com/agents/${username}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch agent details:", error);
    return null;
  }
};

  useEffect(() => {
    if (username) {
      fetchAgentDetails(username).then(setAgent)
    }
  }, [username])

  if (!agent) return <div><NotFound /></div>

  return (
    <div className="agent-details">
      <h2>{agent.name}</h2>
      <img src={agent.profile_image_url} alt="Agent profile" />
      <p>{agent.description}</p>
      <p>📞 {agent.phone_number}</p>
      <p>📱 WhatsApp: {agent.whatsapp_number}</p>
      <p>📧 {agent.email}</p>
      <p>🧑‍💼 Experience: {agent.years_of_experience} years</p>
      <p>💼 Deals: {agent.total_business_deals}</p>
      <p>🏆 Top Rank: {agent.rank_top_performing}</p>
      <video src={agent.introduction_video_url} controls />
    </div>
  )
}

export default AgentPage
