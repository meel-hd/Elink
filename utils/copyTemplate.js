import * as fs from "fs";
const CURR_DIR = process.cwd();

const copyTemplate = (templatePath, newProjectPath) => {
    // Find the files to copy
    const filesToCreate = fs.readdirSync(templatePath);

    // Copy the files
    filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            let encoding = "utf8"
            // Prevent reading the logo as utf-8 text
            if (file == 'logo.png') {
                encoding = undefined
            }
            // Read the file
            const contents = fs.readFileSync(origFilePath, encoding);

            // Copy the file to the user diroctory
            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;

            fs.writeFileSync(writePath, contents, undefined);
        } else if (stats.isDirectory()) {
            // Make the diroctory
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

            // Copy the path recursivly
            copyTemplate(
                `${templatePath}/${file}`,
                `${newProjectPath}/${file}`
            );
        }
    });
};

export default copyTemplate;
