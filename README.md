![Project banner](./.github/assets/project-banner.png)

# Checkly monitoring

Checkly monitors for three personal public JSON-RPC nodes.

| Check                | URL                        |
| -------------------- | -------------------------- |
| kgapos RPC (devnet)  | https://devnet.kgapos.com  |
| kgapos RPC (testnet) | https://testnet.kgapos.com |
| kgapos RPC (mainnet) | https://mainnet.kgapos.com |

Each check POSTs `eth_blockNumber` and expects HTTP 200, a non-empty `result`, and no JSON-RPC 
`error`. Checks run every 15 minutes from London, N. Virginia, and Singapore (round-robin).

The public dashboard is [status.kgapos.com](https://status.kgapos.com) ([kgapos-rpc.checkly-dashboards.com](https://kgapos-rpc.checkly-dashboards.com)). It shows the three checks tagged `kgapos-rpc`. Point a CNAME for `status.kgapos.com` at `checkly-dashboards.com`.

## Setup

```bash
npm ci
npx checkly login
npx checkly whoami
```

Use the personal Checkly account. `whoami` must not show the Plasma account.

## Commands

```bash
npm run typecheck
npx checkly test
npx checkly deploy --preview
npx checkly deploy
```

`deploy` makes the account match this repo. Resources that are not in the code are removed.

## GitHub

`CHECKLY_API_KEY` is a secret on the `production` environment. `CHECKLY_ACCOUNT_ID` is a repository 
variable. Both workflows select that environment:

- Pull requests that change checks, config, or the workflows run `.github/workflows/ci.yml`: deploy preview, then a remote test session.
- Pushes of those same paths to `main` run `.github/workflows/cd.yml`: `checkly deploy --force`.

README, images, and other docs do not run either workflow.
