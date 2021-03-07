import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
    root: {
        // display: ' flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: '200px',
    },
    textStyle: {
        fontSize: '25px',
        fontWeight: 'bold'
    },
    letter: {
        color: 'transparent',
        display: 'inline-block',
        borderBottom: '5px solid #53BDFF',
        margin: '0 10px',
        fontSize: '30px',
        padding: '15px',
        // transition: '.5s',
        textTransform: 'uppercase',
    },
    word: {
        display: 'block',
        whiteSpace: 'nowrap',
        padding: '0'
    },
    correct: {
        color: '#53BDFF',
        // textShadow: '1px 2px 0 darken(#53BDFF, 10%)',
        // animation: 'letteranim .3s ease',
        display: 'inline-block',
        borderBottom: '5px solid #53BDFF',
        fontSize: '30px',
        margin: '0 10px',
        padding: '15px',
        // transition: '.5s',
        textTransform: 'uppercase',
    },
    wrongLetters: {
        fontSize: '20px',
        padding: '0'
    },
    wrongText: {
        marginBottom: '10px',
    },
    wrongLi: {
        display: 'inline-block',
        color: 'white',
        //   background: 'lighten(red,15%)',
        background: 'red',
        fontSize: '40px',
        textShadow: '1px 2px 0 red',
        textTransform: 'uppercase',
        //   animation: 'letteranim .3s ease',
        padding: '10px',
        marginRight: '10px',
    },
    guessLetter: {
        outline: 'none',
        padding: '10px',
        fontSize: '30px',
        marginBottom: '20px',
        marginRight: ' 5px',
        border: '1px solid #aaa',
        color: 'gray',
    }
})

function GamePlay() {
    const classes = useStyles();
    const history = useHistory();
    const wordList = ["chrome", "javascript", "github", "bambidynamic", "wordpress", "layout",
        "semantic", "developer", "component", "website", "browser", "screen", "mobile", "footer",
        "header", "typography", "responsive", "css", "bootstrap", "node", "element", "application",
        "apple", "google", "microsoft", "icon", "svg", "html", "font", "network", "server", "database",
        "function", "variable", "query", "email", "underscore"];
    const [letters, setLetters] = useState([]);
    const [guessLetterInput, setGuessLetterInput] = useState('');
    const [correct, setCorrect] = useState(1);
    const [rightGuesses, setRightGuesses] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState([]);
    const [life, setLife] = useState(3);
    const [score, setScore] = useState(0)

    const randomWord = () => {
        let wrd = _wordData(wordList[Math.floor(Math.random() * wordList.length)]);
        console.log('wrd', wrd);
        return wrd;
    }

    const _wordData = (word) => {
        return {
            letters: _letters(word),
            word: word.toLowerCase(),
            totalLetters: word.length
        };
    }

    const _letters = (word) => {
        var letters = [];
        for (var i = 0; i < word.length; i++) {
            letters.push({
                letter: word[i],
                positon: i,
                display: false
            });
        }
        setLetters(letters)
        return letters;
    }

    const showRightGuess = () => {
        return (
            <ul className={classes.word}>
                {
                    letters.map((item, index) => {
                        if (index == 0) {
                            return <li key={item.positon}
                                data-positon={item.positon}
                                className={classes.correct}>
                                {item.letter}
                            </li>
                        } else {
                            return <li key={item.positon}
                                data-positon={item.positon}
                                className={item.display ? classes.correct : classes.letter}>
                                {item.display ? item.letter : "*"}
                            </li>
                        }
                    })
                }
            </ul>
        )
    }

    const showWrongGuess = () => {
        if (wrongGuesses.length > 0) {
            return (
                <ul className={classes.wrongLetters}>
                    <p className={classes.wrongText}>Wrong Letters: </p>
                    {
                        wrongGuesses.map((letter, index) => {
                            return <li key={index} className={classes.wrongLi}>{letter}</li>
                        })
                    }
                </ul>
            )
        }
        else {
            return "";
        }
    }

    const guessOneLetter = (e) => {
        let letter = e.target.value
        if (letter.length <= 1) {
            setGuessLetterInput(letter);
        }
    }

    const theGuess = (e) => {
        e.preventDefault();
        var guess = guessLetterInput;
        if (guess.match(/[a-zA-Z]/) && guess.length == 1) {
            if ((wrongGuesses.indexOf(guess) > -1) || (rightGuesses.indexOf(guess) > -1)) {
                setGuessLetterInput("");
            } else if (guess) {
                var foundLetters = checkGuess(guess);
                if (foundLetters.length > 0) {
                    addCorrectLetter(foundLetters);
                    setGuessLetterInput("");
                } else {
                    setWrongGuesses([...wrongGuesses, guess]);
                    setLife(life - 1)
                    if (wrongGuesses.length == 2) {
                        lose();
                    } else {
                        showWrongGuess();
                    }
                    setGuessLetterInput("");
                }
            }
        } else {
            setGuessLetterInput("");
        }
    }

    const checkGuess = (guessedLetter) => {
        var found = [];
        letters.map(item => {
            if (guessedLetter == item.letter.toLowerCase()) {
                found.push(item);
                setRightGuesses([...rightGuesses, item.letter]);
            }
        })
        return found;
    }

    const addCorrectLetter = (foundLetters) => {
        let lettersToDispaly = letters;
        setCorrect(correct + foundLetters.length);
        lettersToDispaly.map((item, index) => {
            if (item.letter.toLowerCase() == foundLetters[0].letter.toLowerCase()) {
                lettersToDispaly[index].display = true;
            }
        });
        setLetters(lettersToDispaly);

        if (correct + foundLetters.length == letters.length) {
            nextWord();
        }
    }

    const nextWord = () => {
        setScore(score + 1);
        setTimeout(() => {
            setCorrect(0);
            setRightGuesses([]);
            setWrongGuesses([]);
            randomWord();
        }, 2000);
    }

    const lose = () => {
        history.push('/gameover');
    }

    useEffect(() => {
        randomWord()
    }, []);

    return (
        <Grid className={classes.root}>
            <Grid container item alignItems={'center'} justify={'space-around'} xs={12} style={{ marginTop: '15px' }} >
                <Grid className={classes.textStyle}>Life:
                    {
                        life == 3 ?
                            <span style={{ marginLeft: '15px', color: 'green' }}>| | |</span>
                            :
                            (life == 2 ?
                                <span style={{ marginLeft: '15px', color: 'yellow' }}>| |</span>
                                :
                                <span style={{ marginLeft: '15px', color: 'red' }}>|</span>
                            )
                    }
                </Grid>
                <Grid className={classes.textStyle}>Score: {score}</Grid>
            </Grid>

            <Grid>
                {showRightGuess()}
            </Grid>

            <Grid>
                <form className="guessForm">
                    <Grid>
                        <TextField
                            autoFocus
                            type="text"
                            // className={classes.guessLetter}
                            variant="outlined"
                            placeholder="Enter a letter . . ."
                            value={guessLetterInput}
                            onChange={guessOneLetter}
                        />
                    </Grid>

                    <Grid>
                        <Button
                            type="submit"
                            className="guessButton"
                            variant="contained"
                            style={{ backgroundColor: '#53BDFF', color: 'white', marginTop: '15px' }}
                            onClick={theGuess}
                        >
                            Guess
                    </Button>
                    </Grid>

                </form>
            </Grid>

            <Grid>
                {showWrongGuess()}
            </Grid>

        </Grid>
    )
}

export default GamePlay
