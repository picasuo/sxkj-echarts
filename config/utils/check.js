const net = require('net')

// 判断 dev 服务端口是否被占用
const checkPort = port => {
  return new Promise(r => {
    const server = net.createServer().listen(port, 'localhost')
    server.on('listening', () => {
      server.close()
      console.log(`端口${port}可用,正在启动服务...`)
      r(port)
    })
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.log(`端口${port}被占用,测试端口${port + 1}是否可用...`)
        r(checkPort(port + 1))
      }
    })
  })
}
module.exports = {
  checkPort,
}
