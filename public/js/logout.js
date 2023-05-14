async function performLogout() {
    try {
        const logoutResponse = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!logoutResponse.ok) {
            throw new Error(logoutResponse.statusText);
        }

        window.location.assign('/');
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById('logout').onclick = performLogout;
