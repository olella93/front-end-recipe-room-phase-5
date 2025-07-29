// Test script to verify backend connectivity
import API from '../services/api';

const testBackendConnection = async () => {
  console.log('Testing backend connection...');
  console.log('Base URL:', API.defaults.baseURL);

  try {
    // Test 1: Try to register a test user
    console.log('\n1. Testing user registration...');
    const testUser = {
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'password123'
    };

    const registerResponse = await API.post('/auth/register', testUser);
    console.log('✅ Registration successful:', registerResponse.data);

    // Test 2: Try to login with the created user
    console.log('\n2. Testing user login...');
    const loginResponse = await API.post('/auth/login', {
      username: testUser.username,
      password: testUser.password
    });
    console.log('✅ Login successful:', loginResponse.data);

    // Test 3: Try to access a protected route
    console.log('\n3. Testing protected route access...');
    const token = loginResponse.data.token;
    const protectedResponse = await API.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Protected route access successful:', protectedResponse.data);

    console.log('\n🎉 All backend connection tests passed!');
    return true;

  } catch (error) {
    console.error('❌ Backend connection test failed:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    return false;
  }
};

// Export for use in React components or run directly
export default testBackendConnection;

// If running this script directly (for testing purposes)
if (typeof window !== 'undefined') {
  window.testBackendConnection = testBackendConnection;
}
