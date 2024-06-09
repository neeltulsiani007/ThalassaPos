import React, { useState, useEffect } from 'react';
import { Bar  } from 'react-chartjs-2';
import fetchData from './fetchData';
import { Chart } from 'chart.js/auto';
import { useRef } from 'react';


const BarGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const array = ['','Jan','Feb','Mar','Apr','May']
  const ref = useRef("")

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData('http://localhost:4000/getgraph');
        console.log(result)
      if (result) {
        setData(result);
        setLoading(false);
      } else {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const chartData = {
    labels: data ? data.map(item => array[item.OrderMonth]) : [],
    datasets: [
      {
        label: 'Sales',
        data: data ? data.map(item => item.TotalAmount) : [],
        backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      responsive: true,
      maintainAspectRatio: true,
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='lg:min-w-[650px] h-full w-[520px]'>
    <Bar data={chartData} />
  </div>
  );
};

export default BarGraph;
