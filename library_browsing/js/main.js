/**
 * Display list of report which came in search result by user search criteria.
 */
function startReport() {
   
    const baseURL = sessionStorage.getItem("baseURL");
    const token = sessionStorage.getItem("token");
    getSession(baseURL, token)
    .then(session => {

        extendSession(baseURL,token);
        
        $("#selectionTable").find("tr:gt(0)").remove();
        document.getElementById("usermessage").innerHTML = "<h3>" + session.fullName + "</h3>";
        reportName = document.getElementById("reportsearch").value;
        getSearchResults(baseURL,token,reportName,3,10).then(response => {

            const reports = response.result;
            var table = document.getElementById("selectionTable");
            for (i = 0; i < reports.length; i++) {
                var row = table.insertRow(i + 1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = reports[i].name;
                cell2.innerHTML = reports[i].id;
                cell3.innerHTML = reports[i].description;
                if (cell3.innerHTML == "undefined"){
                    cell3.innerHTML = "";
                }
                row.setAttribute("onmouseover","style='background-color:#C0C0C0';");
                row.setAttribute("onmouseout","style='background-color:default';");
                (function () {
                    var id = reports[i].id;
                    var projectID = reports[i].projectId;
                    console.log(id,projectID);
                    var title = reports[i].name;
                    row.addEventListener("click", function() {
                        embeddedReport(baseURL, id,title, projectID);
                    });
                }());
            }
        });

    })
    .catch(error => {
       location.href="login.html";
    })
}

/**
 * Display selected report as embedded report.
* @param baseURL - MicroStrategy Library URL, for example, https://env-XXXXXX.customer.cloud.microstrategy.com/MicroStrategyLibrary
 * @param reportID - Report Id
 * @param reportName - Report Name
 * @param projectID - Project Id
 */
async function embeddedReport(baseURL, reportID,reportName, projectID) {
    
    document.getElementById("tableTitle").innerHTML = "<h3>"+reportName+"</h3>";
    document.getElementById("tableTitle").style.display = "block";
    var table = document.getElementById("reportTable");
    table.innerHTML = "";
    var reportUrl = baseURL + '/app/' + projectID + '/' + reportID;
    microstrategy.dossier.create({
        placeholder: table,
        url: reportUrl,
        navigationBar: {
            enabled: true,
            gotoLibrary: false,
            options: false,
            comment: false,
            reset: false,
            filter: false
        },
        containerWidth: "100%",
        containerHeight: "800px",
        enableCustomAuthentication: true,
        customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
        getLoginToken: function(){
            const auth = sessionStorage.getItem("token");
            return Promise.resolve(auth);
        },
        errorHandler: function(error) {
            //Error during the creation of dossier. If session expired, redirect to login page.
            if([401,403].includes(error.statusCode)) {
                if (window.confirm(error.message)) {
                    location.href="login.html";
                }
            }
        }
    }).then((dossier)=> {
        dossier.addCustomErrorHandler(function(error){
            //Error after creating the dossier. If session expired, redirect to login page.
            if([401,403].includes(error.statusCode)) {
                if (window.confirm(error.message)) {
                    location.href="login.html";
                }
            }
        })
    })
}


/**
 *  Display list of dossiers in the Library.
 */

 function startLibrary() {
    const token = sessionStorage.getItem("token");
    const baseURL = sessionStorage.getItem("baseURL");

    getSession(baseURL, token)
    .then((session) => {

        extendSession(baseURL,token)

        document.getElementById("usermessage").innerHTML = "<h3>" + session.fullName + "</h3>"
        // var project_id = "B7CA92F04B9FAE8D941C3E9B7E0CD754";
        getLibrary(baseURL, token).then((library)=> {

        
            var table = document.getElementById("dossierTable");
            for (i = 0; i < library.length; i++) {
                var row = table.insertRow(i + 1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = library[i].name;
                cell2.innerHTML = library[i].target.id;
                cell3.innerHTML = library[i].description;
                row.setAttribute("onmouseover","style='background-color:#C0C0C0';");
                row.setAttribute("onmouseout","style='background-color:default';");
                (function () {
                    const id = library[i].target.id;
                    const title = library[i].name;
                    const project_id = library[i].projectId;
                    row.addEventListener("click", function() {
                        document.getElementById("dossierTitle").style.display="block";
                        document.getElementById("dossierTitle").innerHTML = "<h3>" + title + "</h3>";
                        createDossier(baseURL,project_id,id);
                    });  
                }());
            }
            $("#dossierTable tr").click(function() {
                var selected = $(this).hasClass("highlight");
                $("#dossierTable tr").removeClass("highlight");
                if(!selected)
                    $(this).addClass("highlight");
            });        
        });
    })
    .catch((error)=> {
        location.href="login.html";
    })

    
}

/**
 * Display selected library/dossier as Embedded dossier.
 * @param baseURL MicroStrategy baseURL
 * @param projectID Project Id
 * @param dossierID Dossier Id
 */
function createDossier(baseURL,projectID,dossierID){
    var placeHolderDiv = document.getElementById("dossierPlaceholder");
    placeHolderDiv.innerHTML = "";
    var dossierUrl = baseURL + '/app/' + projectID + '/' + dossierID;
    microstrategy.dossier.create({
        placeholder: placeHolderDiv,
        url: dossierUrl,
        navigationBar: {
            enabled: true,
            gotoLibrary: false,
            options: false,
            comment: false,
            reset: false,
            filter: false
        },
        containerWidth: "100%",
        containerHeight: "800px",
        enableCustomAuthentication: true,
        customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
        getLoginToken: async function(){

            const auth = sessionStorage.getItem("token");
            return Promise.resolve(auth);
        },
        errorHandler: function(error) {
            //Error during the creation of dossier
            if (window.confirm(error.message)) {
                if([401,403].includes(error.statusCode)) {
                    location.href="login.html";
                }
            }
        }
    }).then((dossier)=> {
        dossier.addCustomErrorHandler(function(error){
            //Error after creating the dossier
            if (window.confirm(error.message)) {
                if([401,403].includes(error.statusCode)) {
                    location.href="login.html";
                }
            }
        });
    });
}