
import * as fs from 'node:fs'
import * as http from 'http'
export const deleteHandler =(res:http.ServerResponse<http.IncomingMessage>,filename:string)=>{

 fs.unlink(`./todo/${filename}`,(err)=>{
  if(err) console.log(err)
   res.writeHead(204, { 'Content-Type': 'application/json' })
   res.end('deleted')
 })


return;
}