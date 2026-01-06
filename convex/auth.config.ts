import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://vocal-mammal-83.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;