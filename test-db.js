const supabase = require('./config/database');

console.log('Testing database connection...');

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Database error:', error);
    } else {
      console.log('Connection successful:', data);
    }
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}

testConnection();
