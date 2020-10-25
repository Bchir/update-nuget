import { getInput } from "@actions/core";
import { EOL } from "os";
import { argument, searchFor, versionToSelect } from "./argumentTypes";

const getStrings = (paramName: string): string[] => {
  const readValue = getInput(paramName, { required: false });

  if (readValue === null || readValue === undefined) return [];

  return readValue.split(EOL).map((x) => x.trim());
};

const getRequiredString = (paramName: string): string =>
  getInput(paramName, { required: true });

const getOptionalString = (paramName: string): string | undefined => {
  const result = getInput(paramName, { required: false });
  if (result == null || result === undefined || result.length === 0)
    return undefined;
};

export const getBool = (paramName: string): boolean => {
  const value = getOptionalString(paramName);
  return value === "true";
};

export const readConfiguration = (): argument => {
  return {
    ignore: getStrings("ignore"),
    includePrerelease: getBool("includePrerelease"),
    directory: getOptionalString("directory") ?? ".",
    searchFor: getRequiredString("searchFor") as searchFor,
    targetFramework: getOptionalString("targetFramework"),
    source: getStrings("sources"),
    versionToSelect: getRequiredString("versionToSelect") as versionToSelect,
  };
};
