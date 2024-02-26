/*global chrome*/

import { DiscrubSetting } from "../enum/discrub-setting";
import { AppSettings } from "../features/app/app-types";

type ChromeCallback = (param: string) => Promise<void> | void | Maybe;

export const sendChromeMessage = (msg: string, callback?: ChromeCallback) => {
  chrome &&
    chrome.tabs &&
    chrome.tabs.query(
      { active: true, currentWindow: true },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (tabs: any) {
        if (callback) {
          chrome.tabs.sendMessage(tabs[0].id, { message: msg }, callback);
        } else {
          chrome.tabs.sendMessage(tabs[0].id, { message: msg });
        }
      }
    );
};

const defaultSettings = [
  { name: DiscrubSetting.REACTIONS_ENABLED, value: "true" },
];

export const initializeSettings = async () => {
  for (const setting of defaultSettings) {
    const foundSetting = await chrome.storage.local.get(setting.name);
    if (!Object.keys(foundSetting).length) {
      await chrome.storage.local.set({ [setting.name]: setting.value });
    }
  }
  return getSettings();
};

export const getSettings = async (): Promise<AppSettings> => {
  const chromeSettings = await chrome.storage.local.get(
    defaultSettings.map((setting) => setting.name)
  );

  return { reactionsEnabled: chromeSettings[DiscrubSetting.REACTIONS_ENABLED] };
};

export const setSetting = async (name: string, value: string) => {
  await chrome.storage.local.set({ [name]: value });
  return getSettings();
};
