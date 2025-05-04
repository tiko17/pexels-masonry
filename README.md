# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Configuration

Before running the application, you need to set up your environment variables:

1. Create a `.env` file in the root directory
2. Add your Pexels API key:
   ```
   REACT_APP_PEXELS_API_KEY=your_api_key_here
   ```
3. You can obtain a Pexels API key by signing up at [Pexels API](https://www.pexels.com/api/)

**Note:** Never commit your `.env` file to version control. The `.env` file is already added to `.gitignore`.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Performance Optimization

This application implements several performance optimization techniques to ensure fast loading and smooth user experience:

### Image Optimization
- Implemented responsive images using `srcSet` and `sizes` attributes
- Lazy loading for images with blur-up effect and color placeholders
- Priority loading for above-the-fold images

### Bundle Optimization
- Development dependencies properly categorized in package.json
- Bundle analysis tools integration:
  ```bash
  npm run analyze        # Runs webpack-bundle-analyzer
  npm run analyze:source # Runs source-map-explorer
  ```
- Lighthouse integration for performance monitoring:
  ```bash
  npm run lighthouse    # Generates performance reports
  ```

### Code Optimization
- React.lazy() for code splitting and dynamic imports
- Styled-components optimization with babel plugin
- Efficient state management and component rendering
- TypeScript for better code quality and maintainability

### Development Tools
- Custom webpack configuration via react-app-rewired
- Environment-specific configurations (.env files)
- Comprehensive linting and type checking

### Web Vitals Monitoring
- Integrated Core Web Vitals measurement and reporting
- Optimized metrics:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
- Real-time performance monitoring in development
- Performance data collection for production analysis
- Automated performance regression detection

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
