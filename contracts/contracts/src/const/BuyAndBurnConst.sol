// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

uint256 constant INCENTIVE_FEE = 150;

address constant TITAN_X_ADDRESS = 0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1;
address constant DRAGON_X_ADDRESS = 0x96a5399D07896f757Bd4c6eF56461F58DB951862;

address constant GENESIS_WALLET = 0x2AE800Ea54342B4d78FeC83479157dd663b5C78E;

address constant DEAD_ADDR = 0x000000000000000000000000000000000000dEaD;

uint256 constant GENESIS_BPS = 800;
uint256 constant DRAGON_X_VAULT_BPS = 2000; // Amount of titanX that gets sent to the DragonX Vault
uint256 constant DRAGON_X_BURN_BPS = 2000; // Amount of dragonX that gets burned
uint256 constant BPS_DENOM = 10_000;

/// @dev 48 * 30 = 24 hours
uint256 constant INTERVALS_PER_DAY = 48;
uint32 constant INTERVAL_TIME = 30 minutes;

///@dev  The initial dragonX amount needed to create liquidity pool
uint256 constant INITIAL_TITAN_X_FOR_LIQ = 50_000_000_000e18;

///@dev The intial Morpheus that pairs with the dragonX received from the swap
uint256 constant INITIAL_LP_MINT = 50_000_000_000e18;

/* === UNIV3 === */
address constant UNISWAP_V3_ROUTER = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
address constant UNISWAP_V3_POSITION_MANAGER = 0xC36442b4a4522E871399CD717aBDD847Ab11FE88;
address constant UNISWAP_V3_DRAGON_X_TITAN_X_POOL = 0x25215d9ba4403b3DA77ce50606b54577a71b7895;

uint24 constant POOL_FEE = 10_000; //1%

int24 constant TICK_SPACING = 200; // Uniswap's tick spacing for 1% pools is 200

/* === UNIV2 === */
address constant UNISWAP_V2_FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
address constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
