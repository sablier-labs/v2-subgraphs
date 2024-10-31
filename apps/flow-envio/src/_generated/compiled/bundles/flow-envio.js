"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = void 0;
var experimental = require("../addresses/experimental");
var definitions_1 = require("./definitions");
var available = function (v) {
    return v.flow.length > 0;
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
        [experimental, definitions_1.default.sepolia],
    ];
    /** Merging the arrays with a spread operator will break mustache's template engine */
    return list.map(function (_a) {
        var item = _a[0], definition = _a[1];
        var V10 = {
            flow: filter(item.flow, "V10"),
            available: false,
        };
        V10.available = available(V10);
        return {
            definition: definition,
            id: item.chainId,
            name: item.chain,
            start_block: item.startBlock_merkle,
            V10: V10,
        };
    }).filter(function (item) { return item.definition; });
};
exports.chains = chains;
