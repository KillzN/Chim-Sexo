import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true
  if (!m.messageStubParameters || !m.messageStubParameters.length) return true;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split('@')[0]}`;
  let chat = global.db.data.chats[m.chat];
  let defaultImage = 'https://files.catbox.moe/h82j0e.jpg';

  if (chat?.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    const welcomeMessage = chat.welcomeMessage || 'Bienvenido/a :';
    const despMessage = chat.despMessage || 'Se Fue😹';

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏╼★${botname}\n┋「 Bienvenido 」\n┗╼★ 「 ${taguser} 」\n ┋❖ ${welcomeMessage}\n ┋❀  ${groupMetadata.subject}\n ┗━━━━━━━━━━━━━━━┅ ⳹\n> ✐ Puedes usar *#profile* para ver tu perfil.`;
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] }, { quoted: m });
    } else if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) {
      let bye = `┏╼★${botname}\n┋「 ADIOS 👋 」\n┗╼★ 「 ${taguser} 」\n ┋❖ ${despMessage}\n ┋❀ Jamás te quisimos aquí\n ┗━━━━━━━━━━━━━━━┅ ⳹\n> ${dev}`;
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] }, { quoted: m });
    }
  }

  return true;
}