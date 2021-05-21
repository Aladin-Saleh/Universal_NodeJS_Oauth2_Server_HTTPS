/*************************************************************************
 * 
 * 
           _           _ _             _____       _      _     
     /\   | |         | (_)           / ____|     | |    | |    
    /  \  | | __ _  __| |_ _ __ _____| (___   __ _| | ___| |__  
   / /\ \ | |/ _` |/ _` | | '_ \______\___ \ / _` | |/ _ \ '_ \ 
  / ____ \| | (_| | (_| | | | | |     ____) | (_| | |  __/ | | |
 /_/    \_\_|\__,_|\__,_|_|_| |_|    |_____/ \__,_|_|\___|_| |_|
                                                                
                                                                
 * Serveur Nodejs créer dans le but de récuperer des jetons d'authentification dans diverses API.
 * Ce serveur possède des certificat auto-signé que vous devez intégrer dans votre navigateur. (cf README.md)
 * HTTPS
 * Créer le 20/05/21 par @Aladin-Saleh
 * Libre d'utilisation
 * Github :  https://github.com/Aladin-Saleh
 * npm --save install node-fetch
 * npm --save install express
 * 
************************************************************************/


console.log("Serveur HTTPS nodeJS - Certificat auto-signé !");

const fetch = require('node-fetch');

const express = require('express');
const app = express();

const https = require('https');

const path = require('path');//chemin
const fs = require('fs');//Lire des fichiers

const PORT = 3443;

const client_id = "";
const client_secret = "";

var code = "";
var access_token = "";
var token_type ="";

const GRANT_TYPE = "authorization_code";//refresh_token

const HOME_PAGE_URL = 'https://localhost:3443';
const CALLBACK = '/redirect';
const CALLBACK_URL = "https://localhost:3443/redirect"//Put your own callback URL // Metter votre propre callback URL





app.use(express.static(__dirname + '/public'));


app.get("/redirect",async function(req,res){
    code = req.query.code;
    console.log(req.query.code);
    let variable = {
        client_id: client_id, 
        client_secret: client_secret, 
        code:code,
        grant_type:GRANT_TYPE,
        redirect_uri: CALLBACK_URL
}

//Il se peut que vous ayez à integrer les variables directements dans l'url de l'access token
var ACCESS_TOKEN = ``;

    fetch(ACCESS_TOKEN,{
        method:'post',
        body:JSON.stringify(variable),
        headers:{
            accept:'*/*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Access-Control-Allow-Origin': "*",
            'Host': "",
        }

    })
    .then(response => response.json())
    .then(json =>{console.log(json);})
    .catch((error) => console.log(error))
})

const serveur_ssl = https.createServer({
    key:fs.readFileSync(path.join(__dirname,'cert','localhost.key')),
    cert:fs.readFileSync(path.join(__dirname,'cert','localhost.crt'))
},app);

serveur_ssl.listen(PORT,()=>console.log('Adresse : ' + HOME_PAGE_URL +"\nCallback URL : " + CALLBACK_URL));




