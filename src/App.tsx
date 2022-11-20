import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './component/Home';
import About from './component/about';
import Navibar from './component/Navibar';
import Test from './component/test';
import ImportData from './component/ImportData';

//
function App() {
  return (
    <div className="App">
      {/*
      <h1>Hello React Router v6</h1>
      */}
      <Navibar name="Editor" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/test' element={<Test />} />
        <Route path='/file' element={<ImportData />} />        

      </Routes>
    </div>
  );
}

export default App;
