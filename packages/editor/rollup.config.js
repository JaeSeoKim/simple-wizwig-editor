import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import banner from 'rollup-plugin-banner';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default _CLIArgs => {
  /**
   * @type {import('rollup').RollupOptions}
   */
  const option = {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', format: 'cjs', exports: 'auto' },
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'Editor',
        exports: 'auto',
      },
      { file: 'dist/index.esm.js', format: 'esm' },
    ],
    plugins: [
      alias({
        entries: [
          { find: 'react', replacement: 'preact/compat' },
          { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
          { find: 'react-dom', replacement: 'preact/compat' },
          { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
        ],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        include: ['src/**/*'],
      }),
      typescript(),
      commonjs(),
      nodeResolve(),
      terser(),
      banner(
        [
          `<%= pkg.name %>`,
          `@version <%= pkg.version %>`,
          `@author <%= pkg.author %>`,
          `@license <%= pkg.license %>`,
        ].join('\n')
      ),
    ],
  };
  return option;
};
