import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

const isAndroid = require('react-native').Platform.OS === 'android';
const isHermesEnabled = !!global.HermesInternal;

// in your index.js file
if (isHermesEnabled || isAndroid) {
  require('@formatjs/intl-getcanonicallocales/polyfill');

  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-listformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-datetimeformat/add-all-tz.js');

  require('@formatjs/intl-locale/polyfill');

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  let RNLocalize = require('react-native-localize');
  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());
  }
}