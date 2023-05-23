import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axios from 'axios';
import styled from 'styled-components';

const Button1 = styled.button`
  font-family: 'Playfair Display', serif;
  color: white;
  background: rgb(50, 110, 98);
  font-weight: 600;
  letter-spacing: 0.3rem;
  margin: 0.1rem;
  border: 10px solid rgb(50, 110, 98);
  border-radius: 5px;
`;

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedId, setSelectedId] = useState('all');

  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost:8080/dataout/total?deviceId=${1234}`;
      const response = await axios.get(url);
      const data = response.data;
      console.log('data : ', data);

      const formattedData = data.map((item) => ({
        x: item.logTime,
        y: [
          { id: 'humidity', value: item.humidity },
          { id: 'temperature', value: item.temperature },
          { id: 'soilMoisture', value: item.soilMoisture },
        ],
      }));

      setChartData(formattedData);
      console.log('chartData : ', chartData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    // chartData가 업데이트되었을 때 차트를 그리는 로직
    console.log('chartData 업데이트됨: ', chartData);
  }, [chartData]);
  useEffect(() => {
    // selectedId가 변경되었을 때 filterData 호출
    const filteredData = filterData();
    console.log('filteredData : ', filteredData);
  }, [selectedId, chartData]);

  const handleButtonClick = (id) => {
    setSelectedId(id);
  };

  const filterData = () => {
    if (selectedId === 'all') {
      return chartData.map((item) => ({
        x: item.x,
        y: item.y.find((data) => data.id).value,
      }));
    } else {
      return chartData.map((item) => ({
        x: item.x,
        y: item.y.find((data) => data.id === selectedId).value,
      }));
    }
  };

  const getPointColor = (id) => {
    switch (id) {
      case 'humidity':
        return 'blue';
      case 'temperature':
        return 'red';
      case 'soilMoisture':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div
      style={{
        width: '900px',
        height: '450px',
        margin: '0 auto',
      }}
    >
      <div>
        <Button1 onClick={() => handleButtonClick('humidity')}>
          Humidity
        </Button1>
        <Button1 onClick={() => handleButtonClick('temperature')}>
          Temperature
        </Button1>
        <Button1 onClick={() => handleButtonClick('soilMoisture')}>
          SoilMoisture
        </Button1>
      </div>
      <ResponsiveLine
        data={[{ id: 'data', data: filterData() }]}
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
        // pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        pointColor={(point) => getPointColor(point.serieId)}
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
