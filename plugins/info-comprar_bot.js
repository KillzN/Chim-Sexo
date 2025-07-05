const handler = async (m, { conn }) => {

  conn.sendMessage(m.chat, {
    text: `https://chat.whatsapp.com/HqhAoXS8TCcJIn0KrbJZKz`,
  }, { quoted: fkontak });
};
handler.command = ['comprar'];
export default handler;