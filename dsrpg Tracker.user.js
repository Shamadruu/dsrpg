// ==UserScript==
// @name         DSRPG Tracker
// @namespace    https://github.com/Shamadruu
// @version      1.1.0
// @description  A script to track various things for battling in DSRPG.
// @author       Shamadruu
// @match        www.dsrpg.uk/*
// @grant        none
// @updateURL    https://github.com/Shamadruu/dsrpg/raw/master/dsrpg%20Tracker.user.js
// @downloadURL  https://github.com/Shamadruu/dsrpg/raw/master/dsrpg%20Tracker.user.js
// ==/UserScript==

(function() {
	   /*

		Made by Shamadruu(1097)

	*/
	var script = function(){
		Number.prototype.format = function(){
		   return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		};
		function addStyle(parent, css) {
			var style;

			style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			parent.appendChild(style);
		}

		var doc = (window.frames.main||false) ? (window.frames.main.document) : (document);
		var Tracker = function(){
			var self = this;
			this.start = new Date().getTime();
			this.time = new Date().getTime();
			this.duration = this.time - this.start;
			
			this.log = {
				exp : 0,
				gexp : 0,
				gold : 0,
				ggold : 0,
				
				marble : 0,
				zircon : 0,
				quartz : 0,
				onyx: 0,
				
				credits : 0,
				
				str : 0,
				agi : 0,
				end : 0,
				
				mats: 0
			}
			
			this.statistics = {
				battles : 0,
				won: 0,
				lost: 0,
				ratio: 0,
				drops : 0,
				wst: 0,
				
				exphr : 0,
				gexphr : 0,
				goldhr : 0,
				ggoldhr : 0,
				
				eexptax : '0%',
				egoldtax : '0%',
				
				marblehr : 0,
				zirconhr : 0,
				quartzhr: 0,
				onyxhr: 0,
				
				strhr : 0,
				agihr : 0,
				endhr: 0,
				
				matshr : 0
			};
			
			this.drops = [];
			this.wst = [];
		};
		Tracker.prototype.parseData = function(data) {		
			var credits = 0, mats = 0;
			
			var exp = data.match(/You earned ((?:\d*,?\d*)*)/) !== null ? (~~data.match(/You earned ((?:\d*,?\d*)*)/)[1].replace(/,/, "")) : (0);
			var gexp = data.match(/You give ((?:\d*,?\d*)*) \(\d+%\) exp/) !== null ? (~~data.match(/You give ((?:\d*,?\d*)*) \(\d+%\) exp/)[1].replace(/,/, "")) : (0);
			var gold = data.match(/ experience and ((?:\d*,?\d*)*) gold/) !== null ? (~~data.match(/ experience and ((?:\d*,?\d*)*) gold/)[1].replace(/,/, "")) : (0);
			var ggold = data.match(/You give ((?:\d*,?\d*)*) \(\d+%\) gold/) !== null ? (~~data.match(/You give ((?:\d*,?\d*)*) \(\d+%\) gold/)[1].replace(/,/, "")) : (0);
			
			var marble = data.match(/find ((?:\d*,?\d*)*) Marble/i) !== null ? (~~data.match(/find ((?:\d*,?\d*)*) Marble/i)[1].replace(/,/, "")) : (0);
			var zircon = data.match(/find ((?:\d*,?\d*)*) Zircon/i) !== null ? (~~data.match(/find ((?:\d*,?\d*)*) Zircon/i)[1].replace(/,/, "")) : (0);
			var quartz = data.match(/find ((?:\d*,?\d*)*) Quartz/i) !== null ? (~~data.match(/find ((?:\d*,?\d*)*) Quartz/i)[1].replace(/,/, "")) : (0);
			var onyx = data.match(/find ((?:\d*,?\d*)*) Onyx/i) !== null ? (~~data.match(/find ((?:\d*,?\d*)*) Onyx/i)[1].replace(/,/, "")) : (0);
			
			//Rains
			
			marble += data.match(/(\d+) Marble has rained/) !== null ? (~~data.match(/(\d+) Marble has rained/)[1]) : (0);
			zircon += data.match(/(\d+) Zircon has rained/) !== null ? (~~data.match(/(\d+) Zircon has rained/)[1]) : (0);
			quartz += data.match(/(\d+) Quartz has rained/) !== null ? (~~data.match(/(\d+) Quartz has rained/)[1]) : (0);
			onyx += data.match(/(\d+) Onyx has rained/) !== null ? (~~data.match(/(\d+) Onyx has rained/)[1]) : (0); 
			credits+= data.match(/(\d+) Credit has rained/) !== null ? (~~data.match(/(\d+) Credit has rained/)[1]) : (0);
			
			
			var strength = data.match(/Your Strength Increases/) !== null ? (1) : (0);
			var agility = data.match(/Your Agility Increases/) !== null ? (1) : (0);
			var endurance = data.match(/Your Endurance Increases/) !== null ? (1) : (0);
			
			
			var won = data.match(/You have been killed/) === null ? (true) : (false);
			//var drop = data.match(/<b>(You found a\(n\) .*!)<\/b>/)||false;
			var drop = data.match(/found a \w+ full of (\w+)! \(((?:\d*,?\d*)*)\)/)||false;
			var wst = data.match(/found a\Wn\W ((?:\w+\W?)*)\W+Weird Throwing Item\W/)||false;
			
			var mats = data.match(/managed to find (\d+) (?:Steel|Leather|Iron|Lead|Zinc|Nickle|Velvet|Silk|Aluminum|Silver)/i) !== null ? (~~data.match(/managed to find (\d+) (?:Steel|Leather|Iron|Lead|Zinc|Nickle|Velvet|Silk|Aluminum|Silver)/i)[1]) : (0);
			
			
			this.statistics.battles++;
			if(won){
				this.statistics.won++;
			}
			else{
				this.statistics.lost++;
			}
			if(drop){
				this.drops.push(drop[0]);
				
				marble += data.match(/found a \w+ full of Marble! \(((?:\d*,?\d*)*)\)/) !== null ? (~~data.match(/found a \w+ full of Marble! \(((?:\d*,?\d*)*)\)/)[1]) : (0);
				zircon += data.match(/found a \w+ full of Zircon! \(((?:\d*,?\d*)*)\)/) !== null ? (~~data.match(/found a \w+ full of Zircon! \(((?:\d*,?\d*)*)\)/)[1]) : (0);
				quartz += data.match(/found a \w+ full of Quartz! \(((?:\d*,?\d*)*)\)/) !== null ? (~~data.match(/found a \w+ full of Quartz! \(((?:\d*,?\d*)*)\)/)[1]) : (0);
				onyx += data.match(/found a \w+ full of Onyx! \(((?:\d*,?\d*)*)\)/) !== null ? (~~data.match(/found a \w+ full of Onyx! \(((?:\d*,?\d*)*)\)/)[1]) : (0);
				credits += data.match(/found a \w+ full of Credits! \(((?:\d*,?\d*)*)\)/) !== null ? (~~data.match(/found a \w+ full of Credits! \(((?:\d*,?\d*)*)\)/)[1]) : (0);
				
				console.log(this.drops);
			}
			if(wst){
				this.wst.push(wst[1]);
			}
			
			
			this.log.exp += ~~exp;
			this.log.gexp += ~~gexp;
			this.log.gold += ~~gold;
			this.log.ggold += ~~ggold;
			
			this.log.marble += marble;
			this.log.zircon += zircon;
			this.log.quartz += quartz;
			this.log.onyx += onyx;
			
			this.log.credits += credits;
			
			this.log.str += strength;
			this.log.agi += agility;
			this.log.end += endurance;
			
			this.log.mats += mats;
			
			this.update();
		};
		Tracker.prototype.update = function(){
			this.time = new Date().getTime();
			this.duration = (this.time-this.start)/(60*60*1000);
			
			this.statistics.wratio = this.statistics.won/this.statistics.battles;
			this.statistics.lratio = this.statistics.lost/this.statistics.battles;
			
			this.statistics.exphr = this.log.exp/this.duration;
			this.statistics.gexphr = this.log.gexp/this.duration;
			this.statistics.goldhr = this.log.gold/this.duration;
			this.statistics.ggoldhr = this.log.ggold/this.duration;
			
			this.statistics.eexptax = Math.round(1000*this.log.gexp/(this.log.exp+this.log.gexp))/10 + "%";
			this.statistics.egoldtax = Math.round(1000*this.log.ggold/(this.log.gold+this.log.ggold))/10 + "%";
			
			this.statistics.marblehr = this.log.marble/this.duration;
			this.statistics.zirconhr = this.log.zircon/this.duration;
			this.statistics.quartzhr = this.log.quartz/this.duration;
			this.statistics.onyxhr = this.log.onyx/this.duration;
			
			this.statistics.strhr = this.log.str/this.duration;
			this.statistics.agihr = this.log.agi/this.duration;
			this.statistics.endhr = this.log.end/this.duration;
			
			this.statistics.drops = this.drops.length;
			this.statistics.wst = this.wst.length;
			
			this.statistics.matshr = this.log.mats/this.duration;
			
			this.save();
			this.updateHTML();
		};
		Tracker.prototype.buildHTML = function(){
			var self = this;
			var logRow = doc.querySelector(".container > div.row:nth-child(3)");
			logRow.appendChild(document.createElement("br"));
			
			var log = document.createElement("div");
			log.id = "log";
			log.classList.add("col-sm-12");
			log.classList.add("addBorder");
			
			log.innerHTML += ('<table id="tracker"><tbody></tbody></table>');
			var table = log.querySelector("#tracker tbody");
			
			table.innerHTML += ('<tr><td id="battles">Battles</td><td id="won">Won</td><td id="lost">Lost</td><td id="credits">Credits</td></tr>');
			table.innerHTML += ('<tr><td id="drops">Drop</td><td id="wst">WST</td><td id="mats">Mats</td><td id="matshr">Materials/hr</td></tr>');
			table.innerHTML += ('<tr><td id="exp">Exp</td><td id="exphr">Exp/hr</td><td id="gexp">Guild Exp</td><td id="gexphr">Guild Exp/hr</td></tr>');
			table.innerHTML += ('<tr><td id="gold">Gold</td><td id="goldhr">Gold/hr</td><td id="ggold">Guild Gold</td><td id="ggoldhr">Guild Gold/hr</td></tr>');
			table.innerHTML += ('<tr><td id="marble">Marble</td><td id="marblehr">Marble/hr</td><td id="zircon">Zircon</td><td id="zirconhr">Zircon/hr</td>');
			table.innerHTML += ('<tr><td id="quartz">Quartz</td><td id="quartzhr">Quartz/hr</td><td id="onyx">Onyx</td><td id="onyxhr">Onyx/hr</td>');
			table.innerHTML += ('<br><tr><td id="str">Strength</td><td id="strhr">Strength/hr</td><td id="agi">Agility</td><td id="agihr">Agility/hr</td>');
			table.innerHTML += ('<tr><td id="end">Endurance</td><td id="endhr">Endurance/hr</td><td>&nbsp</td><td id="time">Time</td>');
			
			addStyle(doc.head, '#log table{ width: 100%;}');
			addStyle(doc.head, '#log table td{ text-align: left; padding: 0.65em;}');
			addStyle(doc.head, "#log { width: 100%;}");
			
			logRow.appendChild(log);
			logRow.innerHTML += ('<div style="font-size: 10px; float:right;">Made by Shamadruu(1097)</div>')
			
			var reset = document.createElement("button");
			reset.id = "reset";
			reset.innerText = "Reset";
			logRow.appendChild(reset);
			
			logRow.querySelector("#reset").onclick = function(){
				self.reset();
			};
			
			
			
			
		};
		Tracker.prototype.updateHTML = function(){
			var table = doc.querySelector("#tracker");
			table.querySelector("#battles").innerHTML = '<b>Battles:</b> ' + this.statistics.battles.format();
			table.querySelector("#won").innerHTML = '<b>Won:</b> ' + this.statistics.won.format() + " (" + (Math.round(this.statistics.wratio * 1000)/10) + "%)";
			table.querySelector("#lost").innerHTML = '<b>Lost:</b> ' + this.statistics.lost.format() + " (" + (Math.round(this.statistics.lratio * 1000)/10) + "%)";
			table.querySelector("#credits").innerHTML = '<b>Credits:</b> ' + this.log.credits;
			
			table.querySelector("#drops").innerHTML = '<b>Drops:</b> ' + this.statistics.drops;
			table.querySelector("#wst").innerHTML = '<b>WST:</b> ' + this.statistics.wst;
			table.querySelector("#mats").innerHTML = '<b>Materials:</b> ' + this.log.mats;
			table.querySelector("#matshr").innerHTML = '<b>Materials/hr:</b> ' + (~~this.statistics.matshr).format();
			
			
			
			table.querySelector("#exp").innerHTML = '<b>Exp:</b> ' + this.log.exp.format();
			table.querySelector("#exphr").innerHTML = '<b>Exp/hr:</b> ' + (~~this.statistics.exphr).format();
			table.querySelector("#gexp").innerHTML = '<b>G. Exp:</b> ' + this.log.gexp.format() + " (" + this.statistics.eexptax + ")";
			table.querySelector("#gexphr").innerHTML = '<b>G. Exp/hr:</b> ' + (~~this.statistics.gexphr).format();
			table.querySelector("#gold").innerHTML = '<b>Gold:</b> ' + this.log.gold.format();
			table.querySelector("#goldhr").innerHTML = '<b>Gold/hr:</b> ' + (~~this.statistics.goldhr).format();
			table.querySelector("#ggold").innerHTML = '<b>G. Gold:</b> ' + this.log.ggold.format() + " (" + this.statistics.egoldtax + ")";
			table.querySelector("#ggoldhr").innerHTML = '<b>G. Gold/hr:</b> ' + (~~this.statistics.ggoldhr).format();
			
			table.querySelector("#marble").innerHTML = '<b>Marble:</b> ' + this.log.marble.format();
			table.querySelector("#marblehr").innerHTML = '<b>Marble/hr:</b> ' + (~~this.statistics.marblehr).format();
			table.querySelector("#zircon").innerHTML = '<b>Zircon:</b> ' + this.log.zircon.format();
			table.querySelector("#zirconhr").innerHTML = '<b>Zircon/hr:</b> ' + (~~this.statistics.zirconhr).format();
			table.querySelector("#quartz").innerHTML = '<b>Quartz:</b> ' + this.log.quartz.format();
			table.querySelector("#quartzhr").innerHTML = '<b>Quartz/hr:</b> ' + (~~this.statistics.quartzhr).format();
			table.querySelector("#onyx").innerHTML = '<b>Onyx:</b> ' + this.log.onyx.format();
			table.querySelector("#onyxhr").innerHTML = '<b>Onyx/hr:</b> ' + (~~this.statistics.onyxhr).format();
			
			table.querySelector("#str").innerHTML = '<b>Strength:</b> ' + this.log.str;
			table.querySelector("#strhr").innerHTML = '<b>Strength/hr:</b> ' + (~~this.statistics.strhr).format();
			table.querySelector("#agi").innerHTML = '<b>Agility:</b> ' + this.log.agi;
			table.querySelector("#agihr").innerHTML = '<b>Agility/hr:</b> ' + (~~this.statistics.agihr).format();
			table.querySelector("#end").innerHTML = '<b>Endurance:</b> ' + this.log.end;
			table.querySelector("#endhr").innerHTML = '<b>Endurance/hr:</b> ' + (~~this.statistics.endhr).format();
			table.querySelector("#time").innerHTML = '<b>Duration:</b> ' + (~~(60*60*this.duration)).format() + 's';
		};
		Tracker.prototype.save = function(){
			var save = {};
			save.duration = this.time - this.start;
			save.wst = this.wst;
			save.drops = this.drops;
			save.log = this.log;
			save.statistics = this.statistics;
			
			window.localStorage.setItem("tracker", btoa(JSON.stringify(save)));
		};
		Tracker.prototype.load = function(){
			var save;
			if(!window.localStorage.getItem("tracker")){
				console.log("Nothing saved! \nLoading default!");
				this.save();
			}
			else{
				console.log("Loading save!\n", atob(window.localStorage.getItem("tracker")));
				save = JSON.parse(atob(window.localStorage.getItem("tracker")));
				
				this.wst = save.wst;
				this.drops = save.drops;
				this.log = save.log;
				this.statistics = save.statistics;
				this.start = new Date();
				this.start.setTime(new Date().getTime() - save.duration);
			}
		};
		Tracker.prototype.reset = function(){
			this.start = new Date().getTime();
			this.time = new Date().getTime();
			this.duration = this.time - this.start;
			
			this.log = {
				exp : 0,
				gexp : 0,
				gold : 0,
				ggold : 0,
				
				marble : 0,
				zircon : 0,
				quartz : 0,
				onyx: 0,
				
				credits : 0,
				
				str : 0,
				agi : 0,
				end : 0,
				
				mats: 0
			}
			
			this.statistics = {
				battles : 0,
				won: 0,
				lost: 0,
				ratio: 0,
				drops : 0,
				wst: 0,
				
				exphr : 0,
				gexphr : 0,
				goldhr : 0,
				ggoldhr : 0,
				
				eexptax : '0%',
				egoldtax : '0%',
				
				marblehr : 0,
				zirconhr : 0,
				quartzhr: 0,
				onyxhr: 0,
				
				strhr : 0,
				agihr : 0,
				endhr: 0,
				
				matshr: 0
			};
			
			this.drops = [];
			this.wst = [];
			
		};
		Tracker.prototype.init = function(){
			this.load();
			this.buildHTML();
			this.updateHTML();
		};
		tracker = new Tracker();
		tracker.init();
			
		var outwindow = doc.querySelector("#outwindow");

		var observer = new MutationObserver(function(mutations){
			var data = '';
			mutations.forEach(function(mutation){
				mutation.addedNodes.forEach(function(node){
					data += node.innerHTML;
				});
			});
			//console.log(mutations);
			tracker.parseData(data);
			
		});
		observer.observe(outwindow, {childList: true, characterData : true});
	};
		
	var doc = (window.frames.main||false) ? (window.frames.main.document) : (document);
	var scriptE = document.createElement("script");
	scriptE.innerHTML = "(" + script + ")();";
	doc.querySelector('#outwindow').insertBefore(scriptE, doc.querySelector('#aTimerContainer'));
})();
