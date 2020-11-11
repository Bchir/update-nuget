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
exports.listProjectPackages = void 0;
const argumentTypes_1 = require("./argumentTypes");
const exec_1 = require("@actions/exec");
const parseCommandResult_1 = require("./parseCommandResult");
const buildCommand = (args, project) => {
    return (`dotnet list ${project} package --${args.searchFor} ` +
        (args.versionToSelect !== argumentTypes_1.versionToSelect.latest ? `--${args} ` : "") +
        (args.targetFramework !== undefined
            ? `--framework ${args.targetFramework} `
            : "") +
        (args.includePrerelease ? "--include-prerelease " : " ") +
        args.source.map((src) => `--source ${src}`).join(" "));
};
exports.listProjectPackages = (args, project) => __awaiter(void 0, void 0, void 0, function* () {
    let cmdResult = "";
    const execOption = {
        listeners: {
            stdout: (data) => {
                cmdResult += data.toString();
            },
        },
    };
    yield exec_1.exec(buildCommand(args, project), [], execOption);
    return parseCommandResult_1.parseCommandResult(cmdResult)
        .filter(x => !args.ignore.some(i => i === x.name));
});
