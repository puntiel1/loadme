/*! loadme.js
 * ================
 * JS application file for loadme v1. This file
 * should be included in all pages. It controls the 
 * scripts and styles to load
 *
 * @Author  Juan Puntiel
 * @Support <http://www.puntiel.com>
 * @Email   <juan@puntiel.com>
 * @version 1.0.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */


(function (window, document) {
	'use strict';


/* Loadme
 *
 * @type Object
 * @description loadme is the main object for the load scripts and styles.
 *              It's used for implementing functions and options related
 *              to the load the file much as js and css. Keeping a high performance 
 *              loading files when you need it.
 */


    var loadme = {
        
        doc : document,
    	// Loaded files
    	loaded: {},

    	// Shims that are imported are stored here.
    	depends: {},

    	// Libraries successfully loaded.
    	success: {},
        
    	// Libraries that failed to load.
    	failed: {},
        
        //Alias
        alias: {},
    };

    // Start our library.
    loadme.start = function() {   
    	var index;
    	for (index in loadme.utilities) {
    		if (loadme.utilities[index]) {
    			loadme.utility(loadme.utilities[index]);
    		}
    	}
        //load existing libraries
        var scripts = this.doc.getElementsByTagName('script');
        for(var i=0,l=scripts[length];i<l;i++){
    		clearUrl = this.parseUrl(scripts[i].getAttribute('src'));
            loaded[clearUrl.url] = true;
    	}
    	var links = this.doc.getElementsByTagName('link');
    	for(var i=0,l=links[length];i<l;i++){
            if(links[i].type==='text/css'){
                clearUrl = this.parseUrl(links[i].getAttribute('href'));
                loaded[clearUrl.url] = true;
            }
    	}
    };

    // Utility functions to check against variables.
    loadme.utilities = ['Array', 'Function', 'Object', 'String'];

    // Setup individual utility function.
    loadme.utility = function(type) {
    	loadme['is_' + type.toLowerCase()] = function(variable) {
    		/*eslint-disable*/
    		return typeof variable !== 'undefined' && Object.prototype.toString.call(variable) == '[object ' + type + ']';
    		/*eslint-enable*/
    	};
    };
    loadme.urlParse = function(url){
    	var parts={}; // url => clear url, id => id of url if contains, fallback = # of the url if contains
    	parts.url = url.replace(/#(=)?([^#]*)?/g,function(m,a,b){ parts[a?'fallback':'id'] = b; return '';});
    	return parts;
    }


    loadme.checkCallBack = function(callback){
    	if(!this.is_function(callback)){
            callback = function(){ };
        }
        return callback;
    }

    loadme.insertElement = function (type, url, callback){
        var ele = null;
        if(type=='css'){
            ele = this.doc.createElement('link');
            ele.type = 'text/css';
            ele.rel = 'stylesheet';
            ele.href = url
        }
        else if(type=='js'){
            ele = this.doc.createElement('script');
            ele.type = 'text/javascript';
            ele.src = url;
            if(callback){
				if(ele.readyState){
					ele.onreadystatechange = function(){
						if (ele.readyState === "loaded" || e.readyState === "complete"){
							ele.onreadystatechange = null;
							callback();
						}
					};
				}
                else{
					ele.onload = function (){ callback(); };
				}
			}
        }
        if(ele!=null){
            var header = this.doc.getElementsByName("head")[0] || this.doc.documentElement;
            header.appendChild(ele);
        }   
    }

    loadme.loadCss = function (url, callback){
        var clearUrl = this.urlParse(url);
        if(this.loaded && this.loaded[clearUrl.url]){
            callback();
            return this;
        }
        //$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', url));
        this.insertElement('css', url);
        callback();
        this.loaded[clearUrl.url] = true;
        return this;
    }

    loadme.loadJs = function (url, callback){
        var clearUrl = this.urlParse(url);
        if(this.loaded && this.loaded[clearUrl.url]){
            callback();
            return this;
        }
        this.insertElement('js', url, callback );
        this.loaded[clearUrl.url] = true;
        return this;
    }

    loadme.load = function(url, callback){
        callback = this.checkCallBack(callback);
        if(this.alias && this.alias[url]){
    		var args = this.alias[url].slice(0);
    		this.is_array(args) || (args=[args]);
            //args.push(callback);
    		return this.load(args,callback);
    	}
       
    	if( this.is_array(url) ){
            if(url.length==1){
                return this.load(url[0],callback);
            }
            else{
                loadme.ready = false;
                return this.load(url[0], function(){
                   url.shift();
                   loadme.load(url, callback);
                });
            }
    		/*for( var i=0; i<url.length; i++){
                if(i+1==url.length){
                    this.load(url[i],callback);
                }
                else{
                    loadme.ready = false;
                    this.load(url[i], function(){
                       url.shift();
                       loadme.load(url, callback);
                    });
                    break;
                }
    		}      
            return this;*/  
    	}
        //console.log("loading "+url);
        if(url.match(/\.css\b/) ){
    		return this.loadCss(url,callback);
    	}
        else if(url.match(/\.js\b/)){
            return this.loadJs(url,callback);    
        }
        return this;
    }

    loadme.addAlias = function(alias){ //List of objects
    	for(var i in alias ){
    		this.alias[i]= this.is_array(alias[i]) ? alias[i].slice(0) : alias[i];
    	}
    	return this;
    }
    loadme.start();
    window.loadme = loadme;
}(window, document));
