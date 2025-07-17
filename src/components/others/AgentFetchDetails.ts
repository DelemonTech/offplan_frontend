import { supabase } from '../../supabaseClient'
import { Agent } from '../../types/agent'

export const fetchAgentDetails = async (username: string): Promise<Agent | null> => {
  const { data, error } = await supabase
    .from('agent_details')
    .select(`
      name,
      username,
      email,
      whatsapp_number,
      phone_number,
      profile_image_url,
      introduction_video_url,
      description,
      years_of_experience,
      total_business_deals,
      rank_top_performing
    `)
    .eq('username', username)
    .maybeSingle() 

  if (error || !data) {
    console.error('Error fetching agent:', error)
    return null
  }

  return data as Agent
}
