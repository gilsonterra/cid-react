const SCOPE = 'scope';
const TOKEN = 'token';
const USER = 'user';
const LOCALE = 'locale';

const deleteItem = (name) => {
    localStorage.removeItem(name);
}

const setItem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
}

const getItem = (name) => {
    return JSON.parse(localStorage.getItem(name));
}

const setLocale = (locale) => {
    setItem(LOCALE, locale);
}

const getLocale = () => {
    return getItem(LOCALE);
}

const setUser = (user) => {
    setItem(USER, user);
}

const getUser = () => {
    return getItem(USER);
}

const setToken = (token) => {
    setItem(TOKEN, token);
}

const getToken = () => {
    return getItem(TOKEN);
}

const setScope = (scope) => {
    setItem(SCOPE, scope);
}

const getScope = () => {
    return getItem(SCOPE);
}

const isAuthenticated = () => {
    return getToken() ? true : false;
};

const hasPermission = (permission) => {
    let scope = getScope();
    if (!permission) {
        return true;
    }
    else {
        return scope.indexOf(permission) >= 0 ? true : false;
    }
};

const logout = () => {
    deleteItem(USER);
    deleteItem(TOKEN);
    deleteItem(SCOPE);
}

module.exports = {
    setUser,
    getUser,
    setToken,
    getToken,
    setScope,
    getScope,
    setLocale,
    getLocale,    
    isAuthenticated,
    hasPermission,
    logout
}

