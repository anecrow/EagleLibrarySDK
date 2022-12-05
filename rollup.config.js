import typescript from 'rollup-plugin-typescript2';

export default {
    input: `lib/index.ts`,
    output: [
        {
            file: 'dist/index.es.js',
            format: 'esm'
        },
        {
            file: 'dist/index.iife.js',
            name: 'EagleSDK',
            format: 'iife',
            sourcemap: true
        },
    ],
    plugins: [typescript({
        useTsconfigDeclarationDir: true
    })],
};