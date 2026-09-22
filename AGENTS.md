# AGENTS.md

Personal Checkly monitoring-as-code for three public JSON-RPC nodes. No application code.

## Account

This repo deploys to the personal Hobby account `kgapos@outlook.com` (`2edbadef-38f3-4d9b-aa07-cd40b5f0b915`). Run `npx checkly whoami` before any Checkly API command and stop unless that account is current. The Plasma account is `6c269288-2379-4814-b62c-1771775edb91`.

Auth is `npx checkly login`, or `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID`. Do not commit either value.

## Commands

```bash
npm ci
npm run typecheck
npx checkly account plan --output json
npx checkly test
npx checkly deploy --preview
npx checkly deploy
```

`deploy` and other writes return exit code 2 until confirmed. Show the preview, including deletions, and wait for approval. Run the CLI `confirmCommand` as printed. Do not add `--force` yourself except in `.github/workflows/cd.yml`, which is non-interactive.

A deploy makes Checkly match this repo and deletes resources that are not in the code.

## Checks

`__checks__/rpc.check.ts` POSTs `eth_blockNumber` to:

- https://devnet.kgapos.com
- https://testnet.kgapos.com
- https://mainnet.kgapos.com

Pass means HTTP 200, non-empty `$.result`, and no `error` key. Shared defaults live in `checkly.config.ts`: every 15 minutes, locations `eu-west-2`, `us-east-1`, `ap-southeast-1`. Hobby has no automatic retries and no parallel scheduling. Confirm entitlements with `npx checkly account plan --output json` before changing frequency, locations, or retries.

`logicalId` is the Checkly identity. Renames go in `name`. Changing `logicalId` recreates the check and drops its history.

## Dashboard

`__checks__/dashboard.check.ts` is the one public dashboard at `https://kgapos-rpc.checkly-dashboards.com`. It selects the `kgapos-rpc` tag. Hobby allows one public dashboard: no private dashboards, incidents, or custom CSS.

## CI/CD

- `.github/workflows/ci.yml` — pull requests: `checkly deploy --preview`, then `checkly test`.
- `.github/workflows/cd.yml` — push to `main`: `checkly deploy --force`.

Both workflows run only when checks, Checkly config, package files, `tsconfig.json`, or the workflows themselves change. README, images, and other docs do not trigger a deploy.

Both jobs set `environment: production` so they can read the `CHECKLY_API_KEY` environment secret. `CHECKLY_ACCOUNT_ID` is a repository variable.

## Skill

Use the Checkly skill in `.claude/skills/checkly`. Run `npx checkly skills` for the current action list before answering Checkly questions, then `npx checkly skills <action>` for the reference you need.
