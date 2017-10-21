# Running the project


**Get source code**
```bash
git clone https://github.com/crownest/doit-web.git (Use HTTPS)
git clone git@github.com:crownest/doit-web.git     (Use SSH)
```

**Change directory and branch**
```bash
cd doit-web
git checkout staging
```

**Install packages**
```bash
npm install
```

**Run project**
```bash
npm start
```

**Add the following lines to scripts in package.json**
```bash
"build-css": "node-sass-chokidar src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive"
```

**Change start and build scripts in package.json**
```bash
"start-js": "react-scripts start",
"start": "npm-run-all -p watch-css start-js",
"build": "npm run build-css && react-scripts build" 
```
