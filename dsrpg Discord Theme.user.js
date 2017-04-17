// ==UserScript==
// @name         DSRPG Discord-eqsue Theme
// @namespace    https://github.com/Shamadruu
// @version      1.0.0
// @description  A script to change the theme of DSRPG to one akin to Discord.
// @author       Shamadruu
// @match        www.dsrpg.uk/*
// @grant        none
// @updateURL    https://github.com/Shamadruu/dsrpg/raw/master/dsrpg%20Discord%20Theme.user.js
// @downloadURL  https://github.com/Shamadruu/dsrpg/raw/master/dsrpg%20Discord%20Theme.user.js
// ==/UserScript==

(function() {
    'use strict';

   // var doc = (window.frames.main||false) ? (window.frames.main.document) : (document);

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }

        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('body { background-color: #2e3136  !important;  color: #fff !important;}');
    addGlobalStyle('.container > .row > .col-sm-1, .container > .row > .col-sm-2, .container > .row > .col-sm-3, .container > .row > .col-sm-5, .container > .row > .col-sm-6, .container > .row > .col-sm-7, .container > .row > .col-sm-8, .container > .row > .col-sm-9, .container > .row > .col-sm-10, .container > .row > .col-sm-11, .container > .row > .col-sm-12, body > div > div:nth-child(2) > div.col-sm-4 > div > div { background-color: #36393e; color: #fff; border-radius: 10px;}');
    addGlobalStyle('.addBorder { border: 1px dashed #fff;}');
    addGlobalStyle('a {color: #538CEE;}');
	addGlobalStyle('a:active, a:hover {color:lime; }');
    addGlobalStyle('a:visited {color:#538CEE;}');
    addGlobalStyle('font[color="lightgreen"] {color: green!important}'); 
    addGlobalStyle('.user_status0{ color: #538CEE;}');
    addGlobalStyle('.container > .row:nth-of-type(2) > div:nth-of-type(1):after {content: "" !important;}');
	
	addGlobalStyle('.panel-heading {background-color: #1e2124!important; color: white!important; border:white!important}');
	addGlobalStyle('.panel-body {background-color: #36393e!important;}');
	addGlobalStyle('.panel.panel-default {border: white!important;}');
	addGlobalStyle('.btn-default {color: #fff; background-color: #808080; border-color: #adadad;}');
	addGlobalStyle('.well {background-color: #666666!important;}');
	addGlobalStyle('.panel-default > .panel-footer {background-color: #808080; border-color: #808080; color: white;}');
	addGlobalStyle('.panel-default > .panel-footer a {color: #538CEE; text-shadow: 0.5px 0.5px black;}');
	addGlobalStyle('.arenaRow { background-color: #333; border: 0.5px solid white;}');
	addGlobalStyle('font[color="#00688B"] { color: #0080FF!important;}');
	addGlobalStyle('.members_list tr:nth-child(even) { background-color:#555555}');
	
	addGlobalStyle('.modal-content {background-color: #666;!important;}');
	
	addGlobalStyle('body > div > div:nth-child(2) > div.col-sm-4 > div > div::after {float: right; font-size:10px;content: "Made by Shamadruu (1097)"}');
	
    //doc = document.querySelector('frame[name="readsect"]').context||document.querySelector('frame[name="readsect"]').contentDocument;
    addGlobalStyle('#chatbox { background-color: #1e2124;}');
	addGlobalStyle('#chatform *{ color:white!important;}');
    addGlobalStyle('body { background-color: #1e2124!important;}');
    addGlobalStyle('#chatbox *{ background-color: #1e2124!important;}');
    addGlobalStyle('#chatdisplay { background-color: #1e2124;}');
    addGlobalStyle('#chatdisplay font[color="cyan"] {color: cyan!important}');
    addGlobalStyle('#chatdisplay font[color="#5B90F6"] {color: lime!important}');
    addGlobalStyle('#chatdisplay font[color="green"] {color: yellow!important}');   
    addGlobalStyle('#chatdisplay font[color="#FA379F"] {color: orange!important}');
    addGlobalStyle('span[style="color: #00FFFF;"] { color: #0080FF!important;}');

    addGlobalStyle('::-webkit-scrollbar { width:6px; height:6px;}');
    addGlobalStyle('::-webkit-scrollbar-track { -webkig-box-shadow: inset 0 0 6px rgba(200,200,200,0.3); border-radius:10px;}');
    addGlobalStyle('::-webkit-scrollbar-thumb { border-radius: 10px; background: rgba(125,125,125,0.8);}');
})();
