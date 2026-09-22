import { ApiCheck, AssertionBuilder, RetryStrategyBuilder } from "checkly/constructs";

const blockNumberRequest = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_blockNumber",
  params: [],
  id: 1,
});

const targets = [
  {
    logicalId: "kgapos-rpc-devnet",
    name: "kgapos RPC (devnet)",
    url: "https://devnet.kgapos.com",
  },
  {
    logicalId: "kgapos-rpc-testnet",
    name: "kgapos RPC (testnet)",
    url: "https://testnet.kgapos.com",
  },
  {
    logicalId: "kgapos-rpc-mainnet",
    name: "kgapos RPC (mainnet)",
    url: "https://mainnet.kgapos.com",
  },
];

for (const target of targets) {
  new ApiCheck(target.logicalId, {
    name: target.name,
    tags: ["kgapos-rpc"],
    // Hobby does not include automatic retries.
    retryStrategy: RetryStrategyBuilder.noRetries(),
    request: {
      method: "POST",
      url: target.url,
      followRedirects: false,
      headers: [{ key: "Content-Type", value: "application/json" }],
      body: blockNumberRequest,
      bodyType: "JSON",
      assertions: [
        AssertionBuilder.statusCode().equals(200),
        AssertionBuilder.jsonBody("$.result").notEmpty(),
        AssertionBuilder.jsonBody("$").notHasKey("error"),
      ],
    },
  });
}
