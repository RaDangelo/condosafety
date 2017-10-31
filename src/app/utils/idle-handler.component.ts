import * as globalVars from '../globals';

declare var document: any;

export class IdleHandler {

    static inactivityTime: any;

    static resetTimer() {
        globalVars.GlobalVars.isIdle = false;
        clearTimeout(IdleHandler.inactivityTime);
        IdleHandler.inactivityTime = setTimeout(IdleHandler.isIdle.bind(this), 10000);
    }

    static handleIdle() {
        IdleHandler.resetTimer();
        document.onmousemove = IdleHandler.resetTimer;
        document.onkeypress = IdleHandler.resetTimer;
        document.onmousedown = IdleHandler.resetTimer;
        document.ontouchstart = IdleHandler.resetTimer;
        document.onclick = IdleHandler.resetTimer;
        document.onscroll = IdleHandler.resetTimer;
        document.onkeypress = IdleHandler.resetTimer;
    }

    static isIdle() {
        globalVars.GlobalVars.isIdle = true;
        globalVars.GlobalVars.idleTimer = new Date().toString();
    }
}