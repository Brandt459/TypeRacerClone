import './App.css';
import texts from './Texts'
import React, { useState, useEffect } from 'react'
import setupText from './setupText';

function App() {
  const [text, setText] = useState()
  const [source, setSource] = useState()
  const [by, setBy] = useState()
  const [countDown, setCountDown] = useState()
  const [wpm, setWpm] = useState()
  const [racing, setRacing] = useState()

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
    setText(prevText => {
      let char = prevText[i].char
      let newText = Object.assign([], prevText)
      if ((char === 'space' && e.key === ' ') || e.key === char) {
        let correctChars = prevText.filter(element => {
          return element.state === "correct"
        })
        if (correctChars.length === prevText.length - 1) {
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
      return newText
    })
  }

  let time = 0

  useEffect(() => {
    const interval = setInterval(() => {
      setRacing(prevRacing => {
        if (prevRacing) {
          time++
          setText(prevText => {
            let correctChars = prevText.filter(element => {
              return element.state === "correct"
            })
            console.log(Math.round((correctChars.length / 5) / (time / 60)))
            console.log(Math.round(correctChars.length / 5), Math.round(time / 60))
            setWpm(Math.round((correctChars.length / 5) / (time / 60)))
            return prevText
          })
        } else {
          time = 0
        }
        return prevRacing
      })
    }, 1000)
    return interval
  }, [])
  
  
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
          <div className="wpm">{wpm ? 'WPM: ' + wpm : ''}</div>
        </div>
      </div>
      <div className="text">
        {words && words.map((word, index) => {
          return (
            <div className="word">
              {word.map(element => {
                return (
                  <div className={"char " + element.state}>{element.char}</div>
                )
              })}
              {index !== words.length - 1 &&
                <div className={"space " + spaces[index].state}>&nbsp;&nbsp;</div>
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
