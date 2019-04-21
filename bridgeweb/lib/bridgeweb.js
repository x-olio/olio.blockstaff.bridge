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
                var url = "http://cafe.f3322.net:17280";
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

//# sourceMappingURL=data:application/json;base64,ew0KICAidmVyc2lvbiI6IDMsDQogICJmaWxlIjogImJyaWRnZXdlYi5qcyIsDQogICJzb3VyY2VSb290IjogIiIsDQogICJzb3VyY2VzIjogWw0KICAgICIuLi9BcHAuY3MiLA0KICAgICIuLi9hcHBfYmxvY2tzZXJ2ZXIudGVzdC5jcyIsDQogICAgIi4uL2FwcF9jYW52YXN0ZXN0LmNzIiwNCiAgICAiLi4vaHR0cC9odHRwX3Rvb2wuY3MiLA0KICAgICIuLi9odHRwL3NoYTI1Ni5jcyINCiAgXSwNCiAgIm5hbWVzIjogWw0KICAgICIiDQogIF0sDQogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFlWUE7WUFDQUE7O1lBR0FBO1lBQ0FBOztZQUVBQTs7OztZQUtBQSxvQ0FBc0JBLEFBQVFBO1lBQzlCQSxnREFBa0NBLEFBQVFBOzs7Ozs7Ozs7b0JBSzFDQSx3QkFBVUE7b0JBQ1ZBO29CQUNBQTtvQkFDQUEsMEJBQTBCQTs7bUNBRVZBLE1BQVlBO29CQUU1QkEsVUFBVUE7b0JBQ1ZBLGtCQUFrQkE7b0JBQ2xCQSxrQ0FBb0JBO29CQUNwQkEsU0FBU0E7b0JBQ1RBLGtDQUFvQkE7b0JBQ3BCQSxjQUFjQSxVQUFDQTt3QkFFWEE7d0JBQ0FBOzs7O29CQUtKQSwwQkFBMEJBOzs7Ozs7Ozs7Ozs7O29CQ3pDMUJBLG1DQUFTQSxJQUFJQTs7b0JBRWJBOzs7dUNBR2dDQSxLQUFvQkEsT0FBY0E7b0JBRWxFQSxvQkFBb0JBO29CQUNwQkEsNEJBQTRCQTtvQkFDNUJBLGdCQUFnQkE7b0JBQ2hCQSxlQUFlQTtvQkFDZkEsZ0JBQWdCQTtvQkFDaEJBLGlCQUFpQkE7b0JBQ2pCQSxnQkFBZ0JBO29CQUNoQkEsU0FBU0E7b0JBQ1RBLGdCQUFnQkE7b0JBQ2hCQSxPQUFPQTs7MENBRTRCQSxLQUFvQkEsT0FBY0E7b0JBRXJFQSxvQkFBb0JBO29CQUNwQkEsNEJBQTRCQTtvQkFDNUJBLGdCQUFnQkE7b0JBQ2hCQSxlQUFlQTtvQkFDZkEsZ0JBQWdCQTtvQkFDaEJBLGlCQUFpQkE7b0JBQ2pCQSxnQkFBZ0JBO29CQUNo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Q0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBO3dCQUNyQ0EsMEJBQU9BLG1DQUFQQSxXQUFvQkEsQ0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBO3dCQUNyQ0EsMEJBQU9BLG1DQUFQQSxXQUFvQkEsQ0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBO3dCQUNyQ0EsMEJBQU9BLG1DQUFQQSxXQUFvQkEsQ0FBTUEsQUFBQ0EsR0FBQ0EscUJBQUVBLElBQUZBLFFBQVFBLENBQUNBOztvQkFFekNBLE9BQU9BOztnQ0FJY0EsR0FBT0E7b0JBRTVCQSxPQUFPQSxHQUFDQSxNQUFLQSxLQUFLQSxDQUFDQSxPQUFLQSxDQUFDQSxPQUFLQTs7OEJBSVhBO29CQUFVQSxPQUFPQSxxQ0FBZUEsS0FBS0Esa0NBQWdCQSxhQUFLQSxrQ0FBZ0JBOzs4QkFDMUVBO29CQUFVQSxPQUFPQSxxQ0FBZUEsS0FBS0Esa0NBQWdCQSxhQUFLQSxrQ0FBZ0JBOzs4QkFDMUVBO29CQUFVQSxPQUFPQSxxQ0FBZUEsS0FBS0Esa0NBQWdCQSxhQUFLQSxDQUFDQTs7OEJBQzNEQTtvQkFBVUEsT0FBT0Esc0NBQWdCQSxLQUFLQSxrQ0FBZ0JBLGFBQUtBLENBQUNBOzs4QkFDNURBLEdBQVFBLEdBQVFBO29CQUFVQSxPQUFPQSxHQUFDQSxNQUFJQSxhQUFLQSxDQUFDQSxHQUFDQSxJQUFJQTs7K0JBQ2hEQSxHQUFRQSxHQUFRQTtvQkFBVUEsT0FBT0EsS0FBQ0EsTUFBSUEsYUFBS0EsQ0FBQ0EsTUFBSUEscUJBQUtBLENBQUNBLE1BQUlBIiwNCiAgInNvdXJjZXNDb250ZW50IjogWw0KICAgICJ1c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuV2ViR0w7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyBTeXN0ZW07XG51c2luZyBsaWdodHRvb2w7XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIGJyaWRnZXdlYlxue1xuICAgIHB1YmxpYyBjbGFzcyBBcHBcbiAgICB7XG4gICAgICAgIHN0YXRpYyBIVE1MRGl2RWxlbWVudCBkaXZNZW51O1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcImhpaFwiKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcImJyaWRnZS5ibG9ja3N0YWZmLm1lbnVcIik7XHJcblxuICAgICAgICAgICAgLy9pbml0IGJvZHlcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuT3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5NYXJnaW4gPSBcIjBweFwiO1xyXG5cclxuICAgICAgICAgICAgSW5pdE1lbnVVSSgpO1xyXG4gICAgICAgICAgICAvL2luaXQgZGl2TWVudVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBBZGRNZW51KFwiY2FudmFzdGVzdFwiLCAoQWN0aW9uKWFwcF9jYW52YXN0ZXN0LkluaXQpO1xyXG4gICAgICAgICAgICBBZGRNZW51KFwiYmxvY2tzdGFmZi5zZXJ2ZXIudGVzdFwiLCAoQWN0aW9uKWFwcF9ibG9ja3NlcnZlci5Jbml0KTtcclxuXHJcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgdm9pZCBJbml0TWVudVVJKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpdk1lbnUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2TWVudS5TdHlsZS5Qb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgZGl2TWVudS5TdHlsZS5Ub3AgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGRpdk1lbnUpO1xyXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIHZvaWQgQWRkTWVudShzdHJpbmcgdGV4dCxBY3Rpb24gaW5pdGZ1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYnRuID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oXCJidXR0b25cIik7XG4gICAgICAgICAgICBidG4uVGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgZGl2TWVudS5BcHBlbmRDaGlsZChidG4pO1xuICAgICAgICAgICAgdmFyIGhyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQlJFbGVtZW50PihcImJyXCIpO1xuICAgICAgICAgICAgZGl2TWVudS5BcHBlbmRDaGlsZChocik7XG4gICAgICAgICAgICBidG4uT25DbGljayA9IChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0cm95TWVudVVJKCk7XHJcbiAgICAgICAgICAgICAgICBpbml0ZnVuYygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIHZvaWQgRGVzdHJveU1lbnVVSSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlJlbW92ZUNoaWxkKGRpdk1lbnUpO1xyXG4gICAgICAgIH1cblxuICAgIH1cbn0iLA0KICAgICJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuV2ViR0w7XHJcblxyXG5uYW1lc3BhY2UgYnJpZGdld2ViXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBhcHBfYmxvY2tzZXJ2ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXJ2ZXIgPSBuZXcgYXBwX2Jsb2Nrc2VydmVyKCk7XHJcblxyXG4gICAgICAgICAgICBzZXJ2ZXIuSW5pdEhUTUwoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IEFkZElucHV0Qm94KEhUTUxEaXZFbGVtZW50IGRpdiwgc3RyaW5nIHRpdGxlLCBzdHJpbmcgZGVmdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB1c2VybmFtZXRpdGxlID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MU3BhbkVsZW1lbnQ+KFwic3BhblwiKTtcclxuICAgICAgICAgICAgdXNlcm5hbWV0aXRsZS5UZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQodXNlcm5hbWV0aXRsZSk7XHJcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4oXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdXNlcm5hbWUuVHlwZSA9IElucHV0VHlwZS5UZXh0O1xyXG4gICAgICAgICAgICB1c2VybmFtZS5WYWx1ZSA9IGRlZnRleHQ7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTElucHV0RWxlbWVudCBBZGRQYXNzd29yZEJveChIVE1MRGl2RWxlbWVudCBkaXYsIHN0cmluZyB0aXRsZSwgc3RyaW5nIGRlZnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWV0aXRsZSA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTFNwYW5FbGVtZW50PihcInNwYW5cIik7XHJcbiAgICAgICAgICAgIHVzZXJuYW1ldGl0bGUuVGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKHVzZXJuYW1ldGl0bGUpO1xyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxJbnB1dEVsZW1lbnQ+KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lLlR5cGUgPSBJbnB1dFR5cGUuUGFzc3dvcmQ7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lLlZhbHVlID0gZGVmdGV4dDtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKHVzZXJuYW1lKTtcclxuICAgICAgICAgICAgdmFyIGJyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQlJFbGVtZW50PihcImJyXCIpO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQoYnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IEFkZEZpbGUoSFRNTERpdkVsZW1lbnQgZGl2LCBzdHJpbmcgdGl0bGUpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1ldGl0bGUgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxTcGFuRWxlbWVudD4oXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICB1c2VybmFtZXRpdGxlLlRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZXRpdGxlKTtcclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MSW5wdXRFbGVtZW50PihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB1c2VybmFtZS5UeXBlID0gSW5wdXRUeXBlLkZpbGU7XHJcbiAgICAgICAgICAgIGRpdi5BcHBlbmRDaGlsZCh1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBBZGRIUihIVE1MRGl2RWxlbWVudCBkaXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIVE1MSFJFbGVtZW50IGhyID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MSFJFbGVtZW50PihcImhyXCIpO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQoaHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTEJ1dHRvbkVsZW1lbnQgQWRkQnV0dG9uKEhUTUxEaXZFbGVtZW50IGRpdiwgc3RyaW5nIHRpdGxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJ0biA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidG4uVGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBidG47XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgSFRNTFRleHRBcmVhRWxlbWVudCBBZGRUZXh0QXJlYShIVE1MRGl2RWxlbWVudCBkaXYsIGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXRMaXN0ID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MVGV4dEFyZWFFbGVtZW50PihcInRleHRhcmVhXCIpO1xyXG4gICAgICAgICAgICBvdXRwdXRMaXN0LlN0eWxlLldpZHRoID0gd2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIG91dHB1dExpc3QuU3R5bGUuSGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICBkaXYuQXBwZW5kQ2hpbGQob3V0cHV0TGlzdCk7XHJcbiAgICAgICAgICAgIHZhciBiciA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQ8SFRNTEJSRWxlbWVudD4oXCJiclwiKTtcclxuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dExpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBhcHBfYmxvY2tzZXJ2ZXIgc2VydmVyO1xyXG5cclxuICAgICAgICBIVE1MVGV4dEFyZWFFbGVtZW50IG91dHB1dExpc3Q7XHJcbiAgICAgICAgc3RyaW5nIGxvZ2ludXNlciA9IG51bGw7XHJcbiAgICAgICAgc3RyaW5nIGxvZ2ludG9rZW4gPSBudWxsO1xyXG4gICAgICAgIHZvaWQgSW5pdEhUTUwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIHVybCA9IFwiaHR0cDovL2NhZmUuZjMzMjIubmV0OjE3MjgwXCI7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2LlN0eWxlLldpZHRoID0gXCIxMDAlXCI7XHJcbiAgICAgICAgICAgIGRpdi5TdHlsZS5IZWlnaHQgPSBcIjEwMCVcIjtcclxuICAgICAgICAgICAgZGl2LlN0eWxlLlBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgICAgICBkaXYuU3R5bGUuT3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBBZGRJbnB1dEJveChkaXYsIFwidXNlcm5hbWVcIiwgXCJhYmNkXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGFzc3dvcmQgPSBBZGRQYXNzd29yZEJveChkaXYsIFwicGFzc3dvcmRcIiwgXCIwMFwiKTtcclxuICAgICAgICAgICAgdmFyIGJ0bmxvZ2luID0gQWRkQnV0dG9uKGRpdiwgXCJsb2dpblwiKTtcclxuICAgICAgICAgICAgdmFyIGJ0blJlZyA9IEFkZEJ1dHRvbihkaXYsIFwicmVnaXN0ZXJcIik7XHJcbiAgICAgICAgICAgIEFkZEhSKGRpdik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm91dHB1dExpc3QgPSBBZGRUZXh0QXJlYShkaXYsIDgwMCwgMzAwKTtcclxuICAgICAgICAgICAgdmFyIGNsZWFyQnRuID0gQWRkQnV0dG9uKGRpdiwgXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgY2xlYXJCdG4uT25DbGljayA9IChlKSA9PlxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgTG9nQ2xlYXIoKTtcclxuICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGhlbHBCdG4gPSBBZGRCdXR0b24oZGl2LCBcImhlbHBcIik7XHJcbiAgICAgICAgICAgIGhlbHBCdG4uT25DbGljayA9IGFzeW5jIChlKSA9PlxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IGh0dHAuaHR0cF90b29sLmh0dHBKc29uUlBDKHVybCArIFwiL3JwY1wiLCBcImhlbHBcIiwgbmV3IHN0cmluZ1tdIHsgfSk7XHJcbiAgICAgICAgICAgICAgICAgIExvZyhcInJlZz1cIiArIHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIEFkZEhSKGRpdik7XHJcblxyXG4gICAgICAgICAgICBidG5SZWcuT25DbGljayA9IGFzeW5jIChlKSA9PlxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHBhc3MgPSBTeXN0ZW0uVGV4dC5FbmNvZGluZy5VVEY4LkdldEJ5dGVzKHVzZXJuYW1lLlZhbHVlICsgXCJfXCIgKyBwYXNzd29yZC5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBwYXNzaGFzaGRhdGEgPSBPTElPLkNyeXB0b2dyYXBoeS5TaGEyNTYuY29tcHV0ZUhhc2gocGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBwYXNoaGFzaGhleCA9IGh0dHAuaHR0cF90b29sLkhleDJTdHIocGFzc2hhc2hkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgTG9nKFwicGFzc2hhc2g9XCIgKyBwYXNoaGFzaGhleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBzdHJpbmdbXSBteXBhcmFtcyA9IG5ldyBzdHJpbmdbXSB7IHVzZXJuYW1lLlZhbHVlLCBwYXNoaGFzaGhleCB9O1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgaHR0cC5odHRwX3Rvb2wuaHR0cEpzb25SUEModXJsICsgXCIvcnBjXCIsIFwidXNlcl9uZXdcIiwgbXlwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIganNvbnJlc3VsdCA9IEpTT04uUGFyc2UocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgaWYgKGpzb25yZXN1bHRbXCJyZXN1bHRcIl1bXCJyZXN1bHRcIl0uQXM8Ym9vbD4oKSA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBMb2coXCJjcmVhdGUgdXNlciBzdWNjXCIpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTG9nKFwiY3JlYXRlIHVzZXIgZmFpbFwiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJ0bmxvZ2luLk9uQ2xpY2sgPSBhc3luYyAoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhc3MgPSBTeXN0ZW0uVGV4dC5FbmNvZGluZy5VVEY4LkdldEJ5dGVzKHVzZXJuYW1lLlZhbHVlICsgXCJfXCIgKyBwYXNzd29yZC5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFzc2hhc2hkYXRhID0gT0xJTy5DcnlwdG9ncmFwaHkuU2hhMjU2LmNvbXB1dGVIYXNoKHBhc3MpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhc2hoYXNoaGV4ID0gaHR0cC5odHRwX3Rvb2wuSGV4MlN0cihwYXNzaGFzaGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZ1tdIG15cGFyYW1zID0gbmV3IHN0cmluZ1tdIHsgdXNlcm5hbWUuVmFsdWUsIHBhc2hoYXNoaGV4IH07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgaHR0cC5odHRwX3Rvb2wuaHR0cEpzb25SUEModXJsICsgXCIvcnBjXCIsIFwidXNlcl9sb2dpblwiLCBteXBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbnJlc3VsdCA9IEpTT04uUGFyc2UocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGlmIChqc29ucmVzdWx0W1wicmVzdWx0XCJdW1wicmVzdWx0XCJdLkFzPGJvb2w+KCkgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBqc29ucmVzdWx0W1wicmVzdWx0XCJdW1widG9rZW5cIl0uQXM8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIExvZyhcImxvZ2luIHRva2VuPVwiICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2ludG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbnVzZXIgPSB1c2VybmFtZS5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2coXCJsb2dpbiBmYWlsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2ludXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW50b2tlbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBmaWxlID0gQWRkRmlsZShkaXYsIFwidXBsb2FkIGEgZmlsZS5cIik7XHJcbiAgICAgICAgICAgIGZpbGUuT25DaGFuZ2UgPSAoZSkgPT5cclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIExvZyhcInNpemU9XCIgKyBmaWxlLkZpbGVzWzBdLlNpemUpO1xyXG4gICAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGJ0bnVwbG9hZCA9IEFkZEJ1dHRvbihkaXYsIFwidXBsb2FkIGZpbGVcIik7XHJcbiAgICAgICAgICAgIGJ0bnVwbG9hZC5PbkNsaWNrID0gYXN5bmMgKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfZmlsZSA9IGZpbGUuRmlsZXNbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBfZmlsZS5TaXplO1xyXG4gICAgICAgICAgICAgICAgTG9nKFwic2l6ZT1cIiArIHNpemUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVzdHJlYW0gPSBhd2FpdCBfZmlsZS5HZXRGaWxlU3RyZWFtQXN5bmMoKTtcclxuICAgICAgICAgICAgICAgIGJ5dGVbXSBidWYgPSBuZXcgYnl0ZVtzaXplXTtcclxuICAgICAgICAgICAgICAgIGZpbGVzdHJlYW0uUmVhZChidWYsIDAsIGJ1Zi5MZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZyByZXN1bHQgPSBhd2FpdCBodHRwLmh0dHBfdG9vbC5odHRwUG9zdCh1cmwgKyBcIi91cGxvYWRyYXdcIiwgbG9naW51c2VyLCBsb2dpbnRva2VuLCBfZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBMb2coXCJyZXN1bHQ9XCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2b2lkIExvZ0NsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG91dHB1dExpc3QuVGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2b2lkIExvZyhzdHJpbmcgdHh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3V0cHV0TGlzdC5UZXh0Q29udGVudCArPSB0eHQgKyBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsDQogICAgInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLldlYkdMO1xyXG51c2luZyBsaWdodHRvb2w7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBicmlkZ2V3ZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIGFwcF9jYW52YXN0ZXN0XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbDtcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGl2ID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIik7XG4gICAgICAgICAgICBkaXYuU3R5bGUuV2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIGRpdi5TdHlsZS5IZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIGRpdi5TdHlsZS5Qb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIGRpdi5TdHlsZS5PdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gRG9jdW1lbnQuQ3JlYXRlRWxlbWVudDxIVE1MQ2FudmFzRWxlbWVudD4oXCJjYW52YXNcIik7XG4gICAgICAgICAgICBjYW52YXMuU3R5bGUuV2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIGNhbnZhcy5TdHlsZS5IZWlnaHQgPSBcIjgwJVwiO1xuICAgICAgICAgICAgZGl2LkFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgIC8vIFdyaXRlIGEgbWVzc2FnZSB0byB0aGUgQ29uc29sZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcIldlbGNvbWUgdG8gQnJpZGdlLk5FVCAyMDE4XCIpO1xuXG4gICAgICAgICAgICAvL3ZhciBjYW52YXMgPSBCcmlkZ2UuSHRtbDUuRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgICAgICB3ZWJnbCA9IChXZWJHTFJlbmRlcmluZ0NvbnRleHQpY2FudmFzLkdldENvbnRleHQoXCJ3ZWJnbFwiKTtcbiAgICAgICAgICAgIGlmICh3ZWJnbCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHdlYmdsID0gKFdlYkdMUmVuZGVyaW5nQ29udGV4dCljYW52YXMuR2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiKTtcblxuICAgICAgICAgICAgTG9hZFJlcyh3ZWJnbCk7XG5cbiAgICAgICAgICAgIGxpZ2h0dG9vbC5OYXRpdmUuY2FudmFzQWRhcHRlci5DcmVhdGVTY3JlZW5DYW52YXMod2ViZ2wsIG5ldyBNeUNhbnZhc0FjdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExvYWRSZXMoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsKVxuICAgICAgICB7ICAgICAgICAgIC8vd2ViZ2xDYW52YXMg5L2/55So5rWB56iLXG4gICAgICAgICAgICAvLzAxLuWIneWni+WMluadkOi0qO+8jOi/meS4quaWh+S7tumHjOmFjee9ruS6huaJgOacieeOsOmYtuauteS9v+eUqOeahHNoYWRlcu+8jOS5n+WPr+S7peaUvuWcqOS4jeWQjOeahOaWh+S7tuS4re+8jOWkmuaJp+ihjOWHoOasoXBhcnNlVXJs5bCx6KGM5LqGXG4gICAgICAgICAgICAvL+WIneWni+WMluadkOi0qFxuICAgICAgICAgICAgLy9saWdodHRvb2wuc2hhZGVyTWdyLnBhcnNlckluc3RhbmNlKCkucGFyc2VVcmwod2ViZ2wsIFwic2hhZGVyL3Rlc3Quc2hhZGVyLnR4dD9cIiArIE1hdGgucmFuZG9tKCkpO1xuICAgICAgICAgICAgLy/miYvliqjliqDovb3mjqXlj6NcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dChcInNoYWRlci90ZXN0LnNoYWRlci50eHQ/XCIgKyBNYXRoLlJhbmRvbSgpLCAoQWN0aW9uPHN0cmluZyxCcmlkZ2UuRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnNoYWRlck1nci5wYXJzZXJJbnN0YW5jZSgpLnBhcnNlRGlyZWN0KHdlYmdsLCB0eHQpO1xuICAgICAgICAgICAgfVxuKSAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vMDIu5Yid5aeL5YyW6LWE5rqQ77yM6L+Z6YeM5Y+q5rOo5YaM5LiA5Liq5YWz57O777yM5Yiw55So5Yiw55qE5pe25YCZ5omN5Lya55yf55qE5Y675Yqg6L29XG4gICAgICAgICAgICAvL+azqOWGjOi0tOWbvlxuICAgICAgICAgICAgLy/otLTlm77nlKggdXJsIOS9nOS4uuWQjeWtl++8jOaPkOS+m+S4gOS4qiB1cmxhZGTvvIzlpoLmnpzkvaDmg7PopoHku7fmoLxyYW5kb20g5ZWl55qEXG4gICAgICAgICAgICAvL2xpZ2h0dG9vbC50ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnKFwidGV4LzEuanBnXCIsIFwiP1wiICsgTWF0aC5yYW5kb20oKSwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWcoXCJ0ZXgvMS5qcGdcIiwgXCJcIiwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpOy8vIEltYWdlKCk7XG4gICAgICAgICAgICBpbWcuU3JjID0gXCJ0ZXgvMS5qcGdcIjtcbiAgICAgICAgICAgIGltZy5PbkxvYWQgPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgX3NwaW1nID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nLCBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZ0RpcmVjdChcInRleC8xLmpwZ1wiLCBfc3BpbWcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy/ms6jlhozlm77pm4Yo5a+55bqU55qE6LS05Zu+5Lya6Ieq5Yqo5rOo5YaM5YiwdGV4dHVyZU1nciks5Zu+6ZuG5L2/55So5LiA5Liq5oyH5a6a55qE5ZCN5a2X77yM5L2g5rOo5YaM57uZ5LuW5ZWl5ZCN5a2X77yM5ZCO6Z2i5bCx55So6L+Z5Liq5ZCN5a2X5Y675L2/55SoXG4gICAgICAgICAgICBsaWdodHRvb2wuYXRsYXNNZ3IuSW5zdGFuY2UoKS5yZWcoXCIyXCIsIFwiYXRsYXMvMi5qc29uLnR4dD9cIiArIE1hdGguUmFuZG9tKCksIFwidGV4LzIucG5nXCIsIFwiP1wiICsgTWF0aC5SYW5kb20oKSk7XG5cblxuICAgICAgICAgICAgdmFyIGltZzIgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpO1xuICAgICAgICAgICAgaW1nMi5TcmMgPSBcInRleC8xLnBuZz9cIiArIE1hdGguUmFuZG9tKCk7XG4gICAgICAgICAgICBpbWcyLk9uTG9hZCA9IChlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBfc3BpbWcyID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nMiwgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCJ0ZXgvMS5wbmdcIiwgX3NwaW1nMik7XG5cbiAgICAgICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQoXCJhdGxhcy8xLmpzb24udHh0P1wiICsgTWF0aC5SYW5kb20oKSwgKEFjdGlvbjxzdHJpbmcsQnJpZGdlLkVycm9yPikoKHR4dCwgZXJyKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hdGxhcyA9IGxpZ2h0dG9vbC5zcHJpdGVBdGxhcy5mcm9tUmF3KHdlYmdsLCB0eHQsIF9zcGltZzIpO1xuICAgICAgICAgICAgICAgICAgICBsaWdodHRvb2wuYXRsYXNNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCIxXCIsIF9hdGxhcyk7XG4gICAgICAgICAgICAgICAgfVxuKSAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8v5rOo5YaM5a2X5L2TKOWvueW6lOeahOi0tOWbvuS8muiHquWKqOazqOWGjOWIsHRleHR1cmVNZ3IpLOWtl+S9k+S9v+eUqOS4gOS4quaMh+WumueahOWQjeWtl++8jOS9oOazqOWGjOe7meS7luWVpeWQjeWtl++8jOWQjumdouWwseeUqOi/meS4quWQjeWtl+WOu+S9v+eUqFxuICAgICAgICAgICAgLy9saWdodHRvb2wuZm9udE1nci5JbnN0YW5jZSgpLnJlZyhcImYxXCIsIFwiZm9udC9TVFhJTkdLQS5mb250Lmpzb24udHh0XCIsIFwidGV4L1NUWElOR0tBLmZvbnQucG5nXCIsIFwiXCIpO1xuICAgICAgICAgICAgdmFyIGltZzMgPSBuZXcgSFRNTEltYWdlRWxlbWVudCgpO1xuICAgICAgICAgICAgaW1nMy5TcmMgPSBcInRleC9TVFhJTkdLQS5mb250LnBuZz9cIiArIE1hdGguUmFuZG9tKCk7XG4gICAgICAgICAgICBpbWczLk9uTG9hZCA9IChlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBfc3BpbWczID0gbGlnaHR0b29sLnNwcml0ZVRleHR1cmUuZnJvbVJhdyh3ZWJnbCwgaW1nMywgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuUkdCQSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLnRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWdEaXJlY3QoXCJ0ZXgvU1RYSU5HS0EuZm9udC5wbmdcIiwgX3NwaW1nMyk7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLmxvYWRUb29sLmxvYWRUZXh0KFwiZm9udC9TVFhJTkdLQS5mb250Lmpzb24udHh0XCIsIChBY3Rpb248c3RyaW5nLEJyaWRnZS5FcnJvcj4pKCh0eHQsIGVycikgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZm9udCA9IGxpZ2h0dG9vbC5zcHJpdGVGb250LmZyb21SYXcod2ViZ2wsIHR4dCwgX3NwaW1nMyk7XG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5mb250TWdyLkluc3RhbmNlKCkucmVnRGlyZWN0KFwiZjFcIiwgX2ZvbnQpO1xuICAgICAgICAgICAgICAgIH1cbikgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgY2xhc3MgTXlDYW52YXNBY3Rpb24gOiBsaWdodHRvb2wuY2FudmFzQWN0aW9uXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5zcHJpdGVSZWN0IHRyZWN0ID0gbmV3IHNwcml0ZVJlY3QoKTtcbiAgICAgICAgICAgIExpc3Q8c3RyaW5nPiBzcHJpdGVuYW1lcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcbiAgICAgICAgICAgIGZsb2F0IHRpbWVyID0gMDtcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5zcHJpdGVSZWN0IHRyZWN0QnRuID0gbmV3IGxpZ2h0dG9vbC5zcHJpdGVSZWN0KDUwLCAxNTAsIDIwMCwgNTApO1xuICAgICAgICAgICAgYm9vbCBidG5kb3duID0gZmFsc2U7XG4gICAgICAgICAgICBzdHJpbmcgc2hvd3R4dCA9IFwiXCI7XG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBvbmRyYXcoc3ByaXRlQ2FudmFzIGMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciArPSAwLjAxNWY7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXIgPiAyLjBmKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyIC09IDIuMGY7XG4gICAgICAgICAgICAgICAgLy9nZXQgYWxsIHNwcml0ZSBpbiBhdGxhcyB3aG8gbmFtZWQgXCIxXCJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcHJpdGVuYW1lcy5Db3VudCA9PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0bGFzID0gbGlnaHR0b29sLmF0bGFzTWdyLkluc3RhbmNlKCkubG9hZChjLndlYmdsLCBcIjFcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdGxhcyAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaW5hbWUgaW4gYXRsYXMuc3ByaXRlcy5LZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlbmFtZXMuQWRkKGluYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0IGZvciBkcmF3ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9yICh2YXIgY2MgPSAwOyBjYyA8IDEwOyBjYysrKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmNkRHJhd2VyLnB1c2gobmV3IGNvb2xEb3duRHJhd2VyKGF0bGFzLCB0aGlzLnNwcml0ZW5hbWVzW2NjXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5jZERyYXdlcltjY10uc2V0RGVzdFJlY3QobmV3IGxpZ2h0dG9vbC5zcHJpdGVSZWN0KDUwICogY2MsIDUwLCA1MCwgNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBsaWdodHRvb2wudGV4dHVyZU1nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCJ0ZXgvMS5qcGdcIik7XG4gICAgICAgICAgICAgICAgaWYgKHQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjLmRyYXdUZXh0dXJlKHQsIHRoaXMudHJlY3QsIGxpZ2h0dG9vbC5zcHJpdGVSZWN0Lm9uZSwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAxLjBmKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGF0bGFzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ByaXRlbmFtZXMuQ291bnQgPiAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNwcml0ZUJhdGNoZXIuYmVnaW5kcmF3KHRoaXMuYXRsYXMubWF0KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IChmbG9hdClNYXRoLlJhbmRvbSgpICogNTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSAoZmxvYXQpTWF0aC5SYW5kb20oKSAqIDUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaSA9IChpbnQpKE1hdGguUmFuZG9tKCkgKiB0aGlzLnNwcml0ZW5hbWVzLkNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYW52YXMg5YGa5rOVXG4gICAgICAgICAgICAgICAgICAgICAgICBjLmRyYXdTcHJpdGUoXCIxXCIsIHRoaXMuc3ByaXRlbmFtZXNbc2ldLCB0aGlzLnRyZWN0KTsgLy/nrYnlkIzkuo7kuIvpnaLnmoTkuKTooYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBhdGxhcyA9IGxpZ2h0dG9vbC5hdGxhc01nci5JbnN0YW5jZSgpLmxvYWQoYy53ZWJnbCwgXCIxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYXRsYXMuZHJhdyhjLnNwcml0ZUJhdGNoZXIsIHRoaXMuc3ByaXRlbmFtZXNbc2ldLCB0aGlzLnRyZWN0LCB0aGlzLndoaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGZvbnTvvIjlupXlsYLmlrnms5XvvIlcbiAgICAgICAgICAgICAgICB2YXIgZm9udCA9IGxpZ2h0dG9vbC5mb250TWdyLkluc3RhbmNlKCkubG9hZChjLndlYmdsLCBcImYxXCIpO1xuICAgICAgICAgICAgICAgIGlmIChmb250ICE9IG51bGwgJiYgZm9udC5jbWFwICE9IG51bGwpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDUwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgZm9udC5kcmF3Q2hhcihjLnNwcml0ZUJhdGNoZXIsIFwi5Y+kXCIsIHRoaXMudHJlY3QsIGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSwgbGlnaHR0b29sLnNwcml0ZUNvbG9yLmdyYXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDUwO1xuICAgICAgICAgICAgICAgICAgICBmb250LmRyYXdDaGFyKGMuc3ByaXRlQmF0Y2hlciwgXCLogIFcIiwgdGhpcy50cmVjdCwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigwLjFmLCAwLjhmLCAwLjJmLCAwLjhmKSwgbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAwKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3Zm9udCBjYW52YXMg5pa55rOVXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gNTA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gMTUwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IDIwMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LmggPSA1MDtcbiAgICAgICAgICAgICAgICBpZiAodCAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjLmRyYXdUZXh0dXJlKHQsIHRoaXMudHJlY3RCdG4sIGxpZ2h0dG9vbC5zcHJpdGVSZWN0Lm9uZSwgdGhpcy5idG5kb3duID8gbGlnaHR0b29sLnNwcml0ZUNvbG9yLndoaXRlIDogbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAxLCAxLCAwLjVmKSk7XG4gICAgICAgICAgICAgICAgYy5kcmF3VGV4dChcImYxXCIsIFwidGhpcyBpcyBCdG5cIiwgdGhpcy50cmVjdEJ0biwgdGhpcy5idG5kb3duID8gbmV3IGxpZ2h0dG9vbC5zcHJpdGVDb2xvcigxLCAwLCAwLCAxKSA6IGxpZ2h0dG9vbC5zcHJpdGVDb2xvci53aGl0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gNTAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IDI1O1xuICAgICAgICAgICAgICAgIGMuZHJhd1RleHQoXCJmMVwiLCB0aGlzLnNob3d0eHQsIHRoaXMudHJlY3QpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIGJvb2wgb25wb2ludGV2ZW50KHNwcml0ZUNhbnZhcyBjLCBjYW52YXNwb2ludGV2ZW50IGUsIGZsb2F0IHgsIGZsb2F0IHkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYm9vbCBza2lwZXZlbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3R4dCA9IFwicG9pbnQ9ICAgXCIgKyB4ICsgXCIgfCx8IFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoeCA+IHRoaXMudHJlY3RCdG4ueCAmJiB5ID4gdGhpcy50cmVjdEJ0bi55ICYmIHggPCAodGhpcy50cmVjdEJ0bi54ICsgdGhpcy50cmVjdEJ0bi53KVxuICAgICAgICAgICAgICAgICAgICAmJiB5IDwgKHRoaXMudHJlY3RCdG4ueSArIHRoaXMudHJlY3RCdG4uaCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNraXBldmVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVibGljIHZvaWQgb25yZXNpemUoc3ByaXRlQ2FudmFzIGMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwNCiAgICAidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBicmlkZ2V3ZWIuaHR0cFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgaHR0cF90b29sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgSGV4MlN0cihieXRlW10gZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZyBzdHJvdXQgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPGRhdGEuTGVuZ3RoO2krKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3Ryb3V0ICs9IGRhdGFbaV0uVG9TdHJpbmcoXCJYMDJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN0cm91dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGFzeW5jIHN0YXRpYyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2s8c3RyaW5nPiBodHRwUG9zdChzdHJpbmcgdXJsLHN0cmluZyB1c2VybmFtZSxzdHJpbmcgdG9rZW4sRmlsZSBmaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LlhNTEh0dHBSZXF1ZXN0IF9odHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIF9odHRwLk9wZW4oXCJwb3N0XCIsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHN0cmluZyByZXR1cm52ID0gXCJcIjtcclxuICAgICAgICAgICAgX2h0dHAuT25SZWFkeVN0YXRlQ2hhbmdlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9odHRwLlJlYWR5U3RhdGUgPT0gQWpheFJlYWR5U3RhdGUuRG9uZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm52ID0gX2h0dHAuUmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBGb3JtRGF0YSBmb3JtZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICBmb3JtZGF0YS5BcHBlbmQoZmlsZS5OYW1lLCBmaWxlKTtcclxuICAgICAgICAgICAgZm9ybWRhdGEuQXBwZW5kKFwidXNlclwiLCB1c2VybmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm1kYXRhLkFwcGVuZChcInRva2VuXCIsIHRva2VuKTtcclxuICAgICAgICAgICAgX2h0dHAuU2VuZChmb3JtZGF0YSk7XHJcbiAgICAgICAgICAgIHdoaWxlIChfaHR0cC5SZWFkeVN0YXRlICE9IEFqYXhSZWFkeVN0YXRlLkRvbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IFN5c3RlbS5UaHJlYWRpbmcuVGFza3MuVGFzay5EZWxheSgxMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm52O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYXN5bmMgc3RhdGljIFN5c3RlbS5UaHJlYWRpbmcuVGFza3MuVGFzazxzdHJpbmc+IGh0dHBHZXQoc3RyaW5nIHVybClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5YTUxIdHRwUmVxdWVzdCBfaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBfaHR0cC5PcGVuKFwiZ2V0XCIsIHVybCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgcmV0dXJudiA9IFwiXCI7XHJcbiAgICAgICAgICAgIF9odHRwLk9uUmVhZHlTdGF0ZUNoYW5nZSA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaHR0cC5SZWFkeVN0YXRlID09IEFqYXhSZWFkeVN0YXRlLkRvbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJudiA9IF9odHRwLlJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgX2h0dHAuU2VuZCgpO1xyXG4gICAgICAgICAgICB3aGlsZSAoX2h0dHAuUmVhZHlTdGF0ZSAhPSBBamF4UmVhZHlTdGF0ZS5Eb25lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2suRGVsYXkoMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJudjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGFzeW5jIHN0YXRpYyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzLlRhc2s8c3RyaW5nPiBodHRwSnNvblJQQyhzdHJpbmcgdXJsLHN0cmluZyBtZXRob2QsT2JqZWN0IEpzb25BcnJheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfdXJsID0gdXJsKyBcIj9qc29ucnBjPTIuMCZpZD0xJm1ldGhvZD1cIittZXRob2QgK1wiJnBhcmFtcz1cIiArIEpTT04uU3RyaW5naWZ5KEpzb25BcnJheSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBodHRwR2V0KF91cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsDQogICAgInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBPTElPLkNyeXB0b2dyYXBoeVxyXG57XHJcbiAgICBjbGFzcyBTaGEyNTZcclxuICAgIHtcclxuICAgICAgICAvLyBjb25zdGFudHMgW8KnNC4yLjJdXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdWludFtdIEsgPSB7XHJcbiAgICAgICAgICAgIDB4NDI4YTJmOTgsIDB4NzEzNzQ0OTEsIDMwNDkzMjM0NzFVLCAzOTIxMDA5NTczVSwgOTYxOTg3MTYzLCAweDU5ZjExMWYxLCAweDkyM2Y4MmE0LCAyODcwNzYzMjIxVSxcclxuICAgICAgICAgICAgMHhkODA3YWE5OCwgMzEwNTk4NDAxLCA2MDcyMjUyNzgsIDB4NTUwYzdkYzMsIDE5MjUwNzgzODgsIDIxNjIwNzgyMDZVLCAyNjE0ODg4MTAzVSwgMzI0ODIyMjU4MFUsXHJcbjM4MzUzOTA0MDFVLCA0MDIyMjI0Nzc0VSwgMHgwZmMxOWRjNiwgMHgyNDBjYTFjYywgMHgyZGU5MmM2ZiwgMHg0YTc0ODRhYSwgMTU1NTA4MTY5MiwgMHg3NmY5ODhkYSxcclxuICAgICAgICAgICAgMHg5ODNlNTE1MiwgMHhhODMxYzY2ZCwgMjk1Mjk5NjgwOFUsIDMyMTAzMTM2NzFVLCAzMzM2NTcxODkxVSwgMHhkNWE3OTE0NywgMHgwNmNhNjM1MSwgMHgxNDI5Mjk2NyxcclxuNjY2MzA3MjA1LCA3NzM1Mjk5MTIsIDB4NGQyYzZkZmMsIDB4NTMzODBkMTMsIDB4NjUwYTczNTQsIDE5ODY2NjEwNTEsIDB4ODFjMmM5MmUsIDB4OTI3MjJjODUsXHJcbjI3MzA0ODU5MjFVLCAyODIwMzAyNDExVSwgMzI1OTczMDgwMFUsIDB4Yzc2YzUxYTMsIDB4ZDE5MmU4MTksIDB4ZDY5OTA2MjQsIDB4ZjQwZTM1ODUsIDB4MTA2YWEwNzAsXHJcbiAgICAgICAgICAgIDB4MTlhNGMxMTYsIDB4MWUzNzZjMDgsIDB4Mjc0ODc3NGMsIDg4Mzk5Nzg3NywgOTU4MTM5NTcxLCAweDRlZDhhYTRhLCAxNTM3MDAyMDYzLCAweDY4MmU2ZmYzLFxyXG4gICAgICAgICAgICAweDc0OGY4MmVlLCAweDc4YTU2MzZmLCAweDg0Yzg3ODE0LCAweDhjYzcwMjA4LCAyNDI4NDM2NDc0VSwgMjc1NjczNDE4N1UsIDMyMDQwMzE0NzlVLCAweGM2NzE3OGYyIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYnl0ZVtdIGNvbXB1dGVIYXNoKGJ5dGVbXSBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gaW5pdGlhbCBoYXNoIHZhbHVlIFvCpzUuMy4xXVxyXG4gICAgICAgICAgICB1aW50W10gSCA9IG5ldyB1aW50W10ge1xyXG4gICAgICAgICAgICAgICAgMHg2YTA5ZTY2NywgMzE0NDEzNDI3N1UsIDB4M2M2ZWYzNzIsIDB4YTU0ZmY1M2EsIDB4NTEwZTUyN2YsIDI2MDA4MjI5MjRVLCA1Mjg3MzQ2MzUsIDE1NDE0NTkyMjV9O1xyXG5cclxuICAgICAgICAgICAgLy8gUFJFUFJPQ0VTU0lORyBcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgZGF0YSBpbnRvIDUxMi1iaXQvMTYtaW50ZWdlciBibG9ja3MgYXJyYXlzIG9mIGludHMgW8KnNS4yLjFdXHJcbiAgICAgICAgICAgIHZhciBsID0gZGF0YS5MZW5ndGggLyA0ICsgMjsgLy8gbGVuZ3RoIChpbiAzMi1iaXQgaW50ZWdlcnMpIG9mIGRhdGEgKyDigJgx4oCZICsgYXBwZW5kZWQgbGVuZ3RoXHJcbiAgICAgICAgICAgIHZhciBOID0gKGludClNYXRoLkNlaWxpbmcobCAvIDE2LjApOyAgLy8gbnVtYmVyIG9mIDE2LWludGVnZXItYmxvY2tzIHJlcXVpcmVkIHRvIGhvbGQgJ2wnIGludHNcclxuICAgICAgICAgICAgVUludDMyW11bXSBNID0gbmV3IFVJbnQzMltOXVtdO1xyXG4gICAgICAgICAgICAvL2xldCB2aWV3ID0gVWludDhBcnJheS5mcm9tQXJyYXlCdWZmZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIHZhciB2aWV3ID0gZGF0YTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1baV0gPSBuZXcgVUludDMyWzE2XTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7IGorKykgIC8vIGVuY29kZSA0IGNoYXJzIHBlciBpbnRlZ2VyLCBiaWctZW5kaWFuIGVuY29kaW5nXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9NW2ldW2pdICAodWludCkoXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYxID0gaSAqIDY0ICsgaiAqIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZ2MSA9IHYxIDwgdmlldy5MZW5ndGggPyB2aWV3W3YxXSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYyID0gaSAqIDY0ICsgaiAqIDQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2djIgPSB2MiA8IHZpZXcuTGVuZ3RoID8gdmlld1t2Ml0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2MyA9IGkgKiA2NCArIGogKiA0ICsgMjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdnYzID0gdjMgPCB2aWV3Lkxlbmd0aCA/IHZpZXdbdjNdIDogMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdjQgPSBpICogNjQgKyBqICogNCArIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZ2NCA9IHY0IDwgdmlldy5MZW5ndGggPyB2aWV3W3Y0XSA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1baV1bal0gPSh1aW50KSggdnYxIDw8IDI0IHwgdnYyIDw8IDE2IHwgdnYzIDw8IDggfCB2djQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyh2aWV3W2kgKiA2NCArIGogKiA0XSA8PCAyNCkgfCAodmlld1tpICogNjQgKyBqICogNCArIDFdIDw8IDE2KSB8XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgKHZpZXdbaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4KSB8ICh2aWV3W2kgKiA2NCArIGogKiA0ICsgM10pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IC8vIG5vdGUgcnVubmluZyBvZmYgdGhlIGVuZCBvZiBkYXRhIGlzIG9rICdjb3MgYml0d2lzZSBvcHMgb24gTmFOIHJldHVybiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYWRkIHRyYWlsaW5nICcxJyBiaXQgKCsgMCdzIHBhZGRpbmcpIHRvIHN0cmluZyBbwqc1LjEuMV1cclxuICAgICAgICAgICAgTVsodWludClNYXRoLkZsb29yKGRhdGEuTGVuZ3RoIC8gNCAvIDE2LjApXVsodWludClNYXRoLkZsb29yKGRhdGEuTGVuZ3RoIC8gNC4wKSAlIDE2XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodWludCkoMHg4MCA8PCAoKDMgLSBkYXRhLkxlbmd0aCAlIDQpICogOCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIGxlbmd0aCAoaW4gYml0cykgaW50byBmaW5hbCBwYWlyIG9mIDMyLWJpdCBpbnRlZ2VycyAoYmlnLWVuZGlhbikgW8KnNS4xLjFdXHJcbiAgICAgICAgICAgIC8vIG5vdGU6IG1vc3Qgc2lnbmlmaWNhbnQgd29yZCB3b3VsZCBiZSAobGVuLTEpKjggPj4+IDMyLCBidXQgc2luY2UgSlMgY29udmVydHNcclxuICAgICAgICAgICAgLy8gYml0d2lzZS1vcCBhcmdzIHRvIDMyIGJpdHMsIHdlIG5lZWQgdG8gc2ltdWxhdGUgdGhpcyBieSBhcml0aG1ldGljIG9wZXJhdG9yc1xyXG4gICAgICAgICAgICBNW04gLSAxXVsxNF0gPSAodWludCkoKGRhdGEuTGVuZ3RoICogOCkgLyBNYXRoLlBvdygyLCAzMikpO1xyXG4gICAgICAgICAgICBNW04gLSAxXVsxNV0gPSAodWludCkoKGRhdGEuTGVuZ3RoICogOCkgJiAweGZmZmZmZmZmKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBIQVNIIENPTVBVVEFUSU9OIFvCpzYuMS4yXVxyXG5cclxuICAgICAgICAgICAgdmFyIFcgPSBuZXcgVUludDMyWzY0XTtcclxuICAgICAgICAgICAgVUludDMyIGEsIGIsIGMsIGQsIGUsIGYsIGcsIGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gMSAtIHByZXBhcmUgbWVzc2FnZSBzY2hlZHVsZSAnVydcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7IHQrKykgV1t0XSA9IE1baV1bdF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0ID0gMTY7IHQgPCA2NDsgdCsrKSBXW3RdID0gKFNoYTI1Ni7PgzEoV1t0IC0gMl0pICsgV1t0IC0gN10gKyBTaGEyNTYuz4MwKFdbdCAtIDE1XSkgKyBXW3QgLSAxNl0pICYgMHhmZmZmZmZmZjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAyIC0gaW5pdGlhbGlzZSB3b3JraW5nIHZhcmlhYmxlcyBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoIHdpdGggcHJldmlvdXMgaGFzaCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgYSA9IEhbMF07IGIgPSBIWzFdOyBjID0gSFsyXTsgZCA9IEhbM107IGUgPSBIWzRdOyBmID0gSFs1XTsgZyA9IEhbNl07IGggPSBIWzddO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDMgLSBtYWluIGxvb3AgKG5vdGUgJ2FkZGl0aW9uIG1vZHVsbyAyXjMyJylcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgNjQ7IHQrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgVDEgPSBoICsgU2hhMjU2Ls6jMShlKSArIFNoYTI1Ni5DaChlLCBmLCBnKSArIFNoYTI1Ni5LW3RdICsgV1t0XTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgVDIgPSBTaGEyNTYuzqMwKGEpICsgU2hhMjU2Lk1haihhLCBiLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICBoID0gZztcclxuICAgICAgICAgICAgICAgICAgICBnID0gZjtcclxuICAgICAgICAgICAgICAgICAgICBmID0gZTtcclxuICAgICAgICAgICAgICAgICAgICBlID0gKGQgKyBUMSkgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgICAgIGQgPSBjO1xyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBiO1xyXG4gICAgICAgICAgICAgICAgICAgIGIgPSBhO1xyXG4gICAgICAgICAgICAgICAgICAgIGEgPSAoVDEgKyBUMikgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gNCAtIGNvbXB1dGUgdGhlIG5ldyBpbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZSAobm90ZSAnYWRkaXRpb24gbW9kdWxvIDJeMzInKVxyXG4gICAgICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgSFs0XSA9IChIWzRdICsgZSkgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgSFs1XSA9IChIWzVdICsgZikgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgSFs2XSA9IChIWzZdICsgZykgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgSFs3XSA9IChIWzddICsgaCkgJiAweGZmZmZmZmZmO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IGJ5dGVbMzJdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEguTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpICogNCArIDBdID0gKGJ5dGUpKChIW2ldID4+ICgzICogOCkpICYgMHhmZik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaSAqIDQgKyAxXSA9IChieXRlKSgoSFtpXSA+PiAoMiAqIDgpKSAmIDB4ZmYpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2kgKiA0ICsgMl0gPSAoYnl0ZSkoKEhbaV0gPj4gKDEgKiA4KSkgJiAweGZmKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpICogNCArIDNdID0gKGJ5dGUpKChIW2ldID4+ICgwICogOCkpICYgMHhmZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJvdGF0ZXMgcmlnaHQgKGNpcmN1bGFyIHJpZ2h0IHNoaWZ0KSB2YWx1ZSB4IGJ5IG4gcG9zaXRpb25zIFvCpzMuMi40XS5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB1aW50IFJPVFIoaW50IG4sIHVpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoeCA+PiBuKSB8ICh4IDw8ICgzMiAtIG4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIExvZ2ljYWwgZnVuY3Rpb25zIFvCpzQuMS4yXS5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB1aW50IM6jMCh1aW50IHgpIHsgcmV0dXJuIFNoYTI1Ni5ST1RSKDIsIHgpIF4gU2hhMjU2LlJPVFIoMTMsIHgpIF4gU2hhMjU2LlJPVFIoMjIsIHgpOyB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdWludCDOozEodWludCB4KSB7IHJldHVybiBTaGEyNTYuUk9UUig2LCB4KSBeIFNoYTI1Ni5ST1RSKDExLCB4KSBeIFNoYTI1Ni5ST1RSKDI1LCB4KTsgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHVpbnQgz4MwKHVpbnQgeCkgeyByZXR1cm4gU2hhMjU2LlJPVFIoNywgeCkgXiBTaGEyNTYuUk9UUigxOCwgeCkgXiAoeCA+PiAzKTsgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHVpbnQgz4MxKHVpbnQgeCkgeyByZXR1cm4gU2hhMjU2LlJPVFIoMTcsIHgpIF4gU2hhMjU2LlJPVFIoMTksIHgpIF4gKHggPj4gMTApOyB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdWludCBDaCh1aW50IHgsIHVpbnQgeSwgdWludCB6KSB7IHJldHVybiAoeCAmIHkpIF4gKH54ICYgeik7IH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB1aW50IE1haih1aW50IHgsIHVpbnQgeSwgdWludCB6KSB7IHJldHVybiAoeCAmIHkpIF4gKHggJiB6KSBeICh5ICYgeik7IH1cclxuICAgIH1cclxufVxyXG5cclxuIg0KICBdDQp9
