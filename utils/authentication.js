const withAuth = (req, res, proceed) => {
    // This middleware checks if the user is authenticated by looking at the 'logged_in' property in the session object.
    if (request.session.logged_in) {
        // If the user is authenticated, the request can proceed to the next middleware or route handler.
        proceed();
    } else {
        // If the user is not authenticated, they are redirected to the login page.
        response.redirect('/login');
    }
};

  
  module.exports = withAuth;
