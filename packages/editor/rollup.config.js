import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import banner from 'rollup-plugin-banner';
import clean from 'rollup-plugin-clean';

export default _CLIArgs => {
  /**
   * @type {import('rollup').RollupOptions}
   */
  return {
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
      clean(),
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
};