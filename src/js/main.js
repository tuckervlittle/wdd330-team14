import { initSearchForm, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter().then(() => {
  // Hide Register link on registration.html
  if (window.location.pathname.endsWith('registration.html')) {
    const regLink = document.querySelector('a[href*="registration.html"]');
    if (regLink) regLink.style.display = 'none';
  }
  initSearchForm();
});
