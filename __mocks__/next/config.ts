// Used to mock out next/config's getConfig method
// You can spy on this in your test to override values
export default jest.fn(() => ({
  publicRuntimeConfig: {
    NODE_ENV: 'production',
    ENVIRONMENT: 'prod',
  },
}));
