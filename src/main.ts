import { exec } from "@actions/exec";
import { readConfiguration } from "./configRead";
import { getAllProjects } from "./getAllProjects";
import { info } from "@actions/core";
import { createPackageManifest } from "./createPackageManifest";
import { InstallPackage } from "./installPackage";

const execute = async () => {
  const args = readConfiguration();
  info(`Finding projects under ${args.directory}`);
  const projects = getAllProjects(args.directory);

  const packageManifest = await createPackageManifest(projects, args);

  info(`manifest : ${JSON.stringify(packageManifest, null, "\t")}`);

  let continueInstall = true;

  while (continueInstall) {
    continueInstall = false;
    for (const manif of packageManifest) {
      const successfullProjects: string[] = [];
      for (const proj of manif.projects) {
        const isSuccess = await InstallPackage(manif.nuget, proj);
        if (isSuccess) {
          successfullProjects.push(proj);
          continueInstall = true;
        }
      }
      manif.projects = manif.projects.filter(x => !successfullProjects.some(a => a === x));
    }
  }
};

execute();
