import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-long-secret-key-replace-in-production';

const users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: '$2b$10$zxGggaYiiiJjMmu2UFWG8.kM8zXu7RmqK5U9gLOZrwXmshjYJWNYO',
    role: 'ADMIN'
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  try {
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
