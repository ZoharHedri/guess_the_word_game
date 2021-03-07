import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";


function IntroPage() {
    const history = useHistory();

    const startTheGame = () => {
        history.push('/play');
    }
    return (
        <Grid>
            <h1>Welcome to "Guess the word" game!</h1>
            <h4>To start the game perss on the button below</h4>
            <Button
                variant="contained"
                color="primary"
                onClick={startTheGame}
            >
                Statr
            </Button>
        </Grid>
    )
}

export default IntroPage
