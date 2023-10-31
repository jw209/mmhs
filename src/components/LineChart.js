import React, { useRef, useEffect } from 'react'
import { Layout } from 'antd'
import './componentStyles.css'
import Chart from 'chart.js/auto'

const dayToIndex = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 0: 5, 1: 6 }
const indexToDay = { 0: 2, 1: 3, 2: 4, 3: 5, 4: 6, 5: 0, 6: 1 }

const LineChart = (props) => {
    const data = props.data
    const chartRef = useRef(null)
    const today = new Date()
    const currentDay = today.getDay()
    const currentDayAsIndex = dayToIndex[currentDay]

    function sortGamesByHost() {
        return new Promise((resolve) => {
            const ouiouiman = data.filter(obj => obj.player === 'Ouiouiman')
            const privatemerc = data.filter(obj => obj.player === 'Privatemerc')
            let privatemercData = []
            let ouiouimanData = []
            for (let day=0; day <= currentDayAsIndex; day++) {
                let privNumWins = 
                    privatemerc.filter(obj => obj.win === true && obj.dayofweek === indexToDay[day])
                let ouiNumWins = 
                    ouiouiman.filter(obj => obj.win === true && obj.dayofweek === indexToDay[day])

            if (privNumWins.length === 0) {
                privatemercData[day] = 0
            } else {
                privatemercData[day] = privNumWins.length
            }

            if (ouiNumWins.length === 0) {
                ouiouimanData[day] = 0
            } else {
                ouiouimanData[day] = ouiNumWins.length
            }
        } resolve({ privatemercData, ouiouimanData })}, 2000)
    } 

    useEffect(() => {
        sortGamesByHost()
        .then(obj => {
            const data = { 
            labels: [
                'Tuesday',
                'Wednesday', 
                'Thursday', 
                'Friday', 
                'Saturday', 
                'Sunday', 
                'Monday'
            ],
            datasets: [
            {
                label: 'Ouiouiman',
                data: obj.ouiouimanData,
                borderColor: 'rgba(0, 125, 255, 1)',
                borderWidth: 2,
            },
            {
                label: 'PrivateMerc',
                data: obj.privatemercData,
                borderColor: 'rgba(255, 31, 0, 1)',
                borderWidth: 2,
            }],
        }

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Winrates through the week'
                }
            },
        }

        // Create the chart
        const ctx = chartRef.current.getContext('2d')
        new Chart(ctx, { type: 'line', data: data, options: options })
        })
        .catch((error) => {
            console.error(error)
        })
    })

    return (
        <Layout className='line-chart' id='chart-container'>
            <canvas ref={chartRef} />
        </Layout>
    )
}

export default LineChart;