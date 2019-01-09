# EmbeddedUsherSample
A sample of embedding dossier using Usher

<img src="https://raw.githubusercontent.com/MicroStrategy/embedding-sdk-samples/master/authentication/saml/login.png" width="600" height="460">
<img src="https://raw.githubusercontent.com/MicroStrategy/embedding-sdk-samples/master/authentication/saml/Embedded.png" width="900" height="500">

### Configuration required for cross origin in Library:
1. Configure the CORS settings from the library Admin page to accept current origin.
2. Configure SAML provider X-FRAME-OPTIONS to allow X-Frame embedding.

### File list:
- index.html --> starting page
- saml.html --> html page containing the hidden html form for submitting the POST /login request
- embeddinglib.js --> embedded SDK js library
- embedded.html --> html page of the embedded dossier

### Steps to use:
1. Download the zip file and extract to the webapps folder in tomcat
2. Update the variable below to set Library path, project id and dossier id accordingly based on the environment your are using: 
   -  `BASE_URL`
   -  `projectId`
   -  `dossierId`
3. Open http://localhost:8080/EmbeddedUsherSample/index.html
4. Login through SAML provider
5. Page will be redirected to a new html page containing the embedded dossier


