# Elink
#### Video Demo:  <https://youtu.be/lDy2sJJJxvc>
#### Description: The command line interface for building desktop apps from webapps liks in four steps.

## Perequisites
you need to have `NodeJs` version 14 and above installed.

## Installation
#### npm registery: `npm install -g elink`
#### from the code: `npm install -g .`

## How to use
After installing the cli run it with the command `elink` or `elink start` to configure the app and just start it for one time use. Or with the command `elink build` to configure the app and bunddle it as an installable package of the current platform.

### The code
We will start with `package.json` which is the file contains configuration and metadata about NodeJs applications. Like the name, the description, the license, and the entry point in this project it is `"main": "./index.js",`. Also this file since the applications is a command line we need to add the field `"bin": {"elink": "./index.js"},` which defines how the app well be called from the terminal.

The entry point of the app is `index.js` which imports some modules like `fs` modules, so we be able to deal with the *file system*. Also we import some helper functions from the `utils` folder, to ask the user the data about the app we will build, function to validate the arguments, and the most import function is the `copyTemplate` function which we will give the diroctory of a folder and it will copy all its content for us. In addition, we import functions to deal with the *paths* of the *file system*, and  and the `shell` helper utility from the package [ShelJs](https://www.npmjs.com/package/shelljs) to help us run some shell commands programmatically, the `createSpinner` function just to improve the experience by giving the user some feedback with a spinner in the terminal.

we will call the `validate()` function first to check the cli arguments passed if any,  then the `HandleBuild` function will decide weither to build or just the desktop app.

The next step is the copy the template of the desktop app shipped with cli in the working diroctory. Create the `config.json` file which will help the electron app code in `template/index.js` to pick the data in it and configure  the app based on it. After app we run some shell commands to install the packages that are predefined in `package.json` before, to make it ready for the **starting** or the **build** proccess of the desktop app.

Now the `copyTemplate` function coming from `utils/copyTemplate.js` it accepts two parameters, the first one is the path to the template of the desktop app, the second parameter which is the path where the user run the tool, to copy to it the template with the config file. So it will go throught the template recursively check if the data is file it will write is a file in the user's path, if it is a folder it will create it as a folder.