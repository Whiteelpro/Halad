import axios from 'axios'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn }) => {
  const proses = '🌸 Obteniendo información de los creadores...'
  await conn.sendMessage(m.chat, { text: proses }, { quoted: m })

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, {
      upload: conn.waUploadToServer
    })
    return imageMessage
  }

  const owners = [
    {
      name: 'DevHalad',
      desc: 'Creador Principal de HaladBot-MD',
      image: 'https://raw.githubusercontent.com/Whiteelpro/Halad/refs/heads/main/xd.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/573189460272' },
        { name: 'Instagram', url: 'https://www.instagram.com/ewhitexz7' },
        { name: 'Facebook', url: 'no' },
        { name: 'Telegram', url: 'no' },
        { name: 'TikTok', url: 'no' },
        { name: 'PayPal', url: 'no' }
      ]
    },
    {
      name: 'DavHalad2',
      desc: 'Co-Creador de Halad-MD',
      image: 'https://raw.githubusercontent.com/Whiteelpro/Halad/refs/heads/main/xd.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/573189460272' },
        { name: 'Instagram', url: 'https://www.instagram.com/ewhitexz7' },
        { name: 'TikTok', url: 'no' },
        { name: 'PayPal', url: 'no' }
      ]
    }
  ]

  let cards = []

  for (let owner of owners) {
    const imageMsg = await createImage(owner.image)

    let formattedButtons = owner.buttons.map(btn => ({
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: btn.name,
        url: btn.url
      })
    }))

    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `✨️ *${owner.name}*\n${owner.desc}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '> Conoce más sobre nuestros creadores siguiendo sus redes sociales. Haz clic en cualquier botón para acceder a sus perfiles y descubrir su trabajo. Si te gustaría apoyarlos, también puedes realizar una donación a través de nuestro PayPal.'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: imageMsg
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: formattedButtons
      })
    })
  }

  const slideMessage = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: '✨️ Creadores de Halad-MD & HaladBot-MD ✨️'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Conoce a los desarrolladores del bot'
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards
          })
        })
      }
    }
  }, {})

  await conn.relayMessage(m.chat, slideMessage.message, { messageId: slideMessage.key.id })
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner', 'creador', 'donar']

export default handler