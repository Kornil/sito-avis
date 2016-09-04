function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js");
loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");