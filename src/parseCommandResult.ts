export type nugetPackage = {
  name: string;
  latestVersion: string;
};
const ColumnNumber = 5;

export const parseCommandResult = (commandResult: string): nugetPackage[] => {
  const result: nugetPackage[] = [];
  const commandLines = commandResult.split("\n");

  for (const line of commandLines) {
    
    const trimmedLine = line.trim().replace(/\s+/g,' ');

    const filledCols = trimmedLine.split(/\s/);
    
    if (
      trimmedLine.startsWith(">") &&
      filledCols.length === ColumnNumber
    ) {
      const name = filledCols[1];
      const latestVersion = filledCols[filledCols.length - 1];
      result.push({ name, latestVersion });
    }
  }
  return result;
};
