
const handler = async (m, { text, conn, args, usedPrefix, command }) => {

    if (args.length < 2) {  
        conn.reply(m.chat, `*${emojis} Proporciona una hora seguido el país y una modalidad.*
*Usa MX para México, CO para Colombia o PE para Perú.*
*💡 Ejemplo:* .${command} 20 co Vv2`, m);
        return;
    }

    // Validación de formato 24 horas
    const horaRegex = /^([01]?[0-9]|2[0-3])(:[0-5][0-9])?$/;  
    if (!horaRegex.test(args[0])) {  
        conn.reply(m.chat, '*⏰ Formato de hora incorrecto.*', m);  
        return;  
    }  

    let [hora, minutos] = args[0].includes(':') ? args[0].split(':').map(Number) : [Number(args[0]), 0];

    const pais = args[1].toUpperCase();  

    const zonasHorarias = {
        CO: 'America/Bogota',
        MX: 'America/Mexico_City',
        PE: 'America/Lima',
    };

    if (!(pais in zonasHorarias)) {  
        conn.reply(m.chat, `*${emojis} País no válido. Usa MX, CO o PE.*`, m);  
        return;  
    }  

    const horasEnPais = {};

    // Se usa una fecha fija y se ajusta por zona horaria
    for (const key in zonasHorarias) {
        const horaBase = new Date(Date.UTC(2000, 0, 1, hora, minutos));  
        horasEnPais[key] = horaBase.toLocaleTimeString('es-PE', {
            timeZone: zonasHorarias[key],
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const modalidad = args.slice(2).join(' ');  
    m.react('🎮');  

    let titulo = '';
    let players = [];
    let iconos = [];
    let iconos2 = [];

    switch (command) {
        case 'v4fem':
        case 'vsfem4':
            titulo = '4VS4 FEM';
            players = ['Jᥙgᥲძ᥆rᥲs:'];
            iconos = ['🌸', '🌸', '🌸', '🌸'];
            iconos2 = ['🌸', '🌸'];
            break;
        case 'v4masc':
        case 'vsmasc4':
            titulo = '4VS4 MASC';
            players = ['Jᥙgᥲძ᥆rᥱs'];
            iconos = ['🥥', '🥥', '🥥', '🥥'];
            iconos2 = ['🥥', '🥥'];
            break;
        case 'v4mixto':
        case 'vsmixto4':
            titulo = '4VS4 MIXTO';
            players = ['Jᥙgᥲძ᥆r᥊s'];
            iconos = ['🍁', '🍁', '🍁', '🍁'];
            iconos2 = ['🍁', '🍁'];
            break;
        case 'v6fem':
        case 'vsfem6':
            titulo = '6VS6 FEM';
            players = ['Jᥙgᥲძ᥆rᥲs'];
            iconos = ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋'];
            iconos2 = ['🦋', '🦋'];
            break;
        case 'v6masc':
        case 'vsmasc6':
            titulo = '6VS6 MASC';
            players = ['Jᥙgᥲძ᥆rᥱs'];
            iconos = ['🥞', '🥞', '🥞', '🥞', '🥞', '🥞'];
            iconos2 = ['🥞', '🥞'];
            break;
        case 'v6mixto':
        case 'vsmixto6':
            titulo = '6VS6 MIXTO';
            players = ['Jᥙgᥲძ᥆r᥊s'];
            iconos = ['🥯', '🥯', '🥯', '🥯', '🥯', '🥯'];
            iconos2 = ['🥯', '🥯'];
            break;
        default:
            conn.reply(m.chat, '*❌ Comando no válido.*', m);
            return;
    }

    const message = `ㅤㅤㅤ *\`${titulo}\`*

🕹꒱ *ᴍᴏᴅᴀʟɪᴅᴀᴅ:* ${modalidad}
⏰꒱ *ʜᴏʀᴀ:* ${horasEnPais.MX} 🇲🇽 ${horasEnPais.CO} 🇨🇴

ㅤ \`${players}\`

${iconos.map(icono => `${icono}˚ `).join('\n')}

ㅤ \`Sᥙ⍴ᥣᥱᥒ𝗍ᥱs:\`

${iconos2.map(icono => `${icono}˚ `).join('\n')}

> © Sunflare - Adapted `.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['inmixto4', 'inmixto6', 'inmasc4', 'inmasc6', 'infem4', 'infem6'];
handler.tags = ['ff'];
handler.command = /^(v4fem|vsfem4|v4masc|vsmasc4|v4mixto|vsmixto4|v6fem|vsfem6|v6masc|vsmasc6|v6mixto|vsmixto6)$/i;

export default handler;