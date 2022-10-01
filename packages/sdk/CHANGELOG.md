# @mintdrop/sdk

## 0.5.6

### Patch Changes

- Support both accessLists() and groups()
- Updated dependencies
  - @mintdrop/contracts@0.5.6

## 0.5.5

### Patch Changes

- Support both accessLists() and groups()
- Updated dependencies
  - @mintdrop/contracts@0.5.5

## 0.5.4

### Patch Changes

- Switch etherscan helpers to number, will throw error instead
- Updated dependencies
  - @mintdrop/contracts@0.5.4

## 0.5.3

### Patch Changes

- Conditional checks on startTime and endTime
- Updated dependencies
  - @mintdrop/contracts@0.5.3

## 0.5.2

### Patch Changes

- remove hardhat/console.sol
- Updated dependencies
  - @mintdrop/contracts@0.5.2

## 0.5.1

### Patch Changes

- Patch for missing files from package
- Updated dependencies
  - @mintdrop/contracts@0.5.1

## 0.5.0

### Minor Changes

- Contracts refactor - Modular system around extensions (access lists, public minting, payouts, royalties)

### Patch Changes

- Updated dependencies
  - @mintdrop/contracts@0.5.0

## 0.4.6

### Patch Changes

- Fix 0 !== undefined check, allow 0 mint price"
- Updated dependencies
  - @mintdrop/contracts@0.4.6

## 0.4.5

### Patch Changes

- Switch to BIPS for payouts
- Updated dependencies
  - @mintdrop/contracts@0.4.5

## 0.4.4

### Patch Changes

- useProvider needs to take a chainId
- Updated dependencies
  - @mintdrop/contracts@0.4.4

## 0.4.3

### Patch Changes

- by default we need to useProvider for non-authenticated scenarios
- Updated dependencies
  - @mintdrop/contracts@0.4.3

## 0.4.2

### Patch Changes

- bugfix useContract to not set contract when no provider or signer
- Updated dependencies
  - @mintdrop/contracts@0.4.2

## 0.4.1

### Patch Changes

- Bug fix for non-existent signature
- Updated dependencies
  - @mintdrop/contracts@0.4.1

## 0.4.0

### Minor Changes

- 0.4 - Upgrades to deployer, adds payment splitting + withdrawls

### Patch Changes

- Updated dependencies
  - @mintdrop/contracts@0.4.0

## 0.3.16

### Patch Changes

- re-init the contract anytime provider, signer, or drop changes
- Updated dependencies
  - @mintdrop/contracts@0.3.16

## 0.3.15

### Patch Changes

- Fix last of null check issues
- Updated dependencies
  - @mintdrop/contracts@0.3.15

## 0.3.14

### Patch Changes

- Fix yet another small bug
- Updated dependencies
  - @mintdrop/contracts@0.3.14

## 0.3.13

### Patch Changes

- Enable sourcemaps for vite build
- Updated dependencies
  - @mintdrop/contracts@0.3.13

## 0.3.12

### Patch Changes

- Fix conditional drop id
- Updated dependencies
  - @mintdrop/contracts@0.3.12

## 0.3.11

### Patch Changes

- Bugfix for contract not getting reinitialized
- Updated dependencies
  - @mintdrop/contracts@0.3.11

## 0.3.10

### Patch Changes

- Hotfix useContract null error, rebuild with vite + no esm
- Updated dependencies
  - @mintdrop/contracts@0.3.10

## 0.3.9

### Patch Changes

- Fixes useContract to be abi/address null-safe
- Updated dependencies
  - @mintdrop/contracts@0.3.9

## 0.3.8

### Patch Changes

- Adding missing goerli helper url for etherscan
- Updated dependencies
  - @mintdrop/contracts@0.3.8

## 0.3.7

### Patch Changes

- Adding BIPs helpers
- Updated dependencies
  - @mintdrop/contracts@0.3.7

## 0.3.6

### Patch Changes

- Catch on canMint functions to set val to false
- Updated dependencies
  - @mintdrop/contracts@0.3.6

## 0.3.5

### Patch Changes

- Move deployer here
  Adding deployer functions
- Updated dependencies
  - @mintdrop/contracts@0.3.5

## 0.3.4

### Patch Changes

- Bug fixes on api host, exports, etc
- Updated dependencies
  - @mintdrop/sdk@0.3.4

## 0.3.3

### Patch Changes

- fix duration issue, emit declaration
- Updated dependencies
  - @mintdrop/sdk@0.3.3

## 0.3.2

### Patch Changes

- Fixing drop destructure bug
- Updated dependencies
  - @mintdrop/sdk@0.3.2

## 0.3.1

### Patch Changes

- Adding mintdropHOC
- Updated dependencies
  - @mintdrop/sdk@0.3.1

## 0.3.0

### Minor Changes

- Overhaul the SDK hooks package

## 0.2.5

### Patch Changes

- Adding canSignatureMint, canPublicMint functions. Fixing usePrices hook

## 0.2.4

### Patch Changes

- Fixed exports on widget

## 0.2.3

### Patch Changes

- Switching estimation over to live

## 0.2.2

### Patch Changes

- Changes to signature addGroup function]

## 0.2.1

### Patch Changes

- Fix default exports on useEstimation and usePrices

## 0.2.0

### Minor Changes

- Access Pass w/ Public Minting + Access Lists
