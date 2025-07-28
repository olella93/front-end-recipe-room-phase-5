// Basic test to ensure Jest can run
describe('App Component', () => {
  test('should pass basic test', () => {
    expect(true).toBe(true);
  });

  test('should handle environment variables', () => {
    // Test that our environment setup works
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    expect(typeof apiUrl).toBe('string');
  });
});
