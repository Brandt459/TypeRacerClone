import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Label, Tooltip, ResponsiveContainer } from 'recharts'

export default function WpmGraph(props) {
    let data = []
    props.wpmArray.forEach((wpm, i) => {
        data.push({name: i + ' seconds', wpm: wpm})
    })

    return (
        <ResponsiveContainer width="50%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis>
                    <Label value="Time (seconds)" position="bottom" />
                </XAxis>
                <YAxis label={{ value: "Words per miunute (WPM)", angle: -90, position: "insideBottomLeft", offset: 20}} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="wpm" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
