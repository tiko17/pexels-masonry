import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PhotoDetails from './pages/PhotoDetails';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
