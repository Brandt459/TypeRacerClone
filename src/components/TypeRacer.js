import '../css/TypeRacer.css'
import texts from './TypeRacerComponents/Texts'
import React, { useState } from 'react'
import useStateRef from 'react-usestateref'
import setupText from './TypeRacerComponents/setupText'
import WpmHandle from './TypeRacerComponents/WpmHandle'
import AccuraceHandle from './TypeRacerComponents/AccuraceHandle'
import jwt_decode from 'jwt-decode'
import WpmGraph from './TypeRacerComponents/WpmGraph'
import AccuracyGraph from './TypeRacerComponents/AccuracyGraph'


export default function TypeRacer() {
  const [text, setText, textRef] = useStateRef()
  const [textLength, setTextLength, textLengthRef] = useStateRef()
  const [source, setSource] = useState()
  const [by, setBy] = useState()
  const [countDown, setCountDown] = useState()
  const [racing, setRacing, racingRef] = useStateRef()
  const [i, setI, iRef] = useStateRef(0)
  const [inaccuracies, setInaccuracies, inaccuraciesRef] = useStateRef(0)
  const [correctChars, setCorrectChars, correctCharsRef] = useStateRef(0)
  const [wpmArray, setWpmArray] = useState()
  const [accuracyArray, setAccuracyArray] = useState()


  /* const token = localStorage.getItem('token').split(' ')[1]
  const decodedToken = jwt_decode(token)
  let currentDate = new Date()
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.")
  } else {
    console.log("Valid token")
  } */
  
  function startRace() {
    getTextObject()
    setCountDown(3)
    setInaccuracies(0)
    setWpmArray(null)
    setAccuracyArray(null)
    setRacing(true)
    let interval = 0
    const countdownHandle = setInterval(async () => {
      if (++interval === 3) {
        clearInterval(countdownHandle)
        setText(prevText => {
          prevText[0].state = 'active'
          return prevText
        })
        window.addEventListener('keydown', handleInput)
      }
      setCountDown(count => count - 1)
    }, 1000)
  }
  
  function getTextObject() {
    let textIndex = Math.floor(Math.random() * texts.length)
    const newText = setupText(texts, textIndex)
    setText(newText)
    setTextLength(newText.length)
    setSource(texts[textIndex].source)
    setBy(texts[textIndex].by)
  }
  
  function handleInput(e) {
    let i = iRef.current
    const char = textRef.current[i].char
    const newText = Object.assign([], textRef.current)
    let newCorrectChars = textRef.current.filter(element => {
      return element.state === "correct"
    })
    setCorrectChars(newCorrectChars.length)
    if ((char === 'space' && e.key === ' ') || e.key === char) {
      if (i > 0 && newText[i - 1].state === 'incorrect') {
        newText[i].state = 'incorrect'
        if (i !== newText.length - 1) {
          newText[i + 1].state = 'active'
          setI(++i)
        }
      } else if (newCorrectChars.length === textLengthRef.current - 1) {
        newText[i].state = 'correct'
        window.removeEventListener('keydown', handleInput)
        setRacing(false)
        setI(0)
      } else {
        newText[i].state = 'correct'
        newText[i + 1].state = 'active'
        setI(++i)
      }
    } else if (32 === e.keyCode || (48 <= e.keyCode && e.keyCode <= 90) || (96 <= e.keyCode && e.keyCode <= 111) || (160 <= e.keyCode && e.keyCode <= 165) || (169 <= e.keyCode && e.keyCode <= 171) || e.keyCode === 173 || (186 <= e.keyCode && e.keyCode <= 223)) {
      newText[i].state = 'incorrect'
      setInaccuracies(++inaccuraciesRef.current)
      if (i !== newText.length - 1) {
        newText[i + 1].state = 'active'
        setI(++i)
      } else {
        newText[i + 1] = {'char': 'space', 'state': 'active'}
        setI(++i)
      }
    } else if (e.key === 'Backspace') {
      if (i > 0 && newText[i - 1].state === 'incorrect') {
        newText[i - 1].state = 'active'
        newText[i].state = 'inactive'
        setI(--i)
      }
    }
    setText(newText)
  }
  
  let words = []
  let word = []
  let spaces = []
  if (text) {
    text.forEach(element => {
      if (element.char !== 'space') {
        word.push(element)
      } else {
        words.push(word)
        word = []
      }
    })
    words.push(word)
    spaces = text.filter(element => {
      return element.char === "space"
    })
  }


  return (
    <div className="type-racer-container">
      <div className="type-racer-header">
        <h1>Type Racer Clone</h1>
        <button onClick={() => startRace()} disabled={racing}>Press to start race!</button>
        <div className="race-info">
          <div className="countdown">{countDown ? 'Countdown: ' + countDown : ''}</div>
          {!countDown &&
            <>
              <WpmHandle 
                racingRef={racingRef}
                textRef={textRef}
                setWpmArray={(arr) => setWpmArray(arr)}
              />
              <AccuraceHandle
                inaccuraciesRef={inaccuraciesRef}
                correctCharsRef={correctCharsRef}
                racingRef={racingRef}
                setAccuracyArray={(arr) => setAccuracyArray(arr)}
              />
            </>
          }
        </div>
      </div>
      <div className="text">
        {words && words.map((word, index) => {
          return (
            <div className="word">
              {word.map(element => {
                return (
                  <div className={element.state}>{element.char}</div>
                )
              })}
              {index !== words.length - 1 &&
                <div className={spaces[index].state}>&nbsp;&nbsp;</div>
              }
            </div>
          )
        })}
      </div>
      <div className="citation">
        <div className="source">{source}</div>
        <div className="by">- {by}</div>
      </div>
      <div style={{display: 'flex', marginTop: 20}}>
        {!racing && wpmArray &&
          <WpmGraph 
            wpmArray={wpmArray}
          />
        }
        {!racing && accuracyArray &&
          <AccuracyGraph 
            accuracyArray={accuracyArray}
          />
        }
      </div>
    </div>
  );
}
