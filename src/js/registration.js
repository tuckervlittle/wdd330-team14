import ExternalServices from './ExternalServices.mjs';

const form = document.getElementById('registrationForm');
const messageDiv = document.getElementById('registrationMessage');
const services = new ExternalServices();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userData = {
    name: formData.get('name'),
    address: formData.get('address'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    await services.registerUser(userData);
    messageDiv.textContent = 'Registration successful! You can now log in.';
    messageDiv.style.color = 'green';
    form.reset();
  } catch (err) {
    messageDiv.textContent = 'Registration failed. Please try again.';
    messageDiv.style.color = 'red';
    // console.error(err);
  }
});
