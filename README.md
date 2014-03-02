LiteScript Online Playground!
==
<h4>
<a href=http://rawgithub.com/luciotato/litescript_online_playground/master/playground/index.html target=_blank>
click HERE: (master/playground/index.html)</a>
</h4>


This is an online test for LiteScript Language: 
https://github.com/ltato/LiteScript

You can also clone this repository and run the server locally:

    git clone https://github.com/luciotato/LiteScript_online_playground
    cd LiteScript_online_playground/webServer
    node app

The [Bare WebServer](webServer/src/BareWebServer.lite.md) 
and the playground are written in LiteScript.

To alter and recompile: 

    sudo npm install -g litescript
 
 Bare WebServer:

    cd LiteScript_online_playground/webServer/src
    ./build.sh


the playground:

    cd LiteScript_online_playground/playground/js
    ./build.sh

