import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
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
  // external: ['node:stream', 'node:events'],
  output: {
    // dir: 'dist',
    file: 'dist/exceljs.js',
    format: 'esm',
    plugins: [terser({
      module: true,
      mangle: {
        module: true
      },
      compress: {
        arguments: true,
        drop_console: true,
        ecma: 2020,
        unsafe: true,
        unsafe_methods: true,
        unsafe_Function: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_undefined: true,
        keep_fargs: false,
        booleans_as_integers: true,
        toplevel: true,
        // hoist_funs: true,
        // hoist_vars: true
      }
    })],
    // globals: { myglobal: 'theVariableInCodeToGlobal' },
    // chunkFileNames: '[name]-[hash].js',
    // inlineDynamicImports:true,
    // plugins,
    compact: true,
    // assetFileNames: 'xl',
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
  plugins: [
    commonjs(),
    nodeResolve({ preferBuiltins: false }), typescript()],
  watch: {
    buildDelay: 200,
    clearScreen: true,
    include: 'esm/**'
  }
}
