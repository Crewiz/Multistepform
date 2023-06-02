import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MultiStepForm from './components/MultiStepForm';
import ResultPage from './components/ResultPage';
import { FormDataProvider } from './components/FormDataContext';
import './app.css';


const App = () => {
  return (
    <FormDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MultiStepForm />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </FormDataProvider>
  );
};

export default App;
