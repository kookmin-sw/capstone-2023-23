import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataChart from '../component/DataChart';
import DataList from '../component/DataList';
import EmptyPage from '../component/EmptyPage';

import DataBox from '../component/DataBox';

//axios
import axios from 'axios';



function MainContent() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<DataList />} />
        <Route path="/DataChart/:id" element={<DataChart />} />
        <Route path="*" element={<EmptyPage />} />
      </Routes>
      <DataBox></DataBox>
    </>
  );
}
export default MainContent;
