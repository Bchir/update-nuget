import { join } from "path";
import { info } from "@actions/core";

import { readdirSync, statSync } from "fs";

export const getAllProjects = (
  dir: string,
  result: string[] = []
): string[] => {
  const files: string[] = readdirSync(dir);
  const regex = new RegExp(`\\.csproj$`);
  for (const fileName of files) {
    const file = join(dir, fileName);
    if (statSync(file).isDirectory()) {
      try {
        result = getAllProjects(file, result);
      } catch (error) {
        continue;
      }
    } else {
      if (regex.test(file)) {
        info(`project found : ${file}`);
        result.push(file);
      }
    }
  }
  return result;
};
