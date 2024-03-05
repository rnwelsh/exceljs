import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints:['./esm/index.js'],
  // bundle:true,
  outdir: './dist',
  platform: 'node',
  format:'esm',
  target: 'esnext',
  logLimit:0,
  logLevel:'info',
  color:true,
  treeShaking:true,
  splitting:true,
  
})

// await esbuild.build({
//   entryPoints:['./esm/index.js'],
//   bundle:true,
//   outfile: './dist/exceljs.js',
//   platform: 'node',
//   format:'esm',
//   target: 'esnext',
//   logLimit:0,
//   logLevel:'info',
//   color:true,
//   treeShaking:true,
//   // splitting:true,
  
// })
