/* eslint-disable no-console */
import esbuild from 'esbuild';

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const entryPoints = [
  'src/index.ts',
  'src/components/accordion.ts',
  'src/components/banner.ts',
  'src/components/chip.ts',
  'src/components/flag-message.ts',
  'src/components/input-number.ts',
  'src/components/modal.ts',
  'src/components/segmented-control.ts',
  'src/components/side-navigation.ts',
  'src/components/text-input.ts',
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
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  entryPoints,
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
