/**
 *
 * This javascript is represents wrapper class for MicroStrategy REST API
 *
 */

/**
 * Authenticate a user and generate authorization token.
 * @param baseURL - MicroStrategy Library URL, for example, https://env-XXXXXX.customer.cloud.microstrategy.com/MicroStrategyLibrary
 * @param user - Username to login to MicroStrategy Library
 * @param pass - Password to login to MicroStrategy Library
 * @param loginMode - Login Mode
 * 
 * Return a Promise.
 */
async function login(baseURL,user,pass, loginMode) {
    var options = {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username:user,
            password:pass,
            loginMode: loginMode
        })
    }

    return fetch(baseURL + '/api/auth/login', options)
    .then(function (response) {
        if (response.ok) {
            return response.headers.get('x-mstr-authToken')
        } else {
            throw(new Error("Login Error"))
        }
    })
}

/**
 * Get information about a configuration session.
 * @param baseURL - MicroStrategy Library URL, for example, https://env-XXXXXX.customer.cloud.microstrategy.com/MicroStrategyLibrary
 * @param token - Authorization token
 * Return a Promise.
 */
 async function getSession(baseURL,token) {
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token
                 }
    }

    return fetch(baseURL + '/api/sessions', options)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        } else {
            throw(new Error("Get Session Error"));
        }
    })

}

/**
 * Extends the HTTP and Intelligence server sessions by resulting the timeouts.
 * @param baseURL - MicroStrategy Library URL, for example, https://env-XXXXXX.customer.cloud.microstrategy.com/MicroStrategyLibrary
 * @param token - Authorization token
 * 
 * Return a Promise.
 */
async function extendSession(baseURL,token) {
    var options = {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token
                 }
    }

    return fetch(baseURL + '/api/sessions', options)
        .then(function (response) {
            if (response.ok) {
                return true
            } else {
                return false
            }
        })
}

/**
 * Get the library for the authenticated user.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
  * Return a Promise. 
 */
async function getLibrary(baseURL,token) {
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token
                 }
    }

    return fetch(baseURL + '/api/library', options)
    .then(function (response) {
        if (response.ok) {
            return response.json()
        } else {
            throw(new Error("Get Library Error"));
        }
    })    
}


/**
 * Use the stored results of the Quick Search engine to return search results and display them as a list.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
 * @param name Value the search pattern is set to. Here, we use for search report objects whose name begins with user input.
 * @param type The type of object to be searched. Possible values are defined in  {@link EnumDSSObjectType}
 * @param limit The maximum number of items returned for single request.
 * Return a Promise.
 */

 async function getSearchResults(baseURL,token,name,type,limit){
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                'x-mstr-authtoken': token
                },
    }

    return fetch(baseURL + '/api/searches/results?name='+name+'&type='+type+'&limit='+limit, options)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw(new Error("Search Error"));
        }
    })

}