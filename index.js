#!/usr/bin/env node

require('babel-register')()

const path = require('path')
const chalk = require('chalk')
const args = require('minimist')(process.argv.slice(2))

const tasks = require(path.resolve('Makefile.js'))

if (args.tasks) {
  console.log('Available tasks:')
  for (const task of Object.keys(tasks)) {
    console.log(`  - ${task}`)
  }
  process.exit(0)
}

if (!args._.length) {
  console.log('Usage: mk [task] [options]')
  process.exit(1)
}

const task = args._[0]

if (!tasks[task] || typeof tasks[task] !== 'function') {
  console.log(`Task ${chalk.cyan(`'${task}'`)} not exists`)
  process.exit(1)
}

Promise.resolve().then(() => tasks[task](args)).then(() => {

  console.log(chalk.green(`Task '${task}' success`))
  process.exit(0)

}).catch(error => {

  console.log(`Task ${chalk.cyan(`'${task}'`)} ends with error`)
  console.log(error.stack || error.message || error)
  process.exit(1)
})
