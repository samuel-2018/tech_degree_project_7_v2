# Project 7 v2: React Gallery App with REST API (Tech Degree)

## Description

Displays images from the photo sharing site Unsplash. Users can search or click on one of the default topic buttons.

This project was setup with Create React App. It uses JavaScript and JSX for building the React components, React Router for handling search and default topic routes, and Axios for fetching data.

(The project’s CSS file was adapted from the file supplied for this project. Some HTML snippets were used from the supplied examples.)

## How to setup app

This project is made up of an API and a client.

The API uses the [Unsplash API](https://unsplash.com/developers). You will need to include your own API key in a config.js file. Example file:

```
const apiKey = "YOUR API KEY";
module.exports = apiKey;
```

Place the config.js file in the folder “api”.

To get the the API running, from the root of the API folder run "npm install" and then "npm start." For the client, run the same commands from the root of the client folder.

To test the Express server for the API, browse to the URL http://localhost:5000/.

If the client does not load automatically, open 'http://localhost:3000/' in your browser.

## Why does the project use its own API?

The Unsplash developer agreement requires that the API key not be shared. Since storing the key in React would expose the key, leaving the key on the server appears to be the only effective way to keep the key a secret.

The project’s API receives the request from the client and, using the secret API key, passes the request on to the Unsplash API. When the project’s API receives the response, it sends the data on to the client.

# Create React App Readme

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
