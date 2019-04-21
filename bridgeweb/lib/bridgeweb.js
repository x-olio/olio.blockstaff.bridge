/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.7.0
 */
Bridge.assembly("bridgeweb", function ($asm, globals) {
    "use strict";

    Bridge.define("bridgeweb.App", {
        main: function Main () {
            console.info("hih");
            console.info("bridge.blockstaff.menu");

            document.body.style.overflow = "hidden";
            document.body.style.margin = "0px";

            bridgeweb.App.InitMenuUI();



            bridgeweb.App.AddMenu("canvastest", bridgeweb.app_canvastest.Init);
            bridgeweb.App.AddMenu("blockstaff.server.test", bridgeweb.app_blockserver.Init);

        },
        statics: {
            fields: {
                divMenu: null
            },
            methods: {
                InitMenuUI: function () {
                    bridgeweb.App.divMenu = document.createElement("div");
                    bridgeweb.App.divMenu.style.position = "absolute";
                    bridgeweb.App.divMenu.style.top = "0px";
                    document.body.appendChild(bridgeweb.App.divMenu);
                },
                AddMenu: function (text, initfunc) {
                    var btn = document.createElement("button");
                    btn.textContent = text;
                    bridgeweb.App.divMenu.appendChild(btn);
                    var hr = document.createElement("br");
                    bridgeweb.App.divMenu.appendChild(hr);
                    btn.onclick = function (e) {
                        bridgeweb.App.DestroyMenuUI();
                        initfunc();
                    };
                },
                DestroyMenuUI: function () {
                    document.body.removeChild(bridgeweb.App.divMenu);
                }
            }
        }
    });

    Bridge.define("bridgeweb.app_blockserver", {
        statics: {
            fields: {
                server: null
            },
            methods: {
                Init: function () {
                    bridgeweb.app_blockserver.server = new bridgeweb.app_blockserver();

                    bridgeweb.app_blockserver.server.InitHTML();

                },
                AddInputBox: function (div, title, deftext) {
                    var usernametitle = document.createElement("span");
                    usernametitle.textContent = title;
                    div.appendChild(usernametitle);
                    var username = document.createElement("input");
                    username.type = "text";
                    username.value = deftext;
                    div.appendChild(username);
                    var br = document.createElement("br");
                    div.appendChild(br);
                    return username;
                },
                AddPasswordBox: function (div, title, deftext) {
                    var usernametitle = document.createElement("span");
                    usernametitle.textContent = title;
                    div.appendChild(usernametitle);
                    var username = document.createElement("input");
                    username.type = "password";
                    username.value = deftext;
                    div.appendChild(username);
                    var br = document.createElement("br");
                    div.appendChild(br);
                    return username;
                },
                AddFile: function (div, title) {

                    var usernametitle = document.createElement("span");
                    usernametitle.textContent = title;
                    div.appendChild(usernametitle);
                    var username = document.createElement("input");
                    username.type = "file";
                    div.appendChild(username);
                    var br = document.createElement("br");
                    div.appendChild(br);
                    return username;
                },
                AddHR: function (div) {
                    var hr = document.createElement("hr");
                    div.appendChild(hr);
                },
                AddButton: function (div, title) {
                    var btn = document.createElement("button");
                    btn.textContent = title;
                    div.appendChild(btn);
                    var br = document.createElement("br");
                    div.appendChild(br);

                    return btn;

                },
                AddTextArea: function (div, width, height) {
                    var outputList = document.createElement("textarea");
                    outputList.style.width = width + "px";
                    outputList.style.height = height + "px";
                    div.appendChild(outputList);
                    var br = document.createElement("br");
                    div.appendChild(br);
                    return outputList;
                }
            }
        },
        fields: {
            outputList: null,
            loginuser: null,
            logintoken: null
        },
        methods: {
            InitHTML: function () {
                var div = document.createElement("div");
                div.style.width = "100%";
                div.style.height = "100%";
                div.style.position = "absolute";
                div.style.overflow = "hidden";
                document.body.appendChild(div);

                var username = bridgeweb.app_blockserver.AddInputBox(div, "username", "abc");
                var password = bridgeweb.app_blockserver.AddPasswordBox(div, "password", "00");
                var btnlogin = bridgeweb.app_blockserver.AddButton(div, "login");
                bridgeweb.app_blockserver.AddHR(div);

                this.outputList = bridgeweb.app_blockserver.AddTextArea(div, 800, 300);

                btnlogin.onclick = Bridge.fn.bind(this, function (e) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        myparams, 
                        result, 
                        jsonresult, 
                        token, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.outputList.textContent = (this.outputList.textContent || "") + (("good day\n") || "");
                                        myparams = System.Array.init([username.value, password.value], System.String);
                                        $task1 = bridgeweb.http.http_tool.httpJsonRPC("http://127.0.0.1/rpc", "user_login", myparams);
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        result = $taskResult1;
                                        jsonresult = JSON.parse(result);
                                        if (Bridge.unbox(jsonresult.result.result) === true) {
                                            token = Bridge.unbox(jsonresult.result.token);
                                            this.AddOutput("login token=" + (token || ""));
                                            this.logintoken = token;
                                            this.loginuser = username.value;
                                        } else {
                                            this.AddOutput("login fail");
                                            this.loginuser = null;
                                            this.logintoken = null;
                                        }
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                });


                var file = bridgeweb.app_blockserver.AddFile(div, "upload a file.");
                file.onchange = Bridge.fn.bind(this, function (e) {
                    this.AddOutput("size=" + file.files[0].size);
                });


                var btnupload = bridgeweb.app_blockserver.AddButton(div, "upload file");
                btnupload.onclick = Bridge.fn.bind(this, function (e) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $task2, 
                        $taskResult2, 
                        $jumpFromFinally, 
                        _file, 
                        size, 
                        filestream, 
                        buf, 
                        result, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        _file = file.files[0];

                                        size = _file.size;
                                        this.AddOutput("size=" + size);
                                        $task1 = System.IO.FileStream.FromFile(_file);
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        filestream = $taskResult1;
                                        buf = System.Array.init(size, 0, System.Byte);
                                        filestream.Read(buf, 0, buf.length);

                                        $task2 = bridgeweb.http.http_tool.httpPost("http://127.0.0.1/uploadraw", "abc", this.logintoken, _file);
                                        $step = 2;
                                        $task2.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        result = $taskResult2;
                                        this.AddOutput("result=" + (result || ""));
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                });
            },
            AddOutput: function (txt) {
                this.outputList.textContent = (this.outputList.textContent || "") + (((txt || "") + "\n") || "");
            }
        }
    });

    Bridge.define("bridgeweb.app_canvastest", {
        statics: {
            fields: {
                webgl: null
            },
            methods: {
                Init: function () {

                    var div = document.createElement("div");
                    div.style.width = "100%";
                    div.style.height = "100%";
                    div.style.position = "absolute";
                    div.style.overflow = "hidden";
                    var canvas = document.createElement("canvas");
                    canvas.style.width = "100%";
                    canvas.style.height = "80%";
                    div.appendChild(canvas);
                    document.body.appendChild(div);

                    console.info("Welcome to Bridge.NET 2018");

                    bridgeweb.app_canvastest.webgl = canvas.getContext("webgl");
                    if (bridgeweb.app_canvastest.webgl == null) {
                        bridgeweb.app_canvastest.webgl = canvas.getContext("experimental-webgl");
                    }

                    bridgeweb.app_canvastest.LoadRes(bridgeweb.app_canvastest.webgl);

                    lighttool.Native.canvasAdapter.CreateScreenCanvas(bridgeweb.app_canvastest.webgl, new bridgeweb.app_canvastest.MyCanvasAction());
                },
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

    Bridge.define("bridgeweb.app_canvastest.MyCanvasAction", {
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

    Bridge.define("bridgeweb.http.http_tool", {
        statics: {
            methods: {
                httpPost: function (url, username, token, file) {
                    var $step = 0,
                        $task1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        _http, 
                        returnv, 
                        formdata, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1,2,3,4], $step);
                                    switch ($step) {
                                        case 0: {
                                            _http = new XMLHttpRequest();
                                            _http.open("post", url, true);
                                            returnv = "";
                                            _http.onreadystatechange = function () {
                                                if (_http.readyState === 4) {
                                                    returnv = _http.responseText;
                                                }
                                            };
                                            formdata = new FormData();
                                            formdata.append(file.name, file);
                                            formdata.append("user", username);
                                            formdata.append("token", token);
                                            _http.send(formdata);
                                            
                                            $step = 1;
                                            continue;
                                        }
                                        case 1: {
                                            if ( _http.readyState !== 4 ) {
                                                $step = 2;
                                                continue;
                                            } 
                                            $step = 4;
                                            continue;
                                        }
                                        case 2: {
                                            $task1 = System.Threading.Tasks.Task.delay(100);
                                            $step = 3;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 3: {
                                            $task1.getAwaitedResult();
                                            
                                            $step = 1;
                                            continue;
                                        }
                                        case 4: {
                                            $tcs.setResult(returnv);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                },
                httpGet: function (url) {
                    var $step = 0,
                        $task1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        _http, 
                        returnv, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1,2,3,4], $step);
                                    switch ($step) {
                                        case 0: {
                                            _http = new XMLHttpRequest();
                                            _http.open("get", url, true);

                                            returnv = "";
                                            _http.onreadystatechange = function () {
                                                if (_http.readyState === 4) {
                                                    returnv = _http.responseText;
                                                }
                                            };
                                            _http.send();
                                            
                                            $step = 1;
                                            continue;
                                        }
                                        case 1: {
                                            if ( _http.readyState !== 4 ) {
                                                $step = 2;
                                                continue;
                                            } 
                                            $step = 4;
                                            continue;
                                        }
                                        case 2: {
                                            $task1 = System.Threading.Tasks.Task.delay(100);
                                            $step = 3;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 3: {
                                            $task1.getAwaitedResult();
                                            
                                            $step = 1;
                                            continue;
                                        }
                                        case 4: {
                                            $tcs.setResult(returnv);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                },
                httpJsonRPC: function (url, method, JsonArray) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        _url, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1], $step);
                                    switch ($step) {
                                        case 0: {
                                            _url = (url || "") + "?jsonrpc=2.0&id=1&method=" + (method || "") + "&params=" + (JSON.stringify(Bridge.unbox(JsonArray)) || "");
                                            $task1 = bridgeweb.http.http_tool.httpGet(_url);
                                            $step = 1;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 1: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            $tcs.setResult($taskResult1);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ew0KICAidmVyc2lvbiI6IDMsDQogICJmaWxlIjogImJyaWRnZXdlYi5qcyIsDQogICJzb3VyY2VSb290IjogIiIsDQogICJzb3VyY2VzIjogWw0KICAgICIuLi9BcHAuY3MiLA0KICAgICIuLi9hcHBfYmxvY2tzZXJ2ZXIudGVzdC5jcyIsDQogICAgIi4uL2FwcF9jYW52YXN0ZXN0LmNzIiwNCiAgICAiLi4vaHR0cC9odHRwX3Rvb2wuY3MiDQogIF0sDQogICJuYW1lcyI6IFsNCiAgICAiIg0KICBdLA0KICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBZVlBO1lBQ0FBOztZQUdBQTtZQUNBQTs7WUFFQUE7Ozs7WUFLQUEsb0NBQXNCQSxBQUFRQTtZQUM5QkEsZ0RBQWtDQSxBQUFRQTs7Ozs7Ozs7O29CQUsxQ0Esd0JBQVVBO29CQUNWQTtvQkFDQUE7b0JBQ0FBLDBCQUEwQkE7O21DQUVWQSxNQUFZQTtvQkFFNUJBLFVBQVVBO29CQUNWQSxrQkFBa0JBO29CQUNsQkEsa0NBQW9CQTtvQkFDcEJBLFNBQVNBO29CQUNUQSxrQ0FBb0JBO29CQUNwQkEsY0FBY0EsVUFBQ0E7d0JBRVhBO3dCQUNBQTs7OztvQkFLSkEsMEJBQTBCQTs7Ozs7Ozs7Ozs7OztvQkN6QzFCQSxtQ0FBU0EsSUFBSUE7O29CQUViQTs7O3VDQUdnQ0EsS0FBb0JBLE9BQWNBO29CQUVsRUEsb0JBQW9CQTtvQkFDcEJBLDRCQUE0QkE7b0JBQzVCQSxnQkFBZ0JBO29CQUNoQkEsZUFBZUE7b0JBQ2ZBLGdCQUFnQkE7b0JBQ2hCQSxpQkFBaUJBO29CQUNqQkEsZ0JBQWdCQTtvQkFDaEJBLFNBQVNBO29CQUNUQSxnQkFBZ0JBO29CQUNoQkEsT0FBT0E7OzBDQUU0QkEsS0FBb0JBLE9BQWNBO29CQUVyRUEsb0JBQW9CQTtvQkFDcEJBLDRCQUE0QkE7b0JBQzVCQSxnQkFBZ0JBO29CQUNoQkEsZUFBZUE7b0JBQ2ZBLGdCQUFnQkE7b0JBQ2hCQSxpQkFBaUJBO29CQUNqQkEsZ0JBQWdCQTtvQkFDaEJBLFNBQVNBO29CQUNUQSxnQkFBZ0JBO29C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Q0FHbEJBOzRDQUNBQTs7Ozs7aURBQU9BLHFCQUFvQkE7Ozs7Ozs7OzRDQUV2QkEsU0FBTUE7Ozs7Ozs7Ozs7Ozs0Q0FFVkEsZUFBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FFeURBLEtBQVdBLFFBQWNBOzs7Ozs7Ozs7Ozs7Ozs7NENBRXpGQSxPQUFXQSw2Q0FBaUNBLDhCQUFxQkEsZUFBZUE7NENBQ2hGQSxTQUFhQSxpQ0FBUUE7Ozs7Ozs7MkRBQWRBIiwNCiAgInNvdXJjZXNDb250ZW50IjogWw0KICAgICJ1c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuV2ViR0w7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyBTeXN0ZW07XG51c2luZyBsaWdodHRvb2w7XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIGJyaWRnZXdlYlxue1xuICAgIHB1YmxpYyBjbGFzcyBBcHBcbiAgICB7XG4gICAgICAgIHN0YXRpYyBIVE1MRGl2RWxlbWVudCBkaXZNZW51O1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcImhpaFwiKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcImJyaWRnZS5ibG9ja3N0YWZmLm1lbnVcIik7XHJcblxuICAgICAgICAgICAgLy9pbml0IGJvZHlcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuT3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5NYXJnaW4gPSBcIjBweFwiO1xyXG5cclxuICAgICAgICAgICAgSW5pdE1lbnVVSSgpO1xyXG4gICAgICAgICAgICAvL2luaXQgZGl2TWVudVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBBZGRNZW51KFwiY2FudmFzdGVzdFwiLCAoQWN0aW9uKWFwcF9jYW52YXN0ZXN0LkluaXQpO1xyXG4gICAgICAgICAgICBBZGRNZW51KFwiYmxvY2tzdGFmZi5zZXJ2ZXIudGVzdFwiLCAoQWN0aW9uKWFwcF9ibG9ja3NlcnZlci5Jbml0KTtcclxuXHJcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgdm9pZCBJbml0TWVudVVJKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpdk1lbnUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2TWVudS5TdHlsZS5Qb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgZGl2TWVudS5TdHlsZS5Ub3AgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGRpdk1lbnUpO1xyXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIHZvaWQgQWRkTWVudShzdHJpbmcgdGV4dCxBY3Rpb24gaW5pdGZ1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYnRuID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oXCJidXR0b25cIik7XG4gICAgICAgICAgICBidG4uVGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgZGl2TWVudS5BcHBlbmRDaGlsZChidG4pO1xuICAgICAgICAgICAgdmFyIGhyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQlJFbGVtZW50PihcImJyXCIpO1xuICAgICAgICAgICAgZGl2TWVudS5BcHBlbmRDaGlsZChocik7XG4gICAgICAgICAgICBidG4uT25DbGljayA9IChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0cm95TWVudVVJKCk7XHJcbiAgICAgICAgICAgICAgICBpbml0ZnVuYygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIHZvaWQgRGVzdHJveU1lbnVVSSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKGRpdk1lbnUpO1xyXG4gICAgICAgIH1cblxuICAgIH1cbn0iLA0KICAgICJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuV2ViR0w7XHJcblxyXG5uYW1lc3BhY2UgYnJpZGdld2ViXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBhcHBfYmxvY2tzZXJ2ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXJ2ZXIgPSBuZXcgYXBwX2Jsb2Nrc2VydmVyKCk7XHJcblxyXG4gICAgICAgICAgICBzZXJ2ZXIuSW5pdEhUTUwoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IEFkZElucHV0Qm94KEhUTUxEaXZFbGVtZW50IGRpdiwgc3RyaW5nIHRpdGxlLCBzdHJpbmcgZGVmdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB1c2VybmFtZXRpdGxlID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MU3BhbkVsZW1lbnQ+KFwic3BhblwiKTtcclxuICAgICAgICAgICAgdXNlcm5hbWV0aXRsZS5UZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQodXNlcm5hbWV0aXRsZSk7XHJcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4oXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdXNlcm5hbWUuVHlwZSA9IElucHV0VHlwZS5UZXh0O1xyXG4gICAgICAgICAgICB1c2VybmFtZS5WYWx1ZSA9IGRlZnRleHQ7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTElucHV0RWxlbWVudCBBZGRQYXNzd29yZEJveChIVE1MRGl2RWxlbWVudCBkaXYsIHN0cmluZyB0aXRsZSwgc3RyaW5nIGRlZnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWV0aXRsZSA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTFNwYW5FbGVtZW50PihcInNwYW5cIik7XHJcbiAgICAgICAgICAgIHVzZXJuYW1ldGl0bGUuVGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKHVzZXJuYW1ldGl0bGUpO1xyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxJbnB1dEVsZW1lbnQ+KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lLlR5cGUgPSBJbnB1dFR5cGUuUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lLlZhbHVlID0gZGVmdGV4dDtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKHVzZXJuYW1lKTtcclxuICAgICAgICAgICAgdmFyIGJyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQlJFbGVtZW50PihcImJyXCIpO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQoYnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IEFkZEZpbGUoSFRNTERpdkVsZW1lbnQgZGl2LCBzdHJpbmcgdGl0bGUpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1ldGl0bGUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxTcGFuRWxlbWVudD4oXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICB1c2VybmFtZXRpdGxlLlRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZXRpdGxlKTtcclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MSW5wdXRFbGVtZW50PihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB1c2VybmFtZS5UeXBlID0gSW5wdXRUeXBlLkZpbGU7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBBZGRIUihIVE1MRGl2RWxlbWVudCBkaXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIVE1MSFJFbGVtZW50IGhyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MSFJFbGVtZW50PihcImhyXCIpO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQoaHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTEJ1dHRvbkVsZW1lbnQgQWRkQnV0dG9uKEhUTUxEaXZFbGVtZW50IGRpdiwgc3RyaW5nIHRpdGxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJ0biA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidG4uVGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBidG47XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTFRleHRBcmVhRWxlbWVudCBBZGRUZXh0QXJlYShIVE1MRGl2RWxlbWVudCBkaXYsIGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXRMaXN0ID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MVGV4dEFyZWFFbGVtZW50PihcInRleHRhcmVhXCIpO1xyXG4gICAgICAgICAgICBvdXRwdXRMaXN0LlN0eWxlLldpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIG91dHB1dExpc3QuU3R5bGUuSGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQob3V0cHV0TGlzdCk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dExpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBhcHBfYmxvY2tzZXJ2ZXIgc2VydmVyO1xyXG5cclxuICAgICAgICBIVE1MVGV4dEFyZWFFbGVtZW50IG91dHB1dExpc3Q7XHJcbiAgICAgICAgc3RyaW5nIGxvZ2ludXNlciA9IG51bGw7XHJcbiAgICAgICAgc3RyaW5nIGxvZ2ludG9rZW4gPSBudWxsO1xyXG4gICAgICAgIHZvaWQgSW5pdEhUTUwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXYuU3R5bGUuV2lkdGggPSBcIjEwMCVcIjtcclxuICAgICAgICAgICAgZGl2LlN0eWxlLkhlaWdodCA9IFwiMTAwJVwiO1xyXG4gICAgICAgICAgICBkaXYuU3R5bGUuUG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIGRpdi5TdHlsZS5PdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IEFkZElucHV0Qm94KGRpdiwgXCJ1c2VybmFtZVwiLCBcImFiY1wiKTtcclxuICAgICAgICAgICAgdmFyIHBhc3N3b3JkID0gQWRkUGFzc3dvcmRCb3goZGl2LCBcInBhc3N3b3JkXCIsIFwiMDBcIik7XHJcbiAgICAgICAgICAgIHZhciBidG5sb2dpbiA9IEFkZEJ1dHRvbihkaXYsIFwibG9naW5cIik7XHJcbiAgICAgICAgICAgIEFkZEhSKGRpdik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm91dHB1dExpc3QgPSBBZGRUZXh0QXJlYShkaXYsIDgwMCwgMzAwKTtcclxuXHJcbiAgICAgICAgICAgIGJ0bmxvZ2luLk9uQ2xpY2sgPSBhc3luYyAoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0TGlzdC5UZXh0Q29udGVudCArPSBcImdvb2QgZGF5XCIgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nW10gbXlwYXJhbXMgPSBuZXcgc3RyaW5nW10geyB1c2VybmFtZS5WYWx1ZSwgcGFzc3dvcmQuVmFsdWUgfTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBodHRwLmh0dHBfdG9vbC5odHRwSnNvblJQQyhcImh0dHA6Ly8xMjcuMC4wLjEvcnBjXCIsIFwidXNlcl9sb2dpblwiLCBteXBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbnJlc3VsdCA9IEpTT04uUGFyc2UocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGlmIChqc29ucmVzdWx0W1wicmVzdWx0XCJdW1wicmVzdWx0XCJdLkFzPGJvb2w+KCkgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBqc29ucmVzdWx0W1wicmVzdWx0XCJdW1widG9rZW5cIl0uQXM8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFkZE91dHB1dChcImxvZ2luIHRva2VuPVwiICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2ludG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbnVzZXIgPSB1c2VybmFtZS5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBZGRPdXRwdXQoXCJsb2dpbiBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2ludXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW50b2tlbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBmaWxlID0gQWRkRmlsZShkaXYsIFwidXBsb2FkIGEgZmlsZS5cIik7XHJcbiAgICAgICAgICAgIGZpbGUuT25DaGFuZ2UgPSAoZSkgPT5cclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIEFkZE91dHB1dChcInNpemU9XCIgKyBmaWxlLkZpbGVzWzBdLlNpemUpO1xyXG4gICAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGJ0bnVwbG9hZCA9IEFkZEJ1dHRvbihkaXYsIFwidXBsb2FkIGZpbGVcIik7XHJcbiAgICAgICAgICAgIGJ0bnVwbG9hZC5PbkNsaWNrID0gYXN5bmMgKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfZmlsZSA9IGZpbGUuRmlsZXNbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBfZmlsZS5TaXplO1xyXG4gICAgICAgICAgICAgICAgQWRkT3V0cHV0KFwic2l6ZT1cIiArIHNpemUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVzdHJlYW0gPSBhd2FpdCBfZmlsZS5HZXRGaWxlU3RyZWFtQXN5bmMoKTtcclxuICAgICAgICAgICAgICAgIGJ5dGVbXSBidWYgPSBuZXcgYnl0ZVtzaXplXTtcclxuICAgICAgICAgICAgICAgIGZpbGVzdHJlYW0uUmVhZChidWYsIDAsIGJ1Zi5MZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZyByZXN1bHQgPSBhd2FpdCBodHRwLmh0dHBfdG9vbC5odHRwUG9zdChcImh0dHA6Ly8xMjcuMC4wLjEvdXBsb2FkcmF3XCIsIFwiYWJjXCIsIGxvZ2ludG9rZW4sIF9maWxlKTtcclxuICAgICAgICAgICAgICAgIEFkZE91dHB1dChcInJlc3VsdD1cIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZE91dHB1dChzdHJpbmcgdHh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3V0cHV0TGlzdC5UZXh0Q29udGVudCArPSB0eHQgKyBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsDQogICAgInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLldlYkdMO1xyXG51c2luZyBsaWdodHRvb2w7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBicmlkZ2V3ZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIGFwcF9jYW52YXN0ZXN0XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbDtcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGl2ID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIik7XG4gICAgICAgICAgICBkaXYuU3R5bGUuV2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIGRpdi5TdHlsZS5IZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIGRpdi5TdHlsZS5Qb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIGRpdi5TdHlsZS5PdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQ2FudmFzRWxlbWVudD4oXCJjYW52YXNcIik7XG4gICAgICAgICAgICBjYW52YXMuU3R5bGUuV2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIGNhbnZhcy5TdHlsZS5IZWlnaHQgPSBcIjgwJVwiO1xuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgIC8vIFdyaXRlIGEgbWVzc2FnZSB0byB0aGUgQ29uc29sZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcIldlbGNvbWUgdG8gQnJpZGdlLk5FVCAyMDE4XCIpO1xuXG4gICAgICAgICAgICAvL3ZhciBjYW52YXMgPSBCcmlkZ2UuSHRtbDUuRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgICAgICB3ZWJnbCA9IChXZWJHTFJlbmRlcmluZ0NvbnRleHQpY2FudmFzLkdldENvbnRleHQoXCJ3ZWJnbFwiKTtcbiAgICAgICAgICAgIGlmICh3ZWJnbCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHdlYmdsID0gKFdlYkdMUmVuZGVyaW5nQ29udGV4dCljYW52YXMuR2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiKTtcblxuICAgICAgICAgICAgTG9hZFJlcyh3ZWJnbCk7XG5cbiAgICAgICAgICAgIGxpZ2h0dG9vbC5OYXRpdmUuY2FudmFzQWRhcHRlci5DcmVhdGVTY3JlZW5DYW52YXMod2ViZ2wsIG5ldyBNeUNhbnZhc0FjdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvYWRSZXMoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsKVxuICAgICAgICB7ICAgICAgICAgIC8vd2ViZ2xDYW52YXMg5L2/55So5rWB56iLXG4gICAgICAgICAgICAvLzAxLuWIneWni+WMluadkOi0qO+8jOi/meS4quaWh+S7tumHjOmFjee9ruS6huaJgOacieeOsOmYtuauteS9v+eUqOeahHNoYWRlcu+8jOS5n+WPr+S7peaUvuWcqOS4jeWQjOeahOaWh+S7tuS4re+8jOWkmuaJp+ihjOWHoOasoXBhcnNlVXJs5bCx6KGM5LqGXG4gICAgICAgICAgICAvL+WIneWni+WMluadkOi0qFxuICAgICAgICAgICAgLy9saWdodHRvb2wuc2hhZGVyTWdyLnBhcnNlckluc3RhbmNlKCkucGFyc2VVcmwod2ViZ2wsIFwic2hhZGVyL3Rlc3Quc2hhZGVyLnR4dD9cIiArIE1hdGgucmFuZG9tKCkpO1xuICAgICAgICAgICAgLy/miYvliqjliqDovb3mjqXlj6NcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dChcInNoYWRlci90ZXN0LnNoYWRlci50eHQ/XCIgKyBNYXRoLlJhbmRvbSgpLCAoQWN0aW9uPHN0cmluZyxCcmlkZ2UuRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnNoYWRlck1nci5wYXJzZXJJbnN0YW5jZSgpLnBhcnNlRGlyZWN0KHdlYmdsLCB0eHQpO1xuICAgICAgICAgICAgfVxuKSAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vMDIu5Yid5aeL5YyW6LWE5rqQ77yM6L+Z6YeM5Y+q5rOo5YaM5LiA5Liq5YWz57O777yM5Yiw55So5Yiw55qE5pe25YCZ5omN5Lya55yf55qE5Y675Yqg6L29XG4gICAgICAgICAgICAvL+azqOWGjOi0tOWbvlxuICAgICAgICAgICAgLy/otLTlm77nlKggdXJsIOS9nOS4uuWQjeWtl++8jOaPkOS+m+S4gOS4qiB1cmxhZGTvvIzlpoLmnpzkvaDmg7PopoHku7fmoLxyYW5kb20g5ZWl55qEXG4gICAgICAgICAgICAvL2xpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnKFwidGV4LzEuanBnXCIsIFwiP1wiICsgTWF0aC5yYW5kb20oKSwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWcoXCJ0ZXgvMS5qcGdcIiwgXCJcIiwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpOy8vIEltYWdlKCk7XG4gICAgICAgICAgICBpbWcuU3JjID0gXCJ0ZXgvMS5qcGdcIjtcbiAgICAgICAgICAgIGltZy5PbkxvYWQgPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgX3NwaW1nID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nLCBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcInRleC8xLmpwZ1wiLCBfc3BpbWcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy/ms6jlhozlm77pm4Yo5a+55bqU55qE6LS05Zu+5Lya6Ieq5Yqo5rOo5YaM5YiwdGV4dHVyZU1nciks5Zu+6ZuG5L2/55So5LiA5Liq5oyH5a6a55qE5ZCN5a2X77yM5L2g5rOo5YaM57uZ5LuW5ZWl5ZCN5a2X77yM5ZCO6Z2i5bCx55So6L+Z5Liq5ZCN5a2X5Y675L2/55SoXG4gICAgICAgICAgICBsaWdodHRvb2wuYXRsYXNNZ3IuSW5zdGFuY2UoKS5yZWcoXCIyXCIsIFwiYXRsYXMvMi5qc29uLnR4dD9cIiArIE1hdGguUmFuZG9tKCksIFwidGV4LzIucG5nXCIsIFwiP1wiICsgTWF0aC5SYW5kb20oKSk7XG5cblxuICAgICAgICAgICAgdmFyIGltZzIgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpO1xuICAgICAgICAgICAgaW1nMi5TcmMgPSBcInRleC8xLnBuZz9cIiArIE1hdGguUmFuZG9tKCk7XG4gICAgICAgICAgICBpbWcyLk9uTG9hZCA9IChlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBfc3BpbWcyID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nMiwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCJ0ZXgvMS5wbmdcIiwgX3NwaW1nMik7XG5cbiAgICAgICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQoXCJhdGxhcy8xLmpzb24udHh0P1wiICsgTWF0aC5SYW5kb20oKSwgKEFjdGlvbjxzdHJpbmcsQnJpZGdlLkVycm9yPikoKHR4dCwgZXJyKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hdGxhcyA9IGxpZ2h0dG9vbC5zcHJpdGVBdGxhcy5mcm9tUmF3KHdlYmdsLCB0eHQsIF9zcGltZzIpO1xuICAgICAgICAgICAgICAgICAgICBsaWdodHRvb2wuYXRsYXNNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCIxXCIsIF9hdGxhcyk7XG4gICAgICAgICAgICAgICAgfVxuKSAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8v5rOo5YaM5a2X5L2TKOWvueW6lOeahOi0tOWbvuS8muiHquWKqOazqOWGjOWIsHRleHR1cmVNZ3IpLOWtl+S9k+S9v+eUqOS4gOS4quaMh+WumueahOWQjeWtl++8jOS9oOazqOWGjOe7meS7luWVpeWQjeWtl++8jOWQjumdouWwseeUqOi/meS4quWQjeWtl+WOu+S9v+eUqFxuICAgICAgICAgICAgLy9saWdodHRvb2wuZm9udE1nci5JbnN0YW5jZSgpLnJlZyhcImYxXCIsIFwiZm9udC9TVFhJTkdLQS5mb250Lmpzb24udHh0XCIsIFwidGV4L1NUWElOR0tBLmZvbnQucG5nXCIsIFwiXCIpO1xuICAgICAgICAgICAgdmFyIGltZzMgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpO1xuICAgICAgICAgICAgaW1nMy5TcmMgPSBcInRleC9TVFhJTkdLQS5mb250LnBuZz9cIiArIE1hdGguUmFuZG9tKCk7XG4gICAgICAgICAgICBpbWczLk9uTG9hZCA9IChlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBfc3BpbWczID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nMywgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCJ0ZXgvU1RYSU5HS0EuZm9udC5wbmdcIiwgX3NwaW1nMyk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLmxvYWRUb29sLmxvYWRUZXh0KFwiZm9udC9TVFhJTkdLQS5mb250Lmpzb24udHh0XCIsIChBY3Rpb248c3RyaW5nLEJyaWRnZS5FcnJvcj4pKCh0eHQsIGVycikgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZm9udCA9IGxpZ2h0dG9vbC5zcHJpdGVGb250LmZyb21SYXcod2ViZ2wsIHR4dCwgX3NwaW1nMyk7XG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5mb250TWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwiZjFcIiwgX2ZvbnQpO1xuICAgICAgICAgICAgICAgIH1cbikgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgY2xhc3MgTXlDYW52YXNBY3Rpb24gOiBsaWdodHRvb2wuY2FudmFzQWN0aW9uXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5zcHJpdGVSZWN0IHRyZWN0ID0gbmV3IHNwcml0ZVJlY3QoKTtcbiAgICAgICAgICAgIExpc3Q8c3RyaW5nPiBzcHJpdGVuYW1lcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcbiAgICAgICAgICAgIGZsb2F0IHRpbWVyID0gMDtcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5zcHJpdGVSZWN0IHRyZWN0QnRuID0gbmV3IGxpZ2h0dG9vbC5zcHJpdGVSZWN0KDUwLCAxNTAsIDIwMCwgNTApO1xuICAgICAgICAgICAgYm9vbCBidG5kb3duID0gZmFsc2U7XG4gICAgICAgICAgICBzdHJpbmcgc2hvd3R4dCA9IFwiXCI7XG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBvbmRyYXcoc3ByaXRlQ2FudmFzIGMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciArPSAwLjAxNWY7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXIgPiAyLjBmKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyIC09IDIuMGY7XG4gICAgICAgICAgICAgICAgLy9nZXQgYWxsIHNwcml0ZSBpbiBhdGxhcyB3aG8gbmFtZWQgXCIxXCJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcHJpdGVuYW1lcy5Db3VudCA9PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0bGFzID0gbGlnaHR0b29sLmF0bGFzTWdyLkluc3RhbmNlKCkubG9hZChjLndlYmdsLCBcIjFcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdGxhcyAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaW5hbWUgaW4gYXRsYXMuc3ByaXRlcy5LZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlbmFtZXMuQWRkKGluYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0IGZvciBkcmF3ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9yICh2YXIgY2MgPSAwOyBjYyA8IDEwOyBjYysrKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmNkRHJhd2VyLnB1c2gobmV3IGNvb2xEb3duRHJhd2VyKGF0bGFzLCB0aGlzLnNwcml0ZW5hbWVzW2NjXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5jZERyYXdlcltjY10uc2V0RGVzdFJlY3QobmV3IGxpZ2h0dG9vbC5zcHJpdGVSZWN0KDUwICogY2MsIDUwLCA1MCwgNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCJ0ZXgvMS5qcGdcIik7XG4gICAgICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjLmRyYXdUZXh0dXJlKHQsIHRoaXMudHJlY3QsIGxpZ2h0dG9vbC5zcHJpdGVSZWN0Lm9uZSwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAxLjBmKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGF0bGFzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ByaXRlbmFtZXMuQ291bnQgPiAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNwcml0ZUJhdGNoZXIuYmVnaW5kcmF3KHRoaXMuYXRsYXMubWF0KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IChmbG9hdClNYXRoLlJhbmRvbSgpICogNTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSAoZmxvYXQpTWF0aC5SYW5kb20oKSAqIDUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaSA9IChpbnQpKE1hdGguUmFuZG9tKCkgKiB0aGlzLnNwcml0ZW5hbWVzLkNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYW52YXMg5YGa5rOVXG4gICAgICAgICAgICAgICAgICAgICAgICBjLmRyYXdTcHJpdGUoXCIxXCIsIHRoaXMuc3ByaXRlbmFtZXNbc2ldLCB0aGlzLnRyZWN0KTsgLy/nrYnlkIzkuo7kuIvpnaLnmoTkuKTooYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBhdGxhcyA9IGxpZ2h0dG9vbC5hdGxhc01nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCIxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYXRsYXMuZHJhdyhjLnNwcml0ZUJhdGNoZXIsIHRoaXMuc3ByaXRlbmFtZXNbc2ldLCB0aGlzLnRyZWN0LCB0aGlzLndoaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGZvbnTvvIjlupXlsYLmlrnms5XvvIlcbiAgICAgICAgICAgICAgICB2YXIgZm9udCA9IGxpZ2h0dG9vbC5mb250TWdyLkluc3RhbmNlKCkubG9hZChjLndlYmdsLCBcImYxXCIpO1xuICAgICAgICAgICAgICAgIGlmIChmb250ICE9IG51bGwgJiYgZm9udC5jbWFwICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDUwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgZm9udC5kcmF3Q2hhcihjLnNwcml0ZUJhdGNoZXIsIFwi5Y+kXCIsIHRoaXMudHJlY3QsIGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSwgbGlnaHR0b29sLnNwcml0ZUNvbG9yLmdyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDUwO1xuICAgICAgICAgICAgICAgICAgICBmb250LmRyYXdDaGFyKGMuc3ByaXRlQmF0Y2hlciwgXCLogIFcIiwgdGhpcy50cmVjdCwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigwLjFmLCAwLjhmLCAwLjJmLCAwLjhmKSwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAwKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3Zm9udCBjYW52YXMg5pa55rOVXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gNTA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gMTUwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDIwMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSA1MDtcbiAgICAgICAgICAgICAgICBpZiAodCAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjLmRyYXdUZXh0dXJlKHQsIHRoaXMudHJlY3RCdG4sIGxpZ2h0dG9vbC5zcHJpdGVSZWN0Lm9uZSwgdGhpcy5idG5kb3duID8gbGlnaHR0b29sLnNwcml0ZUNvbG9yLndoaXRlIDogbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAwLjVmKSk7XG4gICAgICAgICAgICAgICAgYy5kcmF3VGV4dChcImYxXCIsIFwidGhpcyBpcyBCdG5cIiwgdGhpcy50cmVjdEJ0biwgdGhpcy5idG5kb3duID8gbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAwLCAwLCAxKSA6IGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gNTAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IDI1O1xuICAgICAgICAgICAgICAgIGMuZHJhd1RleHQoXCJmMVwiLCB0aGlzLnNob3d0eHQsIHRoaXMudHJlY3QpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIGJvb2wgb25wb2ludGV2ZW50KHNwcml0ZUNhbnZhcyBjLCBjYW52YXNwb2ludGV2ZW50IGUsIGZsb2F0IHgsIGZsb2F0IHkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYm9vbCBza2lwZXZlbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3R4dCA9IFwicG9pbnQ9ICAgXCIgKyB4ICsgXCIgfCx8IFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoeCA+IHRoaXMudHJlY3RCdG4ueCAmJiB5ID4gdGhpcy50cmVjdEJ0bi55ICYmIHggPCAodGhpcy50cmVjdEJ0bi54ICsgdGhpcy50cmVjdEJ0bi53KVxuICAgICAgICAgICAgICAgICAgICAmJiB5IDwgKHRoaXMudHJlY3RCdG4ueSArIHRoaXMudHJlY3RCdG4uaCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNraXBldmVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIHZvaWQgb25yZXNpemUoc3ByaXRlQ2FudmFzIGMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwNCiAgICAidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBicmlkZ2V3ZWIuaHR0cFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgaHR0cF90b29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGFzeW5jIHN0YXRpYyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2s8c3RyaW5nPiBodHRwUG9zdChzdHJpbmcgdXJsLHN0cmluZyB1c2VybmFtZSxzdHJpbmcgdG9rZW4sRmlsZSBmaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LlhNTEh0dHBSZXF1ZXN0IF9odHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIF9odHRwLk9wZW4oXCJwb3N0XCIsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHN0cmluZyByZXR1cm52ID0gXCJcIjtcclxuICAgICAgICAgICAgX2h0dHAuT25SZWFkeVN0YXRlQ2hhbmdlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9odHRwLlJlYWR5U3RhdGUgPT0gQWpheFJlYWR5U3RhdGUuRG9uZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm52ID0gX2h0dHAuUmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBGb3JtRGF0YSBmb3JtZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICBmb3JtZGF0YS5BcHBlbmQoZmlsZS5OYW1lLCBmaWxlKTtcclxuICAgICAgICAgICAgZm9ybWRhdGEuQXBwZW5kKFwidXNlclwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm1kYXRhLkFwcGVuZChcInRva2VuXCIsIHRva2VuKTtcclxuICAgICAgICAgICAgX2h0dHAuU2VuZChmb3JtZGF0YSk7XHJcbiAgICAgICAgICAgIHdoaWxlIChfaHR0cC5SZWFkeVN0YXRlICE9IEFqYXhSZWFkeVN0YXRlLkRvbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IFN5c3RlbS5UaHJlYWRpbmcuVGFza3MuVGFzay5EZWxheSgxMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm52O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYXN5bmMgc3RhdGljIFN5c3RlbS5UaHJlYWRpbmcuVGFza3MuVGFzazxzdHJpbmc+IGh0dHBHZXQoc3RyaW5nIHVybClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5YTUxIdHRwUmVxdWVzdCBfaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBfaHR0cC5PcGVuKFwiZ2V0XCIsIHVybCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgcmV0dXJudiA9IFwiXCI7XHJcbiAgICAgICAgICAgIF9odHRwLk9uUmVhZHlTdGF0ZUNoYW5nZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaHR0cC5SZWFkeVN0YXRlID09IEFqYXhSZWFkeVN0YXRlLkRvbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJudiA9IF9odHRwLlJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgX2h0dHAuU2VuZCgpO1xyXG4gICAgICAgICAgICB3aGlsZSAoX2h0dHAuUmVhZHlTdGF0ZSAhPSBBamF4UmVhZHlTdGF0ZS5Eb25lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2suRGVsYXkoMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJudjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGFzeW5jIHN0YXRpYyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2s8c3RyaW5nPiBodHRwSnNvblJQQyhzdHJpbmcgdXJsLHN0cmluZyBtZXRob2QsT2JqZWN0IEpzb25BcnJheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfdXJsID0gdXJsKyBcIj9qc29ucnBjPTIuMCZpZD0xJm1ldGhvZD1cIittZXRob2QgK1wiJnBhcmFtcz1cIiArIEpTT04uU3RyaW5naWZ5KEpzb25BcnJheSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBodHRwR2V0KF91cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSINCiAgXQ0KfQ==
