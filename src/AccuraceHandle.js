import React, { useState, useEffect } from 'react'

export default function AccuraceHandle(props) {
    const inaccuracies = props.inaccuraciesRef
    const correctChars = props.correctCharsRef
    const [accuracy, setAccuracy] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            setAccuracy((100 * (1 - (inaccuracies.current / (inaccuracies.current + correctChars.current)))).toFixed(2))
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="accuracy">{accuracy ? 'Accuracy: ' + accuracy + '%' : ''}</div>
    )
}
