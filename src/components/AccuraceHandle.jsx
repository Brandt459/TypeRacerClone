import React, { useState, useEffect } from 'react'

export default function AccuraceHandle({ inaccuracies, correctChars, racingRef, setAccuracyArray }) {
    const [accuracy, setAccuracy] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            if (racingRef.current) {
                const accuracy = (100 * (1 - (inaccuracies.current / (inaccuracies.current + correctChars.current)))).toFixed(2)
                setAccuracy(accuracy)
                setAccuracyArray(prevArray => {
                    let newArray = Object.assign([], prevArray)
                    newArray.push(accuracy)
                    return newArray
                })
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <p>{accuracy}% acc</p>
    )
}
