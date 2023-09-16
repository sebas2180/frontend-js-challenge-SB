
const avantioAPIHost =  'https://challenge.avantio.pro';
const PROXY = {
    '/v1/*': {
        target: avantioAPIHost,
        secure: true,
        logLevel: 'debug',
        changeOrigin: true,
    }
}

module.exports = PROXY;