import React from 'react';
import { useState } from 'react';
import questions from '../questions';
import './Questions.css';

function Questions() {
    const [count, setCount] = useState(0);
    const [score, setScore] = useState(0);
    const [play, setPlay] = useState(false);
    const [playAgain, setPlayAgain] = useState(true);
    const [scorepage, setScorePage] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

    const optionClick = (event) => {
        const selectedId = parseInt(event.target.id, 10);
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[count] = selectedId;
        setSelectedOptions(newSelectedOptions);

        // Update score based on selected option
        if (selectedId === 0) {
            setScore((prevScore) => prevScore + 1);
        } else {
            setScore((prevScore) => prevScore - 1);
        }
    };

    const next = () => {
        if (count < questions.length - 1) {
            setCount((prevCount) => prevCount + 1);
        } else {
            scorePage();
        }
    };

    const previous = () => {
        if (count > 0) {
            setCount((prevCount) => prevCount - 1);

            // Decrease score when going back and reselecting the previous option
            if (selectedOptions[count - 1] !== null) {
                setScore((prevScore) => prevScore - 1);
            }
        }
    };

    const scorePage = () => {
        setScorePage(true);
    };

    const playButton = () => {
        setPlay(!play);
    };

    const playagain = () => {
        setCount(0);
        setScore(0);
        setScorePage(false);
        setPlayAgain(true);
        setSelectedOptions(Array(questions.length).fill(null));
    };

    const quit = () => {
        setPlay(false);
        setScorePage(false);
        setPlayAgain(true);
        setCount(0);
        setScore(0);
        setSelectedOptions(Array(questions.length).fill(null));
    };

    const backToHome = () => {
        setPlayAgain(true);
        setPlay(false);
        setScorePage(false);
        setSelectedOptions(Array(questions.length).fill(null));
    };

    return (
        <div>
            <div>
                {/* first page */}
                <div className="firstpage" style={play ? { display: 'none' } : playAgain ? { display: 'block' } : null}>
                    <h2>Quiz App</h2>
                    <button className="play" onClick={playButton}>
                        Play
                    </button>
                </div>
                {/* question box */}
                <div className="main" style={play && !scorepage ? { display: 'block' } : null}>
                    <h1>Question</h1>
                    <h4 className="questionCount">{count + 1} of 5</h4>
                    <h2>{questions[count].text}</h2>
                    <div className="options">
                        {questions[count].options.map((option, index) => (
                            <button
                                key={index}
                                className={`btn ${selectedOptions[count] === index ? 'selected' : ''}`}
                                onClick={optionClick}
                                id={index.toString()}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                    <div className="btns">
                        <button style={{ backgroundColor: '#3E7EAA', color: 'black' }} onClick={previous}>
                            Previous
                        </button>
                        <button style={{ backgroundColor: '#008001', color: 'black' }} onClick={next}>
                            Next
                        </button>
                        <button style={{ backgroundColor: 'red', color: 'black' }} onClick={quit}>
                            Quit
                        </button>
                    </div>
                </div>
                {/* result box */}
                <div className="result" style={scorepage && playAgain ? { display: 'block' } : { display: 'none' }}>
                    <h2>Result</h2>
                    <div className="scoreCard">
                        <div className="top">
                            <h4>Total Questions</h4>
                            <h2>Score</h2>
                        </div>
                        <div className="bottom">
                            <div className="bottom1">
                                <p>Total number of questions</p>
                                <p>Number of attempted questions</p>
                                <p>Number of correct answers</p>
                                <p>Number of wrong answers</p>
                            </div>
                            <div className="bottom2">
                                <p>{questions.length}</p>
                                <p>{count + 1}</p>
                                <p>{score}</p>
                                <p>{count + 1 - score}</p>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="playAgain" onClick={playagain}>
                            Play Again
                        </button>
                        <button className="backToHome" onClick={backToHome}>
                            Back To Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Questions;
