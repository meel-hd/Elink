# Elink

A command-line interface tool for building desktop apps from web app links with ease.

## Prerequisites

You need to have **Node.js** version 14 or above installed.

---

## Installation

From npm registry:

```bash
npm install -g elink
```

From source code:

```bash
npm install -g .
```

---

## How to Use

After installing the CLI, run it with:

```bash
elink
```

or

```bash
elink start
```

to configure and start the app for one-time use.

Use:

```bash
elink build
```

to configure the app and bundle it as an installable package for your current platform.

---

## How It Works

The entry point of the app is `index.js`, which:

- Imports Node.js core modules like `fs` (to work with the file system) and `path` (to handle directory paths).
- Imports helper functions from the `utils` folder:
  - `askName()` and `askLink()` — prompt the user for the app’s name and web link.
  - `copyTemplate()` — copies the bundled Electron template into your working directory.
  - `validate()` — checks any arguments passed to the CLI.
  - `printSpace()` — improves terminal readability.
- Uses [`nanospinner`](https://www.npmjs.com/package/nanospinner) to display progress spinners during setup.
- Uses [`shelljs`](https://www.npmjs.com/package/shelljs) to run shell commands programmatically.

### Execution Flow

1. **Argument Validation**  
   `validate(args)` checks if CLI arguments are valid.
   
2. **Interactive Setup**  
   Prompts the user for:
   - **App name**  
   - **Web app link**
   
3. **Template Copying**  
   Creates an `app` directory and copies the built-in Electron app template into it.

4. **Configuration Generation**  
   Creates `app/config.json` with the user’s inputs.  
   This config is later used by the Electron app code in `template/index.js`.

5. **Dependency Installation**  
   Installs npm packages inside the `app` directory.

6. **Run Mode Selection**  
   Based on the argument passed:
   - `start` or no argument → Runs the app in development mode.
   - `build` → Creates a production build, placing the installable application in `app/dist`.

---

## Example Workflow

```bash
elink start
# → Prompts for app name and link
# → Copies template into ./app
# → Generates config.json
# → Installs dependencies
# → Runs npm start
```

```bash
elink build
# → Same steps as above
# → Runs npm run build
# → Installable app in ./app/dist
```

---

## File Structure After Setup

```
app/
├── config.json         # Your generated app configuration
├── ...template files   # Copied from the bundled template
├── node_modules/       # Installed dependencies
└── dist/               # Output directory after build
```

---

## About `copyTemplate`

The `copyTemplate` function (from `utils/copyTemplate.js`) takes:

1. The absolute path to the bundled Electron template.
2. The destination path (user’s working directory).

It recursively copies all files and folders from the template to the destination:
- Files are duplicated exactly.
- Folders are created in the target location.

---

## License

MIT
