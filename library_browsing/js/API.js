/**
 * @author patelNeel
 * Created on 2nd Sept, 2020
 *
 * This javascript is represents wrapper class for Microstrategy REST API
 *
 * @param {string} baseURL - Microstrategy Library URL eg: https://env-XXXXXX.customer.cloud.microstrategy.com/MicroStrategyLibrary
 * @param {string} user - Username credential to login to MicroStrategy Library
 * @param {string} pass - Password credential to login to MicroStrategy Library
 * @param {string} token - Authorization token returned by login function. Used in subsequent API calls to authenticate user.
 * @param {string} projectID - ID of the MicroStrategy project. Can be obtained using the getProjects function.
 * @param {string} dossierID - ID of the requested dossier
 */

/**
 * Authenticate a user and generate authorization token.
 * @param baseURL MicroStrategy baseURL
 * @param user MicroStrategy User
 * @param pass Password
 * @param loginMode Login Mode
 */
function login(baseURL,user,pass, loginMode) {
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
    };

    return fetch(baseURL + '/api/auth/login', options)
    .then(function (response) {
        if (response.ok) {
            return response.headers.get('x-mstr-authToken');
        } else {
            throw(new Error("Login Error"))
        }
    });


    // const response = await fetch(baseURL + '/api/auth/login', options);
    // console.log("Token: " + response.headers.get('x-mstr-authtoken'));
    // var token = response.headers.get('x-mstr-authtoken');
    // return token;
}

/**
 * Get information about a configuration session.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
 */
 function getSession(baseURL,token) {
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token
                 }
    };

    return fetch(baseURL + '/api/sessions', options)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw(new Error("Login Error"));
        }
    });

}

/**
 * Extends the HTTP and Intelligence server sessions by resulting the timeouts.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
 */
function extendSession(baseURL,token) {
    var options = {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token
                 }
    };

    return fetch(baseURL + '/api/sessions', options)
        .then(function (response) {
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        });
}


/**
 * Get a list of all projects that the authenticated user has access to.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
 */
async function getProjects(baseURL,token) {
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token
                 }
    };

    const response = await fetch(baseURL + '/api/projects', options);
    const json = await response.json();
    return json;
}


/**
 * Get the definition of a specific report, including attributes and metrics.
 * @param baseURL MicroStrategy Library URL
 * @param token  Authorization token
 * @param projectID project Id
 * @param reportID report Id
 */
async function getReport(baseURL,token,projectID,reportID) {
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token,
                  'x-mstr-projectid': projectID
                 }
    };

    const response = await fetch(baseURL + '/api/reports/' + reportID, options);
    const json = await response.json();
    return json;
}

/**
 * Get the library for the authenticated user.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
 */
async function getLibrary(baseURL,token) {
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token
                 }
    };

    const response = await fetch(baseURL + '/api/library', options);
    const json = await response.json();
    return json;
}

/**
 * Create a report instance and get the result.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
 * @param projectID project Id
 * @param reportID report Id
 */
async function reportInstance(baseURL,token,projectID,reportID) {
    var options = {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                  'x-mstr-authtoken': token,
                  'x-mstr-projectid': projectID
                 }
    };
    const response = await fetch(baseURL + '/api/reports/' + reportID + "/instances", options);
    const json = await response.json();
    return json;
}

/**
 * Use the stored results of the Quick Search engine to return search results and display them as a list.
 * @param baseURL MicroStrategy Library URL
 * @param token Authorization token
 * @param name Value the search pattern is set to. Here, we use for search report objects whose name begins with user input.
 * @param type Type of object to be searched. Possible values are defined in  {@link EnumDSSObjectType}
 * @param limit Maximum number of items returned for single request.
 */

 function getSearchResults(baseURL,token,name,type,limit){
    var options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json',
                'x-mstr-authtoken': token
                },
    };

    return fetch(baseURL + '/api/searches/results?name='+name+'&type='+type+'&limit='+limit, options)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw(new Error("Search Error"));
        }
    });

    // const response = await fetch(baseURL + '/api/searches/results?name='+name+'&type='+type+'&limit='+limit, options);
    // return response;
}