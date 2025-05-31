import { alertMessage } from './utils.mjs';

const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        street: form.street.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
        avatar: form.avatar.value || undefined
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alertMessage('Registration successful! You can now log in.');
            form.reset();
        } else {
            alertMessage('Registration failed: ' + (result.message || JSON.stringify(result)));
        }
    } catch (err) {
        alertMessage('Registration error: ' + err.message);
    }
});