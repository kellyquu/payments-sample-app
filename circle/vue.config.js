module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:5001/api'
    }
  }
}
