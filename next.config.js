const path = require('path')

module.exports = {
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot|otf|ico)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: `static/[path][name].[ext]`,
            publicPath: `/_next/`
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.css/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'styled-jsx-css-loader',
          options: {
            type: 'scoped'
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.scss/,
      include: [
        path.resolve(__dirname, 'Common'),
        path.resolve(__dirname, 'Components'),
        path.resolve(__dirname, './node_modules')
      ],
      use: [
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]'
          }
        },
        'babel-loader',
        'styled-jsx-css-loader'
      ]
    })

    return config
  }
}
