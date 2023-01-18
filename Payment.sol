// SPDX-License-Identifier: GPL-3.0
// Deployed on Polygon's testnet (Mumbai) at address 0xe0C78f4d638c2B70b7aF73E6ee7b8dDf445D2F98
// https://mumbai.polygonscan.com/address/0xe0C78f4d638c2B70b7aF73E6ee7b8dDf445D2F98#code
pragma solidity ^0.8.14;

contract Payment {
    address payable recipier =
        payable(0x9A345418eA691a5736735d05AE099fd5C6DC35cB);

    function sendToken() external payable {
        (bool success, ) = recipier.call{value: msg.value}("");
        require(success, "Failed to send token");
    }
}
