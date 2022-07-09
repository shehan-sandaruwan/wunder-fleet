## Describe possible optimizations for your code

Could have been used minimum state variables to add UI constrain (Conditional Rendering)
If the typed definition (Interfaces) is declared in one file and exported could be enhanced the re-usability and reduce the duplications.

## Which things could be done better, than you’ve done it?

I'm new to typeScript because I previously used Reactjs and JavaScript. I might overlook the ideal method.
I wish I could integrate responsive behavior, but time constraints prevented me.
I could improve the UI and possibly add additional transition animation to the application.
I could have generated a PR for each commit, but I forgot. Instead, I created a PR for the most recent commit and manually merged it into the main branch.

## Used technologies

TypeScript
ReactJs
SCSS
framer-motion
react-toastify

## Problems you faced

Managing the CORS error presented some difficulties.
The react ecosystem's type definition was a little difficult.
Finding the optimal user interface for the implementation was difficult.
Determining the project's structure was difficult.

## Project structure

src - Main folder
Componenet - Main Ui component
Styles - SCSS modules
Utils - Commonly usable compoenent
Api-Service - BE integration
Store - Data storage unit

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
