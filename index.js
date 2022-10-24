#! /usr/bin/env node
import fs from "fs";
import { createSpinner } from "nanospinner";
import askName from "./utils/questions/askName.js";
import askLink from "./utils/questions/askLink.js";
import copyTemplate from "./utils/copyTemplate.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import printSpace from "./utils/printSpace.js";
import shell from "shelljs";
import validate from "./utils/validate.js";

// Handle the arguments
const args = process.argv.slice(2);

validate(args)


function HanleBuild() {
  // Start the app in developement mode
  if (args.length == 0 || args[0] == "start") {
    const spinner_start = createSpinner("Srating the app...");
    spinner_start.success();
    shell.exec("npm run start");
  } else 
  // Build the app
  if (args[0] == "build") {
    const spinner_build = createSpinner(
      "Building the app... this might take a while"
    );
    spinner_build.success();
    shell.exec("npm run build");
    console.log("You can find the installable application in the app/dist folder")
  }
}

// The app Data
var app = {
  name: await askName(),
  link: await askLink(),
};

printSpace();

// Create the a dir and copy files of the template
const spinner_copy = createSpinner("Loading necessary files...");
try {
  const CURR_DIR = process.cwd();
  fs.mkdirSync(`${CURR_DIR}/app`);
  // Create the path
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // Find the absolute path of template
  const templatePath = path.join(__dirname, "template");
  // Copy the template to the user's diroctory
  copyTemplate(templatePath, "app");
  spinner_copy.success();
} catch (error) {
  spinner_copy.error();
}

printSpace();

// Write the config file to the template
const config = JSON.stringify(app);
const spinner_config = createSpinner("Generating config files...");
try {
  fs.writeFileSync(`App/config.json`, config);
  spinner_config.success();
} catch (error) {
  spinner_config.error();
  process.exitCode = 1;
  process.exit();
}

printSpace();

// Installation
const spinner_install = createSpinner(
  "Insatlling Packages... Please wait this might take a while"
);
// Change working diroctory to the app dir
shell.cd("app");
// console.log(shell.pwd().stdout)
// Install the necessary packages
spinner_install.start();
// NOTE: sometimes the command fail but it installed the right packages
shell.exec("npm i");
spinner_install.success();

// Build or just start the app
HanleBuild();
