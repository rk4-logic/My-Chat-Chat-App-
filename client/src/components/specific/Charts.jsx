import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js';
import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
import { getLastSevenDays } from '../../lib/features';


ChartJS.register(CategoryScale, Tooltip, LinearScale, LineElement, PointElement, Filler, ArcElement, Legend);

const labels = getLastSevenDays();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        }
    },
}

const LineChart = ({ value = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: 'Revenue',
                fill: false,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75,192,192,1)",
            },

        ],
    }

    return <Line data={data} options={lineChartOptions} />
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    cutout: 120,
}

const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: 'Total chats vs Group Chats',
                fill: false,
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(238, 75, 43, 0.2)"],
                hoverBackgroundColor: ["rgba(46, 143, 180, 0.9)", "rgba(238, 117, 90 , 2)"],
                borderColor: ["rgba(75,192,192,1)", "rgba(170, 74, 68, 1)"],
                offset: 40,
            },

        ],
    }

    return <Doughnut style={{ zIndex: '10' }} data={data} options={doughnutChartOptions} />
};

export { LineChart, DoughnutChart };