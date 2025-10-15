import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('🍓')

    let { exp, bank, registered } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let groupUserCount = m.isGroup ? participants.length : '-'

    let perfil = await conn.profilePictureUrl(conn.user.jid, 'image')
      .catch(() => 'https://raw.githubusercontent.com/Whiteelpro/Halad/refs/heads/main/xd.jpg')

    const userId = m.sender.split('@')[0]
    let taguser = `@${userId}`
    let phone = PhoneNumber('+' + userId)
    let pais = phone.getRegionCode() || 'Desconocido 🌐'

    const vids = [
      'https://files.cloudkuimages.guru/videos/1be9909f40c6.mp4',
      'https://files.cloudkuimages.guru/videos/457c99dda512.mp4',
      'https://files.cloudkuimages.guru/videos/72ff9ca3ddda.mp4'
    ]
    let videoUrl = vids[Math.floor(Math.random() * vids.length)]

    const header = [
      `╔═━★•°*"'*°•★━═╗`,
      `    ✦ ꧁𝐖𝐞𝐥𝐜𝐨𝐦𝐞꧂ ✦`,
      `╚═━★•°*"'*°•★━═╝`
    ].join('\n')

    const user = global.db.data.users[m.sender] || {};
    const country = user.country || '';
    const isPremium = user.premium || false;


    const channelRD = { 
      id: 'https://chat.whatsapp.com/ER2YrkCYaqsDUCp6EUJALG', 
      name: '𝖧𝖺𝗅𝖺𝖽 𝖡𝗈𝗍 𝖠𝖨 : 𝖦𝗋𝗈𝗎𝗉 𝖮𝖿𝗂𝖼𝗂𝖺𝗅'
    }


    const metaMsg = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: ' ֪Halad💣🔥',
          body: '𝖱𝗈𝗑𝗒-𝖠𝗂 : Halad 📌',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: 'https://raw.githubusercontent.com/Whiteelpro/Halad/refs/heads/main/xd.jpg',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    const body = `
*ര ׄ 🌟 ׅ Bienvenido a, Halad MD*
────────────────
*✨ I N F O R M A C I Ó N ✨*

*\`· ›  Nombre del Bot\`* :: Halad
*\`· ›  Nombre de Usuario\`* :: ${taguser}
*\`· ›  Estado\`* :: Gratis
*\`· ›  Tiempo en línea\`*  :: ${uptime}
────────────────

*\`sі ᥱᥒᥴᥙ𝗍rᥲs ᥙᥒ ᥱrr᥆r ᥴ᥆ᥒ𝗍ᥲᥴ𝗍ᥲ ᥴ᥆ᥒ ᥱᥣ ᥆ᥕᥒᥱr\`*
*\`sі 𝗊ᥙіᥱrᥱs ᥴrᥱᥲr ᥙᥒ sᥙᑲᑲ᥆𝗍 ᥙSᥲ\`*
_#code_

𓂂𓏸  𐅹੭੭   *\`Mᥲіᥒ\`* ☁️ ᦡᦡ

ര ׄ ☁️ ׅ ${usedPrefix}ʀᴇɢ <ɴᴏᴍʙʀᴇ ᴇᴅᴀᴅ>
ര ׄ ☁️ ׅ ${usedPrefix}ᴜɴʀᴇɢ
ര ׄ ☁️ ׅ ${usedPrefix}ᴍᴇɴᴜ
ര ׄ ☁️ ׅ ${usedPrefix}ᴊᴜᴇɢᴏs
ര ׄ ☁️ ׅ ${usedPrefix}ᴘɪɴɢ
ര ׄ ☁️ ׅ ${usedPrefix}ɢʀᴜᴘᴏs
ര ׄ ☁️ ׅ ${usedPrefix}ᴏᴡɴᴇʀ



𓂂𓏸  𐅹੭੭   *\`𝖣ᨣ𝗐𝗇𝗅ᨣ𝖺𝖽ᧉꭇ𝗌\`* 🍄 ᦡᦡ

ര ׄ 🍄 ׅ ${usedPrefix}ᴛɪᴋᴛᴏᴋ
ര ׄ 🍄 ׅ ${usedPrefix}ᴘʟᴀʏ
ര ׄ 🍄 ׅ ${usedPrefix}ᴘɪɴᴅʟ <link>
ര ׄ 🍄 ׅ ${usedPrefix}ɪɴsᴛᴀɢʀᴀᴍ <link>
ര ׄ 🍄 ׅ ${usedPrefix}ꜰᴀᴄᴇʙᴏᴏᴋ <link>


𓂂𓏸  𐅹੭੭   *\`𝖲ᧉ𝖺ꭇ𝖼𝗁\`* 🧃 ᦡᦡ

ര ׄ 🧃 ׅ ${usedPrefix}ʏᴛs
ര ׄ 🧃 ׅ ${usedPrefix}ᴘɪɴᴛᴇʀᴇsᴛ
ര ׄ 🧃 ׅ ${usedPrefix}ᴀᴘᴛᴏɪᴅᴇ<texto>
ര ׄ 🧃 ׅ ${usedPrefix}ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ
ര ׄ 🧃 ׅ ${usedPrefix}sꜱᴡᴇʙ
ര ׄ 🧃 ׅ ${usedPrefix}sᴘᴏᴛɪꜰʏ


𓂂𓏸  𐅹੭੭   *\`𝗀ꭇ𝗎𝗉ᨣ𝗌\`* 🍯 ᦡᦡ

ര ׄ 🍯 ׅ ${usedPrefix}ᴛᴀɢᴛᴇxᴛ
ര ׄ 🍯 ׅ ${usedPrefix}ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀ <@tag> <text>
ര ׄ 🍯 ׅ ${usedPrefix}ᴘᴇʀғɪʟ
ര ׄ 🍯 ׅ ${usedPrefix}ɢʀᴜᴘᴏᴄᴇʀʀᴀʀ
ര ׄ 🍯 ׅ ${usedPrefix}ɢʀᴜᴘᴏᴀʙʀɪʀ
ര ׄ 🍯 ׅ ${usedPrefix}ɪɴᴠᴏᴄᴀʀ 
ര ׄ 🍯 ׅ ${usedPrefix}sᴇᴛᴘᴘɢʀᴜᴘᴏ 
ര ׄ 🍯 ׅ ${usedPrefix}ᴋɪᴄᴋ <@tag>
ര ׄ 🍯 ׅ ${usedPrefix}ᴛᴀɢ
ര ׄ 🍯 ׅ ${usedPrefix}ᴅᴇʟ


𓂂𓏸  𐅹੭੭   *\`𝖨𝗇ƚᧉ𝖨ı𝗀ᧉ𝗇𝖼ı𝖺𝗌\`* 🧋 ᦡᦡ

ര ׄ 🧋 ׅ ${usedPrefix}ᴍᴀɢɪᴄsᴛᴜᴅɪᴏ <texto>
ര ׄ 🧋 ׅ ${usedPrefix}ᴀɪ <texto>
ര ׄ 🧋 ׅ ${usedPrefix}ᴡᴘᴡ
ര ׄ 🧋 ׅ ${usedPrefix}ᴘᴏʟʟɪɴᴀᴛɪᴏɴs <texto>
ര ׄ 🧋 ׅ ${usedPrefix}ɢᴇᴍɪɴɪ
ര ׄ 🧋 ׅ ${usedPrefix}ʙɢʀᴇᴍᴏᴠᴇʀ <imagen>


𓂂𓏸  𐅹੭੭   *\`𝖨𝗇ƚᧉꭇ𝗇ᧉƚ\`* 🍟 ᦡᦡ

ര ׄ 🍟 ׅ ${usedPrefix}ɴɪᴍᴇɢᴀᴍᴇsᴇᴀʀᴄʜ
ര ׄ 🍟 ׅ ${usedPrefix}ᴍᴇɪᴏ
    
    
𓂂𓏸  𐅹੭੭   *\`𝖩𝖺𝖽ı-ᗷᨣƚ𝗌\`* 🍰 ᦡᦡ

ര ׄ 🍰 ׅ ${usedPrefix}ʙᴏᴛs
ര ׄ 🍰 ׅ ${usedPrefix}ᴄᴏᴅᴇ


𓂂𓏸  𐅹੭੭   *\`𝗈ɯ𝗇ᧉꭇ\`* 🌷 ᦡᦡ
ര ׄ 🌷 ׅ ${usedPrefix}ʀᴇɪɴɪᴄɪᴀʀ
ര ׄ 🌷 ׅ ${usedPrefix}ᴅsᴏᴡɴᴇr
ര ׄ 🌷 ׅ ${usedPrefix}sᴇᴛɴᴀᴍᴇ
ര ׄ 🌷 ׅ ${usedPrefix}sᴇᴛᴘᴘ <img>
ര ׄ 🌷 ׅ ${usedPrefix}ʀᴇsᴛᴀʀᴛ
ര ׄ 🌷 ׅ ${usedPrefix}ᴜᴘᴅᴀᴛᴇ


𓂂𓏸  𐅹੭੭   *\`𝖲ƚ𝗂𝖼𝗄ᧉꭇ\`* 🫓 ᦡᦡ

ര ׄ 🫓 ׅ ${usedPrefix}sᴛɪᴄᴋᴇʀ <img>
ര ׄ 🫓 ׅ ${usedPrefix}ʙʀᴀᴛ *<texto>*


𓂂𓏸  𐅹੭੭   *\`𝖳ᨣᨣ𝗅𝗌\`* 🍵 ᦡᦡ

ര ׄ 🍵 ׅ ${usedPrefix}sᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ <text>
ര ׄ 🍵 ׅ ${usedPrefix}ʀᴠᴏᴄᴀʟ <audio>
ര ׄ 🍵 ׅ ${usedPrefix}ᴛᴏᴜʀʟ2
ര ׄ 🍵 ׅ ${usedPrefix}ʜᴅ
ര ׄ 🍵 ׅ ${usedPrefix}ᴛᴏᴜʀʟ <imagen>
`.trim()

    const menu = `${header}\n${body}`
    
    const botname = '◌*̥₊ Hᴀʟᴀᴅ-Mᴅ ◌❐🎋༉'
    const textbot = '💖 𝙃𝘼𝙇𝘼𝘿 𝘽𝙔 𝘿𝙀𝙑 Whiteelpro ✨️'
    const banner = perfil
    const redes = 'https://chat.whatsapp.com/ER2YrkCYaqsDUCp6EUJALG?mode=wwc'
    
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: body,
      gifPlayback: true,
      mentions: [m.sender],  
      ...metaMsg
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { 
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender] 
    }, { 
      quoted: metaMsg 
    })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.register = true
//handler.limit = false;

export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
