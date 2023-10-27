const {
    default: makeWASocket,
        useMultiFileAuthState
    } = require('@whiskeysockets/baileys');
    const pino = require('pino');
    async function imbot() {
        const auth = await useMultiFileAuthState('imsession')
        const socket = makeWASocket({
            printQRInTerminal: true,
            browser: ['Imbot', 'version', '1.0.0'],
            auth: auth.state,
            logger: pino({
                level: "silent"
            })
        })
        socket.ev.on("creds.update", auth.saveCreds)
        socket.ev.on("connection.update", ({
            connection
        }) => {
            if (connection === "open") {
                console.log("project im bot activate")
            }
            if (connection === "close") {
                imbot()
            }
        })
    }
    imbot();
