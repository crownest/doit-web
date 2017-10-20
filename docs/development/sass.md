# Sass

**Install the command-line interface for Sass**
```bash
npm install --save node-sass-chokidar
```

**Add the following lines to scripts in package.json**
```bash
"build-css": "node-sass-chokidar src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive"
```

**Install a package for to run watch-css automatically with npm start**
```bash
npm install --save npm-run-all
```

**Change start and build scripts in package.json**
```bash
"start-js": "react-scripts start",
"start": "npm-run-all -p watch-css start-js",
"build": "npm run build-css && react-scripts build" 
```
