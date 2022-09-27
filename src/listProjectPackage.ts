import { nugetPackage } from './parseCommandResult';
import { argument, versionToSelect } from "./argumentTypes";
import { exec } from "@actions/exec";
import { parseCommandResult } from "./parseCommandResult";

const buildCommand = (args: argument, project: string) => {
    return (
        `dotnet list ${project} package --${args.searchFor} ` +
        (args.versionToSelect !== versionToSelect.latest ? `--${args.versionToSelect} ` : "") +
        (args.targetFramework !== undefined
            ? `--framework ${args.targetFramework} `
            : "") +
        (args.includePrerelease ? "--include-prerelease " : " ") +
        args.source.map((src) => `--source ${src}`).join(" ")
    );
};

export const listProjectPackages = async (args: argument, project: string) : Promise<nugetPackage[]> => {
    let cmdResult = "";
        const execOption = {
            listeners: {
                stdout: (data: Buffer) => {
                    cmdResult += data.toString();
                },
            },
        };
        await exec(buildCommand(args, project), [], execOption);

        return parseCommandResult(cmdResult)
            .filter(x => args.ignore.some(i => i !== x.name));
}
