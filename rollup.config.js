import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const NODE_MODULES = 'node_modules/**'

export default {
  input: 'src/index.js',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs({ include: NODE_MODULES }),
    babel({ exclude: NODE_MODULES }),
  ],
}
