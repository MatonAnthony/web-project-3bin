/**
 * Manage the storage of the authentication token
 */
class Auth {
    /**
     * Save the JWT Token in localeStorage
     * @param {String} token
     */
    static authenticateUser(token) {
        localStorage.setItem('auth_token', token);
    }

    /**
     * Check if a user is authenticated - check if a token is saved 
     * in Local Storage
     * @return {Boolean} if the user is authenticated
     */
    static isUserAuthenticated() {
        return localStorage.getItem('auth_token') !== 'undefined';
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.setItem('auth_token', 'undefined');
    }

    /**
     * Get a token value.
     * @return {String} return the JWT Token for the user
     */
    static getToken() {
        return localStorage.getItem('auth_token');
    }
}

export default Auth;
