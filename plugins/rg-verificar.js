import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender

    let perfil = await conn.profilePictureUrl(whe, 'image').catch(_ => 'https://files.catbox.moe/mszw73.jpg')

    if (user.registered === true) {
        return m.reply(`*${emojis} Ya te encuentras registrado.*\n\n*¿Quieres volver a registrarte?*\n\n*Use este comando para eliminar su registro*\n*\`${usedPrefix}unreg\`*`)
    }

    if (!Reg.test(text)) return m.reply(`*${emoji3} Ingresa tu nombre y edad para registrarte en mi base de datos.*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply(`*${emoji2} El nombre no puede estar vacío pendejo.*`)
    if (!age) return m.reply('*${emoji2} La edad no puede estar vacía.*')
    if (name.length >= 100) return m.reply('*⚠️ El nombre es demasiado largo.*')

    age = parseInt(age)
    if (age > 1000) return m.reply('*❌ Lᴀ Eᴅᴀᴅ Iɴɢʀᴇsᴀᴅᴀ ᴇs Iɴᴄᴏʀʀᴇᴄᴛᴀ*')
    if (age < 5) return m.reply('*❌ Lᴀ Eᴅᴀᴅ Iɴɢʀᴇsᴀᴅᴀ ᴇs Iɴᴄᴏʀʀᴇᴄᴛᴀ*')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].diamantes += 15
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let sn = createHash('md5').update(m.sender).digest('hex')
    let regbot = `*Registro - ${botname}*\n\n`
    regbot += `- *Nombre:* ${name}\n`
    regbot += `- *Edad:* ${age} años\n\n`
    regbot += `*Entregado:*\n\n`
    regbot += `💎 15 Diamantes\n`
    regbot += `💫 245 Exp\n`
    regbot += `> Coloca *.profile* para ver tu perfil.\n\n> ${dev}`

    await m.react('💌')
    await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰',
                body: dev,
                thumbnailUrl: 'https://files.catbox.moe/mszw73.jpg',
                sourceUrl: 'https://whatsapp.com/channel/0029Vb4TKBCD38CNEkfHdj1z',
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    let chtxt = `👤 *𝚄𝚂𝙴𝚁:* ${m.pushName || 'Anónimo'}
☕ *𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾:* ${user.name}
🤍 *𝙴𝙳𝙰𝙳:* ${user.age} años
📝 *𝙳𝙴𝚂𝙲:* ${user.descripcion}
🪪 *𝚂𝙴𝚁𝙸𝙴:*
⤷ ${sn}`;

    let channelID = '120363394571210599@newsletter';
    await conn.sendMessage(channelID, {
        text: chtxt,
        contextInfo: {
            externalAdReply: {
                title: "☕ 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 - 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎",
                body: '🥳 ¡ᥙᥒ ᥙsᥙᥲrі᥆ ᥒᥙᥱ᥎᥆ ᥱᥒ mі ᑲᥲsᥱ ძᥱ ძᥲ𝗍᥆s!',
                thumbnailUrl: perfil,
                sourceUrl: redes,
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: null });
};

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler