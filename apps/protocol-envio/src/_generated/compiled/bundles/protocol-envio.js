"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = void 0;
var arbitrum = require("../addresses/arbitrum");
var avalanche = require("../addresses/avalanche");
var base = require("../addresses/base");
var blast = require("../addresses/blast");
var bsc = require("../addresses/bsc");
var gnosis = require("../addresses/gnosis");
var mainnet = require("../addresses/mainnet");
var optimism = require("../addresses/optimism");
var polygon = require("../addresses/polygon");
var scroll = require("../addresses/scroll");
var sepolia = require("../addresses/sepolia");
var zksync = require("../addresses/zksync");
var available = function (v) {
    return v.linear.length + v.dynamic.length + v.tranched.length > 0;
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
        mainnet,
        optimism,
        polygon,
        scroll,
        sepolia,
        zksync,
    ];
    /** Merging the linear and dynamic arrays with a spread operator will break mustache's template engine */
    return list.map(function (item) {
        var _a;
        var V20 = {
            dynamic: filter(item.dynamic, "V20"),
            linear: filter(item.linear, "V20"),
            tranched: [],
            available: false,
        };
        V20.available = available(V20);
        var V21 = {
            dynamic: filter(item.dynamic, "V21"),
            linear: filter(item.linear, "V21"),
            tranched: [],
            available: false,
        };
        V21.available = available(V21);
        var V22 = {
            dynamic: filter(item.dynamic, "V22"),
            linear: filter(item.linear, "V22"),
            tranched: filter(item.tranched || [], "V22"),
            available: false,
        };
        V22.available = available(V22);
        return {
            id: item.chainId,
            name: item.chain,
            start_block: item.startBlock_protocol,
            registry: ((_a = item.registry) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "",
            V20: V20,
            V21: V21,
            V22: V22,
        };
    });
};
exports.chains = chains;
