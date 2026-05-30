const mineflayer = require('mineflayer')

function startBot() {
  console.log('Trying to connect...')

  const bot = mineflayer.createBot({
    host: 'LITTLESPIDERSMP.aternos.me',
    port: 54334,
    username: 'AFKBot',
    version: false
  })

  bot.on('spawn', () => {
    console.log('Connected!')

    setTimeout(() => {
      bot.chat('/login YOUR_PASSWORD')
    }, 5000)

    setInterval(() => {
      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)

      bot.look(Math.random() * Math.PI * 2, 0, true)
    }, 30000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    if (message.toLowerCase().includes('hello')) {
      bot.chat('Hello!')
    }
  })

  function reconnect() {
    console.log('Retrying in 30 seconds...')
    setTimeout(startBot, 30000)
  }

  bot.on('end', reconnect)
  bot.on('kicked', reconnect)
  bot.on('error', (err) => {
    console.log(err.message)
  })
}

startBot()
