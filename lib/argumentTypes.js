"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionToSelect = exports.searchFor = void 0;
var searchFor;
(function (searchFor) {
    searchFor["deprecated"] = "deprecated";
    searchFor["outdated"] = "outdated";
})(searchFor = exports.searchFor || (exports.searchFor = {}));
var versionToSelect;
(function (versionToSelect) {
    versionToSelect["highestMinor"] = "highest-minor";
    versionToSelect["highestPatch"] = "highest-patch";
    versionToSelect["latest"] = "latest";
})(versionToSelect = exports.versionToSelect || (exports.versionToSelect = {}));
