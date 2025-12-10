import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from 'path';

export const mainConfig: Configuration = {
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.node$/, use: 'node-loader' },
      { test: /\.(png|jpg|gif|svg|ico)$/, use: 'file-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.svg']
  },
  target: 'electron-main'
};


