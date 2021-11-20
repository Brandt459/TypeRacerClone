import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts'

export default function WpmGraph(props) {
    let data = []
    props.wpmArray.forEach((wpm, i) => {
        data.push({name: i + ' seconds', wpm: wpm})
    })

    return (
        <ResponsiveContainer width="50%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Tooltip />
                <Line type="monotone" dataKey="wpm" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
