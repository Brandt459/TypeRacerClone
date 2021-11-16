import React, { useState, useEffect } from 'react'
import useStateRef from 'react-usestateref'

export default function WpmHandle(props) {
    const racingRef = props.racingRef
    const textRef = props.textRef
    const [time, setTime, timeRef] = useStateRef(0)
    const [wpm, setWpm] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            if (racingRef.current) {
                setTime(timeRef.current + 1)
                let correctChars = textRef.current.filter(element => {
                    return element.state === "correct"
                })
                setWpm(Math.round((correctChars.length / 5) / ((timeRef.current - 4) / 60)))
            } else {
                setTime(0)
            }
        }, 1000)
        return interval
    }, [])

    return (
        <div className="wpm">{wpm ? 'WPM: ' + wpm : ''}</div>
    )
}
