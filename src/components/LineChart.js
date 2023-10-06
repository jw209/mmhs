import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { API } from 'aws-amplify';

const myAPI = 'gamesapi'
const path = '/games'

/*
  tuesday = 2
  wednesday = 3
  thursday = 4
  friday = 5
  saturday = 6
  sunday = 0
  monday = 1
*/
const dayToArrayIndex = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  0: 5,
  1: 6
}

const indexToDay = {
  0: 2,
  1: 3,
  2: 4,
  3: 5,
  4: 6,
  5: 0,
  6: 1
}

const LineChart = ({loadingLineChart}) => {
  const chartRef = useRef(null);
  const today = new Date();
  const currentDay = today.getDay();
  const currentDayAsIndex = dayToArrayIndex[currentDay];

  const [privatemerc, setPrivatemerc] = useState([]);
  const [ouiouiman, setOuiouiman] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);

  useEffect(() => {
    loadingLineChart(false);
  }, [dataRetrieved, loadingLineChart])

  // get raw data from db
  useEffect(() => {
    API.get(myAPI, path)
    .then((res) => {
      const ouioui = res.filter(obj => obj.player === 'Ouiouiman')
      const priv = res.filter(obj => obj.player === 'Privatemerc')

      let privatemercData = [];
      let ouiouimanData = [];

      for (let day=0; day <= currentDayAsIndex; day++) {
        let privNumWins = priv.filter(obj =>  obj.win === true && obj.dayofweek === indexToDay[day])
        let ouiNumWins = ouioui.filter(obj => obj.win === true && obj.dayofweek === indexToDay[day])

        if (privNumWins.length === 0) {
          privatemercData[day] = 0;
        } else {
          privatemercData[day] = privNumWins.length;
        }

        if (ouiNumWins.length === 0) {
          ouiouimanData[day] = 0;
        } else {
          ouiouimanData[day] = ouiNumWins.length;
        }
      }
      setPrivatemerc(privatemercData);
      setOuiouiman(ouiouimanData);

      setDataRetrieved(true);
    })
  }, [currentDayAsIndex])

  useEffect(() => {
    // Chart.js configuration
    if (dataRetrieved) {
      const data = { 
        labels: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
        datasets: [
          {
            label: 'Ouiouiman',
            data: ouiouiman,
            borderColor: 'rgba(0, 125, 255, 1)',
            borderWidth: 2,
          },
          {
            label: 'PrivateMerc',
            data: privatemerc,
            borderColor: 'rgba(255, 31, 0, 1)',
            borderWidth: 2,
          }
        ],
      };
  
      const options = {
        responsive: true,
        maintainAspectRatio: true,
      };
  
      // Create the chart
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      });
    }
  }, [dataRetrieved, privatemerc, ouiouiman]);

  return (
    <canvas ref={chartRef} />
  );
};

export default LineChart;