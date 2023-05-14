async function signUp(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            window.location.assign('/profile');
        } catch (error) {
            console.error(error);
            alert('Failed to sign up');
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signUp);