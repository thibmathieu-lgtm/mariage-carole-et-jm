const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const tasks = await kv.get('tasks');
      return res.status(200).json(tasks || null);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  if (req.method === 'POST') {
    try {
      await kv.set('tasks', req.body);
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
};
