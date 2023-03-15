const readline = require('node:readline')
const fs = require('fs')
export async function processLineByLine(filename:string) {
  const fileStream = fs.createReadStream(`./todo/${filename}`)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`)
    if (line.match('----------seperator----------')){

    }
  }
}
// processLineByLine('d39d7e14316e5577d0f0e1000')