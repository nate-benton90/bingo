import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'db',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

export const saveMessage = async (sender: string, content: string) => {
  const query = 'INSERT INTO messages (sender, content) VALUES ($1, $2)';
  await pool.query(query, [sender, content]);
};

export const getMessages = async () => {
  const query = 'SELECT * FROM messages ORDER BY timestamp ASC';
  const result = await pool.query(query);
  return result.rows;
};


export default pool;
