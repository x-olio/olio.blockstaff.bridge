Bridge.assembly("bridgeweb", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = ["app","Bridge.WebGL","System","lighttool","System.Collections.Generic"];
    $m("app.App", function () { return {"nested":[$n[0].App.MyCanvasAction],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"LoadRes","is":true,"t":8,"pi":[{"n":"webgl","pt":$n[1].WebGLRenderingContext,"ps":0}],"sn":"LoadRes","rt":$n[2].Void,"p":[$n[1].WebGLRenderingContext]},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[2].Void},{"a":1,"n":"webgl","is":true,"t":4,"rt":$n[1].WebGLRenderingContext,"sn":"webgl"}]}; }, $n);
    $m("app.App.MyCanvasAction", function () { return {"td":$n[0].App,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ondraw","t":8,"pi":[{"n":"c","pt":$n[3].spriteCanvas,"ps":0}],"sn":"ondraw","rt":$n[2].Void,"p":[$n[3].spriteCanvas]},{"a":2,"n":"onpointevent","t":8,"pi":[{"n":"c","pt":$n[3].spriteCanvas,"ps":0},{"n":"e","pt":$n[3].canvaspointevent,"ps":1},{"n":"x","pt":$n[2].Single,"ps":2},{"n":"y","pt":$n[2].Single,"ps":3}],"sn":"onpointevent","rt":$n[2].Boolean,"p":[$n[3].spriteCanvas,$n[3].canvaspointevent,$n[2].Single,$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"onresize","t":8,"pi":[{"n":"c","pt":$n[3].spriteCanvas,"ps":0}],"sn":"onresize","rt":$n[2].Void,"p":[$n[3].spriteCanvas]},{"a":1,"n":"btndown","t":4,"rt":$n[2].Boolean,"sn":"btndown","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"showtxt","t":4,"rt":$n[2].String,"sn":"showtxt"},{"a":1,"n":"spritenames","t":4,"rt":$n[4].List$1(System.String),"sn":"spritenames"},{"a":1,"n":"timer","t":4,"rt":$n[2].Single,"sn":"timer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"trect","t":4,"rt":$n[3].spriteRect,"sn":"trect"},{"a":1,"n":"trectBtn","t":4,"rt":$n[3].spriteRect,"sn":"trectBtn"}]}; }, $n);
});
