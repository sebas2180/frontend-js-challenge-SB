const PROXY = {
    'https://challenge.avantio.pro/v1/*': {
        target: process.env['NG_APP_aVANTIO_API_HOST'],
        secure: true,
        logLevel: 'debug',
        changeOrigin: true,
    }
}

module.exports = PROXY;