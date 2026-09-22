import { Dashboard } from "checkly/constructs";

new Dashboard("kgapos-rpc-dashboard", {
  header: "kgapos RPC",
  description: "devnet, testnet, and mainnet JSON-RPC. Checked every 15 minutes.",
  customUrl: "kgapos-rpc",
  tags: ["kgapos-rpc"],
  hideTags: true,
  paginate: false,
  refreshRate: 60,
  customCSS: { entrypoint: "../custom.css" },
});
