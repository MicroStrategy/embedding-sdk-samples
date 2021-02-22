# MicroStrategy Embedding SDK Samples

A collection of samples highlighting functionality and workflows of the Embedding SDK. 

## MicroStrategy Embedding SDK

MicroStrategy Embedding SDK allows you to quickly embed MicroStrategy Dossier into any web application in a responsive manner. It also allows you to control the behavior of your dossier using JavaScript code, such as navigation, filtering, manipulating the interfaces, event handling, etc. 


For more information, please visit the official documentation of [MicroStrategy Embedding SDK](https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/docs/projects/EmbeddingSDK/Content/topics/Intro_to_the_Embedding_SDK.htm). 

### How to get MicroStrategy Embedding SDK?

MicroStrategy Embedding SDK is included in your MicroStrategy Library Server.  You can use it from your web application using a URL like this:


 https://[YOUR Environment]/MicroStrategyLibrary/javascript/embeddinglib.js

## MicroStrategy REST API

MicroStrategy REST API is the backbone of MicroStrategy's open architecture. MicroStrategy REST API is widely used in this project. 

For more information about MicroStrategy REST API, please visit [the official documentation](https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/docs/projects/RESTSDK/Content/topics/REST_API/REST_API.htm) and play with [the live API Explorer](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html). 




## Feature Showcase

This set of examples demonstrate specific features of Embedding SDK. Open each example to see what is possible with Embedding SDK. Make sure you check the source code for the implementation.

| Features | Examples |
| -----------| --------|
| Dossier page customization,  page navigation, filters, and event handler | [Demo](./feature_showcase/0_Features.html)
| Guest authentication | [Demo](./feature_showcase/1_No_Authentication.html)|
| Authentication with auth token | [Demo](./feature_showcase/2_Use_Auth_Token.html)|
| Authentication with Identity Token | [Demo](./feature_showcase/3_Use_IdentityToken.html)|
| SAML authentication  | [Demo](./feature_showcase/4_Use_SAML.html)|
| Custom error handler | [Demo](./feature_showcase/5_ErrorHandling.html)|
| Filter configuration | [Demo](./feature_showcase/6_Filters.html)|
| Using dossier instance ID | [Demo](./feature_showcase/7_Use_Dossier_Instance.html)|
| Customizing the Library Page with URL API | [Demo](./feature_showcase/8_URL_To_LibraryPage.html)|


[Source code](https://github.com/MicroStrategy/embedding-sdk-samples/feature_showcase/)

## Library Browsing

This example shows how to build a web page to show all the dossiers and documents in your library.

[Demo](./library_browsing/login.html)

[Document](./library_browsing/)

[Source code](https://github.com/MicroStrategy/embedding-sdk-samples/library_browsing/)

## Single-Dossier React Application

MicroStrategy Dossier can be used as a standalone application.  This example shows how to build a React-based single-dossier application using MicroStrategy Embedding SDK.

[Demo](./page_navigation/site)

[Document](./page_navigation/)

[Source code](https://github.com/MicroStrategy/embedding-sdk-samples/page_navigation)


## More Examples

- A single-page application with Embedding SDK and REST API and third-party grid library. [Link](https://tutorial.microstrategy.com/Embedding/)

- A multi-tenant demo built on top of 3rd-party JavaScript frameworks. [Link](https://tutorial.microstrategy.com/EmbeddedAnalytics/index.html)