import { defineConfig } from "checkly";
import { Frequency } from "checkly/constructs";

// Hobby plan: 6 public locations, at most 3 per check, round-robin only.
// 15 minutes keeps 3 checks inside the 10,000 API runs/month included on Hobby.
export default defineConfig({
  projectName: "kgapos RPC",
  logicalId: "kgapos-rpc",
  repoUrl: "https://github.com/kgapos/checkly",
  checks: {
    activated: true,
    muted: false,
    frequency: Frequency.EVERY_15M,
    locations: ["eu-west-2", "us-east-1", "ap-southeast-1"],
    checkMatch: "**/__checks__/**/*.check.ts",
    ignoreDirectoriesMatch: ["node_modules/**", "dist/**"],
  },
  cli: {
    runLocation: "eu-west-2",
  },
});
