"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommandResult = void 0;
const ColumnNumber = 5;
exports.parseCommandResult = (commandResult) => {
    const result = [];
    const commandLines = commandResult.split("\n");
    for (const line of commandLines) {
        const trimmedLine = line.trim().replace(/\s+/g, ' ');
        const filledCols = trimmedLine.split(/\s/);
        if (trimmedLine.startsWith(">") &&
            filledCols.length === ColumnNumber) {
            const name = filledCols[1];
            const latestVersion = filledCols[filledCols.length - 1];
            result.push({ name, latestVersion });
        }
    }
    return result;
};
