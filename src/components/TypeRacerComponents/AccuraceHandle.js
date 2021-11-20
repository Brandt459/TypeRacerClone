import React, { useState, useEffect } from 'react'

export default function AccuraceHandle(props) {
    const inaccuracies = props.inaccuraciesRef
    const correctChars = props.correctCharsRef
    const [accuracy, setAccuracy] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            if (props.racingRef.current) {
                const accuracy = (100 * (1 - (inaccuracies.current / (inaccuracies.current + correctChars.current)))).toFixed(2)
                setAccuracy(accuracy)
                props.setAccuracyArray(prevArray => {
                    let newArray = Object.assign([], prevArray)
                    newArray.push(accuracy)
                    return newArray
                })
            } else {
                
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="accuracy">{accuracy && !isNaN(accuracy) ? 'Accuracy: ' + accuracy + '%' : ''}</div>
    )
}
