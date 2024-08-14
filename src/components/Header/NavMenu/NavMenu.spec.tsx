import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { AuthenticatedUserContext } from 'context/AuthenticatedUserProvider/AuthenticatedUserContext';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import * as meMocks from 'mocks/me';
import { CompanyRelationshipType } from 'types/globalTypes';
import { NavMenu } from '.';
import { networkIconSvg, notificationIconSvg } from './selectors';

describe('NavMenu Component', () => {
  const setup = (mocks: any = []) => {
    return render(
      <AuthenticatedUserContext.Provider
        value={{
          ...meMocks.getGetMeMock().result.data.me,
        }}
      >
        <MockedProvider mocks={[meMocks.getGetMeMock(), ...mocks]}>
          <NavMenu
            firstName={meMocks.baseMe.firstName}
            lastName={meMocks.baseMe.lastName}
            isAdminPage={false}
          />
        </MockedProvider>
      </AuthenticatedUserContext.Provider>
    );
  };
  describe('When Network Page Flag Disabled', () => {
    beforeAll(() => {
      resetLDMocks();
      mockFlags({ isNetworkPageEnabled: false });
    });
    it('should not render the network icon', () => {
      const { queryByTestId } = setup();
      const icon = queryByTestId(networkIconSvg);
      expect(icon).toBeNull();
    });
  });
  describe('When Network Page Flag Enabled', () => {
    beforeAll(() => {
      resetLDMocks();
      mockFlags({ isNetworkPageEnabled: true });
    });
    it('should render the network icon', () => {
      const { queryByTestId } = setup();
      waitFor(() => {
        const icon = queryByTestId(networkIconSvg);
        expect(icon).not.toBeNull();
      });
    });

    describe('when has network notifications', () => {
      it('should render the notification icon', async () => {
        const relationships = companyRelationshipsMocks.getSupplierRelationships();

        const mock = companyRelationshipsMocks.getCompanyRelationshipsMock(
          CompanyRelationshipType.CUSTOMER,
          [...relationships]
        );

        const { findByTestId } = setup([mock]);
        const icon = await findByTestId(notificationIconSvg);
        expect(icon).not.toBeNull();
      });
    });

    describe('when does not have network notifications', () => {
      it('should not render notification icon when there is not any notifications', () => {
        const { queryByTestId } = setup();
        expect(queryByTestId(notificationIconSvg)).toBeNull();
      });
    });
  });
});
