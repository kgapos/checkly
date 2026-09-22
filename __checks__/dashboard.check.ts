import { Dashboard } from "checkly/constructs";

new Dashboard("kgapos-rpc-dashboard", {
  header: "kgapos RPC",
  description: "devnet, testnet, and mainnet JSON-RPC. Checked every 15 minutes.",
  customUrl: "kgapos-rpc",
  customDomain: "status.kgapos.com",
  tags: ["kgapos-rpc"],
  hideTags: true,
  paginate: false,
  refreshRate: 60,
});
