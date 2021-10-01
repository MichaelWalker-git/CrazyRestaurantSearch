#! /usr/bin/env bash

# Change the extension of all JS files in the application source
mv src/App.js src/App.tsx 2>/dev/null
mv src/App.test.js src/App.test.tsx 2>/dev/null
mv src/index.js src/index.tsx 2>/dev/null
mv src/setupTests.js src/setupTests.ts 2>/dev/null

# Rename the custom tsconfig.json file to be used by the compiler
mv tsconfig.json.unused tsconfig.json 2>/dev/null

echo "The project has been converted to TypeScript. Re-launch the development server"


