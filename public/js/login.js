// This function creates the fetch request
const createRequest = async (endpoint, data) => {
    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
  };
  
  // This function handles the response from the fetch request
  const handleResponse = async (response, redirectUrl) => {
    if (response.ok) {
        document.location.replace(redirectUrl);
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
  };
  
  // This function submits the form
  const submitForm = async (event, endpoint, redirectUrl) => {
    event.preventDefault();
    const form = event.target;
    const data = {
        username: form.elements['username-field'].value,
        password: form.elements['password-field'].value,
    };
  
    try {
        const response = await createRequest(endpoint, data);
        await handleResponse(response, redirectUrl);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit form: ' + error.message);
    }
  };
  
  
  // These functions pass the appropriate parameters to the submitForm function
  const loginFormSubmit = event => submitForm(event, '/api/users/login', '/profile');
  const signupFormSubmit = event => submitForm(event, '/api/users', '/profile');
  
  // These lines add the event listeners to the form submit events
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormSubmit);
  }
  
  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormSubmit);
  }
  