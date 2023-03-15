import * as http from 'http'
import { handleUpload } from './upload'
import { processLineByLine } from './line'

import * as url from 'url'
import { deleteHandler } from './delete'
import { updateToDo } from './update'

const httpServer = http.createServer()

httpServer.on('connection', (connection) => {
  console.log('Someone got  connection')
})

httpServer.on(
  'request',
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    const { pathname, query } = url.parse(req.url || '', true)
    console.log(pathname, 'query ', query)

    if (req.url === '/api/todo/' && req.method?.toLowerCase() === 'post') {
      handleUpload(req, res)

      
      return
    } else if (
      req.method?.toLowerCase() === 'delete' &&
      pathname?.startsWith('/api/todo/')
    ) {
      const filename = decodeURIComponent(pathname).split('/api/todo/')[1]
      deleteHandler(res, filename)
    } else if (
      pathname?.startsWith('/api/todo/') &&
      req.method?.toLowerCase() === 'put'
    ) {
      updateToDo(pathname,req,res)
    }
    return
  }
)
httpServer.listen(3000, () => console.log('Listening on port 3000'))
