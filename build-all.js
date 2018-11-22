const execSync = require('child_process').execSync

const Apps = require('./src/config.app')
Apps.APP_NAME.forEach(entryName => {
  console.log('正在编译：', entryName)
  // 成功的例子
  execSync('vue-cli-service build ' + entryName, function(error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error)
      return
    }
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + typeof stderr)
  })
})
