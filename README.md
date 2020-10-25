# NuGet update

This action will update NuGet dependencies for .net core projects.
We recommend using this along with a task for creating pull requests automatically.

**Important:** dot restore command have to be run before.

## Usage

```Yaml
- name: nuget update
  # You may pin to the exact commit or the version.
  # uses: Bchir/update-nuget@8051450e91a82bed7368a3926aa0468b6e4fe325
  uses: Bchir/update-nuget@V1.0.0
  with:
    # Select what packages to update
    # Possible values : 'deprecated' , 'outdated'
    searchFor: 

    # Considers only the packages with a matching criteria when searching for newer packages
    #Possible values : 'highest-minor' , 'highest-patch', 'latest'
    versionToSelect: 
    
    # Should consider Prerelease versions of NuGet packages.
    includePrerelease: # optional, default is false
    
    # Targeted directory, it will look for any csProj file recursively.
    # example : ./src
    directory: # optional, default is ./
    
    # targeted framework
    targetFramework: # optional
    
    # List of NuGet sources to use. Each source in one line.
    source: # optional
    
    # List of NuGet packages that should be ignored by the action. Each NuGet on one line.
    ignore: # optional

```

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