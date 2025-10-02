const handler = async (m, { sock }) => {
  const start = new Date().getTime()
  await m.reply("Pinging...")
  const end = new Date().getTime()
  const responseTime = end - start
  m.reply(`🏓 Pong!\n> Response
  time: ${responseTime}ms`)
}

handler.help = ["ping"]
handler.tags = ["info"]
handler.command = ["ping"]

export default handler
