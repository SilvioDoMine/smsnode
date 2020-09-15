const { spawn } = require("child_process");
const express = require('express')
const app = express()


app.get('/sms/:number/:text', (req, res) => {
    const numberToSend = req.params.number.replace(/[^0-9]/g, '')
    const textToSend = req.params.text

    const command = spawn(`termux-sms-send -n 015${numberToSend} "${textToSend}"`)

    command.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    command.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    command.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });
    
    command.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

    return true;
})

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
})
