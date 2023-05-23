// import React, { useState, useEffect } from "react";
// import { ResponsiveLine } from "@nivo/line";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import styled from "styled-components";

// const BtnContainer = styled.div`
//   display: flex;
//   flex-direction: row-reverse;
//   padding-right: 13%;
// `;
// const Btn = styled.button`
//   block-size: fit-content;
//   text-align: center;
//   font-size: 1.2rem;
//   width: fit-content;
//   padding: 0.2rem 1rem;
//   margin-left: 8px;
//   border: 0px solid #48742c;
//   background: white;
//   color: #48742c;
//   font-weight: 700;
//   &:hover {
//     background: #48742c;
//     color: white;
//     transition: 0.5s;
//   }
//   &:focus {
//     background: #48742c;
//     color: white;
//   }
// `;

// const Chart = () => {
//   const type = useParams();
//   const dataType = type.id;
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const [chartData, setChartData] = useState([]);
//   const [yScale, setYScale] = useState({ min: "auto", max: "auto" });

//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get("http://localhost:3001/dummy");
//       setData(response.data);
//       setChartData(response.data);
//       console.log(response.data);
//     }
//     fetchData();
//     console.log(data);
//   }, []);

//   const getMinMax = (id) => {
//     switch (id) {
//       case "temp":
//         return { min: 10, max: 40 };
//       case "humidity":
//         return { min: 10, max: 80 };
//       case "all":
//         return { min: "auto", max: "auto" };
//       default:
//         return { min: "auto", max: "auto" };
//     }
//   };

//   const handleFilter = (id) => {
//     if (id === "all") {
//       setChartData(data);
//       setYScale(getMinMax(id));
//     } else {
//       const filterData = data.filter((item) => item.id === id);
//       setChartData(filterData);
//       setYScale(getMinMax(id));
//     }
//   };
//   // const chartData = data.filter((id) => id.id === dataType);
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "450px",
//         margin: "0 auto",
//       }}
//     >
//       {/* // onClick={() => navigate(`/datachart/${item.id}`)} */}
//       <BtnContainer>
//         {data.map((item) => (
//           <Btn key={item.id} onClick={() => handleFilter(item.id)}>
//             {item.id}
//           </Btn>
//         ))}
//         <Btn onClick={() => handleFilter("all")}>total</Btn>
//       </BtnContainer>
//       <ResponsiveLine
//         data={chartData}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         curve="monotoneX"
//         xScale={{
//           type: "linear",
//           min: 0,
//           max: 24,
//           stacked: false,
//           reverse: false,
//         }}
//         yScale={{
//           type: "linear",
//           stacked: false,
//           reverse: false,
//           ...yScale,
//         }}
//         yFormat=" >-.2f"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           orient: "bottom",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "time",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           orient: "left",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "count",
//           legendOffset: -40,
//           legendPosition: "middle",
//         }}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={[
//           {
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 100,
//             translateY: 0,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemBackground: "rgba(0, 0, 0, .03)",
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default Chart;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-right: 13%;
`;
const Btn = styled.button`
  block-size: fit-content;
  text-align: center;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.2rem 1rem;
  margin-left: 8px;
  border: 0px solid #48742c;
  background: white;
  color: #48742c;
  font-weight: 700;
  &:hover {
    background: #48742c;
    color: white;
    transition: 0.5s;
  }
  &:focus {
    background: #48742c;
    color: white;
  }
`;

const Chart = () => {
  const type = useParams();
  const dataType = type.id;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [yScale, setYScale] = useState({ min: 'auto', max: 'auto' });

  const deviceId = useSelector(
    (state) => state.boothCookie.boothCookieSerialNumber
  );

  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost:8080/dataout/total?deviceId=${9878283}`;
      const response = await axios.get(url);
      const chartData = response.data.map((item) => ({
        x: item.logTime,
        y: item[dataType],
      }));
      setData(response.data);
      setChartData(chartData);
      console.log(response.data);
      console.log('data', data);
    }
    fetchData();
    console.log(data);
  }, []);

  const getMinMax = (id) => {
    switch (id) {
      case 'temp':
        return { min: 10, max: 40 };
      case 'humidity':
        return { min: 10, max: 80 };
      case 'all':
        return { min: 'auto', max: 'auto' };
      default:
        return { min: 'auto', max: 'auto' };
    }
  };

  const handleFilter = (id) => {
    if (id === 'all') {
      const chartData = data.map((item) => ({
        x: item.logTime,
        y: item[dataType],
      }));
      setChartData(chartData);
      setYScale(getMinMax(id));
    } else {
      const filterData = data.filter((item) => item.id === id);
      const chartData = filterData.map((item) => ({
        x: item.logTime,
        y: item[dataType],
      }));
      setChartData(chartData);
      setYScale(getMinMax(id));
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '450px',
        margin: '0 auto',
      }}
    >
      <BtnContainer>
        {data.map((item) => (
          <Btn key={item.id} onClick={() => handleFilter(item.id)}>
            {item.id}
          </Btn>
        ))}
        <Btn onClick={() => handleFilter('all')}>total</Btn>
      </BtnContainer>
      <ResponsiveLine
        data={[{ id: dataType, data: chartData }]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        curve="monotoneX"
        xScale={{
          type: 'linear',
          min: 0,
          max: 24,
          stacked: false,
          reverse: false,
        }}
        yScale={{
          type: 'linear',
          stacked: false,
          reverse: false,
          ...yScale,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Chart;
