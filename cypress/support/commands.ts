import '@testing-library/cypress/add-commands';
import '@iam4x/cypress-graphql-mock';

import schema from '../../schema.json';

const mockLogin = () => {
  cy.server();
  cy.mockGraphql({
    // @ts-ignore
    schema,
    endpoint: '/api/graphql',
    operations: {
      GetMe: {
        data: {
          me: {
            id: 'some-id-string',
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@abcd-test.test',
            authProvider: 'AKAMAI',
            canViewUsersAdminDashboard: true,
            canViewCompaniesAdminDashboard: true,
            canViewSupplyDashboard: true,
            canEditSupplyDashboard: true,
            role: {
              id: 'some-role-id',
              name: 'Some role',
            },
            company: {
              id: 'some-company-id',
              name: 'Some company',
            },
          },
        },
      },
    },
  });
};

Cypress.Commands.add('mockLogin', mockLogin);
