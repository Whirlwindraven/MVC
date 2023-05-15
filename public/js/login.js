// This function creates the fetch request
const createRequest = async (endpoint, formData) => {
    return await fetch(endpoint, {
        method: 'POST',
        body: formData,
    });
};

// This function handles the response from the fetch request
const handleResponse = async (response, redirectUrl) => {
    if (response.ok) {
        document.location.replace(redirectUrl);
    } else {
        const error = await response.text();
        throw new Error(error);
    }
};

// This function submits the form
const submitForm = async (event, endpoint, redirectUrl) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await createRequest(endpoint, formData);
        await handleResponse(response, redirectUrl);
    } catch (error) {
        console.error(error);
        alert('Failed to submit form');
    }
};

// These functions pass the appropriate parameters to the submitForm function
const loginFormSubmit = event => submitForm(event, '/api/users/login', '/profile');
const signupFormSubmit = event => submitForm(event, '/api/users', '/profile');

// These lines add the event listeners to the form submit events
document.querySelector('.login-form').addEventListener('submit', loginFormSubmit);
document.querySelector('.signup-form').addEventListener('submit', signupFormSubmit);
