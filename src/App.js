import './App.css'
import texts from './Texts'
import React, { useState, useEffect } from 'react'
import useStateRef from 'react-usestateref'
import setupText from './setupText'
import WpmHandle from './WpmHandle'

function App() {
  const [text, setText, textRef] = useStateRef()
  const [source, setSource] = useState()
  const [by, setBy] = useState()
  const [countDown, setCountDown] = useState()
  const [racing, setRacing, racingRef] = useStateRef()

  
  function startRace() {
    setCountDown(3)
    getTextObject()
    setRacing(true)
    let interval = 0
    const countdownHandle = setInterval(async () => {
      if (++interval === 3) {
        clearInterval(countdownHandle)
        setText(prevText => {
          prevText[0].state = 'active'
          return prevText
        })
        document.addEventListener('keydown', (e) => handleInput(e))
      }
      setCountDown(count => count - 1)
    }, 1000)
  }
  
  function getTextObject() {
    let textIndex = Math.floor(Math.random() * texts.length)
    const newText = setupText(texts, textIndex)
    setText(newText)
    setSource(texts[textIndex].source)
    setBy(texts[textIndex].by)
  }
  
  let i = 0
  
  function handleInput(e) {
    let char = textRef.current[i].char
    let newText = Object.assign([], textRef.current)
    if ((char === 'space' && e.key === ' ') || e.key === char) {
      let correctChars = textRef.current.filter(element => {
        return element.state === "correct"
      })
      if (correctChars.length === textRef.current.length - 1) {
        document.removeEventListener('keydown', (e) => handleInput(e))
        setRacing(false)
        i = 0
      } else {
        newText[i].state = 'correct'
        newText[i + 1].state = 'active'
        i++
      }
    } /* else if ((48 <= e.keyCode && e.keyCode <= 90) || (96 <= e.keyCode && e.keyCode <= 111) || (160 <= e.keyCode && e.keyCode <= 165) || (169 <= e.keyCode && e.keyCode <= 171) || e.keyCode === 173 || (186 <= e.keyCode && e.keyCode <= 223)) {
      newText[i].state = 'incorrect'
    } */
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
          <WpmHandle 
            racingRef={racingRef}
            textRef={textRef}
           />
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
    </div>
  );
}

export default App;
