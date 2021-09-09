import React from "react";
import classes from './LineChart.module.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  BarChart,
  Bar
} from "recharts";

const data = [
  {
    name: "ראשון",
    תכנון: 10,
    ביצוע: 6
  },
  {
    name: "שני",
    תכנון: 15,
    ביצוע: 13,
  },
  {
    name: "שלישי",
    תכנון: 6,
    ביצוע: 6
  },
  {
    name: "רביעי",
    תכנון: 3,
    ביצוע: 2
  },
  {
    name: "חמישי",
    תכנון: 20,
    ביצוע: 19
  },
  {
    name: "שישי",
    תכנון: 17,
    ביצוע: 7
  },
  {
    name: "שבת",
    תכנון: 5,
    ביצוע: 5
  }
];

export default function MyLineChart() {
  return (
            <BarChart
            width={900}
            height={450}
            margin={{ top: 40, right: 30, left: 30, bottom: 0 }}
            data={data}  
            >
            <CartesianGrid strokeDasharray="3 3" />
            <defs>
                <linearGradient
                    id="colorPlanning"
                    x1="0" y1="0"
                    x2="0" y2="1"
                >
                    <stop
                        offset="5%"
                        stopColor="#07661f"
                        stopOpacity={0.7}
                    />
                    <stop
                        offset="95%"
                        stopColor="#07661f"
                        stopOpacity={1}
                    />
                </linearGradient>
                <linearGradient
                    id="colorExecution"
                    x1="0" y1="0"
                    x2="0" y2="1"
                >
                    <stop
                        offset="5%"
                        stopColor="#65b479"
                        stopOpacity={0.7}
                    />
                    <stop
                        offset="95%"
                        stopColor="#65b479"
                        stopOpacity={1}
                    />
                </linearGradient>
            </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="תכנון" fill="url(#colorPlanning)" />
        <Bar dataKey="ביצוע" fill="url(#colorExecution)" />
        </BarChart>
  );
}
