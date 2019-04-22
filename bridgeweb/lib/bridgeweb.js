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
                var url = "https://cafe.f3322.net:17201";
                var div = document.createElement("div");
                div.style.width = "100%";
                div.style.height = "100%";
                div.style.position = "absolute";
                div.style.overflow = "hidden";
                document.body.appendChild(div);

                var username = bridgeweb.app_blockserver.AddInputBox(div, "username", "abcd");
                var password = bridgeweb.app_blockserver.AddPasswordBox(div, "password", "00");
                var btnlogin = bridgeweb.app_blockserver.AddButton(div, "login");
                var btnReg = bridgeweb.app_blockserver.AddButton(div, "register");
                bridgeweb.app_blockserver.AddHR(div);

                this.outputList = bridgeweb.app_blockserver.AddTextArea(div, 800, 300);
                var clearBtn = bridgeweb.app_blockserver.AddButton(div, "clear");
                clearBtn.onclick = Bridge.fn.bind(this, function (e) {
                    this.LogClear();
                });

                var helpBtn = bridgeweb.app_blockserver.AddButton(div, "help");
                helpBtn.onclick = Bridge.fn.bind(this, function (e) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        result, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = bridgeweb.http.http_tool.httpJsonRPC((url || "") + "/rpc", "help", System.Array.init([], System.String));
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        result = $taskResult1;
                                        this.Log("reg=" + (result || ""));
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
                bridgeweb.app_blockserver.AddHR(div);

                btnReg.onclick = Bridge.fn.bind(this, function (e) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        pass, 
                        passhashdata, 
                        pashhashhex, 
                        myparams, 
                        result, 
                        jsonresult, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        pass = System.Text.Encoding.UTF8.GetBytes$2((username.value || "") + "_" + (password.value || ""));
                                        passhashdata = OLIO.Cryptography.Sha256.computeHash(pass);
                                        pashhashhex = bridgeweb.http.http_tool.Hex2Str(passhashdata);
                                        this.Log("passhash=" + (pashhashhex || ""));

                                        myparams = System.Array.init([username.value, pashhashhex], System.String);
                                        $task1 = bridgeweb.http.http_tool.httpJsonRPC((url || "") + "/rpc", "user_new", myparams);
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        result = $taskResult1;
                                        jsonresult = JSON.parse(result);
                                        if (Bridge.unbox(jsonresult.result.result) === true) {
                                            this.Log("create user succ");
                                        } else {
                                            this.Log("create user fail");
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
                btnlogin.onclick = Bridge.fn.bind(this, function (e) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        pass, 
                        passhashdata, 
                        pashhashhex, 
                        myparams, 
                        result, 
                        jsonresult, 
                        token, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        pass = System.Text.Encoding.UTF8.GetBytes$2((username.value || "") + "_" + (password.value || ""));
                                        passhashdata = OLIO.Cryptography.Sha256.computeHash(pass);
                                        pashhashhex = bridgeweb.http.http_tool.Hex2Str(passhashdata);

                                        myparams = System.Array.init([username.value, pashhashhex], System.String);
                                        $task1 = bridgeweb.http.http_tool.httpJsonRPC((url || "") + "/rpc", "user_login", myparams);
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
                                            this.Log("login token=" + (token || ""));
                                            this.logintoken = token;
                                            this.loginuser = username.value;
                                        } else {
                                            this.Log("login fail");
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
                    this.Log("size=" + file.files[0].size);
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
                                        this.Log("size=" + size);
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

                                        $task2 = bridgeweb.http.http_tool.httpPost((url || "") + "/uploadraw", this.loginuser, this.logintoken, _file);
                                        $step = 2;
                                        $task2.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        result = $taskResult2;
                                        this.Log("result=" + (result || ""));
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
            LogClear: function () {
                this.outputList.textContent = "";
            },
            Log: function (txt) {
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
                Hex2Str: function (data) {
                    var strout = "";
                    for (var i = 0; i < data.length; i = (i + 1) | 0) {
                        strout = (strout || "") + ((System.Byte.format(data[System.Array.index(i, data)], "X02")) || "");
                    }
                    return strout;
                },
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

    Bridge.define("OLIO.Cryptography.Sha256", {
        statics: {
            fields: {
                K: null
            },
            ctors: {
                init: function () {
                    this.K = System.Array.init([
                        1116352408, 
                        1899447441, 
                        3049323471, 
                        3921009573, 
                        961987163, 
                        1508970993, 
                        2453635748, 
                        2870763221, 
                        3624381080, 
                        310598401, 
                        607225278, 
                        1426881987, 
                        1925078388, 
                        2162078206, 
                        2614888103, 
                        3248222580, 
                        3835390401, 
                        4022224774, 
                        264347078, 
                        604807628, 
                        770255983, 
                        1249150122, 
                        1555081692, 
                        1996064986, 
                        2554220882, 
                        2821834349, 
                        2952996808, 
                        3210313671, 
                        3336571891, 
                        3584528711, 
                        113926993, 
                        338241895, 
                        666307205, 
                        773529912, 
                        1294757372, 
                        1396182291, 
                        1695183700, 
                        1986661051, 
                        2177026350, 
                        2456956037, 
                        2730485921, 
                        2820302411, 
                        3259730800, 
                        3345764771, 
                        3516065817, 
                        3600352804, 
                        4094571909, 
                        275423344, 
                        430227734, 
                        506948616, 
                        659060556, 
                        883997877, 
                        958139571, 
                        1322822218, 
                        1537002063, 
                        1747873779, 
                        1955562222, 
                        2024104815, 
                        2227730452, 
                        2361852424, 
                        2428436474, 
                        2756734187, 
                        3204031479, 
                        3329325298
                    ], System.UInt32);
                }
            },
            methods: {
                computeHash: function (data) {
                    var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                    var H = System.Array.init([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], System.UInt32);


                    var l = (((Bridge.Int.div(data.length, 4)) | 0) + 2) | 0;
                    var N = Bridge.Int.clip32(Math.ceil(l / 16.0));
                    var M = System.Array.init(N, null, System.Array.type(System.UInt32));
                    var view = data;
                    for (var i = 0; i < N; i = (i + 1) | 0) {
                        M[System.Array.index(i, M)] = System.Array.init(16, 0, System.UInt32);
                        for (var j = 0; j < 16; j = (j + 1) | 0) {
                            var v1 = (Bridge.Int.mul(i, 64) + Bridge.Int.mul(j, 4)) | 0;
                            var vv1 = v1 < view.length ? view[System.Array.index(v1, view)] : 0;
                            var v2 = (((Bridge.Int.mul(i, 64) + Bridge.Int.mul(j, 4)) | 0) + 1) | 0;
                            var vv2 = v2 < view.length ? view[System.Array.index(v2, view)] : 0;
                            var v3 = (((Bridge.Int.mul(i, 64) + Bridge.Int.mul(j, 4)) | 0) + 2) | 0;
                            var vv3 = v3 < view.length ? view[System.Array.index(v3, view)] : 0;
                            var v4 = (((Bridge.Int.mul(i, 64) + Bridge.Int.mul(j, 4)) | 0) + 3) | 0;
                            var vv4 = v4 < view.length ? view[System.Array.index(v4, view)] : 0;

                            ($t = M[System.Array.index(i, M)])[System.Array.index(j, $t)] = (vv1 << 24 | vv2 << 16 | vv3 << 8 | vv4) >>> 0;


                        }
                    }
                    ($t1 = M[System.Array.index(Bridge.Int.clipu32(Math.floor(((Bridge.Int.div(data.length, 4)) | 0) / 16.0)), M)])[System.Array.index(($t2 = Bridge.Int.clipu32(Math.floor(data.length / 4.0)) % 16), $t1)] = (($t3 = M[System.Array.index(Bridge.Int.clipu32(Math.floor(((Bridge.Int.div(data.length, 4)) | 0) / 16.0)), M)])[System.Array.index($t2, $t3)] | (((128 << (Bridge.Int.mul((((3 - data.length % 4) | 0)), 8))) >>> 0))) >>> 0;

                    ($t4 = M[System.Array.index(((N - 1) | 0), M)])[System.Array.index(14, $t4)] = Bridge.Int.clipu32((Bridge.Int.mul(data.length, 8)) / Math.pow(2, 32));
                    ($t5 = M[System.Array.index(((N - 1) | 0), M)])[System.Array.index(15, $t5)] = System.Int64.clipu32(System.Int64((Bridge.Int.mul(data.length, 8))).and(System.Int64(4294967295)));



                    var W = System.Array.init(64, 0, System.UInt32);
                    var a, b, c, d, e, f, g, h;
                    for (var i1 = 0; i1 < N; i1 = (i1 + 1) | 0) {

                        for (var t = 0; t < 16; t = (t + 1) | 0) {
                            W[System.Array.index(t, W)] = ($t6 = M[System.Array.index(i1, M)])[System.Array.index(t, $t6)];
                        }
                        for (var t1 = 16; t1 < 64; t1 = (t1 + 1) | 0) {
                            W[System.Array.index(t1, W)] = ((((((((OLIO.Cryptography.Sha256.σ1(W[System.Array.index(((t1 - 2) | 0), W)]) + W[System.Array.index(((t1 - 7) | 0), W)]) >>> 0) + OLIO.Cryptography.Sha256.σ0(W[System.Array.index(((t1 - 15) | 0), W)])) >>> 0) + W[System.Array.index(((t1 - 16) | 0), W)]) >>> 0)) & 4294967295) >>> 0;
                        }

                        a = H[System.Array.index(0, H)];
                        b = H[System.Array.index(1, H)];
                        c = H[System.Array.index(2, H)];
                        d = H[System.Array.index(3, H)];
                        e = H[System.Array.index(4, H)];
                        f = H[System.Array.index(5, H)];
                        g = H[System.Array.index(6, H)];
                        h = H[System.Array.index(7, H)];

                        for (var t2 = 0; t2 < 64; t2 = (t2 + 1) | 0) {
                            var T1 = (((((((h + OLIO.Cryptography.Sha256.Σ1(e)) >>> 0) + OLIO.Cryptography.Sha256.Ch(e, f, g)) >>> 0) + OLIO.Cryptography.Sha256.K[System.Array.index(t2, OLIO.Cryptography.Sha256.K)]) >>> 0) + W[System.Array.index(t2, W)]) >>> 0;
                            var T2 = (OLIO.Cryptography.Sha256.Σ0(a) + OLIO.Cryptography.Sha256.Maj(a, b, c)) >>> 0;
                            h = g;
                            g = f;
                            f = e;
                            e = ((((d + T1) >>> 0)) & 4294967295) >>> 0;
                            d = c;
                            c = b;
                            b = a;
                            a = ((((T1 + T2) >>> 0)) & 4294967295) >>> 0;
                        }
                        H[System.Array.index(0, H)] = ((((H[System.Array.index(0, H)] + a) >>> 0)) & 4294967295) >>> 0;
                        H[System.Array.index(1, H)] = ((((H[System.Array.index(1, H)] + b) >>> 0)) & 4294967295) >>> 0;
                        H[System.Array.index(2, H)] = ((((H[System.Array.index(2, H)] + c) >>> 0)) & 4294967295) >>> 0;
                        H[System.Array.index(3, H)] = ((((H[System.Array.index(3, H)] + d) >>> 0)) & 4294967295) >>> 0;
                        H[System.Array.index(4, H)] = ((((H[System.Array.index(4, H)] + e) >>> 0)) & 4294967295) >>> 0;
                        H[System.Array.index(5, H)] = ((((H[System.Array.index(5, H)] + f) >>> 0)) & 4294967295) >>> 0;
                        H[System.Array.index(6, H)] = ((((H[System.Array.index(6, H)] + g) >>> 0)) & 4294967295) >>> 0;
                        H[System.Array.index(7, H)] = ((((H[System.Array.index(7, H)] + h) >>> 0)) & 4294967295) >>> 0;
                    }

                    var result = System.Array.init(32, 0, System.Byte);
                    for (var i2 = 0; i2 < H.length; i2 = (i2 + 1) | 0) {
                        result[System.Array.index(((Bridge.Int.mul(i2, 4) + 0) | 0), result)] = ((((H[System.Array.index(i2, H)] >>> (24)) & 255) >>> 0)) & 255;
                        result[System.Array.index(((Bridge.Int.mul(i2, 4) + 1) | 0), result)] = ((((H[System.Array.index(i2, H)] >>> (16)) & 255) >>> 0)) & 255;
                        result[System.Array.index(((Bridge.Int.mul(i2, 4) + 2) | 0), result)] = ((((H[System.Array.index(i2, H)] >>> (8)) & 255) >>> 0)) & 255;
                        result[System.Array.index(((Bridge.Int.mul(i2, 4) + 3) | 0), result)] = ((((H[System.Array.index(i2, H)] >>> (0)) & 255) >>> 0)) & 255;
                    }
                    return result;
                },
                ROTR: function (n, x) {
                    return (((x >>> n) | (((x << (((32 - n) | 0))) >>> 0))) >>> 0);
                },
                Σ0: function (x) {
                    return ((((OLIO.Cryptography.Sha256.ROTR(2, x) ^ OLIO.Cryptography.Sha256.ROTR(13, x)) >>> 0) ^ OLIO.Cryptography.Sha256.ROTR(22, x)) >>> 0);
                },
                Σ1: function (x) {
                    return ((((OLIO.Cryptography.Sha256.ROTR(6, x) ^ OLIO.Cryptography.Sha256.ROTR(11, x)) >>> 0) ^ OLIO.Cryptography.Sha256.ROTR(25, x)) >>> 0);
                },
                σ0: function (x) {
                    return ((((OLIO.Cryptography.Sha256.ROTR(7, x) ^ OLIO.Cryptography.Sha256.ROTR(18, x)) >>> 0) ^ (x >>> 3)) >>> 0);
                },
                σ1: function (x) {
                    return ((((OLIO.Cryptography.Sha256.ROTR(17, x) ^ OLIO.Cryptography.Sha256.ROTR(19, x)) >>> 0) ^ (x >>> 10)) >>> 0);
                },
                Ch: function (x, y, z) {
                    return (((((x & y) >>> 0)) ^ (((~x & z) >>> 0))) >>> 0);
                },
                Maj: function (x, y, z) {
                    return (((((((x & y) >>> 0)) ^ (((x & z) >>> 0))) >>> 0) ^ (((y & z) >>> 0))) >>> 0);
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ew0KICAidmVyc2lvbiI6IDMsDQogICJmaWxlIjogImJyaWRnZXdlYi5qcyIsDQogICJzb3VyY2VSb290IjogIiIsDQogICJzb3VyY2VzIjogWw0KICAgICIuLi9BcHAuY3MiLA0KICAgICIuLi9hcHBfYmxvY2tzZXJ2ZXIudGVzdC5jcyIsDQogICAgIi4uL2FwcF9jYW52YXN0ZXN0LmNzIiwNCiAgICAiLi4vaHR0cC9odHRwX3Rvb2wuY3MiLA0KICAgICIuLi9odHRwL3NoYTI1Ni5jcyINCiAgXSwNCiAgIm5hbWVzIjogWw0KICAgICIiDQogIF0sDQogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFlWUE7WUFDQUE7O1lBR0FBO1lBQ0FBOztZQUVBQTs7OztZQUtBQSxvQ0FBc0JBLEFBQVFBO1lBQzlCQSxnREFBa0NBLEFBQVFBOzs7Ozs7Ozs7b0JBSzFDQSx3QkFBVUE7b0JBQ1ZBO29CQUNBQTtvQkFDQUEsMEJBQTBCQTs7bUNBRVZBLE1BQVlBO29CQUU1QkEsVUFBVUE7b0JBQ1ZBLGtCQUFrQkE7b0JBQ2xCQSxrQ0FBb0JBO29CQUNwQkEsU0FBU0E7b0JBQ1RBLGtDQUFvQkE7b0JBQ3BCQSxjQUFjQSxVQUFDQTt3QkFFWEE7d0JBQ0FBOzs7O29CQUtKQSwwQkFBMEJBOzs7Ozs7Ozs7Ozs7O29CQ3pDMUJBLG1DQUFTQSxJQUFJQTs7b0JBRWJBOzs7dUNBR2dDQSxLQUFvQkEsT0FBY0E7b0JBRWxFQSxvQkFBb0JBO29CQUNwQkEsNEJBQTRCQTtvQkFDNUJBLGdCQUFnQkE7b0JBQ2hCQSxlQUFlQTtvQkFDZkEsZ0JBQWdCQTtvQkFDaEJBLGlCQUFpQkE7b0JBQ2pCQSxnQkFBZ0JBO29CQUNoQkEsU0FBU0E7b0JBQ1RBLGdCQUFnQkE7b0JBQ2hCQSxPQUFPQTs7MENBRTRCQSxLQUFvQkEsT0FBY0E7b0JBRXJFQSxvQkFBb0JBO29CQUNwQkEsNEJBQTRCQTtvQkFDNUJBLGdCQUFnQkE7b0JBQ2hCQSxlQUFlQTtvQkFDZkEsZ0JBQWdCQTtvQkFDaEJBLGlCQUFpQkE7b0JBQ2pCQSxnQkFBZ0JBO29CQUNo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Q0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBO3dCQUNyQ0EsMEJBQU9BLG1DQUFQQSxXQUFvQkEsQ0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBO3dCQUNyQ0EsMEJBQU9BLG1DQUFQQSxXQUFvQkEsQ0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBO3dCQUNyQ0EsMEJBQU9BLG1DQUFQQSxXQUFvQkEsQ0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBOztvQkFFekNBLE9BQU9BOztnQ0FJY0EsR0FBT0E7b0JBRTVCQSxPQUFPQSxHQUFDQSxNQUFLQSxLQUFLQSxDQUFDQSxPQUFLQSxDQUFDQSxPQUFLQTs7OEJBSVhBO29CQUFVQSxPQUFPQSxxQ0FBZUEsS0FBS0Esa0NBQWdCQSxhQUFLQSxrQ0FBZ0JBOzs4QkFDMUVBO29CQUFVQSxPQUFPQSxxQ0FBZUEsS0FBS0Esa0NBQWdCQSxhQUFLQSxrQ0FBZ0JBOzs4QkFDMUVBO29CQUFVQSxPQUFPQSxxQ0FBZUEsS0FBS0Esa0NBQWdCQSxhQUFLQSxDQUFDQTs7OEJBQzNEQTtvQkFBVUEsT0FBT0Esc0NBQWdCQSxLQUFLQSxrQ0FBZ0JBLGFBQUtBLENBQUNBOzs4QkFDNURBLEdBQVFBLEdBQVFBO29CQUFVQSxPQUFPQSxHQUFDQSxNQUFJQSxhQUFLQSxDQUFDQSxHQUFDQSxJQUFJQTs7K0JBQ2hEQSxHQUFRQSxHQUFRQTtvQkFBVUEsT0FBT0EsS0FBQ0EsTUFBSUEsYUFBS0EsQ0FBQ0EsTUFBSUEscUJBQUtBLENBQUNBLE1BQUlBIiwNCiAgInNvdXJjZXNDb250ZW50IjogWw0KICAgICJ1c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuV2ViR0w7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyBTeXN0ZW07XG51c2luZyBsaWdodHRvb2w7XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIGJyaWRnZXdlYlxue1xuICAgIHB1YmxpYyBjbGFzcyBBcHBcbiAgICB7XG4gICAgICAgIHN0YXRpYyBIVE1MRGl2RWxlbWVudCBkaXZNZW51O1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcImhpaFwiKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcImJyaWRnZS5ibG9ja3N0YWZmLm1lbnVcIik7XHJcblxuICAgICAgICAgICAgLy9pbml0IGJvZHlcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuT3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5NYXJnaW4gPSBcIjBweFwiO1xyXG5cclxuICAgICAgICAgICAgSW5pdE1lbnVVSSgpO1xyXG4gICAgICAgICAgICAvL2luaXQgZGl2TWVudVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBBZGRNZW51KFwiY2FudmFzdGVzdFwiLCAoQWN0aW9uKWFwcF9jYW52YXN0ZXN0LkluaXQpO1xyXG4gICAgICAgICAgICBBZGRNZW51KFwiYmxvY2tzdGFmZi5zZXJ2ZXIudGVzdFwiLCAoQWN0aW9uKWFwcF9ibG9ja3NlcnZlci5Jbml0KTtcclxuXHJcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgdm9pZCBJbml0TWVudVVJKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpdk1lbnUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2TWVudS5TdHlsZS5Qb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgZGl2TWVudS5TdHlsZS5Ub3AgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGRpdk1lbnUpO1xyXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIHZvaWQgQWRkTWVudShzdHJpbmcgdGV4dCxBY3Rpb24gaW5pdGZ1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYnRuID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oXCJidXR0b25cIik7XG4gICAgICAgICAgICBidG4uVGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgZGl2TWVudS5BcHBlbmRDaGlsZChidG4pO1xuICAgICAgICAgICAgdmFyIGhyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQlJFbGVtZW50PihcImJyXCIpO1xuICAgICAgICAgICAgZGl2TWVudS5BcHBlbmRDaGlsZChocik7XG4gICAgICAgICAgICBidG4uT25DbGljayA9IChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0cm95TWVudVVJKCk7XHJcbiAgICAgICAgICAgICAgICBpbml0ZnVuYygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIHZvaWQgRGVzdHJveU1lbnVVSSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKGRpdk1lbnUpO1xyXG4gICAgICAgIH1cblxuICAgIH1cbn0iLA0KICAgICJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuV2ViR0w7XHJcblxyXG5uYW1lc3BhY2UgYnJpZGdld2ViXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBhcHBfYmxvY2tzZXJ2ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXJ2ZXIgPSBuZXcgYXBwX2Jsb2Nrc2VydmVyKCk7XHJcblxyXG4gICAgICAgICAgICBzZXJ2ZXIuSW5pdEhUTUwoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IEFkZElucHV0Qm94KEhUTUxEaXZFbGVtZW50IGRpdiwgc3RyaW5nIHRpdGxlLCBzdHJpbmcgZGVmdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB1c2VybmFtZXRpdGxlID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MU3BhbkVsZW1lbnQ+KFwic3BhblwiKTtcclxuICAgICAgICAgICAgdXNlcm5hbWV0aXRsZS5UZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQodXNlcm5hbWV0aXRsZSk7XHJcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4oXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdXNlcm5hbWUuVHlwZSA9IElucHV0VHlwZS5UZXh0O1xyXG4gICAgICAgICAgICB1c2VybmFtZS5WYWx1ZSA9IGRlZnRleHQ7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTElucHV0RWxlbWVudCBBZGRQYXNzd29yZEJveChIVE1MRGl2RWxlbWVudCBkaXYsIHN0cmluZyB0aXRsZSwgc3RyaW5nIGRlZnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWV0aXRsZSA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTFNwYW5FbGVtZW50PihcInNwYW5cIik7XHJcbiAgICAgICAgICAgIHVzZXJuYW1ldGl0bGUuVGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKHVzZXJuYW1ldGl0bGUpO1xyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxJbnB1dEVsZW1lbnQ+KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lLlR5cGUgPSBJbnB1dFR5cGUuUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lLlZhbHVlID0gZGVmdGV4dDtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKHVzZXJuYW1lKTtcclxuICAgICAgICAgICAgdmFyIGJyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQlJFbGVtZW50PihcImJyXCIpO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQoYnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IEFkZEZpbGUoSFRNTERpdkVsZW1lbnQgZGl2LCBzdHJpbmcgdGl0bGUpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1ldGl0bGUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxTcGFuRWxlbWVudD4oXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICB1c2VybmFtZXRpdGxlLlRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZXRpdGxlKTtcclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MSW5wdXRFbGVtZW50PihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB1c2VybmFtZS5UeXBlID0gSW5wdXRUeXBlLkZpbGU7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBBZGRIUihIVE1MRGl2RWxlbWVudCBkaXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIVE1MSFJFbGVtZW50IGhyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MSFJFbGVtZW50PihcImhyXCIpO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQoaHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTEJ1dHRvbkVsZW1lbnQgQWRkQnV0dG9uKEhUTUxEaXZFbGVtZW50IGRpdiwgc3RyaW5nIHRpdGxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJ0biA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidG4uVGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBidG47XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTFRleHRBcmVhRWxlbWVudCBBZGRUZXh0QXJlYShIVE1MRGl2RWxlbWVudCBkaXYsIGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXRMaXN0ID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MVGV4dEFyZWFFbGVtZW50PihcInRleHRhcmVhXCIpO1xyXG4gICAgICAgICAgICBvdXRwdXRMaXN0LlN0eWxlLldpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIG91dHB1dExpc3QuU3R5bGUuSGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQob3V0cHV0TGlzdCk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dExpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBhcHBfYmxvY2tzZXJ2ZXIgc2VydmVyO1xyXG5cclxuICAgICAgICBIVE1MVGV4dEFyZWFFbGVtZW50IG91dHB1dExpc3Q7XHJcbiAgICAgICAgc3RyaW5nIGxvZ2ludXNlciA9IG51bGw7XHJcbiAgICAgICAgc3RyaW5nIGxvZ2ludG9rZW4gPSBudWxsO1xyXG4gICAgICAgIHZvaWQgSW5pdEhUTUwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIHVybCA9IFwiaHR0cHM6Ly9jYWZlLmYzMzIyLm5ldDoxNzIwMVwiO1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdi5TdHlsZS5XaWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAgICAgICBkaXYuU3R5bGUuSGVpZ2h0ID0gXCIxMDAlXCI7XHJcbiAgICAgICAgICAgIGRpdi5TdHlsZS5Qb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgZGl2LlN0eWxlLk92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gQWRkSW5wdXRCb3goZGl2LCBcInVzZXJuYW1lXCIsIFwiYWJjZFwiKTtcclxuICAgICAgICAgICAgdmFyIHBhc3N3b3JkID0gQWRkUGFzc3dvcmRCb3goZGl2LCBcInBhc3N3b3JkXCIsIFwiMDBcIik7XHJcbiAgICAgICAgICAgIHZhciBidG5sb2dpbiA9IEFkZEJ1dHRvbihkaXYsIFwibG9naW5cIik7XHJcbiAgICAgICAgICAgIHZhciBidG5SZWcgPSBBZGRCdXR0b24oZGl2LCBcInJlZ2lzdGVyXCIpO1xyXG4gICAgICAgICAgICBBZGRIUihkaXYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vdXRwdXRMaXN0ID0gQWRkVGV4dEFyZWEoZGl2LCA4MDAsIDMwMCk7XHJcbiAgICAgICAgICAgIHZhciBjbGVhckJ0biA9IEFkZEJ1dHRvbihkaXYsIFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgIGNsZWFyQnRuLk9uQ2xpY2sgPSAoZSkgPT5cclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIExvZ0NsZWFyKCk7XHJcbiAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWxwQnRuID0gQWRkQnV0dG9uKGRpdiwgXCJoZWxwXCIpO1xyXG4gICAgICAgICAgICBoZWxwQnRuLk9uQ2xpY2sgPSBhc3luYyAoZSkgPT5cclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCBodHRwLmh0dHBfdG9vbC5odHRwSnNvblJQQyh1cmwgKyBcIi9ycGNcIiwgXCJoZWxwXCIsIG5ldyBzdHJpbmdbXSB7IH0pO1xyXG4gICAgICAgICAgICAgICAgICBMb2coXCJyZWc9XCIgKyByZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBBZGRIUihkaXYpO1xyXG5cclxuICAgICAgICAgICAgYnRuUmVnLk9uQ2xpY2sgPSBhc3luYyAoZSkgPT5cclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBwYXNzID0gU3lzdGVtLlRleHQuRW5jb2RpbmcuVVRGOC5HZXRCeXRlcyh1c2VybmFtZS5WYWx1ZSArIFwiX1wiICsgcGFzc3dvcmQuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcGFzc2hhc2hkYXRhID0gT0xJTy5DcnlwdG9ncmFwaHkuU2hhMjU2LmNvbXB1dGVIYXNoKHBhc3MpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcGFzaGhhc2hoZXggPSBodHRwLmh0dHBfdG9vbC5IZXgyU3RyKHBhc3NoYXNoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgIExvZyhcInBhc3NoYXNoPVwiICsgcGFzaGhhc2hoZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgc3RyaW5nW10gbXlwYXJhbXMgPSBuZXcgc3RyaW5nW10geyB1c2VybmFtZS5WYWx1ZSwgcGFzaGhhc2hoZXggfTtcclxuICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IGh0dHAuaHR0cF90b29sLmh0dHBKc29uUlBDKHVybCArIFwiL3JwY1wiLCBcInVzZXJfbmV3XCIsIG15cGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGpzb25yZXN1bHQgPSBKU09OLlBhcnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChqc29ucmVzdWx0W1wicmVzdWx0XCJdW1wicmVzdWx0XCJdLkFzPGJvb2w+KCkgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTG9nKFwiY3JlYXRlIHVzZXIgc3VjY1wiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIExvZyhcImNyZWF0ZSB1c2VyIGZhaWxcIik7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBidG5sb2dpbi5PbkNsaWNrID0gYXN5bmMgKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXNzID0gU3lzdGVtLlRleHQuRW5jb2RpbmcuVVRGOC5HZXRCeXRlcyh1c2VybmFtZS5WYWx1ZSArIFwiX1wiICsgcGFzc3dvcmQuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhc3NoYXNoZGF0YSA9IE9MSU8uQ3J5cHRvZ3JhcGh5LlNoYTI1Ni5jb21wdXRlSGFzaChwYXNzKTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXNoaGFzaGhleCA9IGh0dHAuaHR0cF90b29sLkhleDJTdHIocGFzc2hhc2hkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdbXSBteXBhcmFtcyA9IG5ldyBzdHJpbmdbXSB7IHVzZXJuYW1lLlZhbHVlLCBwYXNoaGFzaGhleCB9O1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IGh0dHAuaHR0cF90b29sLmh0dHBKc29uUlBDKHVybCArIFwiL3JwY1wiLCBcInVzZXJfbG9naW5cIiwgbXlwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGpzb25yZXN1bHQgPSBKU09OLlBhcnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbnJlc3VsdFtcInJlc3VsdFwiXVtcInJlc3VsdFwiXS5Bczxib29sPigpID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0ganNvbnJlc3VsdFtcInJlc3VsdFwiXVtcInRva2VuXCJdLkFzPHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgICAgICBMb2coXCJsb2dpbiB0b2tlbj1cIiArIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbnRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW51c2VyID0gdXNlcm5hbWUuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nKFwibG9naW4gZmFpbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbnVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2ludG9rZW4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IEFkZEZpbGUoZGl2LCBcInVwbG9hZCBhIGZpbGUuXCIpO1xyXG4gICAgICAgICAgICBmaWxlLk9uQ2hhbmdlID0gKGUpID0+XHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBMb2coXCJzaXplPVwiICsgZmlsZS5GaWxlc1swXS5TaXplKTtcclxuICAgICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBidG51cGxvYWQgPSBBZGRCdXR0b24oZGl2LCBcInVwbG9hZCBmaWxlXCIpO1xyXG4gICAgICAgICAgICBidG51cGxvYWQuT25DbGljayA9IGFzeW5jIChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2ZpbGUgPSBmaWxlLkZpbGVzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gX2ZpbGUuU2l6ZTtcclxuICAgICAgICAgICAgICAgIExvZyhcInNpemU9XCIgKyBzaXplKTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlc3RyZWFtID0gYXdhaXQgX2ZpbGUuR2V0RmlsZVN0cmVhbUFzeW5jKCk7XHJcbiAgICAgICAgICAgICAgICBieXRlW10gYnVmID0gbmV3IGJ5dGVbc2l6ZV07XHJcbiAgICAgICAgICAgICAgICBmaWxlc3RyZWFtLlJlYWQoYnVmLCAwLCBidWYuTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgcmVzdWx0ID0gYXdhaXQgaHR0cC5odHRwX3Rvb2wuaHR0cFBvc3QodXJsICsgXCIvdXBsb2FkcmF3XCIsIGxvZ2ludXNlciwgbG9naW50b2tlbiwgX2ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgTG9nKFwicmVzdWx0PVwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdm9pZCBMb2dDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdXRwdXRMaXN0LlRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdm9pZCBMb2coc3RyaW5nIHR4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dExpc3QuVGV4dENvbnRlbnQgKz0gdHh0ICsgXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLA0KICAgICJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5XZWJHTDtcclxudXNpbmcgbGlnaHR0b29sO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcblxyXG5uYW1lc3BhY2UgYnJpZGdld2ViXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBhcHBfY2FudmFzdGVzdFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2w7XG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIpO1xuICAgICAgICAgICAgZGl2LlN0eWxlLldpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgICAgICBkaXYuU3R5bGUuSGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICAgICAgICBkaXYuU3R5bGUuUG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICBkaXYuU3R5bGUuT3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgY2FudmFzLlN0eWxlLldpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgICAgICBjYW52YXMuU3R5bGUuSGVpZ2h0ID0gXCI4MCVcIjtcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgICAgICAvLyBXcml0ZSBhIG1lc3NhZ2UgdG8gdGhlIENvbnNvbGVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5Db25zb2xlLkluZm8oXCJXZWxjb21lIHRvIEJyaWRnZS5ORVQgMjAxOFwiKTtcblxuICAgICAgICAgICAgLy92YXIgY2FudmFzID0gQnJpZGdlLkh0bWw1LkRvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICAgICAgd2ViZ2wgPSAoV2ViR0xSZW5kZXJpbmdDb250ZXh0KWNhbnZhcy5HZXRDb250ZXh0KFwid2ViZ2xcIik7XG4gICAgICAgICAgICBpZiAod2ViZ2wgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB3ZWJnbCA9IChXZWJHTFJlbmRlcmluZ0NvbnRleHQpY2FudmFzLkdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIik7XG5cbiAgICAgICAgICAgIExvYWRSZXMod2ViZ2wpO1xuXG4gICAgICAgICAgICBsaWdodHRvb2wuTmF0aXZlLmNhbnZhc0FkYXB0ZXIuQ3JlYXRlU2NyZWVuQ2FudmFzKHdlYmdsLCBuZXcgTXlDYW52YXNBY3Rpb24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBMb2FkUmVzKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbClcbiAgICAgICAgeyAgICAgICAgICAvL3dlYmdsQ2FudmFzIOS9v+eUqOa1geeoi1xuICAgICAgICAgICAgLy8wMS7liJ3lp4vljJbmnZDotKjvvIzov5nkuKrmlofku7bph4zphY3nva7kuobmiYDmnInnjrDpmLbmrrXkvb/nlKjnmoRzaGFkZXLvvIzkuZ/lj6/ku6XmlL7lnKjkuI3lkIznmoTmlofku7bkuK3vvIzlpJrmiafooYzlh6DmrKFwYXJzZVVybOWwseihjOS6hlxuICAgICAgICAgICAgLy/liJ3lp4vljJbmnZDotKhcbiAgICAgICAgICAgIC8vbGlnaHR0b29sLnNoYWRlck1nci5wYXJzZXJJbnN0YW5jZSgpLnBhcnNlVXJsKHdlYmdsLCBcInNoYWRlci90ZXN0LnNoYWRlci50eHQ/XCIgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIC8v5omL5Yqo5Yqg6L295o6l5Y+jXG4gICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQoXCJzaGFkZXIvdGVzdC5zaGFkZXIudHh0P1wiICsgTWF0aC5SYW5kb20oKSwgKEFjdGlvbjxzdHJpbmcsQnJpZGdlLkVycm9yPikoKHR4dCwgZXJyKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5zaGFkZXJNZ3IucGFyc2VySW5zdGFuY2UoKS5wYXJzZURpcmVjdCh3ZWJnbCwgdHh0KTtcbiAgICAgICAgICAgIH1cbikgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLzAyLuWIneWni+WMlui1hOa6kO+8jOi/memHjOWPquazqOWGjOS4gOS4quWFs+ezu++8jOWIsOeUqOWIsOeahOaXtuWAmeaJjeS8muecn+eahOWOu+WKoOi9vVxuICAgICAgICAgICAgLy/ms6jlhozotLTlm75cbiAgICAgICAgICAgIC8v6LS05Zu+55SoIHVybCDkvZzkuLrlkI3lrZfvvIzmj5DkvpvkuIDkuKogdXJsYWRk77yM5aaC5p6c5L2g5oOz6KaB5Lu35qC8cmFuZG9tIOWVpeeahFxuICAgICAgICAgICAgLy9saWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZyhcInRleC8xLmpwZ1wiLCBcIj9cIiArIE1hdGgucmFuZG9tKCksIGxpZ2h0dG9vbC50ZXh0dXJlZm9ybWF0LlJHQkEsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgICAvL2xpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnKFwidGV4LzEuanBnXCIsIFwiXCIsIGxpZ2h0dG9vbC50ZXh0dXJlZm9ybWF0LlJHQkEsIHRydWUsIHRydWUpO1xuXG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IEhUTUxJbWFnZUVsZW1lbnQoKTsvLyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1nLlNyYyA9IFwidGV4LzEuanBnXCI7XG4gICAgICAgICAgICBpbWcuT25Mb2FkID0gKGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIF9zcGltZyA9IGxpZ2h0dG9vbC5zcHJpdGVUZXh0dXJlLmZyb21SYXcod2ViZ2wsIGltZywgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCJ0ZXgvMS5qcGdcIiwgX3NwaW1nKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8v5rOo5YaM5Zu+6ZuGKOWvueW6lOeahOi0tOWbvuS8muiHquWKqOazqOWGjOWIsHRleHR1cmVNZ3IpLOWbvumbhuS9v+eUqOS4gOS4quaMh+WumueahOWQjeWtl++8jOS9oOazqOWGjOe7meS7luWVpeWQjeWtl++8jOWQjumdouWwseeUqOi/meS4quWQjeWtl+WOu+S9v+eUqFxuICAgICAgICAgICAgbGlnaHR0b29sLmF0bGFzTWdyLkluc3RhbmNlKCkucmVnKFwiMlwiLCBcImF0bGFzLzIuanNvbi50eHQ/XCIgKyBNYXRoLlJhbmRvbSgpLCBcInRleC8yLnBuZ1wiLCBcIj9cIiArIE1hdGguUmFuZG9tKCkpO1xuXG5cbiAgICAgICAgICAgIHZhciBpbWcyID0gbmV3IEhUTUxJbWFnZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGltZzIuU3JjID0gXCJ0ZXgvMS5wbmc/XCIgKyBNYXRoLlJhbmRvbSgpO1xuICAgICAgICAgICAgaW1nMi5PbkxvYWQgPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgX3NwaW1nMiA9IGxpZ2h0dG9vbC5zcHJpdGVUZXh0dXJlLmZyb21SYXcod2ViZ2wsIGltZzIsIGxpZ2h0dG9vbC50ZXh0dXJlZm9ybWF0LlJHQkEsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwidGV4LzEucG5nXCIsIF9zcGltZzIpO1xuXG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLmxvYWRUb29sLmxvYWRUZXh0KFwiYXRsYXMvMS5qc29uLnR4dD9cIiArIE1hdGguUmFuZG9tKCksIChBY3Rpb248c3RyaW5nLEJyaWRnZS5FcnJvcj4pKCh0eHQsIGVycikgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYXRsYXMgPSBsaWdodHRvb2wuc3ByaXRlQXRsYXMuZnJvbVJhdyh3ZWJnbCwgdHh0LCBfc3BpbWcyKTtcbiAgICAgICAgICAgICAgICAgICAgbGlnaHR0b29sLmF0bGFzTWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwiMVwiLCBfYXRsYXMpO1xuICAgICAgICAgICAgICAgIH1cbikgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL+azqOWGjOWtl+S9kyjlr7nlupTnmoTotLTlm77kvJroh6rliqjms6jlhozliLB0ZXh0dXJlTWdyKSzlrZfkvZPkvb/nlKjkuIDkuKrmjIflrprnmoTlkI3lrZfvvIzkvaDms6jlhoznu5nku5bllaXlkI3lrZfvvIzlkI7pnaLlsLHnlKjov5nkuKrlkI3lrZfljrvkvb/nlKhcbiAgICAgICAgICAgIC8vbGlnaHR0b29sLmZvbnRNZ3IuSW5zdGFuY2UoKS5yZWcoXCJmMVwiLCBcImZvbnQvU1RYSU5HS0EuZm9udC5qc29uLnR4dFwiLCBcInRleC9TVFhJTkdLQS5mb250LnBuZ1wiLCBcIlwiKTtcbiAgICAgICAgICAgIHZhciBpbWczID0gbmV3IEhUTUxJbWFnZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGltZzMuU3JjID0gXCJ0ZXgvU1RYSU5HS0EuZm9udC5wbmc/XCIgKyBNYXRoLlJhbmRvbSgpO1xuICAgICAgICAgICAgaW1nMy5PbkxvYWQgPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgX3NwaW1nMyA9IGxpZ2h0dG9vbC5zcHJpdGVUZXh0dXJlLmZyb21SYXcod2ViZ2wsIGltZzMsIGxpZ2h0dG9vbC50ZXh0dXJlZm9ybWF0LlJHQkEsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwidGV4L1NUWElOR0tBLmZvbnQucG5nXCIsIF9zcGltZzMpO1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dChcImZvbnQvU1RYSU5HS0EuZm9udC5qc29uLnR4dFwiLCAoQWN0aW9uPHN0cmluZyxCcmlkZ2UuRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2ZvbnQgPSBsaWdodHRvb2wuc3ByaXRlRm9udC5mcm9tUmF3KHdlYmdsLCB0eHQsIF9zcGltZzMpO1xuICAgICAgICAgICAgICAgICAgICBsaWdodHRvb2wuZm9udE1nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcImYxXCIsIF9mb250KTtcbiAgICAgICAgICAgICAgICB9XG4pICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGNsYXNzIE15Q2FudmFzQWN0aW9uIDogbGlnaHR0b29sLmNhbnZhc0FjdGlvblxuICAgICAgICB7XG4gICAgICAgICAgICBsaWdodHRvb2wuc3ByaXRlUmVjdCB0cmVjdCA9IG5ldyBzcHJpdGVSZWN0KCk7XG4gICAgICAgICAgICBMaXN0PHN0cmluZz4gc3ByaXRlbmFtZXMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XG4gICAgICAgICAgICBmbG9hdCB0aW1lciA9IDA7XG4gICAgICAgICAgICBsaWdodHRvb2wuc3ByaXRlUmVjdCB0cmVjdEJ0biA9IG5ldyBsaWdodHRvb2wuc3ByaXRlUmVjdCg1MCwgMTUwLCAyMDAsIDUwKTtcbiAgICAgICAgICAgIGJvb2wgYnRuZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgc3RyaW5nIHNob3d0eHQgPSBcIlwiO1xuICAgICAgICAgICAgcHVibGljIHZvaWQgb25kcmF3KHNwcml0ZUNhbnZhcyBjKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZXIgKz0gMC4wMTVmO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyID4gMi4wZilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciAtPSAyLjBmO1xuICAgICAgICAgICAgICAgIC8vZ2V0IGFsbCBzcHJpdGUgaW4gYXRsYXMgd2hvIG5hbWVkIFwiMVwiXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ByaXRlbmFtZXMuQ291bnQgPT0gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdGxhcyA9IGxpZ2h0dG9vbC5hdGxhc01nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCIxXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXRsYXMgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGluYW1lIGluIGF0bGFzLnNwcml0ZXMuS2V5cylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZW5hbWVzLkFkZChpbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdCBmb3IgZHJhd2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGNjID0gMDsgY2MgPCAxMDsgY2MrKylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8ve1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5jZERyYXdlci5wdXNoKG5ldyBjb29sRG93bkRyYXdlcihhdGxhcywgdGhpcy5zcHJpdGVuYW1lc1tjY10pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuY2REcmF3ZXJbY2NdLnNldERlc3RSZWN0KG5ldyBsaWdodHRvb2wuc3ByaXRlUmVjdCg1MCAqIGNjLCA1MCwgNTAsIDUwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0ID0gbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5sb2FkKGMud2ViZ2wsIFwidGV4LzEuanBnXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0ICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBjLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBjLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgYy5kcmF3VGV4dHVyZSh0LCB0aGlzLnRyZWN0LCBsaWdodHRvb2wuc3ByaXRlUmVjdC5vbmUsIG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMSwgMSwgMS4wZikpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vZHJhdyBhdGxhc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwcml0ZW5hbWVzLkNvdW50ID4gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zcHJpdGVCYXRjaGVyLmJlZ2luZHJhdyh0aGlzLmF0bGFzLm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzA7IGkrKylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHggPSAoZmxvYXQpTWF0aC5SYW5kb20oKSAqIDUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ID0gKGZsb2F0KU1hdGguUmFuZG9tKCkgKiA1MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2kgPSAoaW50KShNYXRoLlJhbmRvbSgpICogdGhpcy5zcHJpdGVuYW1lcy5Db3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0geTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FudmFzIOWBmuazlVxuICAgICAgICAgICAgICAgICAgICAgICAgYy5kcmF3U3ByaXRlKFwiMVwiLCB0aGlzLnNwcml0ZW5hbWVzW3NpXSwgdGhpcy50cmVjdCk7IC8v562J5ZCM5LqO5LiL6Z2i55qE5Lik6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgYXRsYXMgPSBsaWdodHRvb2wuYXRsYXNNZ3IuSW5zdGFuY2UoKS5sb2FkKGMud2ViZ2wsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2F0bGFzLmRyYXcoYy5zcHJpdGVCYXRjaGVyLCB0aGlzLnNwcml0ZW5hbWVzW3NpXSwgdGhpcy50cmVjdCwgdGhpcy53aGl0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vZHJhdyBmb25077yI5bqV5bGC5pa55rOV77yJXG4gICAgICAgICAgICAgICAgdmFyIGZvbnQgPSBsaWdodHRvb2wuZm9udE1nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCJmMVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9udCAhPSBudWxsICYmIGZvbnQuY21hcCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDUwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LncgPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQuZHJhd0NoYXIoYy5zcHJpdGVCYXRjaGVyLCBcIuWPpFwiLCB0aGlzLnRyZWN0LCBsaWdodHRvb2wuc3ByaXRlQ29sb3Iud2hpdGUsIGxpZ2h0dG9vbC5zcHJpdGVDb2xvci5ncmF5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgZm9udC5kcmF3Q2hhcihjLnNwcml0ZUJhdGNoZXIsIFwi6ICBXCIsIHRoaXMudHJlY3QsIG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMC4xZiwgMC44ZiwgMC4yZiwgMC44ZiksIG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMSwgMSwgMCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vZHJhd2ZvbnQgY2FudmFzIOaWueazlVxuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IDUwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDE1MDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LncgPSAyMDA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gNTA7XG4gICAgICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgYy5kcmF3VGV4dHVyZSh0LCB0aGlzLnRyZWN0QnRuLCBsaWdodHRvb2wuc3ByaXRlUmVjdC5vbmUsIHRoaXMuYnRuZG93biA/IGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSA6IG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMSwgMSwgMC41ZikpO1xuICAgICAgICAgICAgICAgIGMuZHJhd1RleHQoXCJmMVwiLCBcInRoaXMgaXMgQnRuXCIsIHRoaXMudHJlY3RCdG4sIHRoaXMuYnRuZG93biA/IG5ldyBsaWdodHRvb2wuc3ByaXRlQ29sb3IoMSwgMCwgMCwgMSkgOiBsaWdodHRvb2wuc3ByaXRlQ29sb3Iud2hpdGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDUwMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSAyNTtcbiAgICAgICAgICAgICAgICBjLmRyYXdUZXh0KFwiZjFcIiwgdGhpcy5zaG93dHh0LCB0aGlzLnRyZWN0KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyBib29sIG9ucG9pbnRldmVudChzcHJpdGVDYW52YXMgYywgY2FudmFzcG9pbnRldmVudCBlLCBmbG9hdCB4LCBmbG9hdCB5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJvb2wgc2tpcGV2ZW50ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3d0eHQgPSBcInBvaW50PSAgIFwiICsgeCArIFwiIHwsfCBcIiArIHk7XG4gICAgICAgICAgICAgICAgaWYgKHggPiB0aGlzLnRyZWN0QnRuLnggJiYgeSA+IHRoaXMudHJlY3RCdG4ueSAmJiB4IDwgKHRoaXMudHJlY3RCdG4ueCArIHRoaXMudHJlY3RCdG4udylcbiAgICAgICAgICAgICAgICAgICAgJiYgeSA8ICh0aGlzLnRyZWN0QnRuLnkgKyB0aGlzLnRyZWN0QnRuLmgpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5kb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBza2lwZXZlbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIG9ucmVzaXplKHNwcml0ZUNhbnZhcyBjKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cclxuICAgIH1cclxufSIsDQogICAgInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgYnJpZGdld2ViLmh0dHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIGh0dHBfdG9vbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEhleDJTdHIoYnl0ZVtdIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgc3Ryb3V0ID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxkYXRhLkxlbmd0aDtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cm91dCArPSBkYXRhW2ldLlRvU3RyaW5nKFwiWDAyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBzdGF0aWMgU3lzdGVtLlRocmVhZGluZy5UYXNrcy5UYXNrPHN0cmluZz4gaHR0cFBvc3Qoc3RyaW5nIHVybCxzdHJpbmcgdXNlcm5hbWUsc3RyaW5nIHRva2VuLEZpbGUgZmlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5YTUxIdHRwUmVxdWVzdCBfaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBfaHR0cC5PcGVuKFwicG9zdFwiLCB1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICBzdHJpbmcgcmV0dXJudiA9IFwiXCI7XHJcbiAgICAgICAgICAgIF9odHRwLk9uUmVhZHlTdGF0ZUNoYW5nZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaHR0cC5SZWFkeVN0YXRlID09IEFqYXhSZWFkeVN0YXRlLkRvbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJudiA9IF9odHRwLlJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgRm9ybURhdGEgZm9ybWRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAgICAgZm9ybWRhdGEuQXBwZW5kKGZpbGUuTmFtZSwgZmlsZSk7XHJcbiAgICAgICAgICAgIGZvcm1kYXRhLkFwcGVuZChcInVzZXJcIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgICAgICBmb3JtZGF0YS5BcHBlbmQoXCJ0b2tlblwiLCB0b2tlbik7XHJcbiAgICAgICAgICAgIF9odHRwLlNlbmQoZm9ybWRhdGEpO1xyXG4gICAgICAgICAgICB3aGlsZSAoX2h0dHAuUmVhZHlTdGF0ZSAhPSBBamF4UmVhZHlTdGF0ZS5Eb25lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2suRGVsYXkoMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJudjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGFzeW5jIHN0YXRpYyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2s8c3RyaW5nPiBodHRwR2V0KHN0cmluZyB1cmwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcmlkZ2UuSHRtbDUuWE1MSHR0cFJlcXVlc3QgX2h0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgX2h0dHAuT3BlbihcImdldFwiLCB1cmwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nIHJldHVybnYgPSBcIlwiO1xyXG4gICAgICAgICAgICBfaHR0cC5PblJlYWR5U3RhdGVDaGFuZ2UgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2h0dHAuUmVhZHlTdGF0ZSA9PSBBamF4UmVhZHlTdGF0ZS5Eb25lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybnYgPSBfaHR0cC5SZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIF9odHRwLlNlbmQoKTtcclxuICAgICAgICAgICAgd2hpbGUgKF9odHRwLlJlYWR5U3RhdGUgIT0gQWpheFJlYWR5U3RhdGUuRG9uZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgU3lzdGVtLlRocmVhZGluZy5UYXNrcy5UYXNrLkRlbGF5KDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybnY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBzdGF0aWMgU3lzdGVtLlRocmVhZGluZy5UYXNrcy5UYXNrPHN0cmluZz4gaHR0cEpzb25SUEMoc3RyaW5nIHVybCxzdHJpbmcgbWV0aG9kLE9iamVjdCBKc29uQXJyYXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3VybCA9IHVybCsgXCI/anNvbnJwYz0yLjAmaWQ9MSZtZXRob2Q9XCIrbWV0aG9kICtcIiZwYXJhbXM9XCIgKyBKU09OLlN0cmluZ2lmeShKc29uQXJyYXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgaHR0cEdldChfdXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLA0KICAgICJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgT0xJTy5DcnlwdG9ncmFwaHlcclxue1xyXG4gICAgY2xhc3MgU2hhMjU2XHJcbiAgICB7XHJcbiAgICAgICAgLy8gY29uc3RhbnRzIFvCpzQuMi4yXVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHVpbnRbXSBLID0ge1xyXG4gICAgICAgICAgICAweDQyOGEyZjk4LCAweDcxMzc0NDkxLCAzMDQ5MzIzNDcxVSwgMzkyMTAwOTU3M1UsIDk2MTk4NzE2MywgMHg1OWYxMTFmMSwgMHg5MjNmODJhNCwgMjg3MDc2MzIyMVUsXHJcbiAgICAgICAgICAgIDB4ZDgwN2FhOTgsIDMxMDU5ODQwMSwgNjA3MjI1Mjc4LCAweDU1MGM3ZGMzLCAxOTI1MDc4Mzg4LCAyMTYyMDc4MjA2VSwgMjYxNDg4ODEwM1UsIDMyNDgyMjI1ODBVLFxyXG4zODM1MzkwNDAxVSwgNDAyMjIyNDc3NFUsIDB4MGZjMTlkYzYsIDB4MjQwY2ExY2MsIDB4MmRlOTJjNmYsIDB4NGE3NDg0YWEsIDE1NTUwODE2OTIsIDB4NzZmOTg4ZGEsXHJcbiAgICAgICAgICAgIDB4OTgzZTUxNTIsIDB4YTgzMWM2NmQsIDI5NTI5OTY4MDhVLCAzMjEwMzEzNjcxVSwgMzMzNjU3MTg5MVUsIDB4ZDVhNzkxNDcsIDB4MDZjYTYzNTEsIDB4MTQyOTI5NjcsXHJcbjY2NjMwNzIwNSwgNzczNTI5OTEyLCAweDRkMmM2ZGZjLCAweDUzMzgwZDEzLCAweDY1MGE3MzU0LCAxOTg2NjYxMDUxLCAweDgxYzJjOTJlLCAweDkyNzIyYzg1LFxyXG4yNzMwNDg1OTIxVSwgMjgyMDMwMjQxMVUsIDMyNTk3MzA4MDBVLCAweGM3NmM1MWEzLCAweGQxOTJlODE5LCAweGQ2OTkwNjI0LCAweGY0MGUzNTg1LCAweDEwNmFhMDcwLFxyXG4gICAgICAgICAgICAweDE5YTRjMTE2LCAweDFlMzc2YzA4LCAweDI3NDg3NzRjLCA4ODM5OTc4NzcsIDk1ODEzOTU3MSwgMHg0ZWQ4YWE0YSwgMTUzNzAwMjA2MywgMHg2ODJlNmZmMyxcclxuICAgICAgICAgICAgMHg3NDhmODJlZSwgMHg3OGE1NjM2ZiwgMHg4NGM4NzgxNCwgMHg4Y2M3MDIwOCwgMjQyODQzNjQ3NFUsIDI3NTY3MzQxODdVLCAzMjA0MDMxNDc5VSwgMHhjNjcxNzhmMiB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJ5dGVbXSBjb21wdXRlSGFzaChieXRlW10gZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWwgaGFzaCB2YWx1ZSBbwqc1LjMuMV1cclxuICAgICAgICAgICAgdWludFtdIEggPSBuZXcgdWludFtdIHtcclxuICAgICAgICAgICAgICAgIDB4NmEwOWU2NjcsIDMxNDQxMzQyNzdVLCAweDNjNmVmMzcyLCAweGE1NGZmNTNhLCAweDUxMGU1MjdmLCAyNjAwODIyOTI0VSwgNTI4NzM0NjM1LCAxNTQxNDU5MjI1fTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBSRVBST0NFU1NJTkcgXHJcblxyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IGRhdGEgaW50byA1MTItYml0LzE2LWludGVnZXIgYmxvY2tzIGFycmF5cyBvZiBpbnRzIFvCpzUuMi4xXVxyXG4gICAgICAgICAgICB2YXIgbCA9IGRhdGEuTGVuZ3RoIC8gNCArIDI7IC8vIGxlbmd0aCAoaW4gMzItYml0IGludGVnZXJzKSBvZiBkYXRhICsg4oCYMeKAmSArIGFwcGVuZGVkIGxlbmd0aFxyXG4gICAgICAgICAgICB2YXIgTiA9IChpbnQpTWF0aC5DZWlsaW5nKGwgLyAxNi4wKTsgIC8vIG51bWJlciBvZiAxNi1pbnRlZ2VyLWJsb2NrcyByZXF1aXJlZCB0byBob2xkICdsJyBpbnRzXHJcbiAgICAgICAgICAgIFVJbnQzMltdW10gTSA9IG5ldyBVSW50MzJbTl1bXTtcclxuICAgICAgICAgICAgLy9sZXQgdmlldyA9IFVpbnQ4QXJyYXkuZnJvbUFycmF5QnVmZmVyKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgdmlldyA9IGRhdGE7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNW2ldID0gbmV3IFVJbnQzMlsxNl07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDE2OyBqKyspICAvLyBlbmNvZGUgNCBjaGFycyBwZXIgaW50ZWdlciwgYmlnLWVuZGlhbiBlbmNvZGluZ1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTVtpXVtqXSAgKHVpbnQpKFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2MSA9IGkgKiA2NCArIGogKiA0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2djEgPSB2MSA8IHZpZXcuTGVuZ3RoID8gdmlld1t2MV0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2MiA9IGkgKiA2NCArIGogKiA0ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdnYyID0gdjIgPCB2aWV3Lkxlbmd0aCA/IHZpZXdbdjJdIDogMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdjMgPSBpICogNjQgKyBqICogNCArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZ2MyA9IHYzIDwgdmlldy5MZW5ndGggPyB2aWV3W3YzXSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHY0ID0gaSAqIDY0ICsgaiAqIDQgKyAzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2djQgPSB2NCA8IHZpZXcuTGVuZ3RoID8gdmlld1t2NF0gOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNW2ldW2pdID0odWludCkoIHZ2MSA8PCAyNCB8IHZ2MiA8PCAxNiB8IHZ2MyA8PCA4IHwgdnY0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8odmlld1tpICogNjQgKyBqICogNF0gPDwgMjQpIHwgKHZpZXdbaSAqIDY0ICsgaiAqIDQgKyAxXSA8PCAxNikgfFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICh2aWV3W2kgKiA2NCArIGogKiA0ICsgMl0gPDwgOCkgfCAodmlld1tpICogNjQgKyBqICogNCArIDNdKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICApO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBub3RlIHJ1bm5pbmcgb2ZmIHRoZSBlbmQgb2YgZGF0YSBpcyBvayAnY29zIGJpdHdpc2Ugb3BzIG9uIE5hTiByZXR1cm4gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFkZCB0cmFpbGluZyAnMScgYml0ICgrIDAncyBwYWRkaW5nKSB0byBzdHJpbmcgW8KnNS4xLjFdXHJcbiAgICAgICAgICAgIE1bKHVpbnQpTWF0aC5GbG9vcihkYXRhLkxlbmd0aCAvIDQgLyAxNi4wKV1bKHVpbnQpTWF0aC5GbG9vcihkYXRhLkxlbmd0aCAvIDQuMCkgJSAxNl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfD1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKHVpbnQpKDB4ODAgPDwgKCgzIC0gZGF0YS5MZW5ndGggJSA0KSAqIDgpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBsZW5ndGggKGluIGJpdHMpIGludG8gZmluYWwgcGFpciBvZiAzMi1iaXQgaW50ZWdlcnMgKGJpZy1lbmRpYW4pIFvCpzUuMS4xXVxyXG4gICAgICAgICAgICAvLyBub3RlOiBtb3N0IHNpZ25pZmljYW50IHdvcmQgd291bGQgYmUgKGxlbi0xKSo4ID4+PiAzMiwgYnV0IHNpbmNlIEpTIGNvbnZlcnRzXHJcbiAgICAgICAgICAgIC8vIGJpdHdpc2Utb3AgYXJncyB0byAzMiBiaXRzLCB3ZSBuZWVkIHRvIHNpbXVsYXRlIHRoaXMgYnkgYXJpdGhtZXRpYyBvcGVyYXRvcnNcclxuICAgICAgICAgICAgTVtOIC0gMV1bMTRdID0gKHVpbnQpKChkYXRhLkxlbmd0aCAqIDgpIC8gTWF0aC5Qb3coMiwgMzIpKTtcclxuICAgICAgICAgICAgTVtOIC0gMV1bMTVdID0gKHVpbnQpKChkYXRhLkxlbmd0aCAqIDgpICYgMHhmZmZmZmZmZik7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gSEFTSCBDT01QVVRBVElPTiBbwqc2LjEuMl1cclxuXHJcbiAgICAgICAgICAgIHZhciBXID0gbmV3IFVJbnQzMls2NF07XHJcbiAgICAgICAgICAgIFVJbnQzMiBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDEgLSBwcmVwYXJlIG1lc3NhZ2Ugc2NoZWR1bGUgJ1cnXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IDE2OyB0KyspIFdbdF0gPSBNW2ldW3RdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdCA9IDE2OyB0IDwgNjQ7IHQrKykgV1t0XSA9IChTaGEyNTYuz4MxKFdbdCAtIDJdKSArIFdbdCAtIDddICsgU2hhMjU2Ls+DMChXW3QgLSAxNV0pICsgV1t0IC0gMTZdKSAmIDB4ZmZmZmZmZmY7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gMiAtIGluaXRpYWxpc2Ugd29ya2luZyB2YXJpYWJsZXMgYSwgYiwgYywgZCwgZSwgZiwgZywgaCB3aXRoIHByZXZpb3VzIGhhc2ggdmFsdWVcclxuICAgICAgICAgICAgICAgIGEgPSBIWzBdOyBiID0gSFsxXTsgYyA9IEhbMl07IGQgPSBIWzNdOyBlID0gSFs0XTsgZiA9IEhbNV07IGcgPSBIWzZdOyBoID0gSFs3XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAzIC0gbWFpbiBsb29wIChub3RlICdhZGRpdGlvbiBtb2R1bG8gMl4zMicpXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IDY0OyB0KyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFQxID0gaCArIFNoYTI1Ni7OozEoZSkgKyBTaGEyNTYuQ2goZSwgZiwgZykgKyBTaGEyNTYuS1t0XSArIFdbdF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFQyID0gU2hhMjU2Ls6jMChhKSArIFNoYTI1Ni5NYWooYSwgYiwgYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaCA9IGc7XHJcbiAgICAgICAgICAgICAgICAgICAgZyA9IGY7XHJcbiAgICAgICAgICAgICAgICAgICAgZiA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZSA9IChkICsgVDEpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgICAgICBkID0gYztcclxuICAgICAgICAgICAgICAgICAgICBjID0gYjtcclxuICAgICAgICAgICAgICAgICAgICBiID0gYTtcclxuICAgICAgICAgICAgICAgICAgICBhID0gKFQxICsgVDIpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIDQgLSBjb21wdXRlIHRoZSBuZXcgaW50ZXJtZWRpYXRlIGhhc2ggdmFsdWUgKG5vdGUgJ2FkZGl0aW9uIG1vZHVsbyAyXjMyJylcclxuICAgICAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIEhbNV0gPSAoSFs1XSArIGYpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIEhbNl0gPSAoSFs2XSArIGcpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgICAgIEhbN10gPSAoSFs3XSArIGgpICYgMHhmZmZmZmZmZjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBieXRlWzMyXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBILkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaSAqIDQgKyAwXSA9IChieXRlKSgoSFtpXSA+PiAoMyAqIDgpKSAmIDB4ZmYpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2kgKiA0ICsgMV0gPSAoYnl0ZSkoKEhbaV0gPj4gKDIgKiA4KSkgJiAweGZmKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpICogNCArIDJdID0gKGJ5dGUpKChIW2ldID4+ICgxICogOCkpICYgMHhmZik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaSAqIDQgKyAzXSA9IChieXRlKSgoSFtpXSA+PiAoMCAqIDgpKSAmIDB4ZmYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSb3RhdGVzIHJpZ2h0IChjaXJjdWxhciByaWdodCBzaGlmdCkgdmFsdWUgeCBieSBuIHBvc2l0aW9ucyBbwqczLjIuNF0uXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdWludCBST1RSKGludCBuLCB1aW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHggPj4gbikgfCAoeCA8PCAoMzIgLSBuKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMb2dpY2FsIGZ1bmN0aW9ucyBbwqc0LjEuMl0uXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdWludCDOozAodWludCB4KSB7IHJldHVybiBTaGEyNTYuUk9UUigyLCB4KSBeIFNoYTI1Ni5ST1RSKDEzLCB4KSBeIFNoYTI1Ni5ST1RSKDIyLCB4KTsgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHVpbnQgzqMxKHVpbnQgeCkgeyByZXR1cm4gU2hhMjU2LlJPVFIoNiwgeCkgXiBTaGEyNTYuUk9UUigxMSwgeCkgXiBTaGEyNTYuUk9UUigyNSwgeCk7IH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB1aW50IM+DMCh1aW50IHgpIHsgcmV0dXJuIFNoYTI1Ni5ST1RSKDcsIHgpIF4gU2hhMjU2LlJPVFIoMTgsIHgpIF4gKHggPj4gMyk7IH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB1aW50IM+DMSh1aW50IHgpIHsgcmV0dXJuIFNoYTI1Ni5ST1RSKDE3LCB4KSBeIFNoYTI1Ni5ST1RSKDE5LCB4KSBeICh4ID4+IDEwKTsgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHVpbnQgQ2godWludCB4LCB1aW50IHksIHVpbnQgeikgeyByZXR1cm4gKHggJiB5KSBeICh+eCAmIHopOyB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdWludCBNYWoodWludCB4LCB1aW50IHksIHVpbnQgeikgeyByZXR1cm4gKHggJiB5KSBeICh4ICYgeikgXiAoeSAmIHopOyB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiINCiAgXQ0KfQ==
