import resolve from '@rollup/plugin-node-resolve'
import typescript from "@rollup/plugin-typescript"
import commonjs from '@rollup/plugin-commonjs'
import eslint from "@rbnlffl/rollup-plugin-eslint"
import {terser} from "rollup-plugin-terser"

const moduleName = 'Parallax'
const distDir = './dist/'

const getOutputs = (formats, sourcemap = true, min = false) => {
  return formats.map((m) => {
    return {
      file: `${distDir}${moduleName.toLowerCase()}.${m}${min ? '.min' : ''}.js`,
      format: m,
      name: moduleName,
      sourcemap,
      exports: m === 'cjs' ? 'default' : undefined,
    }
  })
}

const outputs = getOutputs(['iife', 'umd', 'esm', 'cjs', 'amd'])
const outputsMin = getOutputs(['iife', 'umd', 'esm', 'cjs', 'amd'], true, true)

export default [
  {
    input: 'src/index.ts',
    output: outputs,
    plugins: [
      eslint(),
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      commonjs()
    ],
  },
  {
    input: 'src/index.ts',
    output: outputsMin,
    plugins: [
      eslint(),
      resolve(),
      typescript(),
      commonjs(),
      terser({
        compress: {
          drop_console: true,
        },
      })
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: `./docs/${moduleName.toLowerCase()}.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      eslint(),
      resolve(),
      typescript(),
      commonjs()
    ],
  }
]
