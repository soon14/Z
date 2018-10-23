/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2017/1/20
 * Time: 13:50
 */
'use strict';
class BrowserType {
    constructor(){
        this.userAgent = navigator.userAgent.toLocaleLowerCase();
    }

    isIE(){
        if( !!window.ActiveXObject || "ActiveXObject" in window ){
            return true;
        }
        return false;
    }

    isEdge(){
        if(this.userAgent.match(/edge\/([\d.]+)/)){
            return true;
        }
        return false;
    }

    isFirefox(){
        if(this.userAgent.match(/firefox\/([\d.]+)/)){
            return true;
        }
        return false;
    }

    isChrome(){
        if(this.userAgent.match(/chrome\/([\d.]+)/)){
            return true;
        }
        return false;
    }

    isSafari(){
        if(this.userAgent.match(/safari\/([\d.]+)/) && !this.userAgent.match(/chrome\/([\d.]+)/) ){
            return true;
        }
        return false;
    }

}
module.exports = new BrowserType();