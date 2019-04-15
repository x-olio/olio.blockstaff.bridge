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

//# sourceMappingURL=data:application/json;base64,ew0KICAidmVyc2lvbiI6IDMsDQogICJmaWxlIjogImJyaWRnZXdlYi5qcyIsDQogICJzb3VyY2VSb290IjogIiIsDQogICJzb3VyY2VzIjogWw0KICAgICIuLi9BcHAuY3MiDQogIF0sDQogICJuYW1lcyI6IFsNCiAgICAiIg0KICBdLA0KICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztZQWdCWUE7O1lBRUFBLGFBQWFBO1lBQ2JBLGdCQUFZQSxBQUF1QkE7WUFDbkNBLElBQUlBLGlCQUFTQTtnQkFDVEEsZ0JBQVFBLEFBQXVCQTs7O1lBRW5DQSxnQkFBUUE7O1lBRVJBLGtEQUFrREEsZUFBT0EsSUFBSUE7Ozs7Ozs7bUNBSXRDQTtvQkFNdkJBLDRCQUE0QkEsaURBQTRCQSxnQkFBZUEsQUFBdUJBLFVBQUNBLEtBQUtBO3dCQUVoR0EsaURBQWlEQSxPQUFPQTs7Ozs7b0JBVzVEQSxVQUFVQTtvQkFDVkE7b0JBQ0FBLGFBQWFBLFVBQUNBO3dCQUVWQSxhQUFhQSxnQ0FBZ0NBLE9BQU9BLEtBQUtBO3dCQUN6REEsdURBQXVEQTs7O29CQUkzREEsdUNBQXVDQSwyQ0FBc0JBLDZCQUE0QkEsMkJBQU1BOzs7b0JBRy9GQSxXQUFXQTtvQkFDWEEsV0FBV0Esb0NBQWVBO29CQUMxQkEsY0FBY0EsVUFBQ0E7d0JBRVhBLGNBQWNBLGdDQUFnQ0EsT0FBT0EsTUFBTUE7d0JBQzNEQSx1REFBdURBOzt3QkFFdkRBLDRCQUE0QkEsMkNBQXNCQSxnQkFBZUEsQUFBdUJBLFVBQUNBLEtBQUtBOzRCQUUxRkEsYUFBYUEsOEJBQThCQSxPQUFPQSxLQUFLQTs0QkFDdkRBLDZDQUE2Q0E7OztvQkFNckRBLFdBQVdBO29CQUNYQSxXQUFXQSxnREFBMkJBO29CQUN0Q0EsY0FBY0EsVUFBQ0E7d0JBRVhBLGNBQWNBLGdDQUFnQ0EsT0FBT0EsTUFBTUE7d0JBQzNEQSxtRUFBbUVBO3dCQUNuRUEsMkRBQTJEQSxBQUF1QkEsVUFBQ0EsS0FBS0E7NEJBRXBGQSxZQUFZQSw2QkFBNkJBLE9BQU9BLEtBQUtBOzRCQUNyREEsNkNBQTZDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBVTFCQSxLQUFJQTs7Z0NBRUNBLElBQUlBOzs7Ozs7OEJBR2pCQTs7Z0JBRWZBO2dCQUNBQSxJQUFJQTtvQkFDQUE7O2dCQUVKQSxJQUFJQTtvQkFFQUEsWUFBWUEsbUNBQW1DQTtvQkFDL0NBLElBQUlBLFNBQVNBO3dCQUVUQSwwQkFBc0JBOzs7O2dDQUVsQkEscUJBQXFCQTs7Ozs7Ozs7Ozs7Z0JBWWpDQSxRQUFRQSxxQ0FBcUNBO2dCQUM3Q0EsSUFBSUEsS0FBS0E7b0JBRUxBO29CQUNBQTtvQkFDQUEsZUFBZUE7b0JBQ2ZBLGVBQWVBO29CQUNmQSxjQUFjQSxHQUFHQSxxQkFBWUEsbUNBQTBCQSxJQUFJQTs7O2dCQUkvREEsSUFBSUE7b0JBR0FBLEtBQUtBLFdBQVdBLFFBQVFBO3dCQUVwQkEsUUFBUUEsQUFBT0E7d0JBQ2ZBLFFBQVFBLEFBQU9BO3dCQUNmQSxTQUFTQSxrQkFBS0EsQUFBQ0EsZ0JBQWdCQTt3QkFDL0JBLGVBQWVBO3dCQUNmQSxlQUFlQTt3QkFDZkE7d0JBQ0FBO3dCQUVBQSxrQkFBa0JBLHlCQUFpQkEsS0FBS0E7Ozs7Z0JBT2hEQSxXQUFXQSxrQ0FBa0NBO2dCQUM3Q0EsSUFBSUEsUUFBUUEsUUFBUUEsYUFBYUE7b0JBRTdCQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUEsY0FBY0Esc0JBQXNCQSxxQkFBWUEsNkJBQTZCQTtvQkFDN0VBO29CQUNBQTtvQkFDQUEsY0FBY0Esc0JBQXNCQSxxQkFBWUEsSUFBSUEsMkNBQStDQSxJQUFJQTs7O2dCQUkzR0E7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLElBQUlBLEtBQUtBO29CQUNMQSxjQUFjQSxHQUFHQSx3QkFBZUEsbUNBQTBCQSxlQUFlQSw4QkFBOEJBLElBQUlBOztnQkFDL0dBLGdDQUFnQ0Esd0JBQWVBLGVBQWVBLElBQUlBLG9DQUFvQ0E7O2dCQUV0R0E7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLGlCQUFpQkEsY0FBY0E7Ozs7b0NBS1ZBLEdBQWdCQSxHQUFvQkEsR0FBU0E7Z0JBRWxFQTs7Z0JBRUFBLGVBQWVBLG1DQUFjQSxvQ0FBY0E7Z0JBQzNDQSxJQUFJQSxJQUFJQSxtQkFBbUJBLElBQUlBLG1CQUFtQkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxvQkFDbEVBLElBQUlBLENBQUNBLGtCQUFrQkE7b0JBRTFCQTs7b0JBSUFBOztnQkFFSkEsT0FBT0E7O2dDQUdVQSIsDQogICJzb3VyY2VzQ29udGVudCI6IFsNCiAgICAidXNpbmcgQnJpZGdlO1xudXNpbmcgQnJpZGdlLldlYkdMO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgU3lzdGVtO1xudXNpbmcgbGlnaHR0b29sO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG5cbm5hbWVzcGFjZSBhcHBcbntcbiAgICBwdWJsaWMgY2xhc3MgQXBwXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgLy8gV3JpdGUgYSBtZXNzYWdlIHRvIHRoZSBDb25zb2xlXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcIldlbGNvbWUgdG8gQnJpZGdlLk5FVCAyMDE4XCIpO1xuXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gQnJpZGdlLkh0bWw1LkRvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICAgICAgQXBwLndlYmdsID0gKFdlYkdMUmVuZGVyaW5nQ29udGV4dCljYW52YXMuR2V0Q29udGV4dChcIndlYmdsXCIpO1xuICAgICAgICAgICAgaWYgKHdlYmdsID09IG51bGwpXG4gICAgICAgICAgICAgICAgd2ViZ2wgPSAoV2ViR0xSZW5kZXJpbmdDb250ZXh0KWNhbnZhcy5HZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIpO1xuXG4gICAgICAgICAgICBMb2FkUmVzKHdlYmdsKTtcblxuICAgICAgICAgICAgbGlnaHR0b29sLk5hdGl2ZS5jYW52YXNBZGFwdGVyLkNyZWF0ZVNjcmVlbkNhbnZhcyh3ZWJnbCwgbmV3IE15Q2FudmFzQWN0aW9uKCkpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2w7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvYWRSZXMoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsKVxuICAgICAgICB7ICAgICAgICAgIC8vd2ViZ2xDYW52YXMg5L2/55So5rWB56iLXG4gICAgICAgICAgICAvLzAxLuWIneWni+WMluadkOi0qO+8jOi/meS4quaWh+S7tumHjOmFjee9ruS6huaJgOacieeOsOmYtuauteS9v+eUqOeahHNoYWRlcu+8jOS5n+WPr+S7peaUvuWcqOS4jeWQjOeahOaWh+S7tuS4re+8jOWkmuaJp+ihjOWHoOasoXBhcnNlVXJs5bCx6KGM5LqGXG4gICAgICAgICAgICAvL+WIneWni+WMluadkOi0qFxuICAgICAgICAgICAgLy9saWdodHRvb2wuc2hhZGVyTWdyLnBhcnNlckluc3RhbmNlKCkucGFyc2VVcmwod2ViZ2wsIFwic2hhZGVyL3Rlc3Quc2hhZGVyLnR4dD9cIiArIE1hdGgucmFuZG9tKCkpO1xuICAgICAgICAgICAgLy/miYvliqjliqDovb3mjqXlj6NcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dChcInNoYWRlci90ZXN0LnNoYWRlci50eHQ/XCIgKyBNYXRoLlJhbmRvbSgpLCAoQWN0aW9uPHN0cmluZyxFcnJvcj4pKCh0eHQsIGVycikgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wuc2hhZGVyTWdyLnBhcnNlckluc3RhbmNlKCkucGFyc2VEaXJlY3Qod2ViZ2wsIHR4dCk7XG4gICAgICAgICAgICB9XG4pICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8wMi7liJ3lp4vljJbotYTmupDvvIzov5nph4zlj6rms6jlhozkuIDkuKrlhbPns7vvvIzliLDnlKjliLDnmoTml7blgJnmiY3kvJrnnJ/nmoTljrvliqDovb1cbiAgICAgICAgICAgIC8v5rOo5YaM6LS05Zu+XG4gICAgICAgICAgICAvL+i0tOWbvueUqCB1cmwg5L2c5Li65ZCN5a2X77yM5o+Q5L6b5LiA5LiqIHVybGFkZO+8jOWmguaenOS9oOaDs+imgeS7t+agvHJhbmRvbSDllaXnmoRcbiAgICAgICAgICAgIC8vbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWcoXCJ0ZXgvMS5qcGdcIiwgXCI/XCIgKyBNYXRoLnJhbmRvbSgpLCBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICAgICAgLy9saWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZyhcInRleC8xLmpwZ1wiLCBcIlwiLCBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBIVE1MSW1hZ2VFbGVtZW50KCk7Ly8gSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5TcmMgPSBcInRleC8xLmpwZ1wiO1xuICAgICAgICAgICAgaW1nLk9uTG9hZCA9IChlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBfc3BpbWcgPSBsaWdodHRvb2wuc3ByaXRlVGV4dHVyZS5mcm9tUmF3KHdlYmdsLCBpbWcsIGxpZ2h0dG9vbC50ZXh0dXJlZm9ybWF0LlJHQkEsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwidGV4LzEuanBnXCIsIF9zcGltZyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL+azqOWGjOWbvumbhijlr7nlupTnmoTotLTlm77kvJroh6rliqjms6jlhozliLB0ZXh0dXJlTWdyKSzlm77pm4bkvb/nlKjkuIDkuKrmjIflrprnmoTlkI3lrZfvvIzkvaDms6jlhoznu5nku5bllaXlkI3lrZfvvIzlkI7pnaLlsLHnlKjov5nkuKrlkI3lrZfljrvkvb/nlKhcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5hdGxhc01nci5JbnN0YW5jZSgpLnJlZyhcIjJcIiwgXCJhdGxhcy8yLmpzb24udHh0P1wiICsgTWF0aC5SYW5kb20oKSwgXCJ0ZXgvMi5wbmdcIiwgXCI/XCIgKyBNYXRoLlJhbmRvbSgpKTtcblxuXG4gICAgICAgICAgICB2YXIgaW1nMiA9IG5ldyBIVE1MSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgICAgICBpbWcyLlNyYyA9IFwidGV4LzEucG5nP1wiICsgTWF0aC5SYW5kb20oKTtcbiAgICAgICAgICAgIGltZzIuT25Mb2FkID0gKGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIF9zcGltZzIgPSBsaWdodHRvb2wuc3ByaXRlVGV4dHVyZS5mcm9tUmF3KHdlYmdsLCBpbWcyLCBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcInRleC8xLnBuZ1wiLCBfc3BpbWcyKTtcblxuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dChcImF0bGFzLzEuanNvbi50eHQ/XCIgKyBNYXRoLlJhbmRvbSgpLCAoQWN0aW9uPHN0cmluZyxFcnJvcj4pKCh0eHQsIGVycikgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYXRsYXMgPSBsaWdodHRvb2wuc3ByaXRlQXRsYXMuZnJvbVJhdyh3ZWJnbCwgdHh0LCBfc3BpbWcyKTtcbiAgICAgICAgICAgICAgICAgICAgbGlnaHR0b29sLmF0bGFzTWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwiMVwiLCBfYXRsYXMpO1xuICAgICAgICAgICAgICAgIH1cbikgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL+azqOWGjOWtl+S9kyjlr7nlupTnmoTotLTlm77kvJroh6rliqjms6jlhozliLB0ZXh0dXJlTWdyKSzlrZfkvZPkvb/nlKjkuIDkuKrmjIflrprnmoTlkI3lrZfvvIzkvaDms6jlhoznu5nku5bllaXlkI3lrZfvvIzlkI7pnaLlsLHnlKjov5nkuKrlkI3lrZfljrvkvb/nlKhcbiAgICAgICAgICAgIC8vbGlnaHR0b29sLmZvbnRNZ3IuSW5zdGFuY2UoKS5yZWcoXCJmMVwiLCBcImZvbnQvU1RYSU5HS0EuZm9udC5qc29uLnR4dFwiLCBcInRleC9TVFhJTkdLQS5mb250LnBuZ1wiLCBcIlwiKTtcbiAgICAgICAgICAgIHZhciBpbWczID0gbmV3IEhUTUxJbWFnZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGltZzMuU3JjID0gXCJ0ZXgvU1RYSU5HS0EuZm9udC5wbmc/XCIgKyBNYXRoLlJhbmRvbSgpO1xuICAgICAgICAgICAgaW1nMy5PbkxvYWQgPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgX3NwaW1nMyA9IGxpZ2h0dG9vbC5zcHJpdGVUZXh0dXJlLmZyb21SYXcod2ViZ2wsIGltZzMsIGxpZ2h0dG9vbC50ZXh0dXJlZm9ybWF0LlJHQkEsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwidGV4L1NUWElOR0tBLmZvbnQucG5nXCIsIF9zcGltZzMpO1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dChcImZvbnQvU1RYSU5HS0EuZm9udC5qc29uLnR4dFwiLCAoQWN0aW9uPHN0cmluZyxFcnJvcj4pKCh0eHQsIGVycikgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZm9udCA9IGxpZ2h0dG9vbC5zcHJpdGVGb250LmZyb21SYXcod2ViZ2wsIHR4dCwgX3NwaW1nMyk7XG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5mb250TWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwiZjFcIiwgX2ZvbnQpO1xuICAgICAgICAgICAgICAgIH1cbikgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgY2xhc3MgTXlDYW52YXNBY3Rpb24gOiBsaWdodHRvb2wuY2FudmFzQWN0aW9uXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5zcHJpdGVSZWN0IHRyZWN0ID0gbmV3IHNwcml0ZVJlY3QoKTtcbiAgICAgICAgICAgIExpc3Q8c3RyaW5nPiBzcHJpdGVuYW1lcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcbiAgICAgICAgICAgIGZsb2F0IHRpbWVyID0gMDtcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5zcHJpdGVSZWN0IHRyZWN0QnRuID0gbmV3IGxpZ2h0dG9vbC5zcHJpdGVSZWN0KDUwLCAxNTAsIDIwMCwgNTApO1xuICAgICAgICAgICAgYm9vbCBidG5kb3duID0gZmFsc2U7XG4gICAgICAgICAgICBzdHJpbmcgc2hvd3R4dCA9IFwiXCI7XG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBvbmRyYXcoc3ByaXRlQ2FudmFzIGMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciArPSAwLjAxNWY7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXIgPiAyLjBmKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyIC09IDIuMGY7XG4gICAgICAgICAgICAgICAgLy9nZXQgYWxsIHNwcml0ZSBpbiBhdGxhcyB3aG8gbmFtZWQgXCIxXCJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcHJpdGVuYW1lcy5Db3VudCA9PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0bGFzID0gbGlnaHR0b29sLmF0bGFzTWdyLkluc3RhbmNlKCkubG9hZChjLndlYmdsLCBcIjFcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdGxhcyAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaW5hbWUgaW4gYXRsYXMuc3ByaXRlcy5LZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlbmFtZXMuQWRkKGluYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0IGZvciBkcmF3ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9yICh2YXIgY2MgPSAwOyBjYyA8IDEwOyBjYysrKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmNkRHJhd2VyLnB1c2gobmV3IGNvb2xEb3duRHJhd2VyKGF0bGFzLCB0aGlzLnNwcml0ZW5hbWVzW2NjXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5jZERyYXdlcltjY10uc2V0RGVzdFJlY3QobmV3IGxpZ2h0dG9vbC5zcHJpdGVSZWN0KDUwICogY2MsIDUwLCA1MCwgNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCJ0ZXgvMS5qcGdcIik7XG4gICAgICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjLmRyYXdUZXh0dXJlKHQsIHRoaXMudHJlY3QsIGxpZ2h0dG9vbC5zcHJpdGVSZWN0Lm9uZSwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAxLjBmKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGF0bGFzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ByaXRlbmFtZXMuQ291bnQgPiAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNwcml0ZUJhdGNoZXIuYmVnaW5kcmF3KHRoaXMuYXRsYXMubWF0KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IChmbG9hdClNYXRoLlJhbmRvbSgpICogNTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSAoZmxvYXQpTWF0aC5SYW5kb20oKSAqIDUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaSA9IChpbnQpKE1hdGguUmFuZG9tKCkgKiB0aGlzLnNwcml0ZW5hbWVzLkNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYW52YXMg5YGa5rOVXG4gICAgICAgICAgICAgICAgICAgICAgICBjLmRyYXdTcHJpdGUoXCIxXCIsIHRoaXMuc3ByaXRlbmFtZXNbc2ldLCB0aGlzLnRyZWN0KTsgLy/nrYnlkIzkuo7kuIvpnaLnmoTkuKTooYxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgYXRsYXMgPSBsaWdodHRvb2wuYXRsYXNNZ3IuSW5zdGFuY2UoKS5sb2FkKGMud2ViZ2wsIFwiMVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hdGxhcy5kcmF3KGMuc3ByaXRlQmF0Y2hlciwgdGhpcy5zcHJpdGVuYW1lc1tzaV0sIHRoaXMudHJlY3QsIHRoaXMud2hpdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGZvbnTvvIjlupXlsYLmlrnms5XvvIlcbiAgICAgICAgICAgICAgICB2YXIgZm9udCA9IGxpZ2h0dG9vbC5mb250TWdyLkluc3RhbmNlKCkubG9hZChjLndlYmdsLCBcImYxXCIpO1xuICAgICAgICAgICAgICAgIGlmIChmb250ICE9IG51bGwgJiYgZm9udC5jbWFwICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDUwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgZm9udC5kcmF3Q2hhcihjLnNwcml0ZUJhdGNoZXIsIFwi5Y+kXCIsIHRoaXMudHJlY3QsIGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSwgbGlnaHR0b29sLnNwcml0ZUNvbG9yLmdyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDUwO1xuICAgICAgICAgICAgICAgICAgICBmb250LmRyYXdDaGFyKGMuc3ByaXRlQmF0Y2hlciwgXCLogIFcIiwgdGhpcy50cmVjdCwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigwLjFmLCAwLjhmLCAwLjJmLCAwLjhmKSwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAwKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3Zm9udCBjYW52YXMg5pa55rOVXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gNTA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gMTUwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDIwMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSA1MDtcbiAgICAgICAgICAgICAgICBpZiAodCAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjLmRyYXdUZXh0dXJlKHQsIHRoaXMudHJlY3RCdG4sIGxpZ2h0dG9vbC5zcHJpdGVSZWN0Lm9uZSwgdGhpcy5idG5kb3duID8gbGlnaHR0b29sLnNwcml0ZUNvbG9yLndoaXRlIDogbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAwLjVmKSk7XG4gICAgICAgICAgICAgICAgYy5kcmF3VGV4dChcImYxXCIsIFwidGhpcyBpcyBCdG5cIiwgdGhpcy50cmVjdEJ0biwgdGhpcy5idG5kb3duID8gbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAwLCAwLCAxKSA6IGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gNTAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IDI1O1xuICAgICAgICAgICAgICAgIGMuZHJhd1RleHQoXCJmMVwiLCB0aGlzLnNob3d0eHQsIHRoaXMudHJlY3QpO1xuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIGJvb2wgb25wb2ludGV2ZW50KHNwcml0ZUNhbnZhcyBjLCBjYW52YXNwb2ludGV2ZW50IGUsIGZsb2F0IHgsIGZsb2F0IHkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYm9vbCBza2lwZXZlbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3R4dCA9IFwicG9pbnQ9ICAgXCIgKyB4ICsgXCIgfCx8IFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoeCA+IHRoaXMudHJlY3RCdG4ueCAmJiB5ID4gdGhpcy50cmVjdEJ0bi55ICYmIHggPCAodGhpcy50cmVjdEJ0bi54ICsgdGhpcy50cmVjdEJ0bi53KVxuICAgICAgICAgICAgICAgICAgICAmJiB5IDwgKHRoaXMudHJlY3RCdG4ueSArIHRoaXMudHJlY3RCdG4uaCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNraXBldmVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIHZvaWQgb25yZXNpemUoc3ByaXRlQ2FudmFzIGMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSINCiAgXQ0KfQ==
