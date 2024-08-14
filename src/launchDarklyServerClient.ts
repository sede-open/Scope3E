/*
 * The LaunchDarkly client should only be instantiated once.
 *
 * This file takes advantage of node's module caching (singleton), which means that each
 * time this module is imported it will reference the same object in memory.
 *
 * Any changes to this module should take consideration of this
 */
import LaunchDarkly from 'launchdarkly-node-server-sdk';

let launchDarklyClient: LaunchDarkly.LDClient;

const initialize = async () => {
  const client = LaunchDarkly.init(
    process.env.LAUNCH_DARKLY_SERVER_SDK_KEY || ''
  );
  await client.waitForInitialization();
  launchDarklyClient = client;
};

export const getClient = async (): Promise<LaunchDarkly.LDClient> => {
  if (!launchDarklyClient) {
    await initialize();
  }
  return launchDarklyClient;
};
