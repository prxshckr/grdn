import { monorepoName } from "@repo/config";

export type GardenAppConfig = {
  appName: string;
  pageTitle: string;
};

export const createGardenAppConfig = (): GardenAppConfig => ({
  appName: "@repo/garden",
  pageTitle: `${monorepoName} - Garden`,
});
