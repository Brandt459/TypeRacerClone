import React, { useState, useEffect } from 'react'
import useStateRef from 'react-usestateref'

export default function WpmHandle({ racingRef, correctChars, setWpmArray }) {
    const [time, setTime, timeRef] = useStateRef(0)
    const [wpm, setWpm] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            if (racingRef.current) {
                setTime(timeRef.current + 1)

                const wpm = Math.round((correctChars.current / 5) / ((timeRef.current) / 60))
                setWpm(wpm)

                setWpmArray(prevArray => {
                    let newArray = Object.assign([], prevArray)
                    newArray.push(wpm)
                    return newArray
                })
            } else {
                setTime(0)
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <p>{wpm} wpm</p>
    )
}
