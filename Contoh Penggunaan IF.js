const { default: makeWASocket, useMultiFileAuthState } =  require('@whiskeysockets/baileys');
const pino = require('pino');
async function imbot() {
const auth = await useMultiFileAuthState('imsession')
const socket = makeWASocket({
printQRInTerminal: true,
browser: ['Imbot','version','1.0.0'],
auth: auth.state,
logger: pino({ level: "silent" })
})
socket.ev.on("creds.update", auth.saveCreds)
socket.ev.on("connection.update",({ connection }) => {
if(connection === "open") {
console.log("project im bot activate")
}
if(connection === "close") {
imbot()
}
});
socket.ev.on("messages.upsert", ({ messages }) => {
const receive = messages[0]
const cmd = receive.message.conversation
function reply(text) {
socket.sendMessage(receive.key.remoteJid, { text: text }, { quoted: receive})
}
if (cmd == 'hai') {
reply("hallo")
return
}
else if (cmd == 'ping') {
reply("pong")
return
}
})
}
imbot();
