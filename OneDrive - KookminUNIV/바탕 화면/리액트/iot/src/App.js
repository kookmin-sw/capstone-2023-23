import './App.css';
import * as React from 'react';

//headerBar
import HeaderBar from './component/HeaderBar';

//axios
import axios from 'axios';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataChart from './component/DataChart';
import DataList from './component/DataList';
import EmptyPage from './component/EmptyPage';

import DataBox from './component/DataBox';
import MainContent from './routes/MainContent';
import BoothSelection from './routes/BoothSelection';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderBar></HeaderBar>

        <Routes>
          {/* Main Content-Data 페이지  */}
          <Route path="/Farm/Booth/plant1" element={<MainContent />} />
          {/* BoothSelection페이지 */}
          <Route path="/Farm" element={<BoothSelection />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
