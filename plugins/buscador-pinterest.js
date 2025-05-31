import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`¡Ingrese palabras clave de búsqueda!\nEjemplo: ${usedPrefix + command} waguri | 5`);
  }

  await conn.sendMessage(m.chat, { text: '⏳ Ten paciencia, buscando en Pinterest.' }, { quoted: m });

  const [query, jumlahStr] = text.split('|').map(v => v.trim());
  const jumlah = Math.min(parseInt(jumlahStr) || 5, 10);

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  try {
    const api = `https://api.vreden.my.id/api/pinterest?query=${encodeURIComponent(query)}`;
    const { data } = await axios.get(api);
    const hasil = data?.result || [];

    if (!hasil.length) return m.reply('❌ No se encontraron imágenes.');

    shuffle(hasil);
    const images = hasil.slice(0, jumlah);
    const cards = [];

    for (let i = 0; i < images.length; i++) {
      const imageMsg = await createImage(images[i]);
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `✔️ Imagen ${i + 1} de ${images.length}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: 'Pinterest Search By Waguri-Ai'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: true,
          imageMessage: imageMsg
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Ver en Pinterest",
                url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`
              })
            }
          ]
        })
      });
    }

    const carousel = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: "*Aquí están los resultados de tu búsqueda en Pinterest:*"
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, {});

    await conn.relayMessage(m.chat, carousel.message, { messageId: carousel.key.id });

  } catch (err) {
    console.error(err);
    m.reply(`❌ Error al obtener los datos\nLogs error: ${err.message}`);
  }
};

handler.help = ['pinterest <consulta> | <número>'];
handler.tags = ['internet'];
handler.command = /^pin|pinterest$/i;
handler.premium = false;
handler.limit = false;

export default handler;