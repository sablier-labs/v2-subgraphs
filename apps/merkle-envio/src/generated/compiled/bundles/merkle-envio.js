"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = void 0;
var sepolia = require("../addresses/sepolia");
var available = function (v) {
    return v.factory.length > 0;
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
var chains = function () {
    var list = [
        // arbitrum,
        // avalanche,
        // base,
        // blast,
        // bsc,
        // gnosis,
        // linea,
        // mainnet,
        // optimism,
        // polygon,
        // scroll,
        sepolia,
        // zksync,
    ];
    /** Merging the linear and dynamic arrays with a spread operator will break mustache's template engine */
    return list.map(function (item) {
        var V21 = {
            factory: filter(item.factory, "V21"),
            available: false,
        };
        V21.available = available(V21);
        var V22 = {
            factory: filter(item.factory, "V22"),
            available: false,
        };
        V22.available = available(V22);
        return {
            id: item.chainId,
            name: item.chain,
            start_block: item.startBlock_merkle,
            V21: V21,
            V22: V22,
        };
    });
};
exports.chains = chains;
