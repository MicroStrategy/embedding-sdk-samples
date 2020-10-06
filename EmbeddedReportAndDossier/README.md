## MicroStrategy REST API Example

  This client code is written in Javascript. API.js is behaving Javascript wrapper class for MicroStrategy REST API execution. This client code demonstrated functionalities of dynamic dossier and report embedding.  Also, have a search mechanism for report, based on user search, all reports, we can see in the list. Report and Dossier  will open upon click on it.

### Configuration

  In main.js file we have configuration settings where need to define the correct base URL to connect MicroStrategy Library in order to execute API calls that work with your environment. With starting of this application, the Login page would appear. Please log in with MicroStrategy username and password.

### Dossier Embedding

The embeddinglib.js script at the top of the file must be changed to your environment. The dossier table will be populated with all dossiers present in the library of the environment. Clicking an entry will dynamically embed the dossier below the table.

### Report Embedding

This page shows multiple reports which can be embedded into the page. In "Search" box, user can search report and upon execution, it will give you the list of the reports. By clicking on specific reports, dynamically embed the report would open.

### Code Explanation

```fetch()``` method in API.js is to execute MicroStrategy REST API. The response json collected with the help of ```json()``` method. With the help of ```async()``` method, REST API calls would be asynchronous n nature.

### Workflow

1. [Authenticate a user - Login](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html?#/Authentication/postLogin)
    
    Authenticate a user and create a HTTP session on the web server where the user's MicroStrategy sessions are stored.
   
    ```http
    POST /api/auth/login
    ```

2. [Get session](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html?#/Authentication/sessionSessionIdGet) 
    
    Get information about a configuration session.

    ```http
    GET /api/sessions
    ```   

3. [Keep session alive](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html?#/Authentication/sessionSessionIdPut)

    Extends the HTTP and intelligence Server sessions by resetting the timeouts.

    ```http
    PUT /api/sessions
    ```         
   
4. [Get the library](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html?#/Library/getLibrary)  
    
    Get the library for the authenticated user.
    
    ```http
    GET /api/library
    ```

5. [Get Quick Search result in a list](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html?#/Browsing/doQuickSearch)

    Use the stored results of the Quick Search engine to return search results and display them as a list.
    
    ```http
    GET /api/searches/results
    ```
   #### Query parameters
           
     * **type:** It is type of object to be searched.ex: for report = 3. Posible value are defiend in [EnumDSSObjectType](https://lw.microstrategy.com/msdz/msdl/GARelease_Current/docs/ReferenceFiles/reference/com/microstrategy/webapi/EnumDSSXMLObjectTypes.html)
           
     * **offset:** is the start point of your response. For example, if offset=2, it will return the report data beginning with the second record. The default value is 0.
   
     * **limit:** is the end point of your response. For example, if limit = 500, it will return only 500 records of the report. The default value is 1000.
           
   URL:
   
   ```http
   https://demo.microstrategy.com/MicroStrategyLibrary/api/searches/results?name=report1&type=3&limit=10
   ```
   
#### Login

![alt text](https://github.com/MicroStrategy/embedding-sdk-samples/blob/master/EmbeddedReportAndDossier/ScreenShot/Login.png)

#### Embedded Dossier

![alt text](https://github.com/MicroStrategy/embedding-sdk-samples/blob/master/EmbeddedReportAndDossier/ScreenShot/Dossier.png)

#### Search Report

![alt text](https://github.com/MicroStrategy/embedding-sdk-samples/blob/master/EmbeddedReportAndDossier/ScreenShot/Search%20Report.png)

#### Embedded Report 

![alt text](https://github.com/MicroStrategy/embedding-sdk-samples/blob/master/EmbeddedReportAndDossier/ScreenShot/Report.png)
