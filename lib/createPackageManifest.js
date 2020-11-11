"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackageManifest = void 0;
const listProjectPackage_1 = require("./listProjectPackage");
exports.createPackageManifest = (projects, args) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    for (const project of projects) {
        const packages = yield listProjectPackage_1.listProjectPackages(args, project);
        for (const pack of packages) {
            if (result.some(x => x.nuget.name === pack.name)) {
                const index = result.findIndex(x => x.nuget.name === pack.name);
                result[index].projects.push(project);
            }
            else {
                result.push({
                    nuget: pack,
                    projects: [project]
                });
            }
        }
    }
    return result;
});
