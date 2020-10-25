export enum searchFor {
    deprecated = 'deprecated',
    outdated = 'outdated'
}

export enum versionToSelect {
    highestMinor = "highest-minor",
    highestPatch = "highest-patch",
    latest = "latest"
}

export type argument = {
    searchFor: searchFor;
    versionToSelect: versionToSelect;
    targetFramework: string | undefined;
    includePrerelease: boolean;
    source: string[];
    ignore: string[];
    directory: string;
}