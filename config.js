import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

global.owner = [
   ['59178140029', 'Chim-Bot', true]
]

global.creadorbot = [
   ['59178140029', 'Chim-Bot', true]
]

global.mods = ['59178140029', '59178140029', '59178140029']
global.prems = ['59178140029', '59178140029']


global.packname = 'Chim-Bot'
global.botname = 'chim.ventas'
global.wm = '𝙺𝙸𝙻𝙻 𝙱𝙾𝚃'
global.author = 'chim.ventas'
global.dev = 'Chim-Bot'
global.errorm = 'Error: ${error.message}'
global.nombrebot = 'chim.ventas'
global.textbot = `Chim-Bot`
global.vs = '1.0.0'


global.catalogo = fs.readFileSync('./media/catalogo.jpg')


global.repobot = 'https://github.com/KillzN/Chim-Bot'
global.grupo = 'https://chat.whatsapp.com/HqhAoXS8TCcJIn0KrbJZKz'
global.comu = 'https://chat.whatsapp.com/Ehs4pdSEW4o9ub8G3SPVaT'
global.channel = 'https://www.whatsapp.com/channel/0029Vb4TKBCD38CNEkfHdj1z'
global.insta = 'https://www.instagram.com/ineffable.mvrco'


global.estilo = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "59178140029-120363317332020195@g.us" } : {}) }, message: { orderMessage: { itemCount: -999999, status: 1, surface: 1, message: '𝙼𝚟𝚛𝚌𝚘 𝚂𝚎𝚡𝚘', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net' } } }


global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment


global.multiplier = 69
global.maxwarn = '3'


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
   unwatchFile(file)
   console.log(chalk.redBright("Update 'config.js'"))
   import(`${file}?update=${Date.now()}`)
})