"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = void 0;
var arbitrum = require("../addresses/arbitrum");
var avalanche = require("../addresses/avalanche");
var base = require("../addresses/base");
var blast = require("../addresses/blast");
var bsc = require("../addresses/bsc");
var gnosis = require("../addresses/gnosis");
var linea = require("../addresses/linea");
var mainnet = require("../addresses/mainnet");
var mode = require("../addresses/mode");
var morph = require("../addresses/morph");
var optimism = require("../addresses/optimism");
var polygon = require("../addresses/polygon");
var scroll = require("../addresses/scroll");
var sepolia = require("../addresses/sepolia");
// import * as tangle from "../addresses/tangle";
var zksync = require("../addresses/zksync");
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
        arbitrum,
        avalanche,
        base,
        blast,
        bsc,
        gnosis,
        linea,
        mainnet,
        mode,
        morph,
        optimism,
        polygon,
        scroll,
        sepolia,
        // tangle,
        zksync,
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
            hypersync: "hypersync" in item ? item.hypersync : undefined,
            V21: V21,
            V22: V22,
        };
    });
};
exports.chains = chains;
