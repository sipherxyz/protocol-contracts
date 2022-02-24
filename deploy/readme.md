## Sipher full migration

- to enable migration for legacy contracts set property

  - `deploy_legacy: true`

  - for exchangev1 set:

    ```
    beneficiary: "",
    buyerFeeSigner: "",
    ```

  - for Sipher legacy token set
    ```
    "Sipher_token_legacy": {
        name: "Sipher",
        symbol: "SIPHER",
        signer: "0x002ed05478c75974e08f0811517aa0e3eddc1380",
        contractURI: "https://api-e2e.Sipher.com/contractMetadata/{address}",
        tokenURIPrefix: "ipfs://",
    },
    ```
  - for mintable legacy token set
    ` "mintable_token_legacy": { name: "Sipher", symbol: "SIPHER", newOwner: "0x002ed05478c75974e08f0811517aa0e3eddc1380", contractURI: "https://api-e2e.Sipher.com/contractMetadata/{address}", tokenURIPrefix: "ipfs://", }, `
    for the desired network's settings in [config.js](./migrations/config.js)

## Deploy instruction

    - To run deploy script: ```yarn hardhat deploy --network <network_name>```
    - Deploy result will be exported in ```deployments``` folder except for ```hardhat``` network

## Verify 
    - yarn hardhat --network <network_name> etherscan-verify
