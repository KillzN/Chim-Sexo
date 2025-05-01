import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs';
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/8bywlp.jpg')

let { premium, level, description, diamantes, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender];

age = age || 'Sin especificar';
description = description || 'Sin descripción';

let username = conn.getName(who)
let noprem = `
*_PERFIL DEL USUARIO_*

👤 *Nombre:* ${username}
🏷️ *Tag:* @${who.replace(/@.+/, '')}
🍒 *Edad:* ${age}
💌 *Registrado:* ${registered ? '✅': '❌'}
🪪 *Premium:* ${premium ? '✅': '❌'}
📝 *Descripción:* ${description}

*_RECURSOS OBTENIDOS_*

*💎 Diamantes* ${diamantes || 0}
*🆙 Nivel:* ${level || 0}
*💫 Exᴘ* ${exp || 0}
*🐈 Rango:* ${role}

> By Jota Bot - MD
`.trim()
let prem = `╭─⪩ 𓆩 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𓆪
│⧼👤⧽ *Usᴜᴀʀɪᴏ:* ${username}
│⧼💌⧽ *Rᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅': '❌'}
│⧼🔱⧽ *Rᴏʟ:* Vip 👑
╰─────────────⪩

╭─⪩ 𓆩 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𓆪
│⧼💎⧽ *:* ${diamantes}
│⧼🆙⧽ *Nɪᴠᴇʟ:* ${level}
│⧼💫⧽ *Exᴘ* ${exp}
│⧼⚜️⧽ *Rᴀɴɢᴏ:* ${role}
╰─────────────⪩`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler