/**
 * Created by Administrator on 2017/8/15.
 */

/**
 * Created by Administrator on 2017/8/15.
 */


function Drag(id) {
    var _this = this;
    this.oDiv = document.getElementById(id);
    this.disX = 0;
    this.disY = 0;
    this.oDiv.onmousedown = function (ev) {
        _this.onMouseDown(ev);
        return false;        //与onmousemove要异步进行
    };
};

Drag.prototype.onMouseDown = function (ev) {
    var _this = this;
    var oEvent = ev || event;
    this.disX = oEvent.clientX - this.oDiv.offsetLeft;   //既然大家都要用，那就设成成员变量
    this.disY = oEvent.clientY - this.oDiv.offsetTop;

    document.onmousemove = function (ev) {
        var oEvent = ev || event;
        _this.onMouseMove(oEvent);
    }

    document.onmouseup = function () {
        _this.onMouseUp();
    }
}
Drag.prototype.onMouseMove = function (oEvent) {
    this.oDiv.style.left = oEvent.clientX-this.disX + 'px';
    this.oDiv.style.top = oEvent.clientY-this.disY + 'px';

}
Drag.prototype.onMouseUp = function () {
    document.onmousemove = null;
    document.onmouseup = null;
}


function LimitedDrag(id) {
    Drag.call(this, id);
}

for(var i in Drag.prototype) {
    LimitedDrag.prototype[i] = Drag.prototype[i];
}      //不能写在构造函数里面

LimitedDrag.prototype.onMouseMove = function (oEvent) {   //直接重新写就行了
    var l = oEvent.clientX - this.disX;
    var t = oEvent.clientY - this.disY;

    if(l < 0) {
        l = 0;
    } else if(l > document.documentElement.clientWidth-this.oDiv.offsetWidth) {
        l = document.documentElement.clientWidth-this.oDiv.offsetWidth;
    }

    if(t < 0) {
        t = 0;
    } else if(t > document.documentElement.clientHeight - this.oDiv.offsetHeight) {
        t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
    }

    this.oDiv.style.left = l + 'px';
    this.oDiv.style.top = t + 'px';
};