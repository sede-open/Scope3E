require('@testing-library/jest-dom/extend-expect');

require('whatwg-fetch');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

jest.setTimeout(15000); // 15s

process.env.AKAMAI_SECRET = 'TEST_AKAMAI_SECRET';
process.env.AKAMAI_CLIENT_ID = 'TEST_AKAMAI_CLIENT_ID';
process.env.AKAMAI_LOGIN_CALLBACK_URL = 'http://localhost:3000/some/callback';
process.env.AKAMAI_LOGIN_URL = 'http://some-akamai-url.com/login';
process.env.AKAMAI_TOKEN_API = 'http://some-akamai-endpoint.com/token';
process.env.API_HOST = 'http://some-graphql-endpoint.com';
process.env.AKAMAI_LOGOUT_API = 'http://some-akamai-endpoint.com/endsession';
process.env.AKAMAI_LOGOUT_CALLBACK_URL = 'http://localhost:3000';
process.env.AUTHURL_CLIENT_ID = 'AUTHURL_CLIENT_ID';
process.env.AUTHURL_CLIENT_SECRET = 'AUTHURL_CLIENT_SECRET';
process.env.AUTHURL_LOGIN_API = 'https://authurl.com/as/authorization.oauth2';
process.env.AUTHURL_TOKEN_API = 'https://authurl.com/as/token.oauth2';
process.env.AUTHURL_CALLBACK_URL = 'AUTHURL_CALLBACK_URL';

const MockResponsiveContainer = ({ children }) => children;

jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: MockResponsiveContainer,
}));
