import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.register();

window.addEventListener("beforeinstallprompt", function(e) { 
  // log the platforms provided as options in an install prompt 
  console.log(e.platforms); // e.g., ["web", "android", "windows"] 
  e.userChoice.then(function(choiceResult) { 
    console.log(choiceResult.outcome); // either "accepted" or "dismissed"
  }); 
});