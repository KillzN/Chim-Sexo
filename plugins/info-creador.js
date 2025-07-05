import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    await m.react('🤍');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let username = await conn.getName(m.sender);

    // Descargar imagen como thumbnail (puedes cambiar la URL por una tuya)
    let res = await fetch('https://files.catbox.moe/qmhhxy.png');
    let thumb = await res.buffer();

    // VCARD con tus datos
    let list = [{
        displayName: "Mvrco Sex",
        vcard: `BEGIN:VCARD
VERSION:3.0
FN:Mvrco Sex
item1.TEL;waid=56983073328:56983073328
item1.X-ABLabel:Número
item2.URL:https://www.instagram.com/ineffable.mvrco
item3.X-ABLabel:Instagram
item4.ADR:;;Perú;;;;
item4.X-ABLabel:País
END:VCARD`
    }];

    // Enviar contacto con preview enriquecido (thumbnail, título y botón WhatsApp)
    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'Hᴏʟᴀ, Mɪ Cʀᴇᴀᴅᴏʀ Es Mᴀʀᴄᴏ Sᴇxᴏ',
                body: 'Instagram: @ineffable.mvrco',
                thumbnail: thumb,
                sourceUrl: 'https://wa.me/56983073328',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    // Mensaje de texto adicional personalizado con mención
    let txt = `👋🏻 *Hola @${username}, este es*\n*el contacto oficial de Mvrco Sex.*\n\nPuedes agregarlo o escribirle usando los botones que aparecen abajo.`;

    await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|dueño|ss|creador)$/i;

export default handler;
