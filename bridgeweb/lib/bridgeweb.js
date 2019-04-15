/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.7.0
 */
Bridge.assembly("bridgeweb", function ($asm, globals) {
    "use strict";

    Bridge.define("app.App", {
        main: function Main () {

            System.Console.WriteLine("Welcome to Bridge.NET 2018");

            var canvas = Bridge.as(document.getElementById("renderCanvas"), HTMLCanvasElement);
            app.App.webgl = canvas.getContext("webgl");
            if (app.App.webgl == null) {
                app.App.webgl = canvas.getContext("experimental-webgl");
            }

            app.App.LoadRes(app.App.webgl);

            lighttool.Native.canvasAdapter.CreateScreenCanvas(app.App.webgl, new app.App.MyCanvasAction());
        },
        statics: {
            fields: {
                webgl: null
            },
            methods: {
                LoadRes: function (webgl) {
                    lighttool.loadTool.loadText("shader/test.shader.txt?" + System.Double.format(Math.random()), function (txt, err) {
                        lighttool.shaderMgr.parserInstance().parseDirect(webgl, txt);
                    });



                    var img = new Image();
                    img.src = "tex/1.jpg";
                    img.onload = function (e) {
                        var _spimg = lighttool.spriteTexture.fromRaw(webgl, img, lighttool.textureformat.RGBA, true, true);
                        lighttool.textureMgr.Instance().regDirect("tex/1.jpg", _spimg);
                    };

                    lighttool.atlasMgr.Instance().reg("2", "atlas/2.json.txt?" + System.Double.format(Math.random()), "tex/2.png", "?" + System.Double.format(Math.random()));


                    var img2 = new Image();
                    img2.src = "tex/1.png?" + System.Double.format(Math.random());
                    img2.onload = function (e) {
                        var _spimg2 = lighttool.spriteTexture.fromRaw(webgl, img2, lighttool.textureformat.RGBA, true, true);
                        lighttool.textureMgr.Instance().regDirect("tex/1.png", _spimg2);

                        lighttool.loadTool.loadText("atlas/1.json.txt?" + System.Double.format(Math.random()), function (txt, err) {
                            var _atlas = lighttool.spriteAtlas.fromRaw(webgl, txt, _spimg2);
                            lighttool.atlasMgr.Instance().regDirect("1", _atlas);
                        });
                    };
                    var img3 = new Image();
                    img3.src = "tex/STXINGKA.font.png?" + System.Double.format(Math.random());
                    img3.onload = function (e) {
                        var _spimg3 = lighttool.spriteTexture.fromRaw(webgl, img3, lighttool.textureformat.RGBA, true, true);
                        lighttool.textureMgr.Instance().regDirect("tex/STXINGKA.font.png", _spimg3);
                        lighttool.loadTool.loadText("font/STXINGKA.font.json.txt", function (txt, err) {
                            var _font = lighttool.spriteFont.fromRaw(webgl, txt, _spimg3);
                            lighttool.fontMgr.Instance().regDirect("f1", _font);
                        });
                    };

                }
            }
        }
    });

    Bridge.define("app.App.MyCanvasAction", {
        inherits: [lighttool.canvasAction],
        $kind: "nested class",
        fields: {
            trect: null,
            spritenames: null,
            timer: 0,
            trectBtn: null,
            btndown: false,
            showtxt: null
        },
        alias: [
            "ondraw", "lighttool$canvasAction$ondraw",
            "onpointevent", "lighttool$canvasAction$onpointevent",
            "onresize", "lighttool$canvasAction$onresize"
        ],
        ctors: {
            init: function () {
                this.trect = new lighttool.spriteRect();
                this.trectBtn = new lighttool.spriteRect();
                this.spritenames = new (System.Collections.Generic.List$1(System.String)).ctor();
                this.timer = 0;
                this.trectBtn = new lighttool.spriteRect.$ctor1(50, 150, 200, 50);
                this.btndown = false;
                this.showtxt = "";
            }
        },
        methods: {
            ondraw: function (c) {
                var $t;
                this.timer += 0.015;
                if (this.timer > 2.0) {
                    this.timer -= 2.0;
                }
                if (this.spritenames.Count === 0) {
                    var atlas = lighttool.atlasMgr.Instance().load(c.webgl, "1");
                    if (atlas != null) {
                        $t = Bridge.getEnumerator(atlas.sprites.Keys);
                        try {
                            while ($t.moveNext()) {
                                var iname = $t.Current;
                                this.spritenames.add(iname);
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }

                    }
                }

                var t = lighttool.textureMgr.Instance().load(c.webgl, "tex/1.jpg");
                if (t != null) {
                    this.trect.x = 0;
                    this.trect.y = 0;
                    this.trect.w = c.width;
                    this.trect.h = c.height;
                    c.drawTexture(t, this.trect.$clone(), lighttool.spriteRect.one.$clone(), new lighttool.spriteColor(1, 1, 1, 1.0));
                }

                if (this.spritenames.Count > 0) {
                    for (var i = 0; i < 30; i = (i + 1) | 0) {
                        var x = Math.random() * 500;
                        var y = Math.random() * 500;
                        var si = Bridge.Int.clip32(Math.random() * this.spritenames.Count);
                        this.trect.x = x;
                        this.trect.y = y;
                        this.trect.w = 100;
                        this.trect.h = 100;
                        c.drawSprite("1", this.spritenames.getItem(si), this.trect.$clone());
                    }
                }

                var font = lighttool.fontMgr.Instance().load(c.webgl, "f1");
                if (font != null && font.cmap != null) {
                    this.trect.x = 50;
                    this.trect.y = 50;
                    this.trect.w = 50;
                    this.trect.h = 50;
                    font.drawChar(c.spriteBatcher, "古", this.trect.$clone(), lighttool.spriteColor.white, lighttool.spriteColor.gray);
                    this.trect.x = 100;
                    this.trect.y = 50;
                    font.drawChar(c.spriteBatcher, "老", this.trect.$clone(), new lighttool.spriteColor(0.1, 0.8, 0.2, 0.8), new lighttool.spriteColor(1, 1, 1, 0));
                }

                this.trect.x = 50;
                this.trect.y = 150;
                this.trect.w = 200;
                this.trect.h = 50;
                if (t != null) {
                    c.drawTexture(t, this.trectBtn.$clone(), lighttool.spriteRect.one.$clone(), this.btndown ? lighttool.spriteColor.white : new lighttool.spriteColor(1, 1, 1, 0.5));
                }
                c.drawText("f1", "this is Btn", this.trectBtn.$clone(), this.btndown ? new lighttool.spriteColor(1, 0, 0, 1) : lighttool.spriteColor.white);

                this.trect.x = 0;
                this.trect.y = 0;
                this.trect.w = 500;
                this.trect.h = 25;
                c.drawText("f1", this.showtxt, this.trect.$clone());
            },
            onpointevent: function (c, e, x, y) {
                var skipevent = false;

                this.showtxt = "point=   " + System.Single.format(x) + " |,| " + System.Single.format(y);
                if (x > this.trectBtn.x && y > this.trectBtn.y && x < (this.trectBtn.x + this.trectBtn.w) && y < (this.trectBtn.y + this.trectBtn.h)) {
                    this.btndown = true;
                } else {
                    this.btndown = false;
                }
                return skipevent;
            },
            onresize: function (c) { }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ew0KICAidmVyc2lvbiI6IDMsDQogICJmaWxlIjogImJyaWRnZXdlYi5qcyIsDQogICJzb3VyY2VSb290IjogIiIsDQogICJzb3VyY2VzIjogWw0KICAgICIuLi9BcHAuY3MiDQogIF0sDQogICJuYW1lcyI6IFsNCiAgICAiIg0KICBdLA0KICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztZQWdCWUE7O1lBRUFBLGFBQWFBO1lBQ2JBLGdCQUFZQSxBQUF1QkE7WUFDbkNBLElBQUlBLGlCQUFTQTtnQkFDVEEsZ0JBQVFBLEFBQXVCQTs7O1lBRW5DQSxnQkFBUUE7O1lBRVJBLGtEQUFrREEsZUFBT0EsSUFBSUE7Ozs7Ozs7bUNBSXRDQTtvQkFNdkJBLDRCQUE0QkEsaURBQTRCQSxnQkFBZUEsQUFBdUJBLFVBQUNBLEtBQUtBO3dCQUVoR0EsaURBQWlEQSxPQUFPQTs7Ozs7b0JBVzVEQSxVQUFVQTtvQkFDVkE7b0JBQ0FBLGFBQWFBLFVBQUNBO3dCQUVWQSxhQUFhQSxnQ0FBZ0NBLE9BQU9BLEtBQUtBO3dCQUN6REEsdURBQXVEQTs7O29CQUkzREEsdUNBQXVDQSwyQ0FBc0JBLDZCQUE0QkEsMkJBQU1BOzs7b0JBRy9GQSxXQUFXQTtvQkFDWEEsV0FBV0Esb0NBQWVBO29CQUMxQkEsY0FBY0EsVUFBQ0E7d0JBRVhBLGNBQWNBLGdDQUFnQ0EsT0FBT0EsTUFBTUE7d0JBQzNEQSx1REFBdURBOzt3QkFFdkRBLDRCQUE0QkEsMkNBQXNCQSxnQkFBZUEsQUFBdUJBLFVBQUNBLEtBQUtBOzRCQUUxRkEsYUFBYUEsOEJBQThCQSxPQUFPQSxLQUFLQTs0QkFDdkRBLDZDQUE2Q0E7OztvQkFNckRBLFdBQVdBO29CQUNYQSxXQUFXQSxnREFBMkJBO29CQUN0Q0EsY0FBY0EsVUFBQ0E7d0JBRVhBLGNBQWNBLGdDQUFnQ0EsT0FBT0EsTUFBTUE7d0JBQzNEQSxtRUFBbUVBO3dCQUNuRUEsMkRBQTJEQSxBQUF1QkEsVUFBQ0EsS0FBS0E7NEJBRXBGQSxZQUFZQSw2QkFBNkJBLE9BQU9BLEtBQUtBOzRCQUNyREEsNkNBQTZDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBVTFCQSxLQUFJQTs7Z0NBRUNBLElBQUlBOzs7Ozs7OEJBR2pCQTs7Z0JBRWZBO2dCQUNBQSxJQUFJQTtvQkFDQUE7O2dCQUVKQSxJQUFJQTtvQkFFQUEsWUFBWUEsbUNBQW1DQTtvQkFDL0NBLElBQUlBLFNBQVNBO3dCQUVUQSwwQkFBc0JBOzs7O2dDQUVsQkEscUJBQXFCQTs7Ozs7Ozs7Ozs7Z0JBWWpDQSxRQUFRQSxxQ0FBcUNBO2dCQUM3Q0EsSUFBSUEsS0FBS0E7b0JBRUxBO29CQUNBQTtvQkFDQUEsZUFBZUE7b0JBQ2ZBLGVBQWVBO29CQUNmQSxjQUFjQSxHQUFHQSxxQkFBWUEsbUNBQTBCQSxJQUFJQTs7O2dCQUkvREEsSUFBSUE7b0JBR0FBLEtBQUtBLFdBQVdBLFFBQVFBO3dCQUVwQkEsUUFBUUEsQUFBT0E7d0JBQ2ZBLFFBQVFBLEFBQU9BO3dCQUNmQSxTQUFTQSxrQkFBS0EsQUFBQ0EsZ0JBQWdCQTt3QkFDL0JBLGVBQWVBO3dCQUNmQSxlQUFlQTt3QkFDZkE7d0JBQ0FBO3dCQUVBQSxrQkFBa0JBLHlCQUFpQkEsS0FBS0E7Ozs7Z0JBT2hEQSxXQUFXQSxrQ0FBa0NBO2dCQUM3Q0EsSUFBSUEsUUFBUUEsUUFBUUEsYUFBYUE7b0JBRTdCQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsY0FBY0Esc0JBQXNCQSxxQkFBWUEsNkJBQTZCQTtvQkFDN0VBO29CQUNBQTtvQkFDQUEsY0FBY0Esc0JBQXNCQSxxQkFBWUEsSUFBSUEsMkNBQStDQSxJQUFJQTs7O2dCQUkzR0E7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLElBQUlBLEtBQUtBO29CQUNMQSxjQUFjQSxHQUFHQSx3QkFBZUEsbUNBQTBCQSxlQUFlQSw4QkFBOEJBLElBQUlBOztnQkFDL0dBLGdDQUFnQ0Esd0JBQWVBLGVBQWVBLElBQUlBLG9DQUFvQ0E7O2dCQUV0R0E7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLGlCQUFpQkEsY0FBY0E7O29DQUdWQSxHQUFnQkEsR0FBb0JBLEdBQVNBO2dCQUVsRUE7O2dCQUVBQSxlQUFlQSxtQ0FBY0Esb0NBQWNBO2dCQUMzQ0EsSUFBSUEsSUFBSUEsbUJBQW1CQSxJQUFJQSxtQkFBbUJBLElBQUlBLENBQUNBLGtCQUFrQkEsb0JBQ2xFQSxJQUFJQSxDQUFDQSxrQkFBa0JBO29CQUUxQkE7O29CQUlBQTs7Z0JBRUpBLE9BQU9BOztnQ0FHVUEiLA0KICAic291cmNlc0NvbnRlbnQiOiBbDQogICAgInVzaW5nIEJyaWRnZTtcbnVzaW5nIEJyaWRnZS5XZWJHTDtcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIFN5c3RlbTtcbnVzaW5nIGxpZ2h0dG9vbDtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xuXG5uYW1lc3BhY2UgYXBwXG57XG4gICAgcHVibGljIGNsYXNzIEFwcFxuICAgIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIC8vIFdyaXRlIGEgbWVzc2FnZSB0byB0aGUgQ29uc29sZVxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoXCJXZWxjb21lIHRvIEJyaWRnZS5ORVQgMjAxOFwiKTtcblxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IEJyaWRnZS5IdG1sNS5Eb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgICAgIEFwcC53ZWJnbCA9IChXZWJHTFJlbmRlcmluZ0NvbnRleHQpY2FudmFzLkdldENvbnRleHQoXCJ3ZWJnbFwiKTtcbiAgICAgICAgICAgIGlmICh3ZWJnbCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHdlYmdsID0gKFdlYkdMUmVuZGVyaW5nQ29udGV4dCljYW52YXMuR2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiKTtcblxuICAgICAgICAgICAgTG9hZFJlcyh3ZWJnbCk7XG5cbiAgICAgICAgICAgIGxpZ2h0dG9vbC5OYXRpdmUuY2FudmFzQWRhcHRlci5DcmVhdGVTY3JlZW5DYW52YXMod2ViZ2wsIG5ldyBNeUNhbnZhc0FjdGlvbigpKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBMb2FkUmVzKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbClcbiAgICAgICAgeyAgICAgICAgICAvL3dlYmdsQ2FudmFzIOS9v+eUqOa1geeoi1xuICAgICAgICAgICAgLy8wMS7liJ3lp4vljJbmnZDotKjvvIzov5nkuKrmlofku7bph4zphY3nva7kuobmiYDmnInnjrDpmLbmrrXkvb/nlKjnmoRzaGFkZXLvvIzkuZ/lj6/ku6XmlL7lnKjkuI3lkIznmoTmlofku7bkuK3vvIzlpJrmiafooYzlh6DmrKFwYXJzZVVybOWwseihjOS6hlxuICAgICAgICAgICAgLy/liJ3lp4vljJbmnZDotKhcbiAgICAgICAgICAgIC8vbGlnaHR0b29sLnNoYWRlck1nci5wYXJzZXJJbnN0YW5jZSgpLnBhcnNlVXJsKHdlYmdsLCBcInNoYWRlci90ZXN0LnNoYWRlci50eHQ/XCIgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIC8v5omL5Yqo5Yqg6L295o6l5Y+jXG4gICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQoXCJzaGFkZXIvdGVzdC5zaGFkZXIudHh0P1wiICsgTWF0aC5SYW5kb20oKSwgKEFjdGlvbjxzdHJpbmcsRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnNoYWRlck1nci5wYXJzZXJJbnN0YW5jZSgpLnBhcnNlRGlyZWN0KHdlYmdsLCB0eHQpO1xuICAgICAgICAgICAgfVxuKSAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vMDIu5Yid5aeL5YyW6LWE5rqQ77yM6L+Z6YeM5Y+q5rOo5YaM5LiA5Liq5YWz57O777yM5Yiw55So5Yiw55qE5pe25YCZ5omN5Lya55yf55qE5Y675Yqg6L29XG4gICAgICAgICAgICAvL+azqOWGjOi0tOWbvlxuICAgICAgICAgICAgLy/otLTlm77nlKggdXJsIOS9nOS4uuWQjeWtl++8jOaPkOS+m+S4gOS4qiB1cmxhZGTvvIzlpoLmnpzkvaDmg7PopoHku7fmoLxyYW5kb20g5ZWl55qEXG4gICAgICAgICAgICAvL2xpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnKFwidGV4LzEuanBnXCIsIFwiP1wiICsgTWF0aC5yYW5kb20oKSwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWcoXCJ0ZXgvMS5qcGdcIiwgXCJcIiwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpOy8vIEltYWdlKCk7XG4gICAgICAgICAgICBpbWcuU3JjID0gXCJ0ZXgvMS5qcGdcIjtcbiAgICAgICAgICAgIGltZy5PbkxvYWQgPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgX3NwaW1nID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nLCBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcInRleC8xLmpwZ1wiLCBfc3BpbWcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy/ms6jlhozlm77pm4Yo5a+55bqU55qE6LS05Zu+5Lya6Ieq5Yqo5rOo5YaM5YiwdGV4dHVyZU1nciks5Zu+6ZuG5L2/55So5LiA5Liq5oyH5a6a55qE5ZCN5a2X77yM5L2g5rOo5YaM57uZ5LuW5ZWl5ZCN5a2X77yM5ZCO6Z2i5bCx55So6L+Z5Liq5ZCN5a2X5Y675L2/55SoXG4gICAgICAgICAgICBsaWdodHRvb2wuYXRsYXNNZ3IuSW5zdGFuY2UoKS5yZWcoXCIyXCIsIFwiYXRsYXMvMi5qc29uLnR4dD9cIiArIE1hdGguUmFuZG9tKCksIFwidGV4LzIucG5nXCIsIFwiP1wiICsgTWF0aC5SYW5kb20oKSk7XG5cblxuICAgICAgICAgICAgdmFyIGltZzIgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpO1xuICAgICAgICAgICAgaW1nMi5TcmMgPSBcInRleC8xLnBuZz9cIiArIE1hdGguUmFuZG9tKCk7XG4gICAgICAgICAgICBpbWcyLk9uTG9hZCA9IChlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBfc3BpbWcyID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nMiwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCJ0ZXgvMS5wbmdcIiwgX3NwaW1nMik7XG5cbiAgICAgICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQoXCJhdGxhcy8xLmpzb24udHh0P1wiICsgTWF0aC5SYW5kb20oKSwgKEFjdGlvbjxzdHJpbmcsRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2F0bGFzID0gbGlnaHR0b29sLnNwcml0ZUF0bGFzLmZyb21SYXcod2ViZ2wsIHR4dCwgX3NwaW1nMik7XG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5hdGxhc01nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcIjFcIiwgX2F0bGFzKTtcbiAgICAgICAgICAgICAgICB9XG4pICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy/ms6jlhozlrZfkvZMo5a+55bqU55qE6LS05Zu+5Lya6Ieq5Yqo5rOo5YaM5YiwdGV4dHVyZU1nciks5a2X5L2T5L2/55So5LiA5Liq5oyH5a6a55qE5ZCN5a2X77yM5L2g5rOo5YaM57uZ5LuW5ZWl5ZCN5a2X77yM5ZCO6Z2i5bCx55So6L+Z5Liq5ZCN5a2X5Y675L2/55SoXG4gICAgICAgICAgICAvL2xpZ2h0dG9vbC5mb250TWdyLkluc3RhbmNlKCkucmVnKFwiZjFcIiwgXCJmb250L1NUWElOR0tBLmZvbnQuanNvbi50eHRcIiwgXCJ0ZXgvU1RYSU5HS0EuZm9udC5wbmdcIiwgXCJcIik7XG4gICAgICAgICAgICB2YXIgaW1nMyA9IG5ldyBIVE1MSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgICAgICBpbWczLlNyYyA9IFwidGV4L1NUWElOR0tBLmZvbnQucG5nP1wiICsgTWF0aC5SYW5kb20oKTtcbiAgICAgICAgICAgIGltZzMuT25Mb2FkID0gKGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIF9zcGltZzMgPSBsaWdodHRvb2wuc3ByaXRlVGV4dHVyZS5mcm9tUmF3KHdlYmdsLCBpbWczLCBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcInRleC9TVFhJTkdLQS5mb250LnBuZ1wiLCBfc3BpbWczKTtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQoXCJmb250L1NUWElOR0tBLmZvbnQuanNvbi50eHRcIiwgKEFjdGlvbjxzdHJpbmcsRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2ZvbnQgPSBsaWdodHRvb2wuc3ByaXRlRm9udC5mcm9tUmF3KHdlYmdsLCB0eHQsIF9zcGltZzMpO1xuICAgICAgICAgICAgICAgICAgICBsaWdodHRvb2wuZm9udE1nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcImYxXCIsIF9mb250KTtcbiAgICAgICAgICAgICAgICB9XG4pICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGNsYXNzIE15Q2FudmFzQWN0aW9uIDogbGlnaHR0b29sLmNhbnZhc0FjdGlvblxuICAgICAgICB7XG4gICAgICAgICAgICBsaWdodHRvb2wuc3ByaXRlUmVjdCB0cmVjdCA9IG5ldyBzcHJpdGVSZWN0KCk7XG4gICAgICAgICAgICBMaXN0PHN0cmluZz4gc3ByaXRlbmFtZXMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XG4gICAgICAgICAgICBmbG9hdCB0aW1lciA9IDA7XG4gICAgICAgICAgICBsaWdodHRvb2wuc3ByaXRlUmVjdCB0cmVjdEJ0biA9IG5ldyBsaWdodHRvb2wuc3ByaXRlUmVjdCg1MCwgMTUwLCAyMDAsIDUwKTtcbiAgICAgICAgICAgIGJvb2wgYnRuZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgc3RyaW5nIHNob3d0eHQgPSBcIlwiO1xuICAgICAgICAgICAgcHVibGljIHZvaWQgb25kcmF3KHNwcml0ZUNhbnZhcyBjKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXIgKz0gMC4wMTVmO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyID4gMi4wZilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciAtPSAyLjBmO1xuICAgICAgICAgICAgICAgIC8vZ2V0IGFsbCBzcHJpdGUgaW4gYXRsYXMgd2hvIG5hbWVkIFwiMVwiXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ByaXRlbmFtZXMuQ291bnQgPT0gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdGxhcyA9IGxpZ2h0dG9vbC5hdGxhc01nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCIxXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXRsYXMgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGluYW1lIGluIGF0bGFzLnNwcml0ZXMuS2V5cylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZW5hbWVzLkFkZChpbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdCBmb3IgZHJhd2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGNjID0gMDsgY2MgPCAxMDsgY2MrKylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8ve1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5jZERyYXdlci5wdXNoKG5ldyBjb29sRG93bkRyYXdlcihhdGxhcywgdGhpcy5zcHJpdGVuYW1lc1tjY10pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuY2REcmF3ZXJbY2NdLnNldERlc3RSZWN0KG5ldyBsaWdodHRvb2wuc3ByaXRlUmVjdCg1MCAqIGNjLCA1MCwgNTAsIDUwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0ID0gbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5sb2FkKGMud2ViZ2wsIFwidGV4LzEuanBnXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0ICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBjLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBjLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgYy5kcmF3VGV4dHVyZSh0LCB0aGlzLnRyZWN0LCBsaWdodHRvb2wuc3ByaXRlUmVjdC5vbmUsIG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMSwgMSwgMS4wZikpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vZHJhdyBhdGxhc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwcml0ZW5hbWVzLkNvdW50ID4gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zcHJpdGVCYXRjaGVyLmJlZ2luZHJhdyh0aGlzLmF0bGFzLm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzA7IGkrKylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHggPSAoZmxvYXQpTWF0aC5SYW5kb20oKSAqIDUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ID0gKGZsb2F0KU1hdGguUmFuZG9tKCkgKiA1MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2kgPSAoaW50KShNYXRoLlJhbmRvbSgpICogdGhpcy5zcHJpdGVuYW1lcy5Db3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0geTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FudmFzIOWBmuazlVxuICAgICAgICAgICAgICAgICAgICAgICAgYy5kcmF3U3ByaXRlKFwiMVwiLCB0aGlzLnNwcml0ZW5hbWVzW3NpXSwgdGhpcy50cmVjdCk7IC8v562J5ZCM5LqO5LiL6Z2i55qE5Lik6KGMXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGF0bGFzID0gbGlnaHR0b29sLmF0bGFzTWdyLkluc3RhbmNlKCkubG9hZChjLndlYmdsLCBcIjFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYXRsYXMuZHJhdyhjLnNwcml0ZUJhdGNoZXIsIHRoaXMuc3ByaXRlbmFtZXNbc2ldLCB0aGlzLnRyZWN0LCB0aGlzLndoaXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vZHJhdyBmb25077yI5bqV5bGC5pa55rOV77yJXG4gICAgICAgICAgICAgICAgdmFyIGZvbnQgPSBsaWdodHRvb2wuZm9udE1nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCJmMVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9udCAhPSBudWxsICYmIGZvbnQuY21hcCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDUwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LncgPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQuZHJhd0NoYXIoYy5zcHJpdGVCYXRjaGVyLCBcIuWPpFwiLCB0aGlzLnRyZWN0LCBsaWdodHRvb2wuc3ByaXRlQ29sb3Iud2hpdGUsIGxpZ2h0dG9vbC5zcHJpdGVDb2xvci5ncmF5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgZm9udC5kcmF3Q2hhcihjLnNwcml0ZUJhdGNoZXIsIFwi6ICBXCIsIHRoaXMudHJlY3QsIG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMC4xZiwgMC44ZiwgMC4yZiwgMC44ZiksIG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMSwgMSwgMCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vZHJhd2ZvbnQgY2FudmFzIOaWueazlVxuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IDUwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDE1MDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LncgPSAyMDA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gNTA7XG4gICAgICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgYy5kcmF3VGV4dHVyZSh0LCB0aGlzLnRyZWN0QnRuLCBsaWdodHRvb2wuc3ByaXRlUmVjdC5vbmUsIHRoaXMuYnRuZG93biA/IGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSA6IG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMSwgMSwgMC41ZikpO1xuICAgICAgICAgICAgICAgIGMuZHJhd1RleHQoXCJmMVwiLCBcInRoaXMgaXMgQnRuXCIsIHRoaXMudHJlY3RCdG4sIHRoaXMuYnRuZG93biA/IG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMCwgMCwgMSkgOiBsaWdodHRvb2wuc3ByaXRlQ29sb3Iud2hpdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDUwMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSAyNTtcbiAgICAgICAgICAgICAgICBjLmRyYXdUZXh0KFwiZjFcIiwgdGhpcy5zaG93dHh0LCB0aGlzLnRyZWN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIGJvb2wgb25wb2ludGV2ZW50KHNwcml0ZUNhbnZhcyBjLCBjYW52YXNwb2ludGV2ZW50IGUsIGZsb2F0IHgsIGZsb2F0IHkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYm9vbCBza2lwZXZlbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3R4dCA9IFwicG9pbnQ9ICAgXCIgKyB4ICsgXCIgfCx8IFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoeCA+IHRoaXMudHJlY3RCdG4ueCAmJiB5ID4gdGhpcy50cmVjdEJ0bi55ICYmIHggPCAodGhpcy50cmVjdEJ0bi54ICsgdGhpcy50cmVjdEJ0bi53KVxuICAgICAgICAgICAgICAgICAgICAmJiB5IDwgKHRoaXMudHJlY3RCdG4ueSArIHRoaXMudHJlY3RCdG4uaCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNraXBldmVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIHZvaWQgb25yZXNpemUoc3ByaXRlQ2FudmFzIGMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSINCiAgXQ0KfQ==
