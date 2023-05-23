/* eslint-disable */

import { useState, Component } from 'react';
import Header from './component/HeaderBar';
import DataChart from './component/DataChart';
import DataList from './component/DataList';
import EmptyPage from './component/EmptyPage';
import DataBox from './component/DataBox';
import Login from './component/Login';
import Alert from './component/Alert';
import SignIn from './component/SignIn';
import Home from './component/Home';
import BoothSelection from './component/BoothSelection';
import MainContent from './component/MainContent';
import PlantIntro from './component/PlantIntro';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/* <Alert /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/datalist" element={<DataList />} />
          {/* <Route path="/DataChart/:id" element={<DataChart />} /> */}
          <Route path="*" element={<EmptyPage />} />
          {/* BoothSelection페이지 */}
          <Route path="/Farm" element={<BoothSelection />} />
          {/* Main Content-Data 페이지  */}
          <Route path="/Farm/Booth/plant1" element={<MainContent />} />
          {/* plantInfo */}
          <Route path="/Farm/Booth/plantIntro" element={<PlantIntro />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
