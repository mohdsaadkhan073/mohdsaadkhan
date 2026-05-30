# LifeStack

LifeStack is a personal productivity dashboard built with React and Vite. It helps you add tasks, plan your day, track progress, and use focus mode in a clean visual interface.

## What You Need Before Starting

You do not need a coding background, but you do need 2 things installed on your computer:

1. `Git`
2. `Node.js`

### Install Git

Download and install Git from:

`https://git-scm.com/downloads`

After installation, open Terminal, Command Prompt, or PowerShell and run:

```bash
git --version
```

If you see a version number, Git is installed correctly.

### Install Node.js

Download and install Node.js from:

`https://nodejs.org/`

Use the `LTS` version.

After installation, open Terminal, Command Prompt, or PowerShell and run:

```bash
node -v
npm -v
```

If both commands show version numbers, Node.js is ready.

## Download This Project

If you already have the project folder, skip this section.

If you want to download it from GitHub, run:

```bash
git clone <your-repository-url>
```

Then open the project folder:

```bash
cd LifeStack
```

## First-Time Setup

Inside the project folder, install the required packages:

```bash
npm install
```

This may take a minute the first time.

## Start the App on Your Computer

Run:

```bash
npm run dev
```

After that, you should see a local address in the terminal, usually:

```bash
http://localhost:5173
```

Open that link in your browser.

## How To Use The App

1. Start the local server with `npm run dev`
2. Open the browser link shown in the terminal
3. Log in using the mock login screen
4. Add tasks
5. Click `Plan My Day` to generate a schedule
6. Use `Start Focus` or the `Focus` button on a task to begin a focus session

## If Something Is Not Working

Try these steps in order.

### 1. Make sure you are inside the correct folder

You should be inside the project folder before running commands.

### 2. Reinstall dependencies

If the app shows weird errors, run:

```bash
npm install
```

If that still does not help, delete `node_modules` and reinstall:

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### 3. Check whether the app builds correctly

Run:

```bash
npm run build
```

If this finishes without errors, the project is build-ready.

### 4. Check code quality

Run:

```bash
npm run lint
```

If this finishes without errors, the project files are in a cleaner state.

## Live Project

See live project on:

[LifeStack](https://life-stack-ten.vercel.app/)

## Useful Commands

```bash
npm install
```

Installs the project dependencies.

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates the production build.

```bash
npm run lint
```

Checks the code for common issues.

## Project Structure

```text
LifeStack/
  public/            Static files
  src/               Main app code
  src/components/    Reusable UI parts
  src/context/       Shared app state
  src/pages/         Main screens
  package.json       Project settings and scripts
  vercel.json        Vercel deployment settings
```

## For Non-Technical Users

If you only want to run the app on your own computer, the short version is:

1. Install Git
2. Install Node.js LTS
3. Open the project folder
4. Run `npm install`
5. Run `npm run dev`
6. Open the browser link shown in the terminal

## Current Verified Commands

These commands were checked successfully in this project:

```bash
npm run build
npm run lint
```
