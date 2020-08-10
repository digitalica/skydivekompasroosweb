
# Skydive Kompasroos
Provides an overview what parachutes are suitable (or not), based on experience of the jumper. The regulations for assessing the level of experience differ per country. A limited number of countries in West-Europe is currently supported.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Update canopy / manufacturers data

The base canopy data files are in de data folder. To prepare them for use in the app, do

```
npm run prepare
```

This will create the src/services/kompasroosdata.js module, that wil be used.

### Deploy

Follow these steps to deploy:
```
npm run build
scp -r build/* robbert@stratos.digitalica.nl:/var/www/www.skydivekompasroos.nl 
```

### Manual deploy to github pages

By default, pushes to master trigger a [github action](./github/workflows/gh-pages.yml) that runs a build. The build output is pushed to the gh-pages branch. 
```
npm run deploy
```
This will manually trigger a build and deploy. It requires the gh-pages (dev dependency) plugin. The gh-pages plugin pushes the build dir to the gh-pages branch (that is active serving static data).