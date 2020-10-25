"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommandResult = void 0;
const ColumnNumber = 5;
exports.parseCommandResult = (commandResult) => {
    const result = [];
    const commandLines = commandResult.split("\n");
    for (const line of commandLines) {
        const trimedLine = line.trim().replace(/\s+/g, ' ');
        const filledCols = trimedLine.split(/\s/);
        if (trimedLine.startsWith(">") &&
            filledCols.length == ColumnNumber) {
            const name = filledCols[1];
            const latestVersion = filledCols[filledCols.length - 1];
            result.push({ name, latestVersion });
        }
    }
    return result;
};
