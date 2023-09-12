
const avantioAPIHost =  'https://challenge.avantio.pro';

export const environment = {
  name: 'default',
  production: false,
  avantioAPIAuthToken: 'ppr2kymzk75od7wtq0up2',
  hmr: true,
  avantioAPIHost: avantioAPIHost,
  app:'challenge-avantio',
  app_name:'Challenge-Avantio',
  color: '#f45c44',


  // Common
  getAllUrl:  `${avantioAPIHost}/v1/trends`,
  deleteTrend:  `${avantioAPIHost}/v1/trends`,
  updateTrend:  `${avantioAPIHost}/v1/trends`,
};
