const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'LITTLESPIDERSMP.aternos.me',
    port: 54334,
    username: 'SenpaiBOT',
    version: 1.21.11
  })

  bot.on('spawn', () => {
    console.log('Joined server')

    setTimeout(() => {
      bot.chat('/login YOUR_PASSWORD')
    }, 5000)

    setInterval(() => {
      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)

      bot.look(
        Math.random() * Math.PI * 2,
        0,
        true
      )
    }, 30000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    if (message.toLowerCase().includes('hello')) {
      bot.chat('Hello!')
    }
  })

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', console.log)
}

createBot()
