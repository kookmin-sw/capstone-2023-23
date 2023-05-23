import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import DataChart from './DataChart';
import DataBox from './DataBox';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function DataList() {
  const navigate = useNavigate();
  return (
    <div className="DataList">
      <button onClick={() => navigate(`/`)}>Home 가기</button>
      <DataChart />
    </div>
  );
  // const navigate = useNavigate();
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get("http://localhost:3001/dummy");
  //     setData(response.data);
  //   }
  //   fetchData();
  // }, []);
  // return (
  //   <div>
  //     {data.map((item) => (
  //       <Button
  //         variant="contained"
  //         color="success"
  //         key={item.id}
  //         onClick={() => navigate(`/datachart/${item.id}`)}
  //       >
  //         {item.id}
  //       </Button>
  //     ))}
  //   </div>
  // );
}
