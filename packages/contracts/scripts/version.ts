import fs from "fs"
import path from "path"

import pkg from "../package.json"

const { version } = pkg
const contents = `// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

abstract contract Version {
  function __mintdrop() external pure returns (string memory) {
    return "${version}";
  }
}`

fs.writeFileSync(__dirname + "/../contracts/gen/Version.sol", contents)
