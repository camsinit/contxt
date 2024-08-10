<<<<<<< HEAD
# Welcome to your Draftbit app!

This `README` is designed to help you get your Draftbit app running locally. Read
through the next few sections carefully, and if you encounter any issues please
do not hesitate to post in [Community](https://community.draftbit.com).

> Note that all of the commands in this document should be run using your
> computer's **command line**. If you're unsure of what this is, please read
> [this](https://tutorial.djangogirls.org/en/intro_to_command_line/) guide
> before moving on.

Remember, at any point you can go back to [build.draftbit.com](https://build.draftbit.com) and continue building your app
there!

## Requirements

- [Node.js LTS release](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) for macOS and Linux users
- [Yarn](https://classic.yarnpkg.com/en/docs/install) use this over `npm install` when installing dependencies

> Only Node.js LTS releases (even-numbered) are recommended. As Node.js [officially states](https://nodejs.org/en/about/releases/), "Production applications should only use Active LTS or Maintenance LTS releases."

## Recommended Tools

- [VSCode Editor](https://code.visualstudio.com/download)
  - [VSCode Expo Extension](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools) for `app.json` debugging and autocomplete.
- Windows users: [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows), Bash via WSL, or the VSCode terminal.
- Expo Go for iOS and Android
  - 🤖 [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) - Android Lollipop (5) and greater.
  - 🍎 [iOS App Store](https://itunes.com/apps/exponent) - iOS 11 and greater.

## Installing Node.js

You can install Node by going to the [website directly](https://nodejs.org/en/) and clicking the side that says "Recommended For Most Users". This will guide you through the process.

Once Node has been installed, run the following on the command line to make sure
it's been installed correctly:

```
$ node -v
```

If you see the current version of Node in response, you've successfully
installed Node on your machine.

For example,

```
$ node -v
v16.15.1
```

[Learn more about installing Nodejs](https://nodejs.dev/en/learn/how-to-install-nodejs/)

> 😳 **Need help?** Try searching the [Community](https://community.draftbit.com) &mdash; which are a great resource for troubleshooting.

## Install Project Dependencies

First, navigate to the project directory. The .zip will likely be in your
downloads folder, so extract the .zip and move it to the desired location
before proceeding.

Now, run the following commands to install the project dependencies (note that
you'll need an internet connection to do so).

```
$ cd Desktop/New-App
$ yarn
```

> The `cd` command above takes you into the project directory so you can install
> the correct dependencies. You should replace `Desktop/New-App` with the actual
> path to your unzipped project folder.

## Log In to Expo

Verify that the installation was successful by running `npx expo whoami`. You're not logged in yet, so you will see "Not logged in". You can create an account by running `npx expo register` if you like, or if you have one already run `npx expo login`, but you also don't need an account to get started.

[Learn more about Expo CLI here](https://docs.expo.io/get-started/installation/#installing-expo-cli)

## Running

To start your project, simply run: `yarn start` inside of the project directory
(make sure you've [installed the project dependencies](#install-project-dependencies) first). This should open the Expo
developer tools in the command line.

### Running in an emulator

You can run your app on your mobile device, on the iOS simulator (if you have
a Mac), or on the Android emulator. If you'd prefer to run your app on an
emulator, see the installation instructions below.

- [iOS Simulator](https://docs.expo.io/workflow/ios-simulator/)
- [Android Studio](https://docs.expo.io/workflow/android-studio-emulator/)

After installing and launching the emulator, and while in the command line, type `a` to launch on the Android emulator or `i` to launch on the IOS simulator. You can also press `w` to launch on web.

### Running on your Android or iOS Device

The fastest way to get up and running is to use the Expo Go app on your iOS or Android device. Expo Go allows you to open up apps that are being served through Expo CLI.

- 🤖 [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) - Android Lollipop (5) and greater.
- 🍎 [iOS App Store](https://itunes.com/apps/exponent) - iOS 11 and greater.

After installing, scan the barcode you see in the command line.

> If you are using custom packages, then there is a chance your app will not run on Expo Go. In that case, you need to [create your own build of the app](https://docs.expo.dev/build/setup/)

## File Structure

```
.
    ├── assets                 # Static assets like images and fonts.
    ├── config                 # JS representation of fonts, images, and more
    ├── screens                # React Native code for the screens you built.
    │   └── MyFirstScreen.js   # Example file for the screen named "My First Screen"
    ├── themes                 # JS representation of the theme
    ├── .gitignore             # List of files to ignore when comitting with Git
    ├── App.js                 # Entry point for your app
    ├── app.json               # Configuration file for your app, used by Expo
    ├── AppNavigator.js        # Code for your app's navigators
    ├── package.json           # The metadata for your project, including dependencies
    └── README.md              # This file!
```

## Publishing your app to the App Store

Expo has really great documentation for how to get started. [Click here](https://docs.expo.dev/build/setup/) to learn more.

## Troubleshooting

Any errors that may occur in the process of developing or testing your app will show up as a "Redbox" error on the testing device. A red box will be show on the device with the error message and stack trace for the error. The Expo documentation has [more information about Redbox errors](https://docs.expo.dev/debugging/errors-and-warnings).

Compilation errors or errors occurring when the expo process tries to execute
commands will also show up in the command line. If you cannot fix these errors, you
should refer to Expo's documentation on [debugging
Javascript](https://docs.expo.dev/debugging/runtime-issues).

## FAQ

- _How can I add my code to GitHub?_

  Pushing your code to GitHub is easy! Follow the information
  [guide](https://help.github.com/en/github/getting-started-with-github/create-a-repo)
  to create your repository and commit your project code.

- _How do I build a binary for the App and Play store?_

  Expo published an [excellent
  guide](https://docs.expo.dev/build/setup/) for
  deploying to the Apple App Store and the Google Play Store.

- _What/where is the license for this code?_

  There's no license by default, but if you create a GitHub repository for your
  project code, for example, [adding a license is
  easy](https://help.github.com/en/github/building-a-strong-community/adding-a-license-to-a-repository).

- _Can I run Expo web with this?_

  Of course! See [this](https://docs.expo.dev/workflow/web/) guide by Expo for running your React Native app in
  a web browser.

- _What libraries does this code depend on?_

  You can see the full list in your projects `package.json` file (under the
  `dependencies` section).
||||||| (empty tree)
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
>>>>>>> d77dcb9 (Initialize project using Create React App)
