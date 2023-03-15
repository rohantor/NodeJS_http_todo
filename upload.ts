import formidable from 'formidable'
import * as fs from 'node:fs'
import * as http from 'http'
import { SendEmail } from './sendmail'

export const handleUpload = (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage }
) => {
  // parse uploaded file
  const form = formidable({
    multiples: true,
    uploadDir: './',
  })

  // Rename file
  form.on('file', (field, file) => {
    fs.rename(file.filepath, `./attachment/${file.originalFilename}`, () => {})
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
      res.end(String(err))
      return
    }

    //Write file of todo title and description
    fs.writeFile(
      `./todo/${fields.title}_${new Date().getTime()}`,
      `${fields.title}\n${fields.description}`,
      function (err) {
        if (err) throw err
        console.log('Saved!')
      }
    )
    console.log(
      JSON.parse(JSON.stringify(files.attachment, null, 2)).newFilename
    )
    SendEmail(`${fields.description}`)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ fields, files }, null, 2))
  })
}
