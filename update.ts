import { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'node:fs'
export const updateToDo = (pathname: string, req: IncomingMessage,res: ServerResponse<IncomingMessage>) => {
  const filename = decodeURIComponent(pathname).split('/api/todo/')[1]
  const chunks: any = []
  req.on('data', (chunk: any) => chunks.push(chunk))
  req.on('end', () => {
    const data = Buffer.concat(chunks).toString()
    console.log('Data: ', data)

    fs.writeFile(`./todo/${filename}`, data, (err) => {
      if (err) console.log(err)
      else {
        console.log('File written successfully\n')
        console.log('The written has the following contents:')
        console.log(fs.readFileSync(`./todo/${filename}`, 'utf8'))
      }
    })
    res.write('File name ' + filename + '  Content ' + data)
    res.end()
  })
}
