import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply(`*${emojis} Responde al sticker.*`, m, rcanal)
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return m.reply(`*${emojis} Responde al sticker.*`)
    let img = await m.quoted.download()
    if (!img) return m.reply(`*${emojis} Responde al sticker.*`, m, rcanal)
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m)
    else return m.reply(`*${emojis} Responde al sticker.*`, m, rcanal)
  }
}
handler.help = ['wm']
handler.tags = ['sticker']
handler.command = ['take', 'wm']

export default handler