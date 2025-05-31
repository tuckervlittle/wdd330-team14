import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

// main.js or index.js
import Alert from './alert.js';

const alertModule = new Alert('./alerts.json');
alertModule.init();
