import { Grid, TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'

function GameOver() {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    const enterInputs = (ev) => {
        setInputs({ ...inputs, [ev.target.id]: ev.target.value })
    }

    const sendData = () => {
        alert("send data!")
    }
    
    return (
        <Grid container justify={'center'} alignItems={'center'} direction={'column'} style={{ marginTop: '50px'}}>
            <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                required
                id="firstName"
                label="first name"
                value={inputs.firstName}
                onChange={enterInputs}
            />
            <TextField
                // autoFocus
                variant="outlined"
                margin="normal"
                required
                id="lastName"
                label="last name"
                value={inputs.lastName}
                onChange={enterInputs}
            />
            <TextField
                // autoFocus
                variant="outlined"
                margin="normal"
                required
                id="phoneNumber"
                label="phone number"
                value={inputs.phoneNumber}
                onChange={enterInputs}
            />
            <Button
                type={'submit'}
                size={'large'}
                color={'secondary'}
                variant={'contained'}
                style={{ marginTop: '20px'}}
                onClick={sendData}
                disabled={inputs.firstName != '' & inputs.lastName != '' & inputs.phoneNumber != '' ? false : true}
            >
                Send
            </Button>
        </Grid>
    )
}

export default GameOver
