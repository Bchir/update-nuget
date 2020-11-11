import { exec } from "@actions/exec";
import { info } from "@actions/core";
import { nugetPackage } from './parseCommandResult';

export const InstallPackage = async (nPackage: nugetPackage, projectPath: string): Promise<boolean> => {

    try {
        await exec(`dotnet add ${projectPath} package ${nPackage.name} -v ${nPackage.latestVersion}`);
        return true
    } catch (error) {
        info(error)
        return false;
    }
}