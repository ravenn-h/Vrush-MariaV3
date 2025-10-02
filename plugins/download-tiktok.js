const { tiktokDownloaderVideo } = require('../lib/scrape/tiktok')
const sleep = ms => new Promise(r => setTimeout(r, ms))

let handler = async (m, { sock, text, command }) => {
  if (!text) return m.reply(`use:\n${command} <url TikTok>`)

  try {
    m.reply('> ⏳ wait...')
    let rep = await tiktokDownloaderVideo(text)
    let item = 0

    for (let imgs of rep.data) {
      if (imgs.type === "no watermark") {
        await sock.sendMessage(m.chat, {
          video: { url: imgs.url },
          caption: `🎥 *Video Info*:
📍 Region: ${rep.region}
⏳ Duration: ${rep.duration}
📅 Date: ${rep.date_at}

📊 *Statistik*:
👁️ Views: ${rep.stats.views}
❤️ Likes: ${rep.stats.likes}
💬 Comment: ${rep.stats.comment}
🔄 Share: ${rep.stats.share}
📥 Download: ${rep.stats.download}

👤 *Author*:
📝 Fullname: ${rep.author.fullname}
🏷️ Nickname: ${rep.author.nickname}

🎵 *Music*:
🎼 Title: ${rep.music_info.title}
🎤 Author: ${rep.music_info.author}
💿 Album: ${rep.music_info.album}

📝 *Caption*:
${rep.title || 'No Caption'}`
        }, { quoted: m })
      }

      if (imgs.type === "photo") {
        if (item === 0) {
          await sock.sendMessage(m.chat, {
            image: { url: imgs.url },
            caption: `🖼️ *Photo Info*:
📍 Region: ${rep.region}
📅 Date: ${rep.date_at}

📊 *Statistik*:
👁️ Views: ${rep.stats.views}
❤️ Likes: ${rep.stats.likes}
💬 Comment: ${rep.stats.comment}
🔄 Share: ${rep.stats.share}
📥 Download: ${rep.stats.download}

👤 *Author*:
📝 Fullname: ${rep.author.fullname}
🏷️ Nickname: ${rep.author.nickname}

🎵 *Music*:
🎼 Title: ${rep.music_info.title}
🎤 Author: ${rep.music_info.author}
💿 Album: ${rep.music_info.album}

📝 *Caption*:
${rep.title || 'No Caption'}${m.isGroup ? rep.data.length > 1 ? "\n📥 _Sisa foto dikirim ke private chat_\n" : "\n" : "\n"}`
          }, { quoted: m })
        } else {
          await sock.sendMessage(m.sender, {
            image: { url: imgs.url }
          }, { quoted: m })
        }
        item++
        await sleep(2000)
      }
    }
  } catch (err) {
    console.error(err)
    m.reply('> ⚠️ oops err.')
  }
}

handler.command = ['tiktok', 'tt']
handler.tags = ['download']

module.exports = handler
