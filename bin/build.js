/* eslint-disable no-console */
import esbuild from 'esbuild';

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const entryPoints = [
  'src/index.ts',
  'src/components/accordion.ts',
  'src/components/segmented-control.ts',
  'src/components/input-number.ts',
  'src/components/input-text.ts',
  'src/components/tooltip.ts',
  'src/utils/initialize.ts',
];

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  bundle: true,
  outdir: buildDirectory,
  minify: true,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  entryPoints,
  keepNames: true,
};

// Files building
if (production) {
  esbuild.build(defaultSettings);
}

// Files serving
else {
  esbuild
    .serve(
      {
        servedir: buildDirectory,
        port: 3000,
      },
      defaultSettings
    )
    .then((server) => {
      console.log(`Serving at http://localhost:${server.port}`);
    });
}
