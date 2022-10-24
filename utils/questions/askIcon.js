import inquirer from "inquirer";
// Ask for the icon of the app
export default async function askIcon() {
    const answers = await inquirer.prompt({
        name: "app_icon",
        type: "input",
        message: "What is the icon of the desktop app app?",
        default() {
            return "assets/icon.png";
        },
    });
    return answers.app_icon;
}
