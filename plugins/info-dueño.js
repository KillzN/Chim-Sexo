let handler = async (m, { conn }) => {
  await m.react('🥷🏼');

  // Crear contacto VCARD
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Mvrco Sex
item1.TEL;waid=59178140029:59178140029
item1.X-ABLabel:Número
item2.URL:https://www.instagram.com/ineffable.mvrco
item3.X-ABLabel:Instagram
item4.ADR:;;Perú 🇵🇪;;;;
item4.X-ABLabel:País
END:VCARD`;

  const list = [{
    displayName: "Chim-Bot",
    vcard
  }];

  // Enviar mensaje con botón (tipo buttonsMessage con URL funcional)
  await conn.sendMessage(m.chat, {
    text: `✨ *Este es el contacto oficial de Mvrco Sex* ✨\n📱 Instagram: @ineffable.mvrco\n🌍 País: Perú 🇵🇪`,
    footer: 'Presiona el botón para hablar directo por WhatsApp 📲',
    buttons: [
      {
        buttonText: { displayText: '💬 Hablar por WhatsApp' },
        type: 1,
        url: 'https://wa.me/59178140029'
      }
    ],
    headerType: 1
  }, { quoted: m });

  // Enviar el contacto
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    }
  }, { quoted: m });
};

handler.help = ['owner', 'creador'];
handler.tags = ['info'];
handler.command = /^(owner|dueño|ss)$/i;

export default handler;
