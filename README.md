LiteScript Online Playground!
==
<h4>
<a href=http://luciotato.github.io/LiteScript_online_playground/playground/ target=_blank>
click HERE: (http://luciotato.github.io/LiteScript_online_playground/playground/)</a>
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

