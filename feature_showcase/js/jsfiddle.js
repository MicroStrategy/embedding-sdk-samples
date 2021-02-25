document.addEventListener("DOMContentLoaded", function(){

    //Create a hidden form
    var page_html = `
<html>
  <head>
    <script type="text/javascript" src="https://demo.microstrategy.com/MicroStrategyLibrary/javascript/embeddinglib.js"></script>
  </head>
  <body>`+document.body.innerHTML+`</body>
</html>`;

    var form_html = `
    <p><input type='submit'/></p>
    <select name="panel_html">
        <option value="0">HTML</option>
    </select>
    <textarea name='html'>`+page_html+`</textarea>
    <input type='text' name='wrap' value='l'/>`;

    var form = document.createElement("form");
    form.id = "jsfiddle_form";
    form.target = "fiddle_page";
    form.method = "POST"; // or "post" if appropriate
    form.action = "https://jsfiddle.net/api/post/mootools/1.3/dependencies/more/";
    form.hidden = "true";
    
    form.innerHTML = form_html;
    document.body.appendChild(form);

    //Create a jsfiddle button
    var jsfiddleDiv = document.createElement("div");
    jsfiddleDiv.innerHTML = '<input type="submit" style="background-color:#2e71ff;color:white;" value="Open JSFiddle" onclick="openJSFiddle()" />';
    document.body.prepend(jsfiddleDiv);

});

function openJSFiddle() {

    fiddlePage = window.open("", "fiddle_page", "status=0,title=0,height=600,width=800,scrollbars=1");

    if (fiddlePage) {
        var form = document.getElementById("jsfiddle_form");
        form.submit();
    } else {
        alert('You must allow popups for this to work.');
    }    

}