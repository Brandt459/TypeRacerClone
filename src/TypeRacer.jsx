import texts from './components/Texts'
import React, { useState, useRef, useEffect } from 'react'
import useStateRef from 'react-usestateref'
import setupText from './components/setupText'
import WpmHandle from './components/WpmHandle'
import AccuraceHandle from './components/AccuraceHandle'
import WpmGraph from './components/WpmGraph'
import AccuracyGraph from './components/AccuracyGraph'
import Countdown from './components/Countdown'


export default function TypeRacer() {
    const [text, setText, textRef] = useStateRef()
    const [words, setWords, wordsRef] = useStateRef()
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
    const [typedWord, setTypedWord] = useState()
    const countdownIntervalRef = useRef()
    const inputRef = useRef()

    function startRace() {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
        }

        getTextObject()
        resetRace()
        setCountDown(3)
        setRacing(true)
        inputRef.current.focus()

        let interval = 0
        countdownIntervalRef.current = setInterval(async () => {
            if (++interval === 3) {
                clearInterval(countdownIntervalRef.current)
                setWords(prevWords => {
                    prevWords[0].state = 'active'
                    return prevWords
                })
            }
            setCountDown(count => count - 1)
        }, 1000)
    }

    function resetRace() {
        setI(0)
        setTypedWord('')
        setInaccuracies(0)
        setCorrectChars(0)
        setWpmArray(null)
        setAccuracyArray(null)
    }

    useEffect(() => {
        if (inputRef.current) {
            startRace()
        }
    }, [inputRef])
  
    function getTextObject() {
        let textIndex = Math.floor(Math.random() * texts.length)
        const newText = setupText(texts, textIndex)

        setText(newText)

        let newWords = []
        let currentWord = {'state': 'inactive', 'word': ''}

        newText.forEach(item => {
            if (item.char === "space") {
                if (currentWord.word.length > 0) {
                    newWords.push(currentWord)
                }
                currentWord = {'state': 'inactive', 'word': ''}
            } else {
                currentWord.word += item.char
            }
        })

        if (currentWord.word.length > 0) {
            newWords.push(currentWord)
        }

        setWords(newWords)
        console.log(newWords)
        setTextLength(newText.length)
        setSource(texts[textIndex].source)
        setBy(texts[textIndex].by)
    }
  
    function handleInput(e) {
        let i = iRef.current
        const currentWord = wordsRef.current[i].word
        const newWords = Object.assign([], wordsRef.current)

        if (i === wordsRef.current.length - 1 && currentWord === typedWord.trim() + e.key) {
            newWords[i].state = 'correct'

            setTypedWord('')
            setRacing(false)
            setWords(newWords)
            e.preventDefault()

        } else if (e.key === ' ' && currentWord === typedWord.trim()) {
            newWords[i].state = 'correct'
            newWords[i + 1].state = 'active'
            
            setI(++i)
            setTypedWord('')
            setWords(newWords)

        } else if (!currentWord.startsWith(typedWord.trim()) && e.key !== 'Backspace') {
            setInaccuracies(++inaccuraciesRef.current)
        }

        let correctChars = 0

        for (let j = 0; j < i; j++) {
            if (words[j].state === 'correct') {
                correctChars += words[j].word.length + 1    // + 1 to account for space
            }
        }

        if (typedWord && currentWord.startsWith(typedWord)) {
            correctChars += typedWord.length
        }

        setCorrectChars(correctChars)
    }

    return (
        <div className="font-['Roboto']">
            <div className="mx-auto w-1/2 py-10">
                <div className="text-center flex justify-between mx-10 h-16">
                    <button 
                        onClick={() => startRace()}
                        className='px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 focus:outline-none cursor-pointer transition duration-300 ease-in-out'
                    >
                        Start a new race
                    </button>
                    <div className="mt-2 w-1/3">
                        {countDown ?
                            <Countdown
                                countDown={countDown}
                            />
                        :
                            <div className="text-right text-[#638E8E] mt-auto">
                                <WpmHandle 
                                    racingRef={racingRef}
                                    textRef={textRef}
                                    correctChars={correctCharsRef}
                                    setWpmArray={(arr) => setWpmArray(arr)}
                                />
                                <AccuraceHandle
                                    inaccuracies={inaccuraciesRef}
                                    correctChars={correctCharsRef}
                                    racingRef={racingRef}
                                    setAccuracyArray={(arr) => setAccuracyArray(arr)}
                                />
                            </div>
                        }
                    </div>
                </div>
                <div className="mt-6 border border-[#D2DEE2] rounded p-1.5 bg-[#F6FBFF] p-4">
                    <div className='flex flex-wrap text-lg'>
                        {words && words.map((word, index) => (
                            <React.Fragment key={index}>
                                <div className={`${word.state === 'correct' ? 'text-[#AAD52E]' : word.state === 'incorrect' ? 'bg-[#D08383]' : ''} py-0.5 flex ml-2`}>
                                    {Array.from(word.word).map((char, charIndex) => {
                                        let isMismatched = word.state === 'active' && typedWord[charIndex] && char !== typedWord[charIndex]
                                        let isMatched = word.state === 'active' && typedWord[charIndex] && char === typedWord[charIndex]
                                        let mismatchOccurred = word.state === 'active' && typedWord[charIndex] && Array.from(word.word).slice(0, charIndex).some((c, i) => c !== typedWord[i])
                                        
                                        const shouldApplyRed = isMismatched || mismatchOccurred
                                        const shouldApplyGreen = isMatched && !Array.from(word.word).slice(0, charIndex).some((c, i) => c !== typedWord[i])

                                        return (
                                            <div 
                                                key={charIndex} 
                                                className={`${shouldApplyRed ? 'bg-[#D08383] decoration-[#D08383]' : shouldApplyGreen ? 'text-[#AAD52E] decoration-[#AAD52E]' : ''} ${word.state === 'active' && 'underline'}`}
                                            >
                                                {char}
                                            </div>
                                        )
                                    })}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className='w-full py-4 px-2'>
                        <input 
                            type="text" 
                            value={typedWord}
                            onKeyDown={handleInput}
                            onInput={e => setTypedWord(e.target.value.trim())}
                            className={`${wordsRef.current && !wordsRef.current[i].word.startsWith(typedWord) && 'bg-[#D08383]'} w-full rounded border border-[#D2DEE2] px-3 py-2`}
                            disabled={!racing}
                            ref={inputRef}
                        />
                    </div>
                </div>
                {/* <div className="mt-2 ml-2">
                    <div className="text-lg">{source}</div>
                    <div className="italic text-gray-500 text-xs">- {by}</div>
                </div> */}
                <div className='flex mt-5'>
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
        </div>
    )
}
