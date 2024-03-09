import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser';
/*************************
await esbuild.build({
entryPoints:['./esm/index.js'],
bundle:true,
outfile: './dist/exceljs.js',
platform: 'node',
format:'esm',
target: 'esne1xt',
logLimit:0,
logLevel:'info',
color:true,
treeShaking:true,
minifyWhitespace:true
// splitting:true,
})
/** @type {import('rollup').RollupWatchOptions} */
export default {
  input: './esm/index.js',
  external: ['node:stream', 'node:events'],
  output: {
    // dir: 'dist',
    file: 'dist/exceljs.js',
    format: 'esm',
    plugins: [terser()],
    // globals: { myglobal: 'theVariableInCodeToGlobal' },
    // chunkFileNames: '[name]-[hash].js',
    inlineDynamicImports:true,
    // plugins,
    compact: true,
    assetFileNames: 'xl',
    generatedCode: {
      arrowFunctions: true,
      constBindings: true,
      objectShorthand: true,
      preset: 'es2015',
    },
    // DANGER --------> this may make it not work
    interop: 'esModule',
    sourcemap: false,
    validate: true,
  },
  plugins: [nodeResolve(), typescript()],
  watch: {
    buildDelay: 200,
    clearScreen: true,
    include: 'esm/**'
  }
}
