import { expect } from "chai";
import { nugetPackage, parseCommandResult } from "./parseCommandResult";

const executionResult = ` 
The following sources were used: 
   https://api.nuget.org/v3/index.json
   C:\\Program Files (x86)\\Microsoft SDKs\\NuGetPackages\\  

Project \`Project.Name\` has the following updates to its packages
   [netstandard2.1]: 
   Top-level Package                                       Requested   Resolved   Latest
   > MediatR.Extensions.Microsoft.DependencyInjection      8.0.0       8.0.0      9.0.0
   > Microsoft.Extensions.Hosting.Abstractions             1.0.0       2.0.0      3.1.9
   > Newtonsoft.Json                                       12.0.0      12.0.1     12.0.3
   > CustomNuget                                           12.0.0      12.0.1     Not found at the sources
`;

const assertPackage = (
  nPackage: nugetPackage,
  name: string,
  version: string
) => {
  expect(nPackage.name).to.be.eq(name);
  expect(nPackage.latestVersion).to.be.eq(version);
};

describe("parseCommandResult", () => {
  it("parse Command Result", () => {
    const result = parseCommandResult(executionResult);
    expect(result.length).to.be.eq(3);
    assertPackage(
      result[0],
      "MediatR.Extensions.Microsoft.DependencyInjection",
      "9.0.0"
    );
    assertPackage(
      result[1],
      "Microsoft.Extensions.Hosting.Abstractions",
      "3.1.9"
    );
    assertPackage(result[2], "Newtonsoft.Json", "12.0.3");
  });
});
