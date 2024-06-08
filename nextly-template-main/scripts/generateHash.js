const bcrypt = require('bcryptjs');

async function generateHash(password) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Generated hash:', hash);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash('adminCapos'); // Reemplaza 'admin123' con la contraseña real que quieres hashear
