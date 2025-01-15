"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = void 0;
// import * as arbitrum from "../addresses/arbitrum";
// import * as avalanche from "../addresses/avalanche";
// import * as base from "../addresses/base";
// import * as baseSepolia from "../addresses/base-sepolia";
// import * as blast from "../addresses/blast";
// import * as bsc from "../addresses/bsc";
// import * as gnosis from "../addresses/gnosis";
// import * as linea from "../addresses/linea";
// import * as mainnet from "../addresses/mainnet";
// import * as mode from "../addresses/mode";
// import * as morph from "../addresses/morph";
// import * as optimism from "../addresses/optimism";
// import * as polygon from "../addresses/polygon";
// import * as scroll from "../addresses/scroll";
// import * as sepolia from "../addresses/sepolia";
// import * as superseed from "../addresses/superseed";
// import * as tangle from "../addresses/tangle";
// import * as zksync from "../addresses/zksync";
var definitions_1 = require("./definitions");
var experimental = require("../addresses/experimental");
var available = function (v) {
    return v.linear.length + v.dynamic.length + v.tranched.length + v.merged.length > 0;
};
var filter = function (list, version) {
    return (list
        .filter(function (entry) { return entry[2] === version; })
        .map(function (entry) {
        var _a;
        return ({
            address: ((_a = entry[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "",
            alias: entry[1],
            version: entry[2],
        });
    }) || []);
};
/**
 * Bind a viem chain definition to a sablier indexer configuration.
 * ↪ 🚨 Chains without valid viem definitions will not be taken into account.
 */
var chains = function () {
    var list = [
        // [arbitrum, definitions.arbitrum],
        // [avalanche, definitions.avalanche],
        // [base, definitions.base],
        // [baseSepolia, definitions.baseSepolia],
        // [blast, definitions.blast],
        // [bsc, definitions.bsc],
        // [gnosis, definitions.gnosis],
        // [linea, definitions.linea],
        // [mainnet, definitions.mainnet],
        // [mode, definitions.mode],
        // [morph, definitions.morph],
        // [optimism, definitions.optimism],
        // [polygon, definitions.polygon],
        // [scroll, definitions.scroll],
        // [sepolia, definitions.sepolia],
        // [superseed, definitions.superseed],
        // [tangle, definitions.tangle],
        // [zksync, definitions.zksync],
        [experimental, definitions_1.default.sepolia]
    ];
    /** Merging the arrays with a spread operator will break mustache's template engine */
    return list
        .map(function (_a) {
        var _b;
        var item = _a[0], definition = _a[1];
        var V20 = {
            dynamic: filter(item.dynamic, "V20"),
            linear: filter(item.linear, "V20"),
            tranched: [],
            merged: [],
            available: false,
        };
        V20.available = available(V20);
        var V21 = {
            dynamic: filter(item.dynamic, "V21"),
            linear: filter(item.linear, "V21"),
            tranched: [],
            merged: [],
            available: false,
        };
        V21.available = available(V21);
        var V22 = {
            dynamic: filter(item.dynamic, "V22"),
            linear: filter(item.linear, "V22"),
            tranched: filter(item.tranched || [], "V22"),
            merged: [],
            available: false,
        };
        V22.available = available(V22);
        var V23 = {
            dynamic: [],
            linear: [],
            tranched: [],
            merged: filter(item.merged, "V23"),
            available: false,
        };
        V23.available = available(V23);
        return {
            definition: definition,
            id: item.chainId,
            name: item.chain,
            start_block: item.startBlock_lockup,
            hypersync: "hypersync" in item ? item.hypersync : undefined,
            rpcsync: "rpcsync" in item ? item.rpcsync : undefined,
            registry: ((_b = item.registry) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "",
            V20: V20,
            V21: V21,
            V22: V22,
            V23: V23
        };
    })
        .filter(function (item) { return item.definition; });
};
exports.chains = chains;
