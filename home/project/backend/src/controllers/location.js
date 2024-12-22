import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function updateLocation(req, res) {
  const { latitude, longitude } = req.body;
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('locations')
      .upsert({
        user_id: userId,
        latitude,
        longitude,
        timestamp: new Date().toISOString()
      });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getLocation(req, res) {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}