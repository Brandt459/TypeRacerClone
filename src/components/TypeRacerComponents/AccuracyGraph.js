import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts'

export default function WpmGraph(props) {
    let data = []
    props.accuracyArray.forEach(accuracy => {
        data.push({name: '1', accuracy: accuracy})
    })

    return (
        <ResponsiveContainer width="50%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
