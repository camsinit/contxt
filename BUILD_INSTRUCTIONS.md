# Contxt Project Build Instructions

## Prerequisites
- Node.js LTS release (v18.19.0)
- Git
- Watchman (for macOS/Linux)
- Yarn (v1.22.21)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/camsinit/contxt.git
   cd contxt
   ```

2. Install project dependencies:
   ```bash
   yarn install
   ```

3. Remove the `package-lock.json` file to avoid resolution inconsistencies with Yarn:
   ```bash
   rm package-lock.json
   ```

4. Start the Metro Bundler:
   ```bash
   yarn start
   ```

5. Expose the local port to the internet (if necessary):
   ```bash
   # This step is optional and depends on your development environment
   ```

6. Start the web version of the Expo app:
   ```bash
   npx expo start --web
   ```

## Troubleshooting
- If you encounter warnings about outdated Yarn version or version mismatches detected by patch-package, ensure that you are using the correct versions of dependencies as specified in the `package.json` file.
- If the Metro Bundler is already running on a different port, you may be prompted to use an alternative port. Confirm the prompt to proceed.

## Notes
- The web version of the Expo app can be accessed at `http://localhost:19006`.
- The Expo CLI is used via `npx` to ensure the latest version is used without needing a global installation.

## Additional Information
- For more details on setting up and running the project, refer to the `README.md` file in the repository.
