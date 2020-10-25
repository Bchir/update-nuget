"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = void 0;
const path_1 = require("path");
const core_1 = require("@actions/core");
const fs_1 = require("fs");
exports.getAllProjects = (dir, result = []) => {
    const files = fs_1.readdirSync(dir);
    const regex = new RegExp(`\\.csproj$`);
    for (const fileName of files) {
        const file = path_1.join(dir, fileName);
        if (fs_1.statSync(file).isDirectory()) {
            try {
                result = exports.getAllProjects(file, result);
            }
            catch (error) {
                continue;
            }
        }
        else {
            if (regex.test(file)) {
                core_1.info(`project found : ${file}`);
                result.push(file);
            }
        }
    }
    return result;
};
