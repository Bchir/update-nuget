# nuget update

This action will update nuget dependencies for .net core projects.

## Example usage

```Yaml

    - name: checkout code
      uses: actions/checkout@v1
      
    - name: Setup .NET Core
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 3.1.x
    - name: Install dependencies
      run: dotnet restore

    - name: update packages
      uses: bchir/nuget-update@v1.0
      with:
        searchFor: 'outdated'
        versionToSelect: 'latest'
```