async function submitForm(event, postUrl, redirectPath) {
    event.preventDefault();

    const form = event.target;
    const formContent = new FormData(form);

    try {
        const serverResponse = await fetch(postUrl, {
            method: 'POST',
            body: formContent,
        });

        if (serverResponse.ok) {
            location.replace(redirectPath);
        } else {
            const errorText = await serverResponse.text();
            throw new Error(errorText);
        }
    } catch (err) {
        console.error(err);
        alert('Unable to submit form');
    }
}

const processLoginForm = (event) => {
    submitForm(event, '/api/users/login', '/dashboard');
};

const processSignupForm = (event) => {
    submitForm(event, '/api/users', '/dashboard');
};

document.querySelector('.signin-form').addEventListener('submit', processLoginForm);
document.querySelector('.register-form').addEventListener('submit', processSignupForm);
