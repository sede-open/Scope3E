import { CorporateEmissionType } from 'types/globalTypes';
import { HUBSPOT_WHITELIST } from '../constants';
import {
  SUPPLIER_LOGIN_EVENT,
  BASELINE_SUCCESS_MODAL_DISMISSED,
  EMISSION_FORM_OPENED_EVENT,
  TARGET_FORM_DISMISSED,
  EMISSION_CREATED_EVENT,
  HEADER_NAVIGATION_EVENT,
  REGISTER_EVENT,
  FOOTER_CONTACT_US_EVENT,
  FOOTER_SETH_MAIL_TO_EVENT,
  FOOTER_NAVIGATION_EVENT,
  FOOTER_TERMS_EVENT,
  FOOTER_LEGAL_DISCLAIMER_EVENT,
  HOME_PAGE_GET_IN_TOUCH_EVENT_START,
  HOME_PAGE_FIND_OUT_MORE_EVENT,
  SOLUTIONS_SELECTED_EVENT,
  BURGER_MENU_GET_IN_TOUCH_EVENT,
  HOME_VISIT_example_BUTTON,
  FOOTER_CARD_BTN_EVENT,
  GET_IN_TOUCH_FORM_SUBMIT,
  PAGE_NOT_FOUND_BTN,
  TARGET_FORM_SUBMIT,
  BAR_CHART_SELECT,
  COMPOSED_CHART_SELECT,
  PRIVATE_SOLUTIONS_SELECTED_EVENT,
  FOOTER_ACCEPTABLE_USE_EVENT,
  EDIT_SOLUTION_INTERESTS_SUBMITTED,
  HANDLE_INVITATION_FORM_SUBMISSION,
} from './analyticsEvents';
import { trackUser, trackPage, trackEvent } from './analytics';
import { isEnvironmentProd } from './featureFlags';

jest.mock('./featureFlags', () => {
  const actual = jest.requireActual('./featureFlags');
  return {
    ...actual,
    isEnvironmentProd: jest.fn(() => true),
  };
});

describe('analytics', () => {
  let windowSpy: jest.SpyInstance;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  describe('trackUser()', () => {
    it('should identify the user with the right traits', () => {
      const anonymousId = 'some_anonymous_id';
      const userId = 'some_id';
      const traits = {
        companyId: 'company_id',
        primarySector: 'some sector',
        companyName: 'some company',
        url: '/dashboard',
        email: 'test@example.com',
        emailAddress: 'test@example.com',
      };
      const identify = jest.fn();
      windowSpy.mockImplementation(() => ({
        analytics: {
          user: () => ({
            anonymousId: () => anonymousId,
          }),
          identify,
        },
      }));

      trackUser(userId, traits);
      expect(identify).toHaveBeenCalledWith(userId, traits, { anonymousId });
    });
    it("should remove 'traits.email' if the value is not whitelisted", () => {
      (isEnvironmentProd as jest.Mock).mockImplementationOnce(() => false);
      const anonymousId = 'some_anonymous_id';
      const userId = 'some_id';
      const traits = {
        companyId: 'company_id',
        primarySector: 'some sector',
        companyName: 'some company',
        url: '/dashboard',
        email: 'test@test.com',
        emailAddress: 'test@test.com',
      };
      const identify = jest.fn();
      windowSpy.mockImplementation(() => ({
        analytics: {
          user: () => ({
            anonymousId: () => anonymousId,
          }),
          identify,
        },
      }));

      expect(HUBSPOT_WHITELIST.includes(traits.email)).toBe(false);

      trackUser(userId, traits);

      const traitsToBeCalled: Partial<typeof traits> = { ...traits };
      delete traitsToBeCalled.email;
      expect(identify).toHaveBeenCalledWith(userId, traitsToBeCalled, {
        anonymousId,
      });
    });
    it("shouldn't remove 'traits.email' if the value is whitelisted", () => {
      (isEnvironmentProd as jest.Mock).mockImplementationOnce(() => false);
      const anonymousId = 'some_anonymous_id';
      const userId = 'some_id';
      const traits = {
        companyId: 'company_id',
        primarySector: 'some sector',
        companyName: 'some company',
        url: '/dashboard',
        email: HUBSPOT_WHITELIST[0],
        emailAddress: HUBSPOT_WHITELIST[0],
      };
      const identify = jest.fn();
      windowSpy.mockImplementation(() => ({
        analytics: {
          user: () => ({
            anonymousId: () => anonymousId,
          }),
          identify,
        },
      }));

      expect(HUBSPOT_WHITELIST.includes(traits.email)).toBe(true);

      trackUser(userId, traits);
      expect(identify).toHaveBeenCalledWith(userId, traits, { anonymousId });
    });
  });

  describe('trackPage()', () => {
    it('should track page url', () => {
      const url = '/dashboard';
      const page = jest.fn();
      windowSpy.mockImplementation(() => ({
        analytics: {
          page,
        },
      }));

      trackPage(url);
      expect(page).toHaveBeenCalledWith(url);
    });
  });

  describe('trackEvent()', () => {
    it('should track event with meta data', () => {
      const event = SUPPLIER_LOGIN_EVENT;
      const meta = {
        scope1: 122,
        scope2: 235,
        someText: 'hello world',
      };
      const track = jest.fn();
      windowSpy.mockImplementation(() => ({
        analytics: {
          track,
        },
      }));

      trackEvent(event, meta);
      expect(track).toHaveBeenCalledWith(event, meta);
    });
  });

  it('should track selected solutions with meta data', () => {
    const event = SOLUTIONS_SELECTED_EVENT;
    const meta = {
      solutionId: 'one',
      solutionTitle:
        'DHL Express uses example’s sustainable aviation fuel at the Schiphol Airport in Amsterdam',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track when emission is created with meta data', () => {
    const event = EMISSION_FORM_OPENED_EVENT;
    const meta = {
      companyId: '12',
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track when the I will do later button is clicked with meta data', () => {
    const event = BASELINE_SUCCESS_MODAL_DISMISSED;
    const meta = {
      companyId: '12',
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track when the target form is dismissed with meta data', () => {
    const event = TARGET_FORM_DISMISSED;
    const meta = {
      companyId: '12',
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track emission created and saved with meta data', () => {
    const event = EMISSION_CREATED_EVENT;
    const meta = {
      year: 2019,
      scope3: 'undefined',
      offset: 'undefined',
      headCount: 'undefined',
      exampleShare: 'undefined',
      emissionType: CorporateEmissionType.ACTUAL,
      companyId: '12',
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked register btn with meta data', () => {
    const event = REGISTER_EVENT;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked header navigtation btn with meta data', () => {
    const event = HEADER_NAVIGATION_EVENT;
    const meta = {
      btnId: 'testHeaderBtn',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked footer navigtation btn with meta data', () => {
    const event = FOOTER_NAVIGATION_EVENT;
    const meta = {
      btnId: 'testFooterBtn',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked footer contact us btn with meta data', () => {
    const event = FOOTER_CONTACT_US_EVENT;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked footer seth mail to btn with meta data', () => {
    const event = FOOTER_SETH_MAIL_TO_EVENT;
    const meta = {
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked footer terms and conditions btn with meta data', () => {
    const event = FOOTER_TERMS_EVENT;
    const meta = {
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked footer legal disclaimer btn with meta data', () => {
    const event = FOOTER_LEGAL_DISCLAIMER_EVENT;
    const meta = {
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked footer acceptable use btn with meta data', () => {
    const event = FOOTER_ACCEPTABLE_USE_EVENT;
    const meta = {
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked homepage content get in touch btn with meta data', () => {
    const event = HOME_PAGE_GET_IN_TOUCH_EVENT_START;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked homepage content find out more btn with meta data', () => {
    const event = HOME_PAGE_FIND_OUT_MORE_EVENT;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked burger menu get in touch btn', () => {
    const event = BURGER_MENU_GET_IN_TOUCH_EVENT;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked home visit example touch btn', () => {
    const event = HOME_VISIT_example_BUTTON;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked footer card get in touch btn', () => {
    const event = FOOTER_CARD_BTN_EVENT;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked get in touch form submit btn', () => {
    const event = GET_IN_TOUCH_FORM_SUBMIT;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track clicked 404 page home navigation btn', () => {
    const event = PAGE_NOT_FOUND_BTN;
    const meta = {
      undefined,
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track target ambition form submit btn', () => {
    const event = TARGET_FORM_SUBMIT;
    const meta = {
      companyId: '12',
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track bar chart selected btn on emissions overview', () => {
    const event = BAR_CHART_SELECT;
    const meta = { companyName: 'AECOM' };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track composed chart selected btn on emissions overview', () => {
    const event = COMPOSED_CHART_SELECT;
    const meta = {
      companyName: 'AECOM',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track selected private solution with meta data', () => {
    const event = PRIVATE_SOLUTIONS_SELECTED_EVENT;
    const meta = {
      title: 'solution-title-test',
      company: 'some-id',
      sector: 'some-sector',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track edited areas of interest with meta data', () => {
    const event = EDIT_SOLUTION_INTERESTS_SUBMITTED;
    const meta = {
      companyName: 'some-company',
      companyId: 'some-id',
      solutionInterests: 'some-interest',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });

  it('should track handle invitation form submission with meta data', () => {
    const event = HANDLE_INVITATION_FORM_SUBMISSION;
    const meta = {
      companyId: 'some-id',
      reason: 'some-reason',
    };
    const track = jest.fn();
    windowSpy.mockImplementation(() => ({
      analytics: {
        track,
      },
    }));

    trackEvent(event, meta);
    expect(track).toHaveBeenCalledWith(event, meta);
  });
});
