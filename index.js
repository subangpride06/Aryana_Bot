const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const pino = require('pino');

async function bot() {
  const auth = await useMultiFileAuthState('session');
  const socket = makeWASocket({
    printQRInTerminal: true,
    browser: ['Aryana_Offc', 'Termux', '1.0.0'],
    auth: auth.state,
    logger: pino({ level: "silent" })
  })

  socket.ev.on("creds.update", auth.saveCreds)
  socket.ev.on("connection.update", ({ connection }) => {
    if(connection === "open") {
      console.log("Bot Starting...")
    }
    if(connection === "close") {
      bot()
    }
  })

  socket.ev.on("messages.upsert", ({ messages }) => {
  if (messages && messages.length > 0) {
    const aryana = messages[0];
    if (aryana && aryana.message && aryana.message.conversation) {
      const cmd = aryana.message.conversation;
      function reply(text) {
        socket.sendMessage(aryana.key.remoteJid, { text: text }, { quoted: aryana });
      }

      if (cmd === 'p')  {
        reply("waalaikumsalam");
        return;
      }
      if (cmd === 'tes')  {
        reply("Bot Online Mas 🌹");
        return;
      }

      if (cmd === 'menu') {
        reply("Bot Sedang Dalam Pengembangan");
        return;
      }

      switch(cmd) {
        case 'owner': {
          reply("Ownerku Lagi Menikmati Masa Muda Kak, Tolong Jangan Diganggu Ya😁");
          break;
        }
      }
    }
  }
});
}
bot();
