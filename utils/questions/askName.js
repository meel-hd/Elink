import inquirer from "inquirer";
// Ask for the name of the app and store it
export default async function askName() {
    const answers = await inquirer.prompt({
        name: "app_name",
        type: "input",
        message: "What is the name of the app?",
        default() {
            return "App";
        },
    });
    return answers.app_name;
}
