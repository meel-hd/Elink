import inquirer from "inquirer";
// Ask for the link of the app
export default async function askLink() {
    const answers = await inquirer.prompt({
        name: "app_link",
        type: "input",
        message: "What is the link of the target web app?",
        default() {
            return "https://example.com/home";
        },
    });
    return answers.app_link;
}
