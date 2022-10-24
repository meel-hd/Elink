function validate(args) {
  // When no argumets passed just start the app without building it
  if (args.length == 0 || args[0] == undefined) {
    console.log("No build specified.");
    console.log(
      "After the config and packages installation the app well run in developent mode."
    );
    console.log("Run elink help for usage");
  }
  // Validate arguments
  if (args.length > 1) {
    printSpace();
    console.log("Tool accept only one argument from the two: start or build");
    process.exit(1);
  } else if (args[0] == "help") {
    console.log("Usage:");
    console.log(
      "Run elink start to configure the app, install the necessary packages, and start the app in developement mode."
    );
    console.log(
      "Run elink build to configure the app, install packages, and build ready for use app."
    );
    process.exit(0);
  } else if (args[0] != "help" && args[0] != "build" && args[0] != "start" && args[0] != undefined) {
    console.log("Unknow command",args[0]);
    console.log("Run elink help");
    process.exit(1);
  }
}

export default validate;
