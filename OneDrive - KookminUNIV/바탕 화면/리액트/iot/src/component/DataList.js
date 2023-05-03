import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import axios from 'axios';

export default function DataList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3001/dummy');
      setData(response.data);
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      {data.map((item) => (
        <Button
          variant="contained"
          color="success"
          key={item.id}
          onClick={() => navigate(`/Farm/Booth/${item.id}`)}
        >
          {item.id}
        </Button>
      ))}
    </div>
  );
}
