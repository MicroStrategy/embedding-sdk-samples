/**
 * @author patelNeel
 * Created on 2nd Sept, 2020
 * Calling API.js file functions from this file in order to render Library and Report.
 * 
 */

var baseURL = "https://env-218434.customer.cloud.microstrategy.com/MicroStrategyLibrary";

/**
 * Display list of report which came in search result by user search criteria.
 */
async function startReport() {
   // project_id = "B7CA92F04B9FAE8D941C3E9B7E0CD754";
    token = await sessionStorage.getItem("token");
    var response = await getSession(baseURL, token);
    var session = await response.json();
    if(response.status!=200){
        location.href="index.html";
    }
    $("#selectionTable").find("tr:gt(0)").remove();
    document.getElementById("usermessage").innerHTML = "<h3>" + session.fullName + "</h3>";
    reportName = document.getElementById("reportsearch").value;
    var search_response = await getSearchResults(baseURL,token,reportName,3,10);
    var reports = (await search_response.json()).result;
    console.log(reports);

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
                embeddedReport(id,projectID);
            });
        }());
    }
}

/**
 * Display selected report as embedded report.
 * @param reportID Report Id
 * @param projectID project Id
 * @returns {Promise<void>}
 */
async function embeddedReport(reportID,projectID) {
    var instance = await reportInstance(baseURL,token,projectID,reportID);
    console.log(instance);
    document.getElementById("tableTitle").innerHTML = "<h3>"+instance.name+"</h3>";
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
            var username = sessionStorage.getItem("username");
            var password = sessionStorage.getItem("password");
            var auth = login(baseURL,username,password);
            return auth;
        }
    });

}


/**
 *  Display list of library/dossier.
 */
async function startLibrary() {
    var token = sessionStorage.getItem("token");
    var response = await getSession(baseURL, token);
    var session = await response.json();
    extendSession(baseURL,token)
    if(response.status!=200){
        location.href="index.html";
    }
    document.getElementById("usermessage").innerHTML = "<h3>" + session.fullName + "</h3>";
    var project_id = "B7CA92F04B9FAE8D941C3E9B7E0CD754";
    var library = await getLibrary(baseURL, token);
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
            var id = library[i].target.id;
            var title = library[i].name;
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
        getLoginToken: function(){
            var username = sessionStorage.getItem("username");
            var password = sessionStorage.getItem("password");
            var auth = login(baseURL,username,password);
            return auth;
        }
    });
}