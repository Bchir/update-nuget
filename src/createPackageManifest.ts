import { nugetPackage } from './parseCommandResult';
import { argument } from "./argumentTypes";
import { listProjectPackages } from './listProjectPackage';

export type PackageManifest = {
    nuget: nugetPackage,
    projects: string[]
};

export const createPackageManifest = async (projects: string[], args: argument): Promise<PackageManifest[]> => {
    const result: PackageManifest[] = [];
    for (const project of projects) {

        const packages = await listProjectPackages(args, project);

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
}