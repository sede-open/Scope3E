export type DestinationType = {
  category: string;
  name: string;
  description: string;
  website: string;
  id: string;
};

export type CategoryMapType = {
  [key: string]: DestinationType[];
};

export type CategoryStateType = {
  [key: string]: boolean;
};

export type TrackingPreferencesCookie = {
  version: number;
  destinations: {
    Amplitude?: boolean;
    HubSpot?: boolean;
    Zendesk?: boolean;
  };
};
