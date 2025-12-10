import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});


import path from 'path';

export const rendererConfig: Configuration =  {
  entry: './src/app.tsx',
  module: {
    rules: rules
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  target: 'electron-renderer'
};
