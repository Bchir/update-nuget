"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfiguration = exports.getBool = void 0;
const core_1 = require("@actions/core");
const os_1 = require("os");
const getStrings = (paramName) => {
    const readValue = core_1.getInput(paramName, { required: false });
    if (readValue === null || readValue === undefined)
        return [];
    return readValue.split(os_1.EOL).map((x) => x.trim());
};
const getRequiredString = (paramName) => core_1.getInput(paramName, { required: true });
const getOptionalString = (paramName) => {
    const result = core_1.getInput(paramName, { required: false });
    if (result == null || result === undefined || result.length === 0)
        return undefined;
};
exports.getBool = (paramName) => {
    const value = getOptionalString(paramName);
    return value === "true";
};
exports.readConfiguration = () => {
    var _a;
    return {
        blackList: getStrings("blacklist"),
        includePrerelease: exports.getBool("includePrerelease"),
        directory: (_a = getOptionalString("directory")) !== null && _a !== void 0 ? _a : ".",
        searchFor: getRequiredString("searchFor"),
        targetFramework: getOptionalString("targetFramework"),
        source: getStrings("sources"),
        versionToSelect: getRequiredString("versionToSelect"),
    };
};
