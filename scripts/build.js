/* eslint-disable no-console */
const execSync = require('child_process').execSync

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: { ...process.env, ...extraEnv },
  })

console.log('Building CommonJS modules ...')

exec('rollup -c -f cjs -o index.js')

console.log('\nBuilding ES modules ...')

exec('rollup -c -f es -o es/index.js')
