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
const configRead_1 = require("./configRead");
const getAllProjects_1 = require("./getAllProjects");
const core_1 = require("@actions/core");
const createPackageManifest_1 = require("./createPackageManifest");
const installPackage_1 = require("./installPackage");
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    const args = configRead_1.readConfiguration();
    core_1.info(`Finding projects under ${args.directory}`);
    const projects = getAllProjects_1.getAllProjects(args.directory);
    const packageManifest = yield createPackageManifest_1.createPackageManifest(projects, args);
    core_1.info(`manifest : ${JSON.stringify(packageManifest, null, "\t")}`);
    let continueInstall = false;
    while (continueInstall) {
        continueInstall = false;
        for (const manif of packageManifest) {
            const successfullProjects = [];
            for (const proj of manif.projects) {
                const isSuccess = yield installPackage_1.InstallPackage(manif.nuget, proj);
                if (isSuccess) {
                    successfullProjects.push(proj);
                    continueInstall = true;
                }
            }
            manif.projects = manif.projects.filter(x => !successfullProjects.some(a => a === x));
        }
    }
});
execute();
