import { exec } from "@actions/exec";
import { argument, versionToSelect } from "./argumentTypes";
import { readConfiguration } from "./configRead";
import { getAllProjects } from "./getAllProjects";
import { parseCommandResult } from "./parseCommandResult";
import { info } from "@actions/core";

const buildcommand = (args: argument, project: string) => {
  return (
    `dotnet list ${project} package --${args.searchFor} ` +
    (args.versionToSelect !== versionToSelect.latest ? `--${args} ` : "") +
    (args.targetFramework !== undefined
      ? `--framework ${args.targetFramework} `
      : "") +
    (args.includePrerelease ? "--include-prerelease " : " ") +
    args.source.map((src) => `--source ${src}`).join(" ")
  );
};

const execute = async () => {
  const args = readConfiguration();
  info(`Finding projects under ${args.directory}`);
  const projects = getAllProjects(args.directory);

  for (const project of projects) {
    let cmdResult = "";
    const execOption = {
      listeners: {
        stdout: (data: Buffer) => {
          cmdResult += data.toString();
        },
      },
    };
    await exec(buildcommand(args, project), [], execOption);
    const packages = parseCommandResult(cmdResult);
    for (const nPackage of packages) {
      info(`ìnstalling ${nPackage.name} with version ${nPackage.latestVersion} `)
      try {
        await exec(
          `dotnet add ${project} package ${nPackage.name} -v ${nPackage.latestVersion}`
        );  
      } catch (error) {
        continue;
      }
      
    }
  }
};

execute();