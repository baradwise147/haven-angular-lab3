import {spawn} from 'node:child_process';
const children=[];
const stop=()=>{for(const child of children)child.kill();};
for(const [file,args] of [['node_modules/json-server/lib/bin.js',['db.json','--port','3000']],['node_modules/@angular/cli/bin/ng.js',['serve','--host','127.0.0.1']]]){
 const child=spawn(process.execPath,[file,...args],{stdio:'inherit',windowsHide:true});children.push(child);
 child.on('exit',code=>{stop();process.exit(code??0)});child.on('error',error=>{console.error(error);stop();process.exit(1)});
}
process.on('SIGINT',()=>{stop();process.exit(0)});process.on('SIGTERM',()=>{stop();process.exit(0)});
