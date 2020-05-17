const SCOPE = 'scope';
const TOKEN = 'token';
const USER = 'user';
const LOCALE = 'locale';

interface UserAuthenticated {
    name: string
}


const deleteItem = (name: string) => {
    localStorage.removeItem(name);
}

const setItem = (name: string, item: any) => {
    localStorage.setItem(name, JSON.stringify(item));
}

const getItem = (name: string): object => {
    return JSON.parse(localStorage.getItem(name) || '{}');
}

export const setLocale = (locale: any) => {
    setItem(LOCALE, locale);
}

export const getLocale = () => {
    return getItem(LOCALE);
}

export const setUser = (user: any) => {
    setItem(USER, user);
}

export const getUser = () => {
    return getItem(USER);
}

export const setToken = (token: string) => {
    setItem(TOKEN, token);
}

export const getToken = () => {
    return getItem(TOKEN);
}

export const setScope = (scope: any) => {
    setItem(SCOPE, scope);
}

export const isAuthenticated = ()  => {
    return getToken() ? true : false;
};


/*
export const getScope = (): string[] => {
    return getItem(SCOPE) || [];
}


export const hasPermission = (permission: any): boolean => {
    let scope = getScope();
    if (!permission) {
        return true;
    }
    else {
        return scope.indexOf(permission) >= 0 ? true : false;        
    }
};
*/

export const logout = () => {
    deleteItem(USER);
    deleteItem(TOKEN);
    deleteItem(SCOPE);
}
