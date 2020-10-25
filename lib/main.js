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
const exec_1 = require("@actions/exec");
const argumentTypes_1 = require("./argumentTypes");
const configRead_1 = require("./configRead");
const getAllProjects_1 = require("./getAllProjects");
const parseCommandResult_1 = require("./parseCommandResult");
const core_1 = require("@actions/core");
const buildCommand = (args, project) => {
    return (`dotnet list ${project} package --${args.searchFor} ` +
        (args.versionToSelect !== argumentTypes_1.versionToSelect.latest ? `--${args} ` : "") +
        (args.targetFramework !== undefined
            ? `--framework ${args.targetFramework} `
            : "") +
        (args.includePrerelease ? "--include-prerelease " : " ") +
        args.source.map((src) => `--source ${src}`).join(" "));
};
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    const args = configRead_1.readConfiguration();
    core_1.info(`Finding projects under ${args.directory}`);
    const projects = getAllProjects_1.getAllProjects(args.directory);
    for (const project of projects) {
        let cmdResult = "";
        const execOption = {
            listeners: {
                stdout: (data) => {
                    cmdResult += data.toString();
                },
            },
        };
        yield exec_1.exec(buildCommand(args, project), [], execOption);
        const packages = parseCommandResult_1.parseCommandResult(cmdResult);
        for (const nPackage of packages) {
            if (args.ignore.some((x) => x === nPackage.name)) {
                core_1.info(`${nPackage.name} ignored`);
                continue;
            }
            core_1.info(`ìnstalling ${nPackage.name} with version ${nPackage.latestVersion} `);
            try {
                yield exec_1.exec(`dotnet add ${project} package ${nPackage.name} -v ${nPackage.latestVersion}`);
            }
            catch (error) {
                continue;
            }
        }
    }
});
execute();
