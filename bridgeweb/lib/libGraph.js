/**
 * @compiler Bridge.NET 17.7.0
 */
Bridge.assembly("libGraph", function ($asm, globals) {
    "use strict";

    Bridge.define("lighttool.atlasMgr", {
        statics: {
            fields: {
                g_this: null
            },
            methods: {
                Instance: function () {
                    if (lighttool.atlasMgr.g_this == null) {
                        lighttool.atlasMgr.g_this = new lighttool.atlasMgr();
                    }

                    return lighttool.atlasMgr.g_this;
                }
            }
        },
        fields: {
            mapInfo: null
        },
        ctors: {
            init: function () {
                this.mapInfo = new (System.Collections.Generic.Dictionary$2(System.String,lighttool.atlasMgrItem)).ctor();
            }
        },
        methods: {
            reg: function (name, urlatlas, urlatalstex, urlatalstex_add) {
                if (this.mapInfo.containsKey(name)) {
                    throw new System.Exception("you can't reg the same name");
                }
                var item = new lighttool.atlasMgrItem();

                this.mapInfo.setItem(name, item);
                item.url = urlatlas;
                item.urlatalstex = urlatalstex;
                item.urlatalstex_add = urlatalstex_add;
            },
            unreg: function (name, disposetex) {
                var item = this.mapInfo.getItem(name);
                if (Bridge.referenceEquals(item, undefined)) {
                    return;
                }
                this.unload(name, disposetex);

                this.mapInfo.remove(name);

            },
            regDirect: function (name, atlas) {
                if (this.mapInfo.containsKey(name)) {
                    throw new System.Exception("you can't reg the same name");
                }
                var item = new lighttool.atlasMgrItem();

                this.mapInfo.setItem(name, item);
                item.atals = atlas;
            },
            unload: function (name, disposetex) {
                if (this.mapInfo.containsKey(name) === false) {
                    return;
                }
                var item = this.mapInfo.getItem(name);

                if (disposetex) {
                    item.atals.texture.dispose();
                    item.atals.texture = null;
                }
                item.atals = null;
            },
            load: function (webgl, name) {
                if (this.mapInfo.containsKey(name) === false) {
                    return null;
                }
                var item = this.mapInfo.getItem(name);
                if (item.atals == null) {
                    var tex = lighttool.textureMgr.Instance().load(webgl, item.urlatalstex);
                    if (Bridge.referenceEquals(tex, undefined)) {
                        lighttool.textureMgr.Instance().reg(item.urlatalstex, item.urlatalstex_add, lighttool.textureformat.RGBA, false, true);

                        tex = lighttool.textureMgr.Instance().load(webgl, item.urlatalstex);
                    }
                    item.atals = new lighttool.spriteAtlas(webgl, item.url, tex);
                }
                return item.atals;

            }
        }
    });

    Bridge.define("lighttool.atlasMgrItem", {
        fields: {
            atals: null,
            url: null,
            urlatalstex: null,
            urlatalstex_add: null
        }
    });

    Bridge.define("lighttool.canvasAction", {
        $kind: "interface"
    });

    Bridge.define("lighttool.canvaspointevent", {
        $kind: "enum",
        statics: {
            fields: {
                NONE: 0,
                POINT_DOWN: 1,
                POINT_UP: 2,
                POINT_MOVE: 3
            }
        }
    });

    Bridge.define("lighttool.charinfo", {
        fields: {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            xSize: 0,
            ySize: 0,
            xOffset: 0,
            yOffset: 0,
            xAddvance: 0
        }
    });

    Bridge.define("lighttool.fontMgr", {
        statics: {
            fields: {
                g_this: null
            },
            methods: {
                Instance: function () {
                    if (lighttool.fontMgr.g_this == null) {
                        lighttool.fontMgr.g_this = new lighttool.fontMgr();
                    }

                    return lighttool.fontMgr.g_this;
                }
            }
        },
        fields: {
            mapInfo: null
        },
        ctors: {
            init: function () {
                this.mapInfo = new (System.Collections.Generic.Dictionary$2(System.String,lighttool.fontMgrItem)).ctor();
            }
        },
        methods: {
            reg: function (name, urlfont, urlatalstex, urlatalstex_add) {
                var item = this.mapInfo.getItem(name);
                if (!Bridge.referenceEquals(item, undefined)) {
                    throw new System.Exception("you can't reg the same name");
                }
                item = new lighttool.fontMgrItem();

                this.mapInfo.setItem(name, item);
                item.url = urlfont;
                item.urlatalstex = urlatalstex;
                item.urlatalstex_add = urlatalstex_add;
            },
            regDirect: function (name, font) {
                if (this.mapInfo.containsKey(name)) {
                    throw new System.Exception("you can't reg the same name");
                }
                var item = new lighttool.fontMgrItem();

                this.mapInfo.setItem(name, item);
                item.font = font;
            },
            unreg: function (name, disposetex) {
                if (this.mapInfo.containsKey(name) === false) {
                    return;
                }
                var item = this.mapInfo.getItem(name);
                this.unload(name, disposetex);

                this.mapInfo.remove(name);

            },
            unload: function (name, disposetex) {
                if (this.mapInfo.containsKey(name) === false) {
                    return;
                }

                var item = this.mapInfo.getItem(name);

                if (disposetex) {
                    item.font.texture.dispose();
                    item.font.texture = null;
                }
                item.font = null;
            },
            load: function (webgl, name) {
                if (this.mapInfo.containsKey(name) === false) {
                    return null;
                }

                var item = this.mapInfo.getItem(name);
                if (item.font == null) {
                    var tex = lighttool.textureMgr.Instance().load(webgl, item.urlatalstex);
                    if (Bridge.referenceEquals(tex, undefined)) {
                        lighttool.textureMgr.Instance().reg(item.urlatalstex, item.urlatalstex_add, lighttool.textureformat.GRAY, false, true);

                        tex = lighttool.textureMgr.Instance().load(webgl, item.urlatalstex);
                    }
                    item.font = new lighttool.spriteFont(webgl, item.url, tex);
                }
                return item.font;

            }
        }
    });

    Bridge.define("lighttool.fontMgrItem", {
        fields: {
            font: null,
            url: null,
            urlatalstex: null,
            urlatalstex_add: null
        }
    });

    Bridge.define("lighttool.loadTool", {
        statics: {
            methods: {
                loadText: function (url, fun) {
                    var req = new XMLHttpRequest();
                    req.open("GET", url);
                    req.onreadystatechange = function () {
                        if (req.readyState === 4) {
                            fun(req.responseText, null);
                        }
                    };
                    req.onerror = function (e) {
                        var err = new Error();
                        err.Message = "onerr in req:";
                        fun(null, err);
                    };
                    req.send();
                },
                loadArrayBuffer: function (url, fun) {
                    var req = new XMLHttpRequest();

                    req.open("GET", url);
                    req.responseType = "arraybuffer";
                    req.onreadystatechange = function () {
                        if (req.readyState === 4) {
                            fun(Bridge.as(req.response, ArrayBuffer), null);
                        }
                    };
                    req.onerror = function (e) {
                        var err = new Error();
                        err.Message = "onerr in req:";
                        fun(null, err);
                    };
                    req.send();
                },
                loadBlob: function (url, fun) {
                    var req = new XMLHttpRequest();

                    req.open("GET", url);
                    req.responseType = "blob";
                    req.onreadystatechange = function () {
                        if (req.readyState === 4) {
                            fun(Bridge.as(req.response, Blob), null);
                        }
                    };
                    req.onerror = function (e) {
                        var err = new Error();
                        err.Message = "onerr in req:";
                        fun(null, err);
                    };
                    req.send();
                }
            }
        }
    });

    Bridge.define("lighttool.Native.canvasAdapter", {
        statics: {
            methods: {
                CreateScreenCanvas: function (webgl, useraction) {
                    var el = webgl.canvas;
                    el.width = el.clientWidth;
                    el.height = el.clientHeight;

                    var c = new lighttool.spriteCanvas(webgl, webgl.drawingBufferWidth, webgl.drawingBufferHeight);
                    c.spriteBatcher.matrix = new Float32Array(System.Array.init([2.0 / c.width, 0, 0, 0, 0, -2 / c.height, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1], System.Single));
                    c.spriteBatcher.ztest = false;

                    var ua = useraction;
                    window.setInterval(function () {
                        webgl.viewport(0, 0, webgl.drawingBufferWidth, webgl.drawingBufferHeight);
                        webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
                        webgl.clearColor(1.0, 0.0, 1.0, 1.0);

                        c.spriteBatcher.begindraw();

                        ua.lighttool$canvasAction$ondraw(c);

                        c.spriteBatcher.enddraw();

                        var _webgl = webgl;
                        _webgl.flush();

                    }, 20);
                    window.addEventListener("resize", function () {
                        var sel = webgl.canvas;
                        sel.width = sel.clientWidth;
                        sel.height = sel.clientHeight;
                        sel.width = sel.clientWidth;
                        sel.height = sel.clientHeight;

                        c.width = sel.width;
                        c.height = sel.height;
                        c.spriteBatcher.matrix = new Float32Array(System.Array.init([2.0 / c.width, 0, 0, 0, 0, -2.0 / c.height, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1], System.Single));
                        ua.lighttool$canvasAction$onresize(c);
                    });


                    el.onmousemove = function (ev) {
                        ua.lighttool$canvasAction$onpointevent(c, lighttool.canvaspointevent.POINT_MOVE, System.Nullable.getValue(Bridge.cast(Bridge.unbox(ev.offsetX, System.Single), System.Single)), System.Nullable.getValue(Bridge.cast(Bridge.unbox(ev.offsetY, System.Single), System.Single)));
                    };
                    el.onmouseup = function (ev) {
                        ua.lighttool$canvasAction$onpointevent(c, lighttool.canvaspointevent.POINT_UP, System.Nullable.getValue(Bridge.cast(Bridge.unbox(ev.offsetX, System.Single), System.Single)), System.Nullable.getValue(Bridge.cast(Bridge.unbox(ev.offsetY, System.Single), System.Single)));
                    };
                    el.onmousedown = function (ev) {
                        ua.lighttool$canvasAction$onpointevent(c, lighttool.canvaspointevent.POINT_DOWN, System.Nullable.getValue(Bridge.cast(Bridge.unbox(ev.offsetX, System.Single), System.Single)), System.Nullable.getValue(Bridge.cast(Bridge.unbox(ev.offsetY, System.Single), System.Single)));
                    };




                    return c;
                }
            }
        }
    });

    Bridge.define("lighttool.shadercode", {
        fields: {
            vscode: null,
            fscode: null,
            vs: null,
            fs: null,
            program: null,
            posPos: 0,
            posColor: 0,
            posColor2: 0,
            posUV: 0,
            uniMatrix: null,
            uniTex0: null,
            uniTex1: null,
            uniCol0: null,
            uniCol1: null
        },
        ctors: {
            init: function () {
                this.posPos = -1;
                this.posColor = -1;
                this.posColor2 = -1;
                this.posUV = -1;
            }
        },
        methods: {
            compile: function (webgl) {
                this.vs = webgl.createShader(webgl.VERTEX_SHADER);
                this.fs = webgl.createShader(webgl.FRAGMENT_SHADER);

                webgl.shaderSource(this.vs, this.vscode);
                webgl.compileShader(this.vs);
                var r1 = webgl.getShaderParameter(this.vs, webgl.COMPILE_STATUS);
                if (r1 === false) {
                    this.alert(webgl.getShaderInfoLog(this.vs));
                }
                webgl.shaderSource(this.fs, this.fscode);
                webgl.compileShader(this.fs);
                var r2 = webgl.getShaderParameter(this.fs, webgl.COMPILE_STATUS);
                if (r2 === false) {
                    this.alert(webgl.getShaderInfoLog(this.fs));
                }

                this.program = webgl.createProgram();

                webgl.attachShader(this.program, this.vs);
                webgl.attachShader(this.program, this.fs);

                webgl.linkProgram(this.program);
                var r3 = webgl.getProgramParameter(this.program, webgl.LINK_STATUS);
                if (r3 === false) {
                    this.alert(webgl.getProgramInfoLog(this.program));
                }


                this.posPos = webgl.getAttribLocation(this.program, "position");
                this.posColor = webgl.getAttribLocation(this.program, "color");
                this.posColor2 = webgl.getAttribLocation(this.program, "color2");

                this.posUV = webgl.getAttribLocation(this.program, "uv");

                this.uniMatrix = webgl.getUniformLocation(this.program, "matrix");
                this.uniTex0 = webgl.getUniformLocation(this.program, "tex0");
                this.uniTex1 = webgl.getUniformLocation(this.program, "tex1");
                this.uniCol0 = webgl.getUniformLocation(this.program, "col0");
                this.uniCol1 = webgl.getUniformLocation(this.program, "col1");


            },
            alert: function (p) {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("lighttool.shaderMgr", {
        statics: {
            fields: {
                g_shaderParser: null
            },
            methods: {
                parserInstance: function () {
                    if (lighttool.shaderMgr.g_shaderParser == null) {
                        lighttool.shaderMgr.g_shaderParser = new lighttool.shaderParser();
                    }
                    return lighttool.shaderMgr.g_shaderParser;
                }
            }
        }
    });

    Bridge.define("lighttool.shaderParser", {
        fields: {
            mapshader: null
        },
        ctors: {
            init: function () {
                this.mapshader = new (System.Collections.Generic.Dictionary$2(System.String,lighttool.shadercode)).ctor();
            }
        },
        methods: {
            _parser: function (txt) {
                var s1 = System.String.split(txt, System.Array.init(["<--"], System.String), null, 1);
                for (var i = 0; i < s1.length; i = (i + 1) | 0) {
                    var s2 = s1[System.Array.index(i, s1)].split("-->");
                    var stag = s2[System.Array.index(0, s2)].split(" ");
                    var sshader = s2[System.Array.index(1, s2)];
                    var lastname = "";
                    var lasttag = 0;

                    for (var j = 0; j < stag.length; j = (j + 1) | 0) {
                        var t = stag[System.Array.index(j, stag)];
                        if (t.length === 0) {
                            continue;
                        }
                        if (Bridge.referenceEquals(t, "vs")) {
                            lasttag = 1;
                        } else if (Bridge.referenceEquals(t, "fs")) {
                            lasttag = 2;
                        } else {
                            lastname = t.substr(1, ((t.length - 2) | 0));
                        }
                    }
                    if (lastname.length === 0) {
                        continue;
                    }
                    if (this.mapshader.containsKey(lastname) === false) {
                        this.mapshader.setItem(lastname, new lighttool.shadercode());
                    }
                    if (lasttag === 1) {
                        this.mapshader.getItem(lastname).vscode = sshader;
                    } else {
                        if (lasttag === 2) {
                            this.mapshader.getItem(lastname).fscode = sshader;
                        }
                    }

                }
            },
            parseUrl: function (webgl, url) {
                lighttool.loadTool.loadText(url, Bridge.fn.bind(this, function (txt, err) {
                    this._parser(txt);
                    this.compile(webgl);
                }));
            },
            parseDirect: function (webgl, txt) {
                this._parser(txt);
                this.compile(webgl);
            },
            dump: function () {
                var $t;
                $t = Bridge.getEnumerator(this.mapshader.Keys);
                try {
                    while ($t.moveNext()) {
                        var name = $t.Current;
                        System.Console.WriteLine("shadername:" + (name || ""));
                        System.Console.WriteLine("vs:" + (this.mapshader.getItem(name).vscode || ""));
                        System.Console.WriteLine("fs:" + (this.mapshader.getItem(name).fscode || ""));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

            },
            compile: function (webgl) {
                var $t;
                $t = Bridge.getEnumerator(this.mapshader.Keys);
                try {
                    while ($t.moveNext()) {
                        var name = $t.Current;
                        this.mapshader.getItem(name).compile(webgl);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });

    Bridge.define("lighttool.sprite", {
        fields: {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            xsize: 0,
            ysize: 0
        },
        methods: {
            ToRect: function () {
                return new lighttool.spriteRect.$ctor1(this.x, this.y, this.w, this.h);
            }
        }
    });

    Bridge.define("lighttool.spriteAtlas", {
        statics: {
            methods: {
                fromRaw: function (webgl, txt, texture) {
                    if (texture === void 0) { texture = null; }
                    var sa = new lighttool.spriteAtlas(webgl, null, texture);
                    sa._parse(txt);

                    return sa;
                }
            }
        },
        fields: {
            webgl: null,
            textureurl: null,
            texturewidth: 0,
            textureheight: 0,
            texture: null,
            sprites: null
        },
        ctors: {
            init: function () {
                this.sprites = new (System.Collections.Generic.Dictionary$2(System.String,lighttool.sprite)).ctor();
            },
            ctor: function (webgl, atlasurl, texture) {
                if (atlasurl === void 0) { atlasurl = null; }
                if (texture === void 0) { texture = null; }

                this.$initialize();
                this.webgl = webgl;
                if (atlasurl == null) {
                } else {
                    lighttool.loadTool.loadText(atlasurl, Bridge.fn.bind(this, function (txt, err) {
                        this._parse(txt);
                    }));
                }
                this.texture = texture;
            }
        },
        methods: {
            _parse: function (txt) {
                var json = JSON.parse(txt);
                this.textureurl = json.t;
                this.texturewidth = json.w;
                this.textureheight = json.h;
                var s = Bridge.cast(json.s, System.Array.type(System.Object));

                for (var i = 0; i < s.length; i = (i + 1) | 0) {
                    var ss = Bridge.cast(s[System.Array.index(i, s)], System.Array.type(System.Object));
                    var r = new lighttool.sprite();
                    r.x = (System.Nullable.getValue(Bridge.cast(Bridge.unbox(ss[System.Array.index(1, ss)], System.Single), System.Single)) + 0.5) / this.texturewidth;
                    r.y = (System.Nullable.getValue(Bridge.cast(Bridge.unbox(ss[System.Array.index(2, ss)], System.Single), System.Single)) + 0.5) / this.textureheight;
                    r.w = (System.Nullable.getValue(Bridge.cast(Bridge.unbox(ss[System.Array.index(3, ss)], System.Single), System.Single)) - 1.0) / this.texturewidth;
                    r.h = (System.Nullable.getValue(Bridge.cast(Bridge.unbox(ss[System.Array.index(4, ss)], System.Single), System.Single)) - 1.0) / this.textureheight;
                    r.xsize = System.Nullable.getValue(Bridge.cast(Bridge.unbox(ss[System.Array.index(3, ss)], System.Single), System.Single));
                    r.ysize = System.Nullable.getValue(Bridge.cast(Bridge.unbox(ss[System.Array.index(4, ss)], System.Single), System.Single));
                    this.sprites.setItem(Bridge.cast(ss[System.Array.index(0, ss)], System.String), r);
                }

            },
            drawByTexture: function (sb, sname, rect, c) {
                if (this.texture == null) {
                    return;
                }
                var r = this.sprites.getItem(sname);
                if (Bridge.referenceEquals(r, undefined)) {
                    return;
                }

                this.texture.draw(sb, r.ToRect(), rect.$clone(), c);
            }
        }
    });

    Bridge.define("lighttool.spriteBatcher", {
        fields: {
            webgl: null,
            shaderparser: null,
            vbo: null,
            matrix: null,
            ztest: false,
            recorder: null,
            shadercode: null,
            mat: null,
            array: null,
            dataseek: 0,
            rectClip: null
        },
        ctors: {
            init: function () {
                this.ztest = true;
                this.array = new Float32Array(13312);
                this.dataseek = 0;
            },
            ctor: function (webgl, shaderparser) {
                this.$initialize();
                this.webgl = webgl;
                this.shaderparser = shaderparser;
                this.vbo = webgl.createBuffer();
                var asp = (((Bridge.Int.div(this.webgl.drawingBufferWidth, this.webgl.drawingBufferHeight)) | 0));
                var array = System.Array.init([
                    1.0 / asp, 
                    0, 
                    0, 
                    0, 
                    0, 
                    1, 
                    0, 
                    0, 
                    0, 
                    0, 
                    1, 
                    0, 
                    0, 
                    0, 
                    0, 
                    1
                ], System.Single);
                this.matrix = new Float32Array(array);

                this.recorder = new lighttool.stateRecorder(webgl);
            }
        },
        methods: {
            begindraw: function () {
                this.recorder.record();
            },
            enddraw: function () {
                this.endbatch();

                this.recorder.restore();
            },
            setMat: function (mat) {
                if (Bridge.referenceEquals(mat, this.mat)) {
                    return;
                }
                this.endbatch();

                this.webgl.disable(this.webgl.CULL_FACE);

                this.mat = mat;
                if (this.shaderparser.mapshader.containsKey(this.mat.shader) === false) {
                    return;
                }
                this.shadercode = this.shaderparser.mapshader.getItem(this.mat.shader);

                this.webgl.depthMask(false);

                if (this.ztest) {
                    this.webgl.enable(this.webgl.DEPTH_TEST);
                    this.webgl.depthFunc(this.webgl.LEQUAL);
                } else {
                    this.webgl.disable(this.webgl.DEPTH_TEST);
                }

                if (this.mat.transparent) {
                    this.webgl.enable(this.webgl.BLEND);
                    this.webgl.blendEquation(this.webgl.FUNC_ADD);
                    this.webgl.blendFuncSeparate(this.webgl.ONE, this.webgl.ONE_MINUS_SRC_ALPHA, this.webgl.SRC_ALPHA, this.webgl.ONE);
                } else {
                    this.webgl.disable(this.webgl.BLEND);
                }

                this.webgl.useProgram(this.shadercode.program);
                this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.vbo);



                if (this.shadercode.posPos >= 0) {
                    this.webgl.enableVertexAttribArray(this.shadercode.posPos);
                    this.webgl.vertexAttribPointer(this.shadercode.posPos, 3, this.webgl.FLOAT, false, 52, 0);
                }
                if (this.shadercode.posColor >= 0) {
                    this.webgl.enableVertexAttribArray(this.shadercode.posColor);
                    this.webgl.vertexAttribPointer(this.shadercode.posColor, 4, this.webgl.FLOAT, false, 52, 12);
                }
                if (this.shadercode.posColor2 >= 0) {
                    this.webgl.enableVertexAttribArray(this.shadercode.posColor2);
                    this.webgl.vertexAttribPointer(this.shadercode.posColor2, 4, this.webgl.FLOAT, false, 52, 28);
                }
                if (this.shadercode.posUV >= 0) {
                    this.webgl.enableVertexAttribArray(this.shadercode.posUV);
                    this.webgl.vertexAttribPointer(this.shadercode.posUV, 2, this.webgl.FLOAT, false, 52, 44);
                }

                if (this.shadercode.uniMatrix != null) {
                    this.webgl.uniformMatrix4fv(this.shadercode.uniMatrix, false, Bridge.cast(this.matrix, Array));
                }
                if (this.shadercode.uniTex0 != null) {
                    this.webgl.activeTexture(this.webgl.TEXTURE0);
                    var tex = this.mat.tex0;
                    this.webgl.bindTexture(this.webgl.TEXTURE_2D, tex == null ? null : tex.texture);
                    this.webgl.uniform1i(this.shadercode.uniTex0, 0);
                }
                if (this.shadercode.uniTex1 != null) {
                    this.webgl.activeTexture(this.webgl.TEXTURE1);
                    var tex1 = this.mat.tex1;
                    this.webgl.bindTexture(this.webgl.TEXTURE_2D, tex1 == null ? null : tex1.texture);
                    this.webgl.uniform1i(this.shadercode.uniTex1, 1);
                }
                if (this.shadercode.uniCol0 != null) {
                    this.webgl.uniform4f(this.shadercode.uniCol0, mat.col0.r, mat.col0.g, mat.col0.b, mat.col0.a);
                }
                if (this.shadercode.uniCol1 != null) {
                    this.webgl.uniform4f(this.shadercode.uniCol1, mat.col1.r, mat.col1.g, mat.col1.b, mat.col1.a);
                }

            },
            endbatch: function () {
                this.mat = null;
                if (this.dataseek === 0) {
                    return;
                }
                this.webgl.bufferData(this.webgl.ARRAY_BUFFER, this.array, this.webgl.DYNAMIC_DRAW);
                this.webgl.drawArrays(this.webgl.TRIANGLES, 0, this.dataseek);

                this.dataseek = 0;
            },
            addQuad: function (ps) {
                if (this.shadercode == null) {
                    return;
                }

                for (var jc = 0; jc < 6; jc = (jc + 1) | 0) {
                    var j = jc < 3 ? jc : ((6 - jc) | 0);

                    var i = Bridge.Int.mul(this.dataseek, 13);

                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].x;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].y;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].z;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].r;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].g;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].b;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].a;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].r2;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].g2;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].b2;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].a2;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].u;
                    this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].v;

                    this.dataseek = (this.dataseek + 1) | 0;
                }

                if (this.dataseek >= 1000) {
                    this.endbatch();
                }
            },
            addTri: function (ps) {
                if (this.shadercode == null) {
                    return;
                }

                {
                    for (var j = 0; j < 3; j = (j + 1) | 0) {
                        var i = Bridge.Int.mul(this.dataseek, 13);
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].x;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].y;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].z;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].r;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].g;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].b;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].a;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].r2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].g2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].b2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].a2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].u;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].v;

                        this.dataseek = (this.dataseek + 1) | 0;

                    }
                }
                if (this.dataseek >= 1000) {
                    this.endbatch();
                }

            },
            addRect: function (ps) {
                if (Bridge.referenceEquals(this.shadercode, undefined)) {
                    return;
                }

                if (this.rectClip != null) {
                    var xmin = ps[System.Array.index(0, ps)].x;
                    var xmax = ps[System.Array.index(3, ps)].x;
                    var ymin = ps[System.Array.index(0, ps)].y;
                    var ymax = ps[System.Array.index(3, ps)].y;
                    var umin = ps[System.Array.index(0, ps)].u;
                    var umax = ps[System.Array.index(3, ps)].u;
                    var vmin = ps[System.Array.index(0, ps)].v;
                    var vmax = ps[System.Array.index(3, ps)].v;
                    var wsize = xmax - xmin;
                    var hsize = ymax - ymin;
                    var usize = umax - umin;
                    var vsize = vmax - vmin;
                    var xl = Math.max(xmin, System.Nullable.getValue(this.rectClip).x);
                    var xr = Math.min(xmax, System.Nullable.getValue(this.rectClip).x + System.Nullable.getValue(this.rectClip).w);
                    var yt = Math.max(ymin, System.Nullable.getValue(this.rectClip).y);
                    var yb = Math.min(ymax, System.Nullable.getValue(this.rectClip).y + System.Nullable.getValue(this.rectClip).h);
                    var lf = (xl - xmin) / wsize;
                    var tf = (yt - ymin) / hsize;
                    var rf = (xr - xmax) / wsize;
                    var bf = (yb - ymax) / hsize;
                    umin = umin + lf * usize;
                    vmin = vmin + tf * vsize;
                    umax = umax + rf * usize;
                    vmax = vmax + bf * vsize;
                    for (var jc = 0; jc < 6; jc = (jc + 1) | 0) {
                        var j = jc < 3 ? jc : ((6 - jc) | 0);

                        var i = Bridge.Int.mul(this.dataseek, 13);

                        var x = ps[System.Array.index(j, ps)].x;
                        if (x < xl) {
                            x = xl;
                        }
                        if (x > xr) {
                            x = xr;
                        }
                        var y = ps[System.Array.index(j, ps)].y;
                        if (y < yt) {
                            y = yt;
                        }
                        if (y > yb) {
                            y = yb;
                        }
                        var u = ps[System.Array.index(j, ps)].u;
                        if (u < umin) {
                            u = umin;
                        }
                        if (u > umax) {
                            u = umax;
                        }
                        var v = ps[System.Array.index(j, ps)].v;
                        if (v < vmin) {
                            v = vmin;
                        }
                        if (v > vmax) {
                            v = vmax;
                        }
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = x;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = y;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].z;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].r;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].g;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].b;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].a;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].r2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].g2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].b2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = ps[System.Array.index(j, ps)].a2;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = u;
                        this.array[Bridge.identity(i, (i = (i + 1) | 0))] = v;

                        this.dataseek = (this.dataseek + 1) | 0;
                    }
                } else {
                    for (var jc1 = 0; jc1 < 6; jc1 = (jc1 + 1) | 0) {
                        var j1 = jc1 < 3 ? jc1 : ((6 - jc1) | 0);

                        var i1 = Bridge.Int.mul(this.dataseek, 13);

                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].x;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].y;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].z;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].r;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].g;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].b;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].a;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].r2;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].g2;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].b2;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].a2;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].u;
                        this.array[Bridge.identity(i1, (i1 = (i1 + 1) | 0))] = ps[System.Array.index(j1, ps)].v;

                        this.dataseek = (this.dataseek + 1) | 0;
                    }
                }
                if (this.dataseek >= 1000) {
                    this.endbatch();
                }
            },
            setRectClip: function (rect) {
                this.rectClip = rect.$clone();
            },
            closeRectClip: function () {
                this.rectClip = null;
            }
        }
    });

    Bridge.define("lighttool.spriteBorder", {
        statics: {
            fields: {
                zero: null
            },
            ctors: {
                init: function () {
                    this.zero = new lighttool.spriteBorder(0, 0, 0, 0);
                }
            }
        },
        fields: {
            l: 0,
            t: 0,
            r: 0,
            b: 0
        },
        ctors: {
            ctor: function (l, t, r, b) {
                if (l === void 0) { l = 0.0; }
                if (t === void 0) { t = 0.0; }
                if (r === void 0) { r = 0.0; }
                if (b === void 0) { b = 0.0; }

                this.$initialize();
                this.l = l;
                this.t = t;
                this.r = r;
                this.b = b;
            }
        }
    });

    Bridge.define("lighttool.spriteCanvas", {
        fields: {
            webgl: null,
            width: 0,
            height: 0,
            spriteBatcher: null,
            uvrect: null,
            trect: null
        },
        ctors: {
            init: function () {
                this.uvrect = new lighttool.spriteRect();
                this.trect = new lighttool.spriteRect();
            },
            ctor: function (webgl, width, height) {
                this.$initialize();
                this.webgl = webgl;
                this.width = width;
                this.height = height;
                this.spriteBatcher = new lighttool.spriteBatcher(webgl, lighttool.shaderMgr.parserInstance());
            }
        },
        methods: {
            drawTexture: function (texture, rect, uvrect, color) {
                if (color === void 0) { color = null; }
                if (color == null) {
                    color = lighttool.spriteColor.white;
                }
                texture.draw(this.spriteBatcher, uvrect.$clone(), rect.$clone(), color);
            },
            drawTextureCustom: function (texture, _mat, rect, uvrect, color, color2) {
                if (color === void 0) { color = null; }
                if (color2 === void 0) { color2 = null; }
                if (color == null) {
                    color = lighttool.spriteColor.white;
                }
                if (color2 == null) {
                    color2 = lighttool.spriteColor.white;
                }
                texture.drawCustom(this.spriteBatcher, _mat, uvrect.$clone(), rect.$clone(), color, color2);
            },
            drawSprite: function (atlas, sprite, rect, color) {
                if (color === void 0) { color = null; }
                if (color == null) {
                    color = lighttool.spriteColor.white;
                }

                var a = lighttool.atlasMgr.Instance().load(this.webgl, atlas);
                if (a == null) {
                    return;
                }
                var r = a.sprites.getItem(sprite);
                if (Bridge.referenceEquals(r, undefined)) {
                    return;
                }
                if (a.texture == null) {
                    return;
                }

                a.texture.draw(this.spriteBatcher, r.ToRect(), rect.$clone(), color);
            },
            drawSpriteCustom: function (atlas, sprite, _mat, rect, color, color2) {
                if (color === void 0) { color = null; }
                if (color2 === void 0) { color2 = null; }
                if (color == null) {
                    color = lighttool.spriteColor.white;
                }
                if (color2 == null) {
                    color2 = lighttool.spriteColor.white;
                }
                var a = lighttool.atlasMgr.Instance().load(this.webgl, atlas);
                if (a == null) {
                    return;
                }
                var r = a.sprites.getItem(sprite);
                if (Bridge.referenceEquals(r, undefined)) {
                    return;
                }
                if (a.texture == null) {
                    return;
                }

                a.texture.drawCustom(this.spriteBatcher, _mat, r.ToRect(), rect.$clone(), color, color2);
            },
            drawSprite9: function (atlas, sprite, rect, border, color) {
                if (color === void 0) { color = null; }
                if (color == null) {
                    color = lighttool.spriteColor.white;
                }
                var a = lighttool.atlasMgr.Instance().load(this.webgl, atlas);
                if (a == null) {
                    return;
                }
                var _r = a.sprites.getItem(sprite);
                if (Bridge.referenceEquals(_r, undefined)) {
                    return;
                }

                var l = (border.l - 1) / a.texturewidth;
                var r = (border.r - 1) / a.texturewidth;
                var t = (border.t - 1) / a.textureheight;
                var b = (border.b - 1) / a.textureheight;
                this.uvrect.x = _r.x;
                this.uvrect.y = _r.y;
                this.uvrect.w = l;
                this.uvrect.h = t;

                this.trect.x = rect.x;
                this.trect.y = rect.y;
                this.trect.w = border.l;
                this.trect.h = border.t;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);

                this.uvrect.x = _r.x + l;
                this.uvrect.y = _r.y;
                this.uvrect.w = _r.w - r - l;
                this.uvrect.h = t;

                this.trect.x = rect.x + border.l;
                this.trect.y = rect.y;
                this.trect.w = rect.w - border.r - border.l;
                this.trect.h = border.t;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);
                this.uvrect.x = _r.x + _r.w - r;
                this.uvrect.y = _r.y;
                this.uvrect.w = r;
                this.uvrect.h = t;

                this.trect.x = rect.x + rect.w - border.r;
                this.trect.y = rect.y;
                this.trect.w = border.r;
                this.trect.h = border.t;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);
                this.uvrect.x = _r.x;
                this.uvrect.y = _r.y + t;
                this.uvrect.w = l;
                this.uvrect.h = _r.h - t - b;

                this.trect.x = rect.x;
                this.trect.y = rect.y + border.t;
                this.trect.w = border.l;
                this.trect.h = rect.h - border.t - border.b;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);
                this.uvrect.x = _r.x + l;
                this.uvrect.y = _r.y + t;
                this.uvrect.w = _r.w - r - l;
                this.uvrect.h = _r.h - t - b;

                this.trect.x = rect.x + border.l;
                this.trect.y = rect.y + border.t;
                this.trect.w = rect.w - border.r - border.l;
                this.trect.h = rect.h - border.t - border.b;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);
                this.uvrect.x = _r.x + _r.w - r;
                this.uvrect.y = _r.y + t;
                this.uvrect.w = r;
                this.uvrect.h = _r.h - t - b;

                this.trect.x = rect.x + rect.w - border.r;
                this.trect.y = rect.y + border.t;
                this.trect.w = border.r;
                this.trect.h = rect.h - border.t - border.b;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);

                this.uvrect.x = _r.x;
                this.uvrect.y = _r.h + _r.y - b;
                this.uvrect.w = l;
                this.uvrect.h = b;

                this.trect.x = rect.x;
                this.trect.y = rect.y + rect.h - border.b;
                this.trect.w = border.l;
                this.trect.h = border.b;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);
                this.uvrect.x = _r.x + l;
                this.uvrect.y = _r.h + _r.y - b;
                this.uvrect.w = _r.w - r - l;
                this.uvrect.h = b;

                this.trect.x = rect.x + border.l;
                this.trect.y = rect.y + rect.h - border.b;
                this.trect.w = rect.w - border.r - border.l;
                this.trect.h = border.b;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);
                this.uvrect.x = _r.x + _r.w - r;
                this.uvrect.y = _r.h + _r.y - b;
                this.uvrect.w = r;
                this.uvrect.h = b;
                this.trect.x = rect.x + rect.w - border.r;
                this.trect.y = rect.y + rect.h - border.b;
                this.trect.w = border.r;
                this.trect.h = border.b;
                a.texture.draw(this.spriteBatcher, this.uvrect.$clone(), this.trect.$clone(), color);

            },
            drawSprite9Custom: function (atlas, sprite, _mat, rect, border, color, color2) {
                if (color === void 0) { color = null; }
                if (color2 === void 0) { color2 = null; }
                if (color == null) {
                    color = lighttool.spriteColor.white;
                }
                if (color2 == null) {
                    color2 = lighttool.spriteColor.white;
                }
                var a = lighttool.atlasMgr.Instance().load(this.webgl, atlas);
                if (a == null) {
                    return;
                }
                var _r = a.sprites.getItem(sprite);
                if (Bridge.referenceEquals(_r, undefined)) {
                    return;
                }

                var l = (border.l - 1) / a.texturewidth;
                var r = (border.r - 1) / a.texturewidth;
                var t = (border.t - 1) / a.textureheight;
                var b = (border.b - 1) / a.textureheight;
                this.uvrect.x = _r.x;
                this.uvrect.y = _r.y;
                this.uvrect.w = l;
                this.uvrect.h = t;

                this.trect.x = rect.x;
                this.trect.y = rect.y;
                this.trect.w = border.l;
                this.trect.h = border.t;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);

                this.uvrect.x = _r.x + l;
                this.uvrect.y = _r.y;
                this.uvrect.w = _r.w - r - l;
                this.uvrect.h = t;

                this.trect.x = rect.x + border.l;
                this.trect.y = rect.y;
                this.trect.w = rect.w - border.r - border.l;
                this.trect.h = border.t;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);
                this.uvrect.x = _r.x + _r.w - r;
                this.uvrect.y = _r.y;
                this.uvrect.w = r;
                this.uvrect.h = t;

                this.trect.x = rect.x + rect.w - border.r;
                this.trect.y = rect.y;
                this.trect.w = border.r;
                this.trect.h = border.t;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);
                this.uvrect.x = _r.x;
                this.uvrect.y = _r.y + t;
                this.uvrect.w = l;
                this.uvrect.h = _r.h - t - b;

                this.trect.x = rect.x;
                this.trect.y = rect.y + border.t;
                this.trect.w = border.l;
                this.trect.h = rect.h - border.t - border.b;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);
                this.uvrect.x = _r.x + l;
                this.uvrect.y = _r.y + t;
                this.uvrect.w = _r.w - r - l;
                this.uvrect.h = _r.h - t - b;

                this.trect.x = rect.x + border.l;
                this.trect.y = rect.y + border.t;
                this.trect.w = rect.w - border.r - border.l;
                this.trect.h = rect.h - border.t - border.b;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);
                this.uvrect.x = _r.x + _r.w - r;
                this.uvrect.y = _r.y + t;
                this.uvrect.w = r;
                this.uvrect.h = _r.h - t - b;

                this.trect.x = rect.x + rect.w - border.r;
                this.trect.y = rect.y + border.t;
                this.trect.w = border.r;
                this.trect.h = rect.h - border.t - border.b;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);

                this.uvrect.x = _r.x;
                this.uvrect.y = _r.h + _r.y - b;
                this.uvrect.w = l;
                this.uvrect.h = b;

                this.trect.x = rect.x;
                this.trect.y = rect.y + rect.h - border.b;
                this.trect.w = border.l;
                this.trect.h = border.b;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);
                this.uvrect.x = _r.x + l;
                this.uvrect.y = _r.h + _r.y - b;
                this.uvrect.w = _r.w - r - l;
                this.uvrect.h = b;

                this.trect.x = rect.x + border.l;
                this.trect.y = rect.y + rect.h - border.b;
                this.trect.w = rect.w - border.r - border.l;
                this.trect.h = border.b;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);
                this.uvrect.x = _r.x + _r.w - r;
                this.uvrect.y = _r.h + _r.y - b;
                this.uvrect.w = r;
                this.uvrect.h = b;
                this.trect.x = rect.x + rect.w - border.r;
                this.trect.y = rect.y + rect.h - border.b;
                this.trect.w = border.r;
                this.trect.h = border.b;
                a.texture.drawCustom(this.spriteBatcher, _mat, this.uvrect.$clone(), this.trect.$clone(), color, color2);

            },
            drawText: function (font, text, rect, color, color2) {
                if (color === void 0) { color = null; }
                if (color2 === void 0) { color2 = null; }
                if (color == null) {
                    color = lighttool.spriteColor.white;
                }
                if (color2 == null) {
                    color2 = lighttool.spriteColor.black;
                }
                var f = lighttool.fontMgr.Instance().load(this.webgl, font);
                if (f == null) {
                    return;
                }
                if (Bridge.referenceEquals(f.cmap, undefined)) {
                    return;
                }
                var xadd = 0;
                for (var i = 0; i < text.length; i = (i + 1) | 0) {
                    var c = text.charAt(i);
                    var cinfo = f.cmap[c];
                    if (Bridge.referenceEquals(cinfo, undefined)) {
                        continue;
                    }
                    var s = rect.h / f.lineHeight;

                    this.trect.x = rect.x + xadd + cinfo.xOffset * s;

                    this.trect.y = rect.y - cinfo.yOffset * s + f.baseline * s;


                    this.trect.h = s * cinfo.ySize;
                    this.trect.w = s * cinfo.xSize;

                    xadd = (xadd + (cinfo.xAddvance * s)) | 0;
                    if (xadd >= rect.w) {
                        break;
                    }
                    f.draw(this.spriteBatcher, cinfo, this.trect.$clone(), color, color2);
                }
            }
        }
    });

    Bridge.define("lighttool.spriteColor", {
        statics: {
            fields: {
                black: null,
                gray: null
            },
            props: {
                white: {
                    get: function () {
                        return new lighttool.spriteColor(1, 1, 1, 1);
                    }
                }
            },
            ctors: {
                init: function () {
                    this.black = new lighttool.spriteColor(0, 0, 0, 1);
                    this.gray = new lighttool.spriteColor(0.5, 0.5, 0.5, 1);
                }
            }
        },
        fields: {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        },
        ctors: {
            ctor: function (r, g, b, a) {
                if (r === void 0) { r = 1.0; }
                if (g === void 0) { g = 1.0; }
                if (b === void 0) { b = 1.0; }
                if (a === void 0) { a = 1.0; }

                this.$initialize();
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
        }
    });

    Bridge.define("lighttool.spriteFont", {
        statics: {
            methods: {
                fromRaw: function (webgl, txt, texture) {
                    if (texture === void 0) { texture = null; }
                    var sf = new lighttool.spriteFont(webgl, null, texture);
                    sf._parse(txt);
                    return sf;
                }
            }
        },
        fields: {
            webgl: null,
            texture: null,
            mat: null,
            cmap: null,
            fontname: null,
            pointSize: 0,
            padding: 0,
            lineHeight: 0,
            baseline: 0,
            atlasWidth: 0,
            atlasHeight: 0,
            pointbuf: null
        },
        ctors: {
            init: function () {
                var $t;
                this.pointbuf = System.Array.init([
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t), 
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t), 
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t), 
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t)
                ], lighttool.spritePoint);
            },
            ctor: function (webgl, urlconfig, texture) {
                this.$initialize();
                this.webgl = webgl;
                if (urlconfig != null) {
                    lighttool.loadTool.loadText(urlconfig, Bridge.fn.bind(this, function (txt, err) {
                        this._parse(txt);
                    }));
                }
                this.texture = texture;
                this.mat = new lighttool.spriteMat();
                this.mat.shader = "spritefont";
                this.mat.tex0 = this.texture;
                this.mat.transparent = true;
            }
        },
        methods: {
            _parse: function (txt) {
                var $t, $t1, $t2, $t3, $t4, $t5, $t6, $t7, $t8, $t9;
                var d1 = new Date().valueOf();
                var json = JSON.parse(txt);

                var font = Bridge.cast(json.font, System.Array.type(System.Object));
                this.fontname = Bridge.cast(font[System.Array.index(0, font)], System.String);
                this.pointSize = System.Nullable.getValue(Bridge.cast(Bridge.unbox(font[System.Array.index(1, font)], System.Single), System.Single));
                this.padding = System.Nullable.getValue(Bridge.cast(Bridge.unbox(font[System.Array.index(2, font)], System.Single), System.Single));
                this.lineHeight = System.Nullable.getValue(Bridge.cast(Bridge.unbox(font[System.Array.index(3, font)], System.Single), System.Single));
                this.baseline = System.Nullable.getValue(Bridge.cast(Bridge.unbox(font[System.Array.index(4, font)], System.Single), System.Single));
                this.atlasWidth = System.Nullable.getValue(Bridge.cast(Bridge.unbox(font[System.Array.index(5, font)], System.Single), System.Single));
                this.atlasHeight = System.Nullable.getValue(Bridge.cast(Bridge.unbox(font[System.Array.index(6, font)], System.Single), System.Single));

                this.cmap = { };
                var map = json.map;
                $t = Bridge.getEnumerator(Object.getOwnPropertyNames(Bridge.unbox(map)));
                try {
                    while ($t.moveNext()) {
                        var c = $t.Current;
                        var finfo = new lighttool.charinfo();
                        this.cmap[c] = finfo;
                        finfo.x = ($t1 = Bridge.unbox(map[c]))[System.Array.index(0, $t1)] / this.atlasWidth;
                        finfo.y = ($t2 = Bridge.unbox(map[c]))[System.Array.index(1, $t2)] / this.atlasHeight;
                        finfo.w = ($t3 = Bridge.unbox(map[c]))[System.Array.index(2, $t3)] / this.atlasWidth;
                        finfo.h = ($t4 = Bridge.unbox(map[c]))[System.Array.index(3, $t4)] / this.atlasHeight;
                        finfo.xSize = ($t5 = Bridge.unbox(map[c]))[System.Array.index(2, $t5)];
                        finfo.ySize = ($t6 = Bridge.unbox(map[c]))[System.Array.index(3, $t6)];
                        finfo.xOffset = ($t7 = Bridge.unbox(map[c]))[System.Array.index(4, $t7)];
                        finfo.yOffset = ($t8 = Bridge.unbox(map[c]))[System.Array.index(5, $t8)];
                        finfo.xAddvance = ($t9 = Bridge.unbox(map[c]))[System.Array.index(6, $t9)];
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                map = null;
                json = null;


                var d2 = new Date().valueOf();
                var n = d2 - d1;
                System.Console.WriteLine("json time=" + System.Double.format(n));

            },
            draw: function (sb, r, rect, c, colorBorder) {
                if (c === void 0) { c = null; }
                if (colorBorder === void 0) { colorBorder = null; }
                if (c == null) {
                    c = lighttool.spriteColor.white;
                }
                if (colorBorder == null) {
                    colorBorder = new lighttool.spriteColor(0.0, 0.0, 0.0, 0.5);
                }
                {
                    var p = this.pointbuf[System.Array.index(0, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = r.x;
                    p.v = r.y + r.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;

                    p = this.pointbuf[System.Array.index(1, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = r.x + r.w;
                    p.v = r.y + r.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;

                    p = this.pointbuf[System.Array.index(2, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = r.x;
                    p.v = r.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;

                    p = this.pointbuf[System.Array.index(3, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = r.x + r.w;
                    p.v = r.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;
                }
                sb.setMat(this.mat);
                sb.addRect(this.pointbuf);
            },
            drawChar: function (sb, cname, rect, c, colorBorder) {
                if (c === void 0) { c = null; }
                if (colorBorder === void 0) { colorBorder = null; }
                var r = this.cmap[cname];
                if (Bridge.referenceEquals(r, undefined)) {
                    return;
                }
                if (c == null) {
                    c = lighttool.spriteColor.white;
                }
                if (colorBorder == null) {
                    colorBorder = new lighttool.spriteColor(0.0, 0.0, 0.0, 0.5);
                }
                {
                    var p = this.pointbuf[System.Array.index(0, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = r.x;
                    p.v = r.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;

                    p = this.pointbuf[System.Array.index(1, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = r.x + r.w;
                    p.v = r.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;

                    p = this.pointbuf[System.Array.index(2, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = r.x;
                    p.v = r.y + r.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;

                    p = this.pointbuf[System.Array.index(3, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = r.x + r.w;
                    p.v = r.y + r.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                    p.r2 = colorBorder.r;
                    p.g2 = colorBorder.g;
                    p.b2 = colorBorder.b;
                    p.a2 = colorBorder.a;

                }
                sb.setMat(this.mat);
                sb.addRect(this.pointbuf);
            }
        }
    });

    Bridge.define("lighttool.spriteMat", {
        fields: {
            shader: null,
            transparent: false,
            tex0: null,
            tex1: null,
            col0: null,
            col1: null
        }
    });

    Bridge.define("lighttool.spritePoint", {
        fields: {
            x: 0,
            y: 0,
            z: 0,
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            r2: 0,
            g2: 0,
            b2: 0,
            a2: 0,
            u: 0,
            v: 0
        }
    });

    Bridge.define("lighttool.spriteRect", {
        $kind: "struct",
        statics: {
            fields: {
                one: null,
                zero: null
            },
            ctors: {
                init: function () {
                    this.one = new lighttool.spriteRect();
                    this.zero = new lighttool.spriteRect();
                    this.one = new lighttool.spriteRect.$ctor1(0, 0, 1, 1);
                    this.zero = new lighttool.spriteRect.$ctor1(0, 0, 0, 0);
                }
            },
            methods: {
                getDefaultValue: function () { return new lighttool.spriteRect(); }
            }
        },
        fields: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        ctors: {
            $ctor1: function (x, y, w, h) {
                if (x === void 0) { x = 0.0; }
                if (y === void 0) { y = 0.0; }
                if (w === void 0) { w = 0.0; }
                if (h === void 0) { h = 0.0; }

                this.$initialize();
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3469036106, this.x, this.y, this.w, this.h]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, lighttool.spriteRect)) {
                    return false;
                }
                return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.w, o.w) && Bridge.equals(this.h, o.h);
            },
            $clone: function (to) {
                var s = to || new lighttool.spriteRect();
                s.x = this.x;
                s.y = this.y;
                s.w = this.w;
                s.h = this.h;
                return s;
            }
        }
    });

    Bridge.define("lighttool.spriteTexture", {
        statics: {
            methods: {
                fromRaw: function (webgl, img, format, mipmap, linear) {
                    if (format === void 0) { format = 1; }
                    if (mipmap === void 0) { mipmap = false; }
                    if (linear === void 0) { linear = true; }
                    var st = new lighttool.spriteTexture(webgl, null, format, mipmap, linear);
                    st.texture = webgl.createTexture();
                    st.img = img;
                    st._loadimg(mipmap, linear);

                    return st;

                }
            }
        },
        fields: {
            webgl: null,
            img: null,
            loaded: false,
            texture: null,
            format: 0,
            width: 0,
            height: 0,
            mat: null,
            reader: null,
            disposeit: false,
            pointbuf: null
        },
        ctors: {
            init: function () {
                var $t;
                this.loaded = false;
                this.width = 0;
                this.height = 0;
                this.disposeit = false;
                this.pointbuf = System.Array.init([
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t), 
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t), 
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t), 
                    ($t = new lighttool.spritePoint(), $t.x = 0, $t.y = 0, $t.z = 0, $t.r = 0, $t.g = 0, $t.b = 0, $t.a = 0, $t.r2 = 0, $t.g2 = 0, $t.b2 = 0, $t.a2 = 0, $t.u = 0, $t.v = 0, $t)
                ], lighttool.spritePoint);
            },
            ctor: function (webgl, url, format, mipmap, linear) {
                if (url === void 0) { url = null; }
                if (format === void 0) { format = 1; }
                if (mipmap === void 0) { mipmap = false; }
                if (linear === void 0) { linear = true; }

                this.$initialize();
                this.webgl = webgl;
                this.format = format;

                this.mat = new lighttool.spriteMat();
                this.mat.tex0 = this;
                this.mat.transparent = true;
                this.mat.shader = "spritedefault";

                if (url == null) {
                    return;
                }
                this.texture = webgl.createTexture();

                this.img = new Image();
                this.img.src = url;
                this.img.onload = Bridge.fn.bind(this, function (e) {
                    if (this.disposeit) {
                        this.img = null;
                        return;
                    }
                    this._loadimg(mipmap, linear);
                });

            }
        },
        methods: {
            _loadimg: function (mipmap, linear) {
                this.width = this.img.width;
                this.height = this.img.height;
                this.loaded = true;
                this.webgl.pixelStorei(this.webgl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                this.webgl.pixelStorei(this.webgl.UNPACK_FLIP_Y_WEBGL, 0);


                this.webgl.bindTexture(this.webgl.TEXTURE_2D, this.texture);
                var formatGL = this.webgl.RGBA;
                if (this.format === lighttool.textureformat.RGB) {
                    formatGL = this.webgl.RGB;
                } else {
                    if (this.format === lighttool.textureformat.GRAY) {
                        formatGL = this.webgl.LUMINANCE;
                    }
                }
                this.webgl.texImage2D(this.webgl.TEXTURE_2D, 0, formatGL, formatGL, this.webgl.UNSIGNED_BYTE, this.img);

                if (mipmap) {
                    this.webgl.generateMipmap(this.webgl.TEXTURE_2D);

                    if (linear) {
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MAG_FILTER, this.webgl.LINEAR);
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MIN_FILTER, this.webgl.LINEAR_MIPMAP_LINEAR);
                    } else {
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MAG_FILTER, this.webgl.NEAREST);
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MIN_FILTER, this.webgl.NEAREST_MIPMAP_NEAREST);

                    }
                } else {
                    if (linear) {
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MAG_FILTER, this.webgl.LINEAR);
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MIN_FILTER, this.webgl.LINEAR);
                    } else {
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MAG_FILTER, this.webgl.NEAREST);
                        this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MIN_FILTER, this.webgl.NEAREST);

                    }
                }
                this.img = null;



            },
            getReader: function (redOnly) {
                if (this.reader != null) {
                    if (this.reader.gray !== redOnly) {
                        throw new System.Exception("get param diff with this.reader");
                    }
                    return this.reader;
                }
                if (this.format !== lighttool.textureformat.RGBA) {
                    throw new System.Exception("only rgba texture can read");
                }
                if (this.texture == null) {
                    return null;
                }
                if (this.reader == null) {
                    this.reader = new lighttool.texReader(this.webgl, this.texture, this.width, this.height, redOnly);
                }

                return this.reader;
            },
            dispose: function () {
                if (this.texture == null && this.img != null) {
                    this.disposeit = true;
                }

                if (this.texture != null) {
                    this.webgl.deleteTexture(this.texture);
                }
            },
            draw: function (spriteBatcher, uv, rect, c) {

                {


                    var p = this.pointbuf[System.Array.index(0, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = uv.x;
                    p.v = uv.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;

                    p = this.pointbuf[System.Array.index(1, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = uv.x + uv.w;
                    p.v = uv.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;

                    p = this.pointbuf[System.Array.index(2, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = uv.x;
                    p.v = uv.y + uv.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;

                    p = this.pointbuf[System.Array.index(3, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = uv.x + uv.w;
                    p.v = uv.y + uv.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                }
                spriteBatcher.setMat(this.mat);
                spriteBatcher.addRect(this.pointbuf);

            },
            drawCustom: function (spriteBatcher, _mat, uv, rect, c, c2) {
                _mat.tex0 = this;
                {
                    var p = this.pointbuf[System.Array.index(0, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = uv.x;
                    p.v = uv.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;

                    p = this.pointbuf[System.Array.index(1, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y;
                    p.z = 0;
                    p.u = uv.x + uv.w;
                    p.v = uv.y;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;

                    p = this.pointbuf[System.Array.index(2, this.pointbuf)];
                    p.x = rect.x;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = uv.x;
                    p.v = uv.y + uv.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;

                    p = this.pointbuf[System.Array.index(3, this.pointbuf)];
                    p.x = rect.x + rect.w;
                    p.y = rect.y + rect.h;
                    p.z = 0;
                    p.u = uv.x + uv.w;
                    p.v = uv.y + uv.h;
                    p.r = c.r;
                    p.g = c.g;
                    p.b = c.b;
                    p.a = c.a;
                }
                spriteBatcher.setMat(_mat);
                spriteBatcher.addRect(this.pointbuf);

            }
        }
    });

    Bridge.define("lighttool.stateRecorder", {
        fields: {
            webgl: null,
            DEPTH_WRITEMASK: false,
            DEPTH_TEST: false,
            DEPTH_FUNC: 0,
            BLEND: false,
            BLEND_EQUATION: 0,
            BLEND_SRC_RGB: 0,
            BLEND_SRC_ALPHA: 0,
            BLEND_DST_RGB: 0,
            BLEND_DST_ALPHA: 0,
            CURRENT_PROGRAM: null,
            ARRAY_BUFFER: null,
            ACTIVE_TEXTURE: 0,
            TEXTURE_BINDING_2D: null
        },
        ctors: {
            ctor: function (webgl) {
                this.$initialize();
                this.webgl = webgl;
            }
        },
        methods: {
            record: function () {

                this.DEPTH_WRITEMASK = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.DEPTH_WRITEMASK), System.Boolean), System.Boolean));
                this.DEPTH_TEST = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.DEPTH_TEST), System.Boolean), System.Boolean));
                this.DEPTH_FUNC = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.DEPTH_FUNC), System.Int32), System.Int32));
                this.BLEND = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.BLEND), System.Boolean), System.Boolean));
                this.BLEND_EQUATION = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.BLEND_EQUATION), System.Int32), System.Int32));
                this.BLEND_SRC_RGB = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.BLEND_SRC_RGB), System.Int32), System.Int32));
                this.BLEND_SRC_ALPHA = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.BLEND_SRC_ALPHA), System.Int32), System.Int32));
                this.BLEND_DST_RGB = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.BLEND_DST_RGB), System.Int32), System.Int32));
                this.BLEND_DST_ALPHA = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.BLEND_DST_ALPHA), System.Int32), System.Int32));

                var p = this.webgl.getParameter(this.webgl.CURRENT_PROGRAM);
                this.CURRENT_PROGRAM = Bridge.unbox(p);

                var pb = this.webgl.getParameter(this.webgl.ARRAY_BUFFER_BINDING);
                this.ARRAY_BUFFER = Bridge.unbox(pb);

                this.ACTIVE_TEXTURE = System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.webgl.getParameter(this.webgl.ACTIVE_TEXTURE), System.Int32), System.Int32));
                this.TEXTURE_BINDING_2D = Bridge.unbox(this.webgl.getParameter(this.webgl.TEXTURE_BINDING_2D));

            },
            restore: function () {
                this.webgl.depthMask(this.DEPTH_WRITEMASK);
                if (this.DEPTH_TEST) {
                    this.webgl.enable(this.webgl.DEPTH_TEST);
                } else {
                    this.webgl.disable(this.webgl.DEPTH_TEST);
                }
                this.webgl.depthFunc(this.DEPTH_FUNC);

                if (this.BLEND) {
                    this.webgl.enable(this.webgl.BLEND);
                } else {
                    this.webgl.disable(this.webgl.BLEND);
                }
                this.webgl.blendEquation(this.BLEND_EQUATION);

                this.webgl.blendFuncSeparate(this.BLEND_SRC_RGB, this.BLEND_DST_RGB, this.BLEND_SRC_ALPHA, this.BLEND_DST_ALPHA);

                this.webgl.useProgram(this.CURRENT_PROGRAM);
                this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.ARRAY_BUFFER);

                this.webgl.activeTexture(this.ACTIVE_TEXTURE);
                this.webgl.bindTexture(this.webgl.TEXTURE_2D, this.TEXTURE_BINDING_2D);

            }
        }
    });

    Bridge.define("lighttool.texReader", {
        fields: {
            width: 0,
            height: 0,
            data: null,
            gray: false
        },
        ctors: {
            ctor: function (webgl, texRGBA, width, height, gray) {
                if (gray === void 0) { gray = true; }

                this.$initialize();
                this.gray = gray;
                this.width = width;
                this.height = height;

                var fbo = webgl.createFramebuffer();
                var fbold = Bridge.as(webgl.getParameter(webgl.FRAMEBUFFER_BINDING), Bridge.WebGL.WebGLFramebuffer);
                webgl.bindFramebuffer(webgl.FRAMEBUFFER, fbo);
                webgl.framebufferTexture2D(webgl.FRAMEBUFFER, webgl.COLOR_ATTACHMENT0, webgl.TEXTURE_2D, texRGBA, 0);

                var readData = new Uint8Array(Bridge.Int.mul(Bridge.Int.mul(this.width, this.height), 4));
                readData[0] = 2;
                webgl.readPixels(0, 0, this.width, this.height, webgl.RGBA, webgl.UNSIGNED_BYTE, readData);
                webgl.deleteFramebuffer(fbo);
                webgl.bindFramebuffer(webgl.FRAMEBUFFER, fbold);

                if (gray) {
                    this.data = new Uint8Array(Bridge.Int.mul(this.width, this.height));
                    for (var i = 0; i < Bridge.Int.mul(width, height); i = (i + 1) | 0) {
                        this.data[i] = readData[Bridge.Int.mul(i, 4)];
                    }
                } else {
                    this.data = readData;
                }
            }
        },
        methods: {
            getPixel: function (u, v) {
                var x = Bridge.Int.clip32(u * this.width);
                var y = Bridge.Int.clip32(v * this.height);
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
                    return Bridge.box(0, System.Int32);
                }
                if (this.gray) {
                    return Bridge.box(this.data[((Bridge.Int.mul(y, this.width) + x) | 0)], System.Byte);
                } else {
                    var i = Bridge.Int.mul((((Bridge.Int.mul(y, this.width) + x) | 0)), 4);
                    return new lighttool.spriteColor(this.data[i], this.data[((i + 1) | 0)], this.data[((i + 2) | 0)], this.data[((i + 3) | 0)]);
                }
            }
        }
    });

    Bridge.define("lighttool.textureformat", {
        $kind: "enum",
        statics: {
            fields: {
                RGBA: 1,
                RGB: 2,
                GRAY: 3
            }
        }
    });

    Bridge.define("lighttool.textureMgr", {
        statics: {
            fields: {
                g_this: null
            },
            methods: {
                Instance: function () {
                    if (lighttool.textureMgr.g_this == null) {
                        lighttool.textureMgr.g_this = new lighttool.textureMgr();
                    }

                    return lighttool.textureMgr.g_this;
                }
            }
        },
        fields: {
            mapInfo: null
        },
        ctors: {
            init: function () {
                this.mapInfo = new (System.Collections.Generic.Dictionary$2(System.String,lighttool.texutreMgrItem)).ctor();
            }
        },
        methods: {
            reg: function (url, urladd, format, mipmap, linear) {
                if (this.mapInfo.containsKey(url)) {
                    throw new System.Exception("you can't reg the same name");
                }
                var item = new lighttool.texutreMgrItem();

                this.mapInfo.setItem(url, item);
                item.url = url;
                item.urladd = urladd;
                item.format = format;
                item.mipmap = mipmap;
                item.linear = linear;
            },
            regDirect: function (url, tex) {
                if (this.mapInfo.containsKey(url)) {
                    throw new System.Exception("you can't reg the same name");
                }
                var item = new lighttool.texutreMgrItem();

                this.mapInfo.setItem(url, item);
                item.url = url;
                item.tex = tex;
            },
            unreg: function (url) {
                if (this.mapInfo.containsKey(url) === false) {
                    return;
                }
                this.unload(url);

                this.mapInfo.setItem(url, null);
            },
            unload: function (url) {
                if (this.mapInfo.containsKey(url) === false) {
                    return;
                }

                var item = this.mapInfo.getItem(url);

                item.tex.dispose();
                item.tex = null;
            },
            load: function (webgl, url) {
                if (this.mapInfo.containsKey(url) === false) {
                    return null;
                }

                var item = this.mapInfo.getItem(url);
                if (item.tex == null) {
                    item.tex = new lighttool.spriteTexture(webgl, (item.url || "") + (item.urladd || ""), item.format, item.mipmap, item.linear);
                }
                return item.tex;
            }
        }
    });

    Bridge.define("lighttool.texutreMgrItem", {
        fields: {
            tex: null,
            url: null,
            urladd: null,
            format: 0,
            mipmap: false,
            linear: false
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ew0KICAidmVyc2lvbiI6IDMsDQogICJmaWxlIjogImxpYkdyYXBoLmpzIiwNCiAgInNvdXJjZVJvb3QiOiAiIiwNCiAgInNvdXJjZXMiOiBbDQogICAgIi4uLy4uL2xpYkdyYXBoL2NhbnZhcy9yZXNtZ3IuY3MiLA0KICAgICIuLi8uLi9saWJHcmFwaC9jYW52YXMvc3ByaXRlYmF0Y2hlci5jcyIsDQogICAgIi4uLy4uL2xpYkdyYXBoL2NhbnZhcy9jYW52YXNBZGFwdGVyX05hdGl2ZS5jcyIsDQogICAgIi4uLy4uL2xpYkdyYXBoL2NhbnZhcy9jYW52YXMuY3MiDQogIF0sDQogICJuYW1lcyI6IFsNCiAgICAiIg0KICBdLA0KICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O29CQTZHWUEsSUFBSUEsNkJBQW1CQTt3QkFDbkJBLDRCQUFrQkEsSUFBSUE7OztvQkFFMUJBLE9BQU9BOzs7Ozs7Ozs7K0JBRzJEQSxLQUFJQTs7OzsyQkFFMURBLE1BQWFBLFVBQWlCQSxhQUFvQkE7Z0JBRzlEQSxJQUFJQSx5QkFBeUJBO29CQUl6QkEsTUFBTUEsSUFBSUE7O2dCQUVkQSxXQUFXQSxJQUFJQTs7Z0JBRWZBLHFCQUFhQSxNQUFRQTtnQkFDckJBLFdBQVdBO2dCQUNYQSxtQkFBbUJBO2dCQUNuQkEsdUJBQXVCQTs7NkJBRVRBLE1BQWFBO2dCQUUzQkEsV0FBV0EscUJBQWFBO2dCQUN4QkEsSUFBSUEsNkJBQVFBO29CQUFrQkE7O2dCQUM5QkEsWUFBWUEsTUFBTUE7O2dCQUVsQkEsb0JBQW9CQTs7O2lDQUlGQSxNQUFhQTtnQkFFL0JBLElBQUlBLHlCQUF5QkE7b0JBSXpCQSxNQUFNQSxJQUFJQTs7Z0JBRWRBLFdBQVdBLElBQUlBOztnQkFFZkEscUJBQWFBLE1BQVFBO2dCQUNyQkEsYUFBYUE7OzhCQUVFQSxNQUFhQTtnQkFFNUJBLElBQUlBLHlCQUF5QkE7b0JBQ3pCQTs7Z0JBQ0pBLFdBQVdBLHFCQUFhQTs7Z0JBR3hCQSxJQUFJQTtvQkFFQUE7b0JBQ0FBLHFCQUFxQkE7O2dCQUV6QkEsYUFBYUE7OzRCQUdPQSxPQUE2QkE7Z0JBRWpEQSxJQUFJQSx5QkFBeUJBO29CQUN6QkEsT0FBT0E7O2dCQUNYQSxXQUFXQSxxQkFBYUE7Z0JBRXhCQSxJQUFJQSxjQUFjQTtvQkFFZEEsVUFBVUEscUNBQTJCQSxPQUFPQTtvQkFDNUNBLElBQUlBLDRCQUFPQTt3QkFFUEEsb0NBQTBCQSxrQkFBa0JBLHNCQUN4Q0E7O3dCQUVKQSxNQUFNQSxxQ0FBMkJBLE9BQU9BOztvQkFFNUNBLGFBQWFBLElBQUlBLHNCQUFZQSxPQUFPQSxVQUFVQTs7Z0JBRWxEQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFnQlBBLElBQUlBLDRCQUFrQkE7d0JBQ2xCQSwyQkFBaUJBLElBQUlBOzs7b0JBRXpCQSxPQUFPQTs7Ozs7Ozs7OytCQUcwREEsS0FBSUE7Ozs7MkJBRXpEQSxNQUFhQSxTQUFnQkEsYUFBb0JBO2dCQUc3REEsV0FBV0EscUJBQWFBO2dCQUN4QkEsSUFBSUEsOEJBQVFBO29CQUVSQSxNQUFNQSxJQUFJQTs7Z0JBRWRBLE9BQU9BLElBQUlBOztnQkFFWEEscUJBQWFBLE1BQVFBO2dCQUNyQkEsV0FBV0E7Z0JBQ1hBLG1CQUFtQkE7Z0JBQ25CQSx1QkFBdUJBOztpQ0FFTEEsTUFBYUE7Z0JBRS9CQSxJQUFHQSx5QkFBeUJBO29CQUl4QkEsTUFBTUEsSUFBSUE7O2dCQUVkQSxXQUFXQSxJQUFJQTs7Z0JBRWZBLHFCQUFhQSxNQUFRQTtnQkFDckJBLFlBQVlBOzs2QkFFRUEsTUFBYUE7Z0JBRTNCQSxJQUFJQSx5QkFBeUJBO29CQUN6QkE7O2dCQUNKQSxXQUFXQSxxQkFBYUE7Z0JBRXhCQSxZQUFZQSxNQUFNQTs7Z0JBRWxCQSxvQkFBb0JBOzs7OEJBS0xBLE1BQWFBO2dCQUU1QkEsSUFBSUEseUJBQXlCQTtvQkFDekJBOzs7Z0JBRUpBLFdBQVdBLHFCQUFhQTs7Z0JBR3hCQSxJQUFJQTtvQkFFQUE7b0JBQ0FBLG9CQUFvQkE7O2dCQUV4QkEsWUFBWUE7OzRCQUdPQSxPQUE2QkE7Z0JBRWhEQSxJQUFJQSx5QkFBeUJBO29CQUN6QkEsT0FBT0E7OztnQkFFWEEsV0FBV0EscUJBQWFBO2dCQUV4QkEsSUFBSUEsYUFBYUE7b0JBRWJBLFVBQVVBLHFDQUEyQkEsT0FBT0E7b0JBQzVDQSxJQUFJQSw0QkFBT0E7d0JBRVBBLG9DQUEwQkEsa0JBQWtCQSxzQkFDeENBOzt3QkFFSkEsTUFBTUEscUNBQTJCQSxPQUFPQTs7b0JBRTVDQSxZQUFZQSxJQUFJQSxxQkFBV0EsT0FBT0EsVUFBVUE7O2dCQUVoREEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0NwUmlCQSxLQUFZQTtvQkFFcENBLFVBQVVBLElBQUlBO29CQUNkQSxnQkFBZ0JBO29CQUNoQkEseUJBQXlCQTt3QkFFckJBLElBQUlBLG1CQUFrQkE7NEJBRWxCQSxJQUFJQSxrQkFBa0JBOzs7b0JBRzlCQSxjQUFjQSxVQUFDQTt3QkFFQ0EsVUFBVUEsSUFBSUE7d0JBQ2RBO3dCQUNBQSxJQUFJQSxNQUFNQTs7b0JBRTFCQTs7MkNBSStCQSxLQUFZQTtvQkFFM0NBLFVBQVVBLElBQUlBOztvQkFFZEEsZ0JBQWdCQTtvQkFDaEJBLG1CQUFtQkE7b0JBQ25CQSx5QkFBeUJBO3dCQUVyQkEsSUFBSUEsbUJBQWtCQTs0QkFHbEJBLElBQUlBLHNDQUE2QkE7OztvQkFHekNBLGNBQWNBLFVBQUNBO3dCQUVTQSxVQUFVQSxJQUFJQTt3QkFDZEE7d0JBQ0FBLElBQUlBLE1BQU1BOztvQkFFbENBOztvQ0FHd0JBLEtBQVlBO29CQUVwQ0EsVUFBVUEsSUFBSUE7O29CQUVkQSxnQkFBZ0JBO29CQUNoQkEsbUJBQW1CQTtvQkFDbkJBLHlCQUF5QkE7d0JBRXJCQSxJQUFJQSxtQkFBa0JBOzRCQUdsQkEsSUFBSUEsK0JBQXNCQTs7O29CQUdsQ0EsY0FBY0EsVUFBQ0E7d0JBRVNBLFVBQVVBLElBQUlBO3dCQUNkQTt3QkFDQUEsSUFBSUEsTUFBTUE7O29CQUVsQ0E7Ozs7Ozs7Ozs4Q0NwRTBDQSxPQUE2QkE7b0JBRXZFQSxTQUFTQTtvQkFDVEEsV0FBV0E7b0JBQ1hBLFlBQVlBOztvQkFFWkEsUUFBUUEsSUFBSUEsdUJBQWFBLE9BQU9BLDBCQUEwQkE7b0JBRTFEQSx5QkFBeUJBLElBQUlBLGFBQWFBLG1CQUNsQ0EsTUFBV0EscUJBQ1JBLEtBQWFBLDRCQUVoQkE7b0JBRVJBOztvQkFFQUEsU0FBU0E7b0JBQ1RBLG1CQUFnQ0EsQUFBU0E7d0JBRWxDQSxxQkFBcUJBLDBCQUEwQkE7d0JBQy9DQSxZQUFZQSx5QkFBeUJBO3dCQUNyQ0E7O3dCQUVBQTs7d0JBRUFBLGlDQUFVQTs7d0JBRVZBOzt3QkFFQUEsYUFBaUJBO3dCQUNqQkE7OztvQkFJUEEsa0NBQWtDQSxBQUFTQTt3QkFFdkNBLFVBQVVBO3dCQUNWQSxZQUFZQTt3QkFDWkEsYUFBYUE7d0JBQ2JBLFlBQVlBO3dCQUNaQSxhQUFhQTs7d0JBRWJBLFVBQVVBO3dCQUNWQSxXQUFXQTt3QkFDWEEseUJBQXlCQSxJQUFJQSxhQUFhQSxtQkFDMUNBLE1BQVdBLHFCQUNSQSxPQUFnQkEsNEJBRW5CQTt3QkFHQUEsbUNBQVlBOzs7O29CQUloQkEsaUJBQWlCQSxVQUFDQTt3QkFFZEEsdUNBQWdCQSxHQUFHQSx1Q0FBNEJBLHFDQUFRQSwwREFBZUEscUNBQU9BOztvQkFFakZBLGVBQWVBLFVBQUVBO3dCQUViQSx1Q0FBZ0JBLEdBQUdBLHFDQUEyQkEscUNBQU9BLDBEQUFlQSxxQ0FBT0E7O29CQUUvRUEsaUJBQWlCQSxVQUFDQTt3QkFFZEEsdUNBQWdCQSxHQUFHQSx1Q0FBNkJBLHFDQUFPQSwwREFBZUEscUNBQU9BOzs7Ozs7b0JBeUJqRkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCREo2QkE7cUJBQ0ZBO3FCQUNBQTtxQkFDQUE7cUJBQ0FBOzs7OzhCQVJsQkE7Z0NBQ0VBO2lDQUNDQTs2QkFDSkE7Ozs7K0JBTUNBO2dCQUVoQkEsVUFBVUEsbUJBQW1CQTtnQkFDN0JBLFVBQVVBLG1CQUFtQkE7O2dCQUc3QkEsbUJBQW1CQSxTQUFTQTtnQkFDNUJBLG9CQUFvQkE7Z0JBQ3BCQSxTQUFTQSx5QkFBeUJBLFNBQVNBO2dCQUMzQ0EsSUFBSUE7b0JBRUFBLFdBQU1BLHVCQUF1QkE7O2dCQUdqQ0EsbUJBQW1CQSxTQUFTQTtnQkFDNUJBLG9CQUFvQkE7Z0JBQ3BCQSxTQUFTQSx5QkFBeUJBLFNBQVNBO2dCQUMzQ0EsSUFBSUE7b0JBRUFBLFdBQU1BLHVCQUF1QkE7OztnQkFJakNBLGVBQWVBOztnQkFFZkEsbUJBQW1CQSxjQUFjQTtnQkFDakNBLG1CQUFtQkEsY0FBY0E7O2dCQUVqQ0Esa0JBQWtCQTtnQkFDbEJBLFNBQVNBLDBCQUEwQkEsY0FBY0E7Z0JBQ2pEQSxJQUFJQTtvQkFFQUEsV0FBTUEsd0JBQXdCQTs7OztnQkFLbENBLGNBQWNBLHdCQUF3QkE7Z0JBQ3RDQSxnQkFBZ0JBLHdCQUF3QkE7Z0JBQ3hDQSxpQkFBaUJBLHdCQUF3QkE7O2dCQUV6Q0EsYUFBYUEsd0JBQXdCQTs7Z0JBRXJDQSxpQkFBaUJBLHlCQUF5QkE7Z0JBQzFDQSxlQUFlQSx5QkFBeUJBO2dCQUN4Q0EsZUFBZUEseUJBQXlCQTtnQkFDeENBLGVBQWVBLHlCQUF5QkE7Z0JBQ3hDQSxlQUFlQSx5QkFBeUJBOzs7OzZCQUt6QkE7Z0JBRWZBLE1BQU1BLElBQUlBOzs7Ozs7Ozs7Ozs7b0JEZ0pWQSxJQUFJQSxzQ0FBNEJBO3dCQUM1QkEscUNBQTJCQSxJQUFJQTs7b0JBQ25DQSxPQUFPQTs7Ozs7Ozs7Ozs7O2lDQzdJdUNBLEtBQUlBOzs7OytCQUd6Q0E7Z0JBRVRBLFNBQVNBLHlCQUFVQSxpREFBaUJBO2dCQUNwQ0EsS0FBS0EsV0FBV0EsSUFBSUEsV0FBV0E7b0JBRTNCQSxTQUFTQSxzQkFBR0EsR0FBSEE7b0JBQ1RBLFdBQVdBO29CQUNYQSxjQUFjQTtvQkFDZEE7b0JBQ0FBOztvQkFFQUEsS0FBS0EsV0FBV0EsSUFBSUEsYUFBYUE7d0JBRTdCQSxRQUFRQSx3QkFBS0EsR0FBTEE7d0JBQ1JBLElBQUlBOzRCQUFlQTs7d0JBQ25CQSxJQUFJQTs0QkFFQUE7K0JBRUNBLElBQUlBOzRCQUVMQTs7NEJBSUFBLFdBQVdBLFlBQWVBOzs7b0JBR2xDQSxJQUFJQTt3QkFBc0JBOztvQkFDMUJBLElBQUlBLDJCQUEyQkE7d0JBQzNCQSx1QkFBZUEsVUFBWUEsSUFBSUE7O29CQUNuQ0EsSUFBSUE7d0JBQ0FBLHVCQUFlQSxtQkFBbUJBOzt3QkFDakNBLElBQUlBOzRCQUNMQSx1QkFBZUEsbUJBQW1CQTs7Ozs7O2dDQUl6QkEsT0FBNkJBO2dCQUU5Q0EsNEJBQTRCQSxLQUFLQSxBQUF1QkEsK0JBQUNBLEtBQUtBO29CQUUxREEsYUFBYUE7b0JBQ2JBLGFBQWFBOzs7bUNBS0dBLE9BQTZCQTtnQkFFakRBLGFBQWFBO2dCQUNiQSxhQUFhQTs7OztnQkFJYkEsMEJBQXFCQTs7Ozt3QkFFakJBLHlCQUFrQkEsaUJBQWdCQTt3QkFDbENBLHlCQUFrQkEsU0FBUUEsdUJBQWVBO3dCQUN6Q0EseUJBQWtCQSxTQUFRQSx1QkFBZUE7Ozs7Ozs7OzsrQkFJcENBOztnQkFFVEEsMEJBQXFCQTs7Ozt3QkFFakJBLHVCQUFlQSxjQUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkE0eEJqQ0EsT0FBT0EsSUFBSUEsNEJBQVdBLFFBQUdBLFFBQUdBLFFBQUdBOzs7Ozs7OzttQ0F1QkRBLE9BQTZCQSxLQUFZQTs7b0JBRXZFQSxTQUFTQSxJQUFJQSxzQkFBWUEsT0FBT0EsTUFBTUE7b0JBQ3RDQSxVQUFVQTs7b0JBRVZBLE9BQU9BOzs7Ozs7Ozs7Ozs7OzsrQkFNNERBLEtBQUlBOzs0QkEzQnhEQSxPQUE2QkEsVUFBd0JBOzs7OztnQkFFcEVBLGFBQWFBO2dCQUNiQSxJQUFJQSxZQUFZQTs7b0JBS1pBLDRCQUE0QkEsVUFBVUEsQUFBdUJBLCtCQUFDQSxLQUFLQTt3QkFFL0RBLFlBQVlBOzs7Z0JBSXBCQSxlQUFlQTs7Ozs4QkFjQ0E7Z0JBRWhCQSxXQUFXQSxXQUFXQTtnQkFDdEJBLGtCQUFrQkE7Z0JBQ2xCQSxvQkFBb0JBO2dCQUNwQkEscUJBQXFCQTtnQkFDckJBLFFBQVFBLFlBQVVBOztnQkFFbEJBLEtBQUtBLFdBQVdBLElBQUlBLFVBQVVBO29CQUUxQkEsU0FBU0EsWUFBVUEscUJBQUVBLEdBQUZBO29CQUNuQkEsUUFBUUEsSUFBSUE7b0JBQ1pBLE1BQU1BLENBQUNBLHFDQUFPQSxxRkFBZ0JBO29CQUM5QkEsTUFBTUEsQ0FBQ0EscUNBQU9BLHFGQUFnQkE7b0JBQzlCQSxNQUFNQSxDQUFDQSxxQ0FBT0EscUZBQWNBO29CQUM1QkEsTUFBTUEsQ0FBQ0EscUNBQU9BLHFGQUFjQTtvQkFDNUJBLFVBQVVBLHFDQUFPQTtvQkFDakJBLFVBQVVBLHFDQUFPQTtvQkFDakJBLHFCQUFhQSxZQUFRQSwrQ0FBU0E7Ozs7cUNBSVpBLElBQWtCQSxPQUFjQSxNQUFpQkE7Z0JBRXZFQSxJQUFJQSxnQkFBZ0JBO29CQUFNQTs7Z0JBQzFCQSxRQUFRQSxxQkFBYUE7Z0JBQ3JCQSxJQUFJQSwwQkFBS0E7b0JBQWtCQTs7O2dCQUUzQkEsa0JBQWtCQSxJQUFJQSxZQUFZQSxlQUFNQTs7Ozs7Ozs7Ozs7Ozt3QkE5b0JiQTs7OztzQkFpVERBOzs7Ozs2QkF2TVRBLElBQUlBLGFBQWFBOzs7NEJBcklqQkEsT0FBNkJBOztnQkFFOUNBLGFBQWFBO2dCQUNiQSxvQkFBb0JBO2dCQUNwQkEsV0FBV0E7Z0JBQ1hBLFVBQVVBLENBQUNBLGdEQUFnQ0E7Z0JBRTNDQTtvQkFDSUEsTUFBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQUtYQSxjQUFjQSxJQUFJQSxhQUFhQTs7Z0JBRS9CQSxnQkFBZ0JBLElBQUlBLHdCQUFjQTs7Ozs7Z0JBSWxDQTs7O2dCQUlBQTs7Z0JBRUFBOzs4QkFLZUE7Z0JBRWZBLElBQUlBLDRCQUFPQTtvQkFBVUE7O2dCQUNyQkE7O2dCQUVBQSxtQkFBbUJBOztnQkFFbkJBLFdBQVdBO2dCQUNYQSxJQUFJQSx3Q0FBd0NBO29CQUN4Q0E7O2dCQUNKQSxrQkFBa0JBLG9DQUE0QkE7O2dCQUs5Q0E7O2dCQUVBQSxJQUFJQTtvQkFFQUEsa0JBQWtCQTtvQkFDbEJBLHFCQUFxQkE7O29CQUlyQkEsbUJBQW1CQTs7O2dCQUd2QkEsSUFBSUE7b0JBR0FBLGtCQUFrQkE7b0JBQ2xCQSx5QkFBeUJBO29CQUV6QkEsNkJBQTZCQSxnQkFBZ0JBLGdDQUN6Q0Esc0JBQXNCQTs7b0JBSTFCQSxtQkFBbUJBOzs7Z0JBR3ZCQSxzQkFBc0JBO2dCQUN0QkEsc0JBQXNCQSx5QkFBeUJBOzs7O2dCQU0vQ0EsSUFBSUE7b0JBRUFBLG1DQUFtQ0E7b0JBR25DQSwrQkFBK0JBLDJCQUEyQkE7O2dCQUU5REEsSUFBSUE7b0JBRUFBLG1DQUFtQ0E7b0JBQ25DQSwrQkFBK0JBLDZCQUE2QkE7O2dCQUVoRUEsSUFBSUE7b0JBRUFBLG1DQUFtQ0E7b0JBQ25DQSwrQkFBK0JBLDhCQUE4QkE7O2dCQUVqRUEsSUFBSUE7b0JBRUFBLG1DQUFtQ0E7b0JBQ25DQSwrQkFBK0JBLDBCQUEwQkE7OztnQkFHN0RBLElBQUlBLDZCQUE2QkE7b0JBRTdCQSw0QkFBNEJBLGtDQUFrQ0EsWUFBT0EsQUFBUUE7O2dCQUVqRkEsSUFBSUEsMkJBQTJCQTtvQkFFM0JBLHlCQUF5QkE7b0JBQ3pCQSxVQUFVQTtvQkFDVkEsdUJBQXVCQSx1QkFBdUJBLE9BQU9BLE9BQU9BLE9BQU9BO29CQUNuRUEscUJBQXFCQTs7Z0JBR3pCQSxJQUFJQSwyQkFBMkJBO29CQUUzQkEseUJBQXlCQTtvQkFDekJBLFdBQVVBO29CQUNWQSx1QkFBdUJBLHVCQUF1QkEsUUFBT0EsT0FBT0EsT0FBT0E7b0JBQ25FQSxxQkFBcUJBOztnQkFHekJBLElBQUlBLDJCQUEyQkE7b0JBRTNCQSxxQkFBcUJBLHlCQUF5QkEsWUFBWUEsWUFBWUEsWUFBWUE7O2dCQUd0RkEsSUFBSUEsMkJBQTJCQTtvQkFFM0JBLHFCQUFxQkEseUJBQXlCQSxZQUFZQSxZQUFZQSxZQUFZQTs7Ozs7Z0JBU3RGQSxXQUFXQTtnQkFDWEEsSUFBSUE7b0JBQ0FBOztnQkFFSkEsc0JBQXNCQSx5QkFBeUJBLFlBQVlBO2dCQUUzREEsc0JBQXNCQSx5QkFBeUJBOztnQkFLL0NBOzsrQkFFZ0JBO2dCQUVoQkEsSUFBSUEsbUJBQW1CQTtvQkFBTUE7OztnQkFFN0JBLEtBQUtBLFlBQVlBLFFBQVFBO29CQUVyQkEsUUFBUUEsU0FBU0EsS0FBS0EsTUFBSUE7O29CQUcxQkEsUUFBUUE7O29CQUVSQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTtvQkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO29CQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7b0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTtvQkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO29CQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7b0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTtvQkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO29CQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7b0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTtvQkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO29CQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7b0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTs7b0JBRWxCQTs7O2dCQUdKQSxJQUFJQTtvQkFFQUE7Ozs4QkFHV0E7Z0JBRWZBLElBQUlBLG1CQUFtQkE7b0JBQU1BOzs7O29CQUd6QkEsS0FBS0EsV0FBV0EsT0FBT0E7d0JBRW5CQSxRQUFRQTt3QkFLUkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7d0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO3dCQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7d0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO3dCQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7d0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO3dCQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7d0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO3dCQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7O3dCQUVsQkE7Ozs7Z0JBaUJSQSxJQUFJQTtvQkFFQUE7Ozs7K0JBTVlBO2dCQUVoQkEsSUFBSUEsd0NBQW1CQTtvQkFBa0JBOzs7Z0JBRXpDQSxJQUFJQSxpQkFBaUJBO29CQUVqQkEsV0FBV0E7b0JBQ1hBLFdBQVdBO29CQUNYQSxXQUFXQTtvQkFDWEEsV0FBV0E7b0JBQ1hBLFdBQVdBO29CQUNYQSxXQUFXQTtvQkFDWEEsV0FBV0E7b0JBQ1hBLFdBQVdBO29CQUNYQSxZQUFZQSxPQUFPQTtvQkFDbkJBLFlBQVlBLE9BQU9BO29CQUNuQkEsWUFBWUEsT0FBT0E7b0JBQ25CQSxZQUFZQSxPQUFPQTtvQkFDbkJBLFNBQVNBLFNBQVNBLE1BQU1BO29CQUN4QkEsU0FBU0EsU0FBU0EsTUFBTUEsNENBQXdCQTtvQkFDaERBLFNBQVNBLFNBQVNBLE1BQU1BO29CQUN4QkEsU0FBU0EsU0FBU0EsTUFBTUEsNENBQXdCQTtvQkFDaERBLFNBQVNBLENBQUNBLEtBQUtBLFFBQVFBO29CQUN2QkEsU0FBU0EsQ0FBQ0EsS0FBS0EsUUFBUUE7b0JBQ3ZCQSxTQUFTQSxDQUFDQSxLQUFLQSxRQUFRQTtvQkFDdkJBLFNBQVNBLENBQUNBLEtBQUtBLFFBQVFBO29CQUN2QkEsT0FBT0EsT0FBT0EsS0FBS0E7b0JBQ25CQSxPQUFPQSxPQUFPQSxLQUFLQTtvQkFDbkJBLE9BQU9BLE9BQU9BLEtBQUtBO29CQUNuQkEsT0FBT0EsT0FBT0EsS0FBS0E7b0JBQ25CQSxLQUFLQSxZQUFZQSxRQUFRQTt3QkFFckJBLFFBQVFBLFNBQVNBLEtBQUtBLE1BQUlBOzt3QkFHMUJBLFFBQVFBOzt3QkFFUkEsUUFBUUEsc0JBQUdBLEdBQUhBO3dCQUNSQSxJQUFJQSxJQUFJQTs0QkFBSUEsSUFBSUE7O3dCQUNoQkEsSUFBSUEsSUFBSUE7NEJBQUlBLElBQUlBOzt3QkFDaEJBLFFBQVFBLHNCQUFHQSxHQUFIQTt3QkFDUkEsSUFBSUEsSUFBSUE7NEJBQUlBLElBQUlBOzt3QkFDaEJBLElBQUlBLElBQUlBOzRCQUFJQSxJQUFJQTs7d0JBQ2hCQSxRQUFRQSxzQkFBR0EsR0FBSEE7d0JBQ1JBLElBQUlBLElBQUlBOzRCQUFNQSxJQUFJQTs7d0JBQ2xCQSxJQUFJQSxJQUFJQTs0QkFBTUEsSUFBSUE7O3dCQUNsQkEsUUFBUUEsc0JBQUdBLEdBQUhBO3dCQUNSQSxJQUFJQSxJQUFJQTs0QkFBTUEsSUFBSUE7O3dCQUNsQkEsSUFBSUEsSUFBSUE7NEJBQU1BLElBQUlBOzt3QkFDbEJBLDJCQUFXQSx5QkFBT0E7d0JBQ2xCQSwyQkFBV0EseUJBQU9BO3dCQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7d0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO3dCQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7d0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO3dCQUNsQkEsMkJBQVdBLHlCQUFPQSxzQkFBR0EsR0FBSEE7d0JBQ2xCQSwyQkFBV0EseUJBQU9BLHNCQUFHQSxHQUFIQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0Esc0JBQUdBLEdBQUhBO3dCQUNsQkEsMkJBQVdBLHlCQUFPQTt3QkFDbEJBLDJCQUFXQSx5QkFBT0E7O3dCQUVsQkE7OztvQkFLSkEsS0FBS0EsYUFBWUEsU0FBUUE7d0JBRXJCQSxTQUFRQSxVQUFTQSxNQUFLQSxNQUFJQTs7d0JBRzFCQSxTQUFRQTs7d0JBRVJBLDJCQUFXQSw0QkFBT0Esc0JBQUdBLElBQUhBO3dCQUNsQkEsMkJBQVdBLDRCQUFPQSxzQkFBR0EsSUFBSEE7d0JBQ2xCQSwyQkFBV0EsNEJBQU9BLHNCQUFHQSxJQUFIQTt3QkFDbEJBLDJCQUFXQSw0QkFBT0Esc0JBQUdBLElBQUhBO3dCQUNsQkEsMkJBQVdBLDRCQUFPQSxzQkFBR0EsSUFBSEE7d0JBQ2xCQSwyQkFBV0EsNEJBQU9BLHNCQUFHQSxJQUFIQTt3QkFDbEJBLDJCQUFXQSw0QkFBT0Esc0JBQUdBLElBQUhBO3dCQUNsQkEsMkJBQVdBLDRCQUFPQSxzQkFBR0EsSUFBSEE7d0JBQ2xCQSwyQkFBV0EsNEJBQU9BLHNCQUFHQSxJQUFIQTt3QkFDbEJBLDJCQUFXQSw0QkFBT0Esc0JBQUdBLElBQUhBO3dCQUNsQkEsMkJBQVdBLDRCQUFPQSxzQkFBR0EsSUFBSEE7d0JBQ2xCQSwyQkFBV0EsNEJBQU9BLHNCQUFHQSxJQUFIQTt3QkFDbEJBLDJCQUFXQSw0QkFBT0Esc0JBQUdBLElBQUhBOzt3QkFFbEJBOzs7Z0JBR1JBLElBQUlBO29CQUVBQTs7O21DQUtnQkE7Z0JBRXBCQSxnQkFBZ0JBOzs7Z0JBSWhCQSxnQkFBZ0JBOzs7Ozs7Ozs7Ozs7Z0NBbmV1QkEsSUFBSUE7Ozs7Ozs7Ozs7OzRCQVgzQkEsR0FBYUEsR0FBYUEsR0FBYUE7Ozs7Ozs7Z0JBRXZEQSxTQUFTQTtnQkFDVEEsU0FBU0E7Z0JBQ1RBLFNBQVNBO2dCQUNUQSxTQUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkV2T09BLE9BQTZCQSxPQUFhQTs7Z0JBRTFEQSxhQUFhQTtnQkFDYkEsYUFBYUE7Z0JBQ2JBLGNBQWNBO2dCQUNkQSxxQkFBcUJBLElBQUlBLHdCQUFjQSxPQUFPQTs7OzttQ0FLMUJBLFNBQXVCQSxNQUFpQkEsUUFBb0JBOztnQkFJaEZBLElBQUlBLFNBQVNBO29CQUNUQSxRQUFRQTs7Z0JBQ1pBLGFBQWFBLG9CQUFvQkEsaUJBQVFBLGVBQU1BOzt5Q0FFckJBLFNBQXVCQSxNQUFnQkEsTUFBaUJBLFFBQW9CQSxPQUEwQkE7OztnQkFJaElBLElBQUlBLFNBQVNBO29CQUNUQSxRQUFRQTs7Z0JBQ1pBLElBQUlBLFVBQVVBO29CQUNWQSxTQUFTQTs7Z0JBQ2JBLG1CQUFtQkEsb0JBQW9CQSxNQUFNQSxpQkFBUUEsZUFBTUEsT0FBT0E7O2tDQUUvQ0EsT0FBY0EsUUFBZUEsTUFBaUJBOztnQkFFakVBLElBQUlBLFNBQVNBO29CQUNUQSxRQUFRQTs7O2dCQUVaQSxRQUFRQSxtQ0FBeUJBLFlBQVlBO2dCQUM3Q0EsSUFBSUEsS0FBS0E7b0JBQU1BOztnQkFDZkEsUUFBUUEsa0JBQVVBO2dCQUNsQkEsSUFBSUEsMEJBQUtBO29CQUFrQkE7O2dCQUMzQkEsSUFBSUEsYUFBYUE7b0JBQU1BOzs7Z0JBRXZCQSxlQUFlQSxvQkFBb0JBLFlBQVlBLGVBQU1BOzt3Q0FFNUJBLE9BQWNBLFFBQWVBLE1BQWdCQSxNQUFpQkEsT0FBMEJBOzs7Z0JBRWpIQSxJQUFJQSxTQUFTQTtvQkFDVEEsUUFBUUE7O2dCQUNaQSxJQUFJQSxVQUFVQTtvQkFDVkEsU0FBU0E7O2dCQUNiQSxRQUFRQSxtQ0FBeUJBLFlBQVlBO2dCQUM3Q0EsSUFBSUEsS0FBS0E7b0JBQU1BOztnQkFDZkEsUUFBUUEsa0JBQVVBO2dCQUNsQkEsSUFBSUEsMEJBQUtBO29CQUFrQkE7O2dCQUMzQkEsSUFBSUEsYUFBYUE7b0JBQU1BOzs7Z0JBRXZCQSxxQkFBcUJBLG9CQUFvQkEsTUFBTUEsWUFBWUEsZUFBTUEsT0FBT0E7O21DQUVwREEsT0FBY0EsUUFBZUEsTUFBaUJBLFFBQXFCQTs7Z0JBRXZGQSxJQUFJQSxTQUFTQTtvQkFDVEEsUUFBUUE7O2dCQUNaQSxRQUFRQSxtQ0FBeUJBLFlBQVlBO2dCQUM3Q0EsSUFBSUEsS0FBS0E7b0JBQU1BOztnQkFDZkEsU0FBU0Esa0JBQVVBO2dCQUNuQkEsSUFBSUEsMkJBQU1BO29CQUFrQkE7OztnQkFFNUJBLFFBQVFBLENBQUNBLGdCQUFnQkE7Z0JBQ3pCQSxRQUFRQSxDQUFDQSxnQkFBZ0JBO2dCQUN6QkEsUUFBUUEsQ0FBQ0EsZ0JBQWdCQTtnQkFDekJBLFFBQVFBLENBQUNBLGdCQUFnQkE7Z0JBRXpCQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBOztnQkFFaEJBLGVBQWVBO2dCQUNmQSxlQUFlQTtnQkFDZkEsZUFBZUE7Z0JBQ2ZBLGVBQWVBO2dCQUNmQSxlQUFlQSxvQkFBb0JBLHNCQUFhQSxxQkFBWUE7O2dCQUc1REEsZ0JBQWdCQSxPQUFPQTtnQkFDdkJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBLE9BQU9BLElBQUlBO2dCQUMzQkEsZ0JBQWdCQTs7Z0JBRWhCQSxlQUFlQSxTQUFTQTtnQkFDeEJBLGVBQWVBO2dCQUNmQSxlQUFlQSxTQUFTQSxXQUFXQTtnQkFDbkNBLGVBQWVBO2dCQUNmQSxlQUFlQSxvQkFBb0JBLHNCQUFhQSxxQkFBWUE7Z0JBRTVEQSxnQkFBZ0JBLE9BQU9BLE9BQU9BO2dCQUM5QkEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBOztnQkFFaEJBLGVBQWVBLFNBQVNBLFNBQVNBO2dCQUNqQ0EsZUFBZUE7Z0JBQ2ZBLGVBQWVBO2dCQUNmQSxlQUFlQTtnQkFDZkEsZUFBZUEsb0JBQW9CQSxzQkFBYUEscUJBQVlBO2dCQUU1REEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkEsT0FBT0E7Z0JBQ3ZCQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQSxPQUFPQSxJQUFJQTs7Z0JBRTNCQSxlQUFlQTtnQkFDZkEsZUFBZUEsU0FBU0E7Z0JBQ3hCQSxlQUFlQTtnQkFDZkEsZUFBZUEsU0FBU0EsV0FBV0E7Z0JBQ25DQSxlQUFlQSxvQkFBb0JBLHNCQUFhQSxxQkFBWUE7Z0JBRTVEQSxnQkFBZ0JBLE9BQU9BO2dCQUN2QkEsZ0JBQWdCQSxPQUFPQTtnQkFDdkJBLGdCQUFnQkEsT0FBT0EsSUFBSUE7Z0JBQzNCQSxnQkFBZ0JBLE9BQU9BLElBQUlBOztnQkFFM0JBLGVBQWVBLFNBQVNBO2dCQUN4QkEsZUFBZUEsU0FBU0E7Z0JBQ3hCQSxlQUFlQSxTQUFTQSxXQUFXQTtnQkFDbkNBLGVBQWVBLFNBQVNBLFdBQVdBO2dCQUNuQ0EsZUFBZUEsb0JBQW9CQSxzQkFBYUEscUJBQVlBO2dCQUU1REEsZ0JBQWdCQSxPQUFPQSxPQUFPQTtnQkFDOUJBLGdCQUFnQkEsT0FBT0E7Z0JBQ3ZCQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQSxPQUFPQSxJQUFJQTs7Z0JBRTNCQSxlQUFlQSxTQUFTQSxTQUFTQTtnQkFDakNBLGVBQWVBLFNBQVNBO2dCQUN4QkEsZUFBZUE7Z0JBQ2ZBLGVBQWVBLFNBQVNBLFdBQVdBO2dCQUNuQ0EsZUFBZUEsb0JBQW9CQSxzQkFBYUEscUJBQVlBOztnQkFHNURBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBLE9BQU9BLE9BQU9BO2dCQUM5QkEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkE7O2dCQUVoQkEsZUFBZUE7Z0JBQ2ZBLGVBQWVBLFNBQVNBLFNBQVNBO2dCQUNqQ0EsZUFBZUE7Z0JBQ2ZBLGVBQWVBO2dCQUNmQSxlQUFlQSxvQkFBb0JBLHNCQUFhQSxxQkFBWUE7Z0JBRTVEQSxnQkFBZ0JBLE9BQU9BO2dCQUN2QkEsZ0JBQWdCQSxPQUFPQSxPQUFPQTtnQkFDOUJBLGdCQUFnQkEsT0FBT0EsSUFBSUE7Z0JBQzNCQSxnQkFBZ0JBOztnQkFFaEJBLGVBQWVBLFNBQVNBO2dCQUN4QkEsZUFBZUEsU0FBU0EsU0FBU0E7Z0JBQ2pDQSxlQUFlQSxTQUFTQSxXQUFXQTtnQkFDbkNBLGVBQWVBO2dCQUNmQSxlQUFlQSxvQkFBb0JBLHNCQUFhQSxxQkFBWUE7Z0JBRTVEQSxnQkFBZ0JBLE9BQU9BLE9BQU9BO2dCQUM5QkEsZ0JBQWdCQSxPQUFPQSxPQUFPQTtnQkFDOUJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBO2dCQUNoQkEsZUFBZUEsU0FBU0EsU0FBU0E7Z0JBQ2pDQSxlQUFlQSxTQUFTQSxTQUFTQTtnQkFDakNBLGVBQWVBO2dCQUNmQSxlQUFlQTtnQkFDZkEsZUFBZUEsb0JBQW9CQSxzQkFBYUEscUJBQVlBOzs7eUNBR2xDQSxPQUFjQSxRQUFlQSxNQUFnQkEsTUFBaUJBLFFBQXFCQSxPQUEwQkE7OztnQkFFdklBLElBQUlBLFNBQVNBO29CQUNUQSxRQUFRQTs7Z0JBQ1pBLElBQUlBLFVBQVVBO29CQUNWQSxTQUFTQTs7Z0JBQ2JBLFFBQVFBLG1DQUF5QkEsWUFBWUE7Z0JBQzdDQSxJQUFJQSxLQUFLQTtvQkFBTUE7O2dCQUNmQSxTQUFTQSxrQkFBVUE7Z0JBQ25CQSxJQUFJQSwyQkFBTUE7b0JBQWtCQTs7O2dCQUU1QkEsUUFBUUEsQ0FBQ0EsZ0JBQWdCQTtnQkFDekJBLFFBQVFBLENBQUNBLGdCQUFnQkE7Z0JBQ3pCQSxRQUFRQSxDQUFDQSxnQkFBZ0JBO2dCQUN6QkEsUUFBUUEsQ0FBQ0EsZ0JBQWdCQTtnQkFFekJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkE7O2dCQUVoQkEsZUFBZUE7Z0JBQ2ZBLGVBQWVBO2dCQUNmQSxlQUFlQTtnQkFDZkEsZUFBZUE7Z0JBQ2ZBLHFCQUFxQkEsb0JBQW9CQSxNQUFNQSxzQkFBYUEscUJBQVlBLE9BQU9BOztnQkFHL0VBLGdCQUFnQkEsT0FBT0E7Z0JBQ3ZCQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQSxPQUFPQSxJQUFJQTtnQkFDM0JBLGdCQUFnQkE7O2dCQUVoQkEsZUFBZUEsU0FBU0E7Z0JBQ3hCQSxlQUFlQTtnQkFDZkEsZUFBZUEsU0FBU0EsV0FBV0E7Z0JBQ25DQSxlQUFlQTtnQkFDZkEscUJBQXFCQSxvQkFBb0JBLE1BQU1BLHNCQUFhQSxxQkFBWUEsT0FBT0E7Z0JBRS9FQSxnQkFBZ0JBLE9BQU9BLE9BQU9BO2dCQUM5QkEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBOztnQkFFaEJBLGVBQWVBLFNBQVNBLFNBQVNBO2dCQUNqQ0EsZUFBZUE7Z0JBQ2ZBLGVBQWVBO2dCQUNmQSxlQUFlQTtnQkFDZkEscUJBQXFCQSxvQkFBb0JBLE1BQU1BLHNCQUFhQSxxQkFBWUEsT0FBT0E7Z0JBRS9FQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQSxPQUFPQTtnQkFDdkJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBLE9BQU9BLElBQUlBOztnQkFFM0JBLGVBQWVBO2dCQUNmQSxlQUFlQSxTQUFTQTtnQkFDeEJBLGVBQWVBO2dCQUNmQSxlQUFlQSxTQUFTQSxXQUFXQTtnQkFDbkNBLHFCQUFxQkEsb0JBQW9CQSxNQUFNQSxzQkFBYUEscUJBQVlBLE9BQU9BO2dCQUUvRUEsZ0JBQWdCQSxPQUFPQTtnQkFDdkJBLGdCQUFnQkEsT0FBT0E7Z0JBQ3ZCQSxnQkFBZ0JBLE9BQU9BLElBQUlBO2dCQUMzQkEsZ0JBQWdCQSxPQUFPQSxJQUFJQTs7Z0JBRTNCQSxlQUFlQSxTQUFTQTtnQkFDeEJBLGVBQWVBLFNBQVNBO2dCQUN4QkEsZUFBZUEsU0FBU0EsV0FBV0E7Z0JBQ25DQSxlQUFlQSxTQUFTQSxXQUFXQTtnQkFDbkNBLHFCQUFxQkEsb0JBQW9CQSxNQUFNQSxzQkFBYUEscUJBQVlBLE9BQU9BO2dCQUUvRUEsZ0JBQWdCQSxPQUFPQSxPQUFPQTtnQkFDOUJBLGdCQUFnQkEsT0FBT0E7Z0JBQ3ZCQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQSxPQUFPQSxJQUFJQTs7Z0JBRTNCQSxlQUFlQSxTQUFTQSxTQUFTQTtnQkFDakNBLGVBQWVBLFNBQVNBO2dCQUN4QkEsZUFBZUE7Z0JBQ2ZBLGVBQWVBLFNBQVNBLFdBQVdBO2dCQUNuQ0EscUJBQXFCQSxvQkFBb0JBLE1BQU1BLHNCQUFhQSxxQkFBWUEsT0FBT0E7O2dCQUcvRUEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkEsT0FBT0EsT0FBT0E7Z0JBQzlCQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQTs7Z0JBRWhCQSxlQUFlQTtnQkFDZkEsZUFBZUEsU0FBU0EsU0FBU0E7Z0JBQ2pDQSxlQUFlQTtnQkFDZkEsZUFBZUE7Z0JBQ2ZBLHFCQUFxQkEsb0JBQW9CQSxNQUFNQSxzQkFBYUEscUJBQVlBLE9BQU9BO2dCQUUvRUEsZ0JBQWdCQSxPQUFPQTtnQkFDdkJBLGdCQUFnQkEsT0FBT0EsT0FBT0E7Z0JBQzlCQSxnQkFBZ0JBLE9BQU9BLElBQUlBO2dCQUMzQkEsZ0JBQWdCQTs7Z0JBRWhCQSxlQUFlQSxTQUFTQTtnQkFDeEJBLGVBQWVBLFNBQVNBLFNBQVNBO2dCQUNqQ0EsZUFBZUEsU0FBU0EsV0FBV0E7Z0JBQ25DQSxlQUFlQTtnQkFDZkEscUJBQXFCQSxvQkFBb0JBLE1BQU1BLHNCQUFhQSxxQkFBWUEsT0FBT0E7Z0JBRS9FQSxnQkFBZ0JBLE9BQU9BLE9BQU9BO2dCQUM5QkEsZ0JBQWdCQSxPQUFPQSxPQUFPQTtnQkFDOUJBLGdCQUFnQkE7Z0JBQ2hCQSxnQkFBZ0JBO2dCQUNoQkEsZUFBZUEsU0FBU0EsU0FBU0E7Z0JBQ2pDQSxlQUFlQSxTQUFTQSxTQUFTQTtnQkFDakNBLGVBQWVBO2dCQUNmQSxlQUFlQTtnQkFDZkEscUJBQXFCQSxvQkFBb0JBLE1BQU1BLHNCQUFhQSxxQkFBWUEsT0FBT0E7OztnQ0FROURBLE1BQWNBLE1BQWNBLE1BQWtCQSxPQUEwQkE7OztnQkFFekZBLElBQUlBLFNBQVNBO29CQUNUQSxRQUFRQTs7Z0JBQ1pBLElBQUlBLFVBQVVBO29CQUNWQSxTQUFTQTs7Z0JBQ2JBLFFBQVFBLGtDQUF3QkEsWUFBWUE7Z0JBQzVDQSxJQUFJQSxLQUFLQTtvQkFBTUE7O2dCQUNmQSxJQUFJQSwrQkFBVUE7b0JBQWtCQTs7Z0JBQ2hDQTtnQkFDQUEsS0FBS0EsV0FBV0EsSUFBSUEsYUFBYUE7b0JBRTdCQSxRQUFRQSxZQUFZQTtvQkFDcEJBLFlBQVlBLE9BQU9BO29CQUNuQkEsSUFBSUEsOEJBQVNBO3dCQUVUQTs7b0JBRUpBLFFBQVFBLFNBQVNBOztvQkFFakJBLGVBQWVBLFNBQVNBLE9BQU9BLGdCQUFnQkE7O29CQUUvQ0EsZUFBZUEsU0FBU0EsZ0JBQWdCQSxJQUFJQSxhQUFhQTs7O29CQUt6REEsZUFBZUEsSUFBSUE7b0JBQ25CQSxlQUFlQSxJQUFJQTs7b0JBRW5CQSxlQUFRQSxtQkFBa0JBO29CQUMxQkEsSUFBSUEsUUFBUUE7d0JBQ1JBOztvQkFDSkEsT0FBT0Esb0JBQW9CQSxPQUFPQSxxQkFBWUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozt3QkZwRXJEQSxPQUFPQSxJQUFJQTs7Ozs7O2lDQUd3QkEsSUFBSUE7Z0NBQ0xBLElBQUlBOzs7Ozs7Ozs7Ozs0QkFuQjNCQSxHQUFhQSxHQUFhQSxHQUFhQTs7Ozs7OztnQkFFdERBLFNBQVNBO2dCQUNUQSxTQUFTQTtnQkFDVEEsU0FBU0E7Z0JBQ1RBLFNBQVNBOzs7Ozs7OzttQ0FnMkJvQkEsT0FBNkJBLEtBQVlBOztvQkFFdEVBLFNBQVNBLElBQUlBLHFCQUFXQSxPQUFPQSxNQUFNQTtvQkFDckNBLFVBQVVBO29CQUNWQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkE0Q0RBLFVBQUlBO29CQUNUQSxVQUFJQTtvQkFDSkEsVUFBSUE7b0JBQ0pBLFVBQUlBOzs7NEJBcEVTQSxPQUE2QkEsV0FBa0JBOztnQkFFN0RBLGFBQWFBO2dCQUNiQSxJQUFJQSxhQUFhQTtvQkFFYkEsNEJBQTRCQSxXQUFXQSxBQUF1QkEsK0JBQUNBLEtBQUtBO3dCQUVoRUEsWUFBWUE7OztnQkFJcEJBLGVBQWVBO2dCQUNmQSxXQUFXQSxJQUFJQTtnQkFDZkE7Z0JBQ0FBLGdCQUFnQkE7Z0JBQ2hCQTs7Ozs4QkFRZUE7O2dCQUVmQSxTQUFTQSxJQUFJQTtnQkFDYkEsV0FBV0EsV0FBV0E7O2dCQUd0QkEsV0FBV0EsWUFBVUE7Z0JBQ3JCQSxnQkFBZ0JBLFlBQVFBO2dCQUN4QkEsaUJBQWlCQSxxQ0FBT0E7Z0JBQ3hCQSxlQUFlQSxxQ0FBT0E7Z0JBQ3RCQSxrQkFBa0JBLHFDQUFPQTtnQkFDekJBLGdCQUFnQkEscUNBQU9BO2dCQUN2QkEsa0JBQWtCQSxxQ0FBT0E7Z0JBQ3pCQSxtQkFBbUJBLHFDQUFPQTs7Z0JBRzFCQSxZQUFZQTtnQkFDWkEsVUFBVUE7Z0JBQ1ZBLDBCQUFrQkEsMkJBQTJCQTs7Ozt3QkFFekNBLFlBQVlBLElBQUlBO3dCQUNoQkEsVUFBVUEsS0FBS0E7d0JBQ2ZBLFVBQVVBLHdCQUFJQSxtQ0FBc0JBO3dCQUNwQ0EsVUFBVUEsd0JBQUlBLG1DQUFzQkE7d0JBQ3BDQSxVQUFVQSx3QkFBSUEsbUNBQXNCQTt3QkFDcENBLFVBQVVBLHdCQUFJQSxtQ0FBc0JBO3dCQUNwQ0EsY0FBY0Esd0JBQUlBO3dCQUNsQkEsY0FBY0Esd0JBQUlBO3dCQUNsQkEsZ0JBQWdCQSx3QkFBSUE7d0JBQ3BCQSxnQkFBZ0JBLHdCQUFJQTt3QkFDcEJBLGtCQUFrQkEsd0JBQUlBOzs7Ozs7O2dCQUUxQkEsTUFBTUE7Z0JBQ05BLE9BQU9BOzs7Z0JBR1BBLFNBQVNBLElBQUlBO2dCQUNiQSxRQUFRQSxLQUFLQTtnQkFDYkEseUJBQWtCQSxvQ0FBZUE7Ozs0QkFTcEJBLElBQWtCQSxHQUFZQSxNQUFpQkEsR0FBc0JBOzs7Z0JBRWxGQSxJQUFJQSxLQUFLQTtvQkFDTEEsSUFBSUE7O2dCQUNSQSxJQUFJQSxlQUFlQTtvQkFDZkEsY0FBY0EsSUFBSUE7OztvQkFHbEJBLFFBQVFBO29CQUNSQSxNQUFNQTtvQkFBUUEsTUFBTUEsU0FBU0E7b0JBQVFBO29CQUNyQ0EsTUFBTUE7b0JBQUtBLE1BQU1BLE1BQU1BO29CQUN2QkEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQ3ZDQSxPQUFPQTtvQkFBZUEsT0FBT0E7b0JBQWVBLE9BQU9BO29CQUFlQSxPQUFPQTs7b0JBRXpFQSxJQUFJQTtvQkFDSkEsTUFBTUEsU0FBU0E7b0JBQVFBLE1BQU1BLFNBQVNBO29CQUFRQTtvQkFDOUNBLE1BQU1BLE1BQU1BO29CQUFLQSxNQUFNQSxNQUFNQTtvQkFDN0JBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUN2Q0EsT0FBT0E7b0JBQWVBLE9BQU9BO29CQUFlQSxPQUFPQTtvQkFBZUEsT0FBT0E7O29CQUV6RUEsSUFBSUE7b0JBQ0pBLE1BQU1BO29CQUFRQSxNQUFNQTtvQkFBUUE7b0JBQzVCQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQ2pCQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFDdkNBLE9BQU9BO29CQUFlQSxPQUFPQTtvQkFBZUEsT0FBT0E7b0JBQWVBLE9BQU9BOztvQkFFekVBLElBQUlBO29CQUNKQSxNQUFNQSxTQUFTQTtvQkFBUUEsTUFBTUE7b0JBQVFBO29CQUNyQ0EsTUFBTUEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUN2QkEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQ3ZDQSxPQUFPQTtvQkFBZUEsT0FBT0E7b0JBQWVBLE9BQU9BO29CQUFlQSxPQUFPQTs7Z0JBRTdFQSxVQUFVQTtnQkFDVkEsV0FBV0E7O2dDQUdNQSxJQUFrQkEsT0FBY0EsTUFBaUJBLEdBQXNCQTs7O2dCQUV4RkEsUUFBUUEsVUFBVUE7Z0JBQ2xCQSxJQUFJQSwwQkFBS0E7b0JBQWtCQTs7Z0JBQzNCQSxJQUFJQSxLQUFLQTtvQkFDTEEsSUFBSUE7O2dCQUNSQSxJQUFJQSxlQUFlQTtvQkFDZkEsY0FBY0EsSUFBSUE7OztvQkFFbEJBLFFBQVFBO29CQUNSQSxNQUFNQTtvQkFBUUEsTUFBTUE7b0JBQVFBO29CQUM1QkEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUNqQkEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQ3ZDQSxPQUFPQTtvQkFBZUEsT0FBT0E7b0JBQWVBLE9BQU9BO29CQUFlQSxPQUFPQTs7b0JBRXpFQSxJQUFJQTtvQkFDSkEsTUFBTUEsU0FBU0E7b0JBQVFBLE1BQU1BO29CQUFRQTtvQkFDckNBLE1BQU1BLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFDdkJBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUN2Q0EsT0FBT0E7b0JBQWVBLE9BQU9BO29CQUFlQSxPQUFPQTtvQkFBZUEsT0FBT0E7O29CQUV6RUEsSUFBSUE7b0JBQ0pBLE1BQU1BO29CQUFRQSxNQUFNQSxTQUFTQTtvQkFBUUE7b0JBQ3JDQSxNQUFNQTtvQkFBS0EsTUFBTUEsTUFBTUE7b0JBQ3ZCQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFDdkNBLE9BQU9BO29CQUFlQSxPQUFPQTtvQkFBZUEsT0FBT0E7b0JBQWVBLE9BQU9BOztvQkFFekVBLElBQUlBO29CQUNKQSxNQUFNQSxTQUFTQTtvQkFBUUEsTUFBTUEsU0FBU0E7b0JBQVFBO29CQUM5Q0EsTUFBTUEsTUFBTUE7b0JBQUtBLE1BQU1BLE1BQU1BO29CQUM3QkEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQ3ZDQSxPQUFPQTtvQkFBZUEsT0FBT0E7b0JBQWVBLE9BQU9BO29CQUFlQSxPQUFPQTs7O2dCQUc3RUEsVUFBVUE7Z0JBQ1ZBLFdBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBdC9CeUJBLElBQUlBO2dDQUNIQSxJQUFJQTs7Ozs7Ozs7Ozs7Ozs7OEJBWjNCQSxHQUFhQSxHQUFhQSxHQUFhQTs7Ozs7OztnQkFFckRBLFNBQVNBO2dCQUNUQSxTQUFTQTtnQkFDVEEsU0FBU0E7Z0JBQ1RBLFNBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQTBwQnVCQSxPQUE2QkEsS0FBc0JBLFFBQTJDQSxRQUFxQkE7Ozs7b0JBRW5KQSxTQUFTQSxJQUFJQSx3QkFBY0EsT0FBT0EsTUFBTUEsUUFBUUEsUUFBUUE7b0JBQ3hEQSxhQUFhQTtvQkFDYkEsU0FBU0E7b0JBQ1RBLFlBQVlBLFFBQVFBOztvQkFFcEJBLE9BQU9BOzs7Ozs7O2lCQWJtQkE7Ozs7OztpQkFnQlBBOzs7Ozs7Ozs7Ozs7O29CQStCbkJBLFVBQUlBO29CQUNKQSxVQUFJQTtvQkFDSkEsVUFBSUE7b0JBQ0pBLFVBQUlBOzs7NEJBeklhQSxPQUE2QkEsS0FBbUJBLFFBQTJDQSxRQUFxQkE7Ozs7Ozs7Z0JBRWpJQSxhQUFhQTtnQkFDYkEsY0FBY0E7O2dCQUVkQSxXQUFXQSxJQUFJQTtnQkFDZkEsZ0JBQWdCQTtnQkFDaEJBO2dCQUNBQTs7Z0JBRUFBLElBQUlBLE9BQU9BO29CQUNQQTs7Z0JBQ0pBLGVBQWVBOztnQkFFZkEsV0FBV0E7Z0JBQ1hBLGVBQWVBO2dCQUNmQSxrQkFBa0JBLCtCQUFDQTtvQkFFZkEsSUFBSUE7d0JBRUFBLFdBQVdBO3dCQUNYQTs7b0JBRUpBLGNBQWNBLFFBQVFBOzs7Ozs7Z0NBSVJBLFFBQWFBO2dCQUUvQkEsYUFBYUE7Z0JBQ2JBLGNBQWNBO2dCQUNkQTtnQkFDQUEsdUJBQXVCQTtnQkFDdkJBLHVCQUF1QkE7OztnQkFHdkJBLHVCQUF1QkEsdUJBQXVCQTtnQkFDOUNBLGVBQWVBO2dCQUNmQSxJQUFJQSxnQkFBZUE7b0JBQ2ZBLFdBQVdBOztvQkFDVkEsSUFBSUEsZ0JBQWVBO3dCQUNwQkEsV0FBV0E7OztnQkFDZkEsc0JBQXNCQSwwQkFFbEJBLFVBQ0FBLFVBRUFBLDBCQUNFQTs7Z0JBRU5BLElBQUlBO29CQUdBQSwwQkFBMEJBOztvQkFFMUJBLElBQUlBO3dCQUVBQSx5QkFBeUJBLHVCQUF1QkEsK0JBQStCQTt3QkFDL0VBLHlCQUF5QkEsdUJBQXVCQSwrQkFBK0JBOzt3QkFJL0VBLHlCQUF5QkEsdUJBQXVCQSwrQkFBK0JBO3dCQUMvRUEseUJBQXlCQSx1QkFBdUJBLCtCQUErQkE7Ozs7b0JBTW5GQSxJQUFJQTt3QkFFQUEseUJBQXlCQSx1QkFBdUJBLCtCQUErQkE7d0JBQy9FQSx5QkFBeUJBLHVCQUF1QkEsK0JBQStCQTs7d0JBSS9FQSx5QkFBeUJBLHVCQUF1QkEsK0JBQStCQTt3QkFDL0VBLHlCQUF5QkEsdUJBQXVCQSwrQkFBK0JBOzs7O2dCQUl2RkEsV0FBV0E7Ozs7O2lDQXlCWUE7Z0JBRXZCQSxJQUFJQSxlQUFlQTtvQkFFZkEsSUFBSUEscUJBQW9CQTt3QkFDcEJBLE1BQU1BLElBQUlBOztvQkFDZEEsT0FBT0E7O2dCQUVYQSxJQUFJQSxnQkFBZUE7b0JBQ2ZBLE1BQU1BLElBQUlBOztnQkFDZEEsSUFBSUEsZ0JBQWdCQTtvQkFBTUEsT0FBT0E7O2dCQUNqQ0EsSUFBSUEsZUFBZUE7b0JBQ2ZBLGNBQWNBLElBQUlBLG9CQUFVQSxZQUFZQSxjQUFjQSxZQUFZQSxhQUFhQTs7O2dCQUVuRkEsT0FBT0E7OztnQkFLUEEsSUFBSUEsZ0JBQWdCQSxRQUFRQSxZQUFZQTtvQkFDcENBOzs7Z0JBRUpBLElBQUlBLGdCQUFnQkE7b0JBRWhCQSx5QkFBeUJBOzs7NEJBVWhCQSxlQUE2QkEsSUFBZUEsTUFBaUJBOzs7OztvQkFNdEVBLFFBQVFBO29CQUNSQSxNQUFNQTtvQkFBUUEsTUFBTUE7b0JBQVFBO29CQUM1QkEsTUFBTUE7b0JBQU1BLE1BQU1BO29CQUNsQkEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7O29CQUV2Q0EsSUFBSUE7b0JBQ0pBLE1BQU1BLFNBQVNBO29CQUFRQSxNQUFNQTtvQkFBUUE7b0JBQ3JDQSxNQUFNQSxPQUFPQTtvQkFBTUEsTUFBTUE7b0JBQ3pCQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTs7b0JBRXZDQSxJQUFJQTtvQkFDSkEsTUFBTUE7b0JBQVFBLE1BQU1BLFNBQVNBO29CQUFRQTtvQkFDckNBLE1BQU1BO29CQUFNQSxNQUFNQSxPQUFPQTtvQkFDekJBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BOztvQkFFdkNBLElBQUlBO29CQUNKQSxNQUFNQSxTQUFTQTtvQkFBUUEsTUFBTUEsU0FBU0E7b0JBQVFBO29CQUM5Q0EsTUFBTUEsT0FBT0E7b0JBQU1BLE1BQU1BLE9BQU9BO29CQUNoQ0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7O2dCQUUzQ0EscUJBQXFCQTtnQkFDckJBLHNCQUFzQkE7OztrQ0FJSEEsZUFBNkJBLE1BQWdCQSxJQUFlQSxNQUFpQkEsR0FBZUE7Z0JBRS9HQSxZQUFZQTs7b0JBRVJBLFFBQVFBO29CQUNSQSxNQUFNQTtvQkFBUUEsTUFBTUE7b0JBQVFBO29CQUM1QkEsTUFBTUE7b0JBQU1BLE1BQU1BO29CQUNsQkEsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7O29CQUV2Q0EsSUFBSUE7b0JBQ0pBLE1BQU1BLFNBQVNBO29CQUFRQSxNQUFNQTtvQkFBUUE7b0JBQ3JDQSxNQUFNQSxPQUFPQTtvQkFBTUEsTUFBTUE7b0JBQ3pCQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTs7b0JBRXZDQSxJQUFJQTtvQkFDSkEsTUFBTUE7b0JBQVFBLE1BQU1BLFNBQVNBO29CQUFRQTtvQkFDckNBLE1BQU1BO29CQUFNQSxNQUFNQSxPQUFPQTtvQkFDekJBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7b0JBQUtBLE1BQU1BOztvQkFFdkNBLElBQUlBO29CQUNKQSxNQUFNQSxTQUFTQTtvQkFBUUEsTUFBTUEsU0FBU0E7b0JBQVFBO29CQUM5Q0EsTUFBTUEsT0FBT0E7b0JBQU1BLE1BQU1BLE9BQU9BO29CQUNoQ0EsTUFBTUE7b0JBQUtBLE1BQU1BO29CQUFLQSxNQUFNQTtvQkFBS0EsTUFBTUE7O2dCQUUzQ0EscUJBQXFCQTtnQkFDckJBLHNCQUFzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkEvcUJMQTs7Z0JBRWpCQSxhQUFhQTs7Ozs7O2dCQW1CYkEsdUJBQXVCQSxxQ0FBTUEscUNBQXdCQTtnQkFDckRBLGtCQUFrQkEscUNBQU1BLHFDQUF3QkE7Z0JBQ2hEQSxrQkFBa0JBLHFDQUFLQSxxQ0FBd0JBO2dCQUUvQ0EsYUFBYUEscUNBQU1BLHFDQUF3QkE7Z0JBQzNDQSxzQkFBc0JBLHFDQUFLQSxxQ0FBd0JBO2dCQUNuREEscUJBQXFCQSxxQ0FBS0EscUNBQXdCQTtnQkFDbERBLHVCQUF1QkEscUNBQUtBLHFDQUF3QkE7Z0JBQ3BEQSxxQkFBcUJBLHFDQUFLQSxxQ0FBd0JBO2dCQUNsREEsdUJBQXVCQSxxQ0FBS0EscUNBQXdCQTs7Z0JBSXBEQSxRQUFRQSx3QkFBd0JBO2dCQUNoQ0EsdUJBQXVCQTs7Z0JBRXZCQSxTQUFTQSx3QkFBd0JBO2dCQUNqQ0Esb0JBQW9CQTs7Z0JBRXBCQSxzQkFBc0JBLHFDQUFLQSxxQ0FBd0JBO2dCQUNuREEsMEJBQTBCQSxxQ0FBd0JBOzs7O2dCQU1sREEscUJBQXFCQTtnQkFDckJBLElBQUlBO29CQUNBQSxrQkFBa0JBOztvQkFFbEJBLG1CQUFtQkE7O2dCQUN2QkEscUJBQXFCQTs7Z0JBRXJCQSxJQUFJQTtvQkFFQUEsa0JBQWtCQTs7b0JBSWxCQSxtQkFBbUJBOztnQkFFdkJBLHlCQUF5QkE7O2dCQUV6QkEsNkJBQTZCQSxvQkFBb0JBLG9CQUM3Q0Esc0JBQXNCQTs7Z0JBRTFCQSxzQkFBc0JBO2dCQUN0QkEsc0JBQXNCQSx5QkFBeUJBOztnQkFFL0NBLHlCQUF5QkE7Z0JBQ3pCQSx1QkFBdUJBLHVCQUF1QkE7Ozs7Ozs7Ozs7Ozs7OzRCQThXakNBLE9BQTZCQSxTQUFzQkEsT0FBV0EsUUFBWUE7Ozs7Z0JBRXZGQSxZQUFZQTtnQkFDWkEsYUFBYUE7Z0JBQ2JBLGNBQWNBOztnQkFFZEEsVUFBVUE7Z0JBQ1ZBLFlBQXlCQSw2QkFBbUJBO2dCQUM1Q0Esc0JBQXNCQSxtQkFBbUJBO2dCQUN6Q0EsMkJBQTJCQSxtQkFBbUJBLHlCQUF5QkEsa0JBQ25FQTs7Z0JBRUpBLGVBQWVBLElBQUlBLFdBQVdBLDBDQUFhQTtnQkFDM0NBO2dCQUNBQSx1QkFBdUJBLFlBQVlBLGFBQWFBLFlBQVlBLHFCQUN4REE7Z0JBQ0pBLHdCQUF3QkE7Z0JBQ3hCQSxzQkFBc0JBLG1CQUFtQkE7O2dCQUV6Q0EsSUFBSUE7b0JBRUFBLFlBQVlBLElBQUlBLFdBQVdBLDJCQUFhQTtvQkFDeENBLEtBQUtBLFdBQVdBLElBQUlBLHNCQUFRQSxTQUFRQTt3QkFFaENBLFVBQVVBLEtBQUtBLFNBQVNBOzs7b0JBSzVCQSxZQUFZQTs7Ozs7Z0NBT0dBLEdBQVNBO2dCQUU1QkEsUUFBUUEsa0JBQUtBLEFBQUNBLElBQUlBO2dCQUNsQkEsUUFBUUEsa0JBQUtBLEFBQUNBLElBQUlBO2dCQUNsQkEsSUFBSUEsU0FBU0EsS0FBS0EsY0FBY0EsU0FBU0EsS0FBS0E7b0JBQWFBOztnQkFDM0RBLElBQUlBO29CQUVBQSxPQUFPQSxxQkFBVUEsb0JBQUlBLGNBQWFBOztvQkFJbENBLFFBQVFBLGdCQUFDQSxvQkFBSUEsY0FBYUE7b0JBQzFCQSxPQUFPQSxJQUFJQSxzQkFBWUEsVUFBVUEsSUFBSUEsVUFBVUEsZ0JBQVFBLFVBQVVBLGdCQUFRQSxVQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CRGp4QnZGQSxJQUFJQSwrQkFBcUJBO3dCQUNyQkEsOEJBQW9CQSxJQUFJQTs7O29CQUU1QkEsT0FBT0E7Ozs7Ozs7OzsrQkFFNkRBLEtBQUlBOzs7OzJCQUU1REEsS0FBWUEsUUFBZUEsUUFBc0JBLFFBQWFBO2dCQUcxRUEsSUFBSUEseUJBQXlCQTtvQkFJekJBLE1BQU1BLElBQUlBOztnQkFFZEEsV0FBV0EsSUFBSUE7O2dCQUVmQSxxQkFBYUEsS0FBT0E7Z0JBQ3BCQSxXQUFXQTtnQkFDWEEsY0FBY0E7Z0JBQ2RBLGNBQWNBO2dCQUNkQSxjQUFjQTtnQkFDZEEsY0FBY0E7O2lDQUVJQSxLQUFZQTtnQkFFOUJBLElBQUlBLHlCQUF5QkE7b0JBSXpCQSxNQUFNQSxJQUFJQTs7Z0JBRWRBLFdBQVdBLElBQUlBOztnQkFFZkEscUJBQWFBLEtBQU9BO2dCQUNwQkEsV0FBV0E7Z0JBQ1hBLFdBQVdBOzs2QkFFR0E7Z0JBRWRBLElBQUlBLHlCQUF5QkE7b0JBQ3pCQTs7Z0JBR0pBLFlBQVlBOztnQkFFWkEscUJBQWFBLEtBQU9BOzs4QkFFTEE7Z0JBRWZBLElBQUlBLHlCQUF5QkE7b0JBQ3pCQTs7O2dCQUVKQSxXQUFXQSxxQkFBYUE7O2dCQUd4QkE7Z0JBQ0FBLFdBQVdBOzs0QkFFV0EsT0FBNkJBO2dCQUVuREEsSUFBSUEseUJBQXlCQTtvQkFDekJBLE9BQU9BOzs7Z0JBRVhBLFdBQVdBLHFCQUFhQTtnQkFFeEJBLElBQUlBLFlBQVlBO29CQUVaQSxXQUFXQSxJQUFJQSx3QkFBY0EsT0FBT0Esb0JBQVdBLG9CQUFhQSxhQUFhQSxhQUFhQTs7Z0JBRTFGQSxPQUFPQSIsDQogICJzb3VyY2VzQ29udGVudCI6IFsNCiAgICAidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLldlYkdMO1xuXG4vL3YwLjRcbm5hbWVzcGFjZSBsaWdodHRvb2xcbntcbiAgICBwdWJsaWMgY2xhc3MgdGV4dXRyZU1nckl0ZW1cbiAgICB7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVUZXh0dXJlIHRleDtcbiAgICAgICAgcHVibGljIHN0cmluZyB1cmw7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgdXJsYWRkO1xuICAgICAgICBwdWJsaWMgdGV4dHVyZWZvcm1hdCBmb3JtYXQ7XG4gICAgICAgIHB1YmxpYyBib29sIG1pcG1hcDtcbiAgICAgICAgcHVibGljIGJvb2wgbGluZWFyO1xuICAgIH1cbiAgICBwdWJsaWMgY2xhc3MgdGV4dHVyZU1nclxuICAgIHtcblxuICAgICAgICBwcml2YXRlIHN0YXRpYyB0ZXh0dXJlTWdyIGdfdGhpcztcbiAgICAgICAgcHVibGljIHN0YXRpYyB0ZXh0dXJlTWdyIEluc3RhbmNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRleHR1cmVNZ3IuZ190aGlzID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGV4dHVyZU1nci5nX3RoaXMgPSBuZXcgdGV4dHVyZU1ncigpOy8vbmVzc1xuXG4gICAgICAgICAgICByZXR1cm4gdGV4dHVyZU1nci5nX3RoaXM7XG4gICAgICAgIH1cbiAgICAgICAgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuRGljdGlvbmFyeTxzdHJpbmcsIHRleHV0cmVNZ3JJdGVtPiBtYXBJbmZvID0gbmV3IFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkRpY3Rpb25hcnk8c3RyaW5nLCB0ZXh1dHJlTWdySXRlbT4oKTtcblxuICAgICAgICBwdWJsaWMgdm9pZCByZWcoc3RyaW5nIHVybCwgc3RyaW5nIHVybGFkZCwgdGV4dHVyZWZvcm1hdCBmb3JtYXQsIGJvb2wgbWlwbWFwLCBib29sIGxpbmVhcilcbiAgICAgICAge1xuICAgICAgICAgICAgLy/ph43lpI3ms6jlhozlpITnkIZcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkodXJsKSlcbiAgICAgICAgICAgIC8vdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bdXJsXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gIT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwieW91IGNhbid0IHJlZyB0aGUgc2FtZSBuYW1lXCIpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgdGV4dXRyZU1nckl0ZW0oKTsvL25lc3NcblxuICAgICAgICAgICAgdGhpcy5tYXBJbmZvW3VybF0gPSBpdGVtO1xuICAgICAgICAgICAgaXRlbS51cmwgPSB1cmw7XG4gICAgICAgICAgICBpdGVtLnVybGFkZCA9IHVybGFkZDtcbiAgICAgICAgICAgIGl0ZW0uZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICAgICAgaXRlbS5taXBtYXAgPSBtaXBtYXA7XG4gICAgICAgICAgICBpdGVtLmxpbmVhciA9IGxpbmVhcjtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCByZWdEaXJlY3Qoc3RyaW5nIHVybCwgc3ByaXRlVGV4dHVyZSB0ZXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkodXJsKSlcbiAgICAgICAgICAgIC8vdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bdXJsXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gIT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwieW91IGNhbid0IHJlZyB0aGUgc2FtZSBuYW1lXCIpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgdGV4dXRyZU1nckl0ZW0oKTsvL25lc3NcblxuICAgICAgICAgICAgdGhpcy5tYXBJbmZvW3VybF0gPSBpdGVtO1xuICAgICAgICAgICAgaXRlbS51cmwgPSB1cmw7XG4gICAgICAgICAgICBpdGVtLnRleCA9IHRleDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCB1bnJlZyhzdHJpbmcgdXJsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXBJbmZvLkNvbnRhaW5zS2V5KHVybCkgPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy92YXIgaXRlbSA9IHRoaXMubWFwSW5mb1t1cmxdO1xuICAgICAgICAgICAgLy9pZiAoaXRlbSA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnVubG9hZCh1cmwpO1xuXG4gICAgICAgICAgICB0aGlzLm1hcEluZm9bdXJsXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgdW5sb2FkKHN0cmluZyB1cmwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkodXJsKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5tYXBJbmZvW3VybF07XG4gICAgICAgICAgICAvL2lmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgaXRlbS50ZXguZGlzcG9zZSgpO1xuICAgICAgICAgICAgaXRlbS50ZXggPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzcHJpdGVUZXh0dXJlIGxvYWQoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBzdHJpbmcgdXJsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXBJbmZvLkNvbnRhaW5zS2V5KHVybCkgPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5tYXBJbmZvW3VybF07XG4gICAgICAgICAgICAvL2lmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKGl0ZW0udGV4ID09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbS50ZXggPSBuZXcgc3ByaXRlVGV4dHVyZSh3ZWJnbCwgaXRlbS51cmwgKyBpdGVtLnVybGFkZCwgaXRlbS5mb3JtYXQsIGl0ZW0ubWlwbWFwLCBpdGVtLmxpbmVhcik7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50ZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNsYXNzIGF0bGFzTWdySXRlbVxuICAgIHtcbiAgICAgICAgcHVibGljIHNwcml0ZUF0bGFzIGF0YWxzO1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHVybDtcbiAgICAgICAgcHVibGljIHN0cmluZyB1cmxhdGFsc3RleDtcbiAgICAgICAgcHVibGljIHN0cmluZyB1cmxhdGFsc3RleF9hZGQ7XG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBhdGxhc01nclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYXRsYXNNZ3IgZ190aGlzO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGF0bGFzTWdyIEluc3RhbmNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGF0bGFzTWdyLmdfdGhpcyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGF0bGFzTWdyLmdfdGhpcyA9IG5ldyBhdGxhc01ncigpOy8vbmVzc1xuXG4gICAgICAgICAgICByZXR1cm4gYXRsYXNNZ3IuZ190aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuRGljdGlvbmFyeTxzdHJpbmcsIGF0bGFzTWdySXRlbT4gbWFwSW5mbyA9IG5ldyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5EaWN0aW9uYXJ5PHN0cmluZywgYXRsYXNNZ3JJdGVtPigpO1xuXG4gICAgICAgIHB1YmxpYyB2b2lkIHJlZyhzdHJpbmcgbmFtZSwgc3RyaW5nIHVybGF0bGFzLCBzdHJpbmcgdXJsYXRhbHN0ZXgsIHN0cmluZyB1cmxhdGFsc3RleF9hZGQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8v6YeN5aSN5rOo5YaM5aSE55CGXG4gICAgICAgICAgICBpZiAodGhpcy5tYXBJbmZvLkNvbnRhaW5zS2V5KG5hbWUpKVxuICAgICAgICAgICAgLy92YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gIT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwieW91IGNhbid0IHJlZyB0aGUgc2FtZSBuYW1lXCIpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgYXRsYXNNZ3JJdGVtKCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHRoaXMubWFwSW5mb1tuYW1lXSA9IGl0ZW07XG4gICAgICAgICAgICBpdGVtLnVybCA9IHVybGF0bGFzO1xuICAgICAgICAgICAgaXRlbS51cmxhdGFsc3RleCA9IHVybGF0YWxzdGV4O1xuICAgICAgICAgICAgaXRlbS51cmxhdGFsc3RleF9hZGQgPSB1cmxhdGFsc3RleF9hZGQ7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgdW5yZWcoc3RyaW5nIG5hbWUsIGJvb2wgZGlzcG9zZXRleClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bbmFtZV07XG4gICAgICAgICAgICBpZiAoaXRlbSA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnVubG9hZChuYW1lLCBkaXNwb3NldGV4KTtcblxuICAgICAgICAgICAgdGhpcy5tYXBJbmZvLlJlbW92ZShuYW1lKTtcbiAgICAgICAgICAgIC8vdGhpcy5tYXBJbmZvW25hbWVdID0gU2NyaXB0LlVuZGVmaW5lZDtcblxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIHJlZ0RpcmVjdChzdHJpbmcgbmFtZSwgc3ByaXRlQXRsYXMgYXRsYXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkobmFtZSkpXG4gICAgICAgICAgICAvLyAgICB2YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gIT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwieW91IGNhbid0IHJlZyB0aGUgc2FtZSBuYW1lXCIpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgYXRsYXNNZ3JJdGVtKCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHRoaXMubWFwSW5mb1tuYW1lXSA9IGl0ZW07XG4gICAgICAgICAgICBpdGVtLmF0YWxzID0gYXRsYXM7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgdW5sb2FkKHN0cmluZyBuYW1lLCBib29sIGRpc3Bvc2V0ZXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkobmFtZSkgPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bbmFtZV07XG4gICAgICAgICAgICAvL2lmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGRpc3Bvc2V0ZXgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbS5hdGFscy50ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmF0YWxzLnRleHR1cmUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbS5hdGFscyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3ByaXRlQXRsYXMgbG9hZChXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyBuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXBJbmZvLkNvbnRhaW5zS2V5KG5hbWUpID09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bbmFtZV07XG4gICAgICAgICAgICAvL2lmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKGl0ZW0uYXRhbHMgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdGV4ID0gdGV4dHVyZU1nci5JbnN0YW5jZSgpLmxvYWQod2ViZ2wsIGl0ZW0udXJsYXRhbHN0ZXgpO1xuICAgICAgICAgICAgICAgIGlmICh0ZXggPT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWcoaXRlbS51cmxhdGFsc3RleCwgaXRlbS51cmxhdGFsc3RleF9hZGQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5SR0JBLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGV4ID0gdGV4dHVyZU1nci5JbnN0YW5jZSgpLmxvYWQod2ViZ2wsIGl0ZW0udXJsYXRhbHN0ZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtLmF0YWxzID0gbmV3IHNwcml0ZUF0bGFzKHdlYmdsLCBpdGVtLnVybCwgdGV4KTsvL25lc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmF0YWxzO1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNsYXNzIGZvbnRNZ3JJdGVtXG4gICAge1xuICAgICAgICBwdWJsaWMgc3ByaXRlRm9udCBmb250O1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHVybDtcbiAgICAgICAgcHVibGljIHN0cmluZyB1cmxhdGFsc3RleDtcbiAgICAgICAgcHVibGljIHN0cmluZyB1cmxhdGFsc3RleF9hZGQ7XG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBmb250TWdyXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBmb250TWdyIGdfdGhpcztcbiAgICAgICAgcHVibGljIHN0YXRpYyBmb250TWdyIEluc3RhbmNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGZvbnRNZ3IuZ190aGlzID09IG51bGwpXG4gICAgICAgICAgICAgICAgZm9udE1nci5nX3RoaXMgPSBuZXcgZm9udE1ncigpOy8vbmVzc1xuXG4gICAgICAgICAgICByZXR1cm4gZm9udE1nci5nX3RoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5EaWN0aW9uYXJ5PHN0cmluZywgZm9udE1nckl0ZW0+IG1hcEluZm8gPSBuZXcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuRGljdGlvbmFyeTxzdHJpbmcsIGZvbnRNZ3JJdGVtPigpO1xuXG4gICAgICAgIHB1YmxpYyB2b2lkIHJlZyhzdHJpbmcgbmFtZSwgc3RyaW5nIHVybGZvbnQsIHN0cmluZyB1cmxhdGFsc3RleCwgc3RyaW5nIHVybGF0YWxzdGV4X2FkZClcbiAgICAgICAge1xuICAgICAgICAgICAgLy/ph43lpI3ms6jlhozlpITnkIZcbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5tYXBJbmZvW25hbWVdO1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwieW91IGNhbid0IHJlZyB0aGUgc2FtZSBuYW1lXCIpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbSA9IG5ldyBmb250TWdySXRlbSgpOy8vbmVzc1xuXG4gICAgICAgICAgICB0aGlzLm1hcEluZm9bbmFtZV0gPSBpdGVtO1xuICAgICAgICAgICAgaXRlbS51cmwgPSB1cmxmb250O1xuICAgICAgICAgICAgaXRlbS51cmxhdGFsc3RleCA9IHVybGF0YWxzdGV4O1xuICAgICAgICAgICAgaXRlbS51cmxhdGFsc3RleF9hZGQgPSB1cmxhdGFsc3RleF9hZGQ7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgcmVnRGlyZWN0KHN0cmluZyBuYW1lLCBzcHJpdGVGb250IGZvbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMubWFwSW5mby5Db250YWluc0tleShuYW1lKSlcbiAgICAgICAgICAgIC8vdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bbmFtZV07XG4gICAgICAgICAgICAvL2lmIChpdGVtICE9IFNjcmlwdC5VbmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcInlvdSBjYW4ndCByZWcgdGhlIHNhbWUgbmFtZVwiKTsvL25lc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpdGVtID0gbmV3IGZvbnRNZ3JJdGVtKCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHRoaXMubWFwSW5mb1tuYW1lXSA9IGl0ZW07XG4gICAgICAgICAgICBpdGVtLmZvbnQgPSBmb250O1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIHVucmVnKHN0cmluZyBuYW1lLCBib29sIGRpc3Bvc2V0ZXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkobmFtZSkgPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bbmFtZV07XG4gICAgICAgICAgICAvL2lmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMudW5sb2FkKG5hbWUsIGRpc3Bvc2V0ZXgpO1xuXG4gICAgICAgICAgICB0aGlzLm1hcEluZm8uUmVtb3ZlKG5hbWUpO1xuICAgICAgICAgICAgLy90aGlzLm1hcEluZm9bbmFtZV0gPSBTY3JpcHQuVW5kZWZpbmVkO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCB1bmxvYWQoc3RyaW5nIG5hbWUsIGJvb2wgZGlzcG9zZXRleClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwSW5mby5Db250YWluc0tleShuYW1lKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5tYXBJbmZvW25hbWVdO1xuICAgICAgICAgICAgLy9pZiAoaXRlbSA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmIChkaXNwb3NldGV4KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9udC50ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmZvbnQudGV4dHVyZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmZvbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNwcml0ZUZvbnQgbG9hZChXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyBuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXBJbmZvLkNvbnRhaW5zS2V5KG5hbWUpID09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoaXRlbS5mb250ID09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHRleCA9IHRleHR1cmVNZ3IuSW5zdGFuY2UoKS5sb2FkKHdlYmdsLCBpdGVtLnVybGF0YWxzdGV4KTtcbiAgICAgICAgICAgICAgICBpZiAodGV4ID09IFNjcmlwdC5VbmRlZmluZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlTWdyLkluc3RhbmNlKCkucmVnKGl0ZW0udXJsYXRhbHN0ZXgsIGl0ZW0udXJsYXRhbHN0ZXhfYWRkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHR0b29sLnRleHR1cmVmb3JtYXQuR1JBWSwgZmFsc2UsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRleCA9IHRleHR1cmVNZ3IuSW5zdGFuY2UoKS5sb2FkKHdlYmdsLCBpdGVtLnVybGF0YWxzdGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbS5mb250ID0gbmV3IHNwcml0ZUZvbnQod2ViZ2wsIGl0ZW0udXJsLCB0ZXgpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZm9udDtcblxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzaGFkZXJNZ3JcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIGxpZ2h0dG9vbC5zaGFkZXJQYXJzZXIgZ19zaGFkZXJQYXJzZXI7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbGlnaHR0b29sLnNoYWRlclBhcnNlciBwYXJzZXJJbnN0YW5jZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChzaGFkZXJNZ3IuZ19zaGFkZXJQYXJzZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBzaGFkZXJNZ3IuZ19zaGFkZXJQYXJzZXIgPSBuZXcgbGlnaHR0b29sLnNoYWRlclBhcnNlcigpOy8vbmVzc1xuICAgICAgICAgICAgcmV0dXJuIHNoYWRlck1nci5nX3NoYWRlclBhcnNlcjtcbiAgICAgICAgfVxuICAgIH1cbn0iLA0KICAgICJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLldlYkdMO1xuXG5uYW1lc3BhY2UgbGlnaHR0b29sXG57XG4gICAgLy/liqDovb3lt6XlhbdcblxuICAgIHB1YmxpYyBjbGFzcyBsb2FkVG9vbFxuICAgIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIGxvYWRUZXh0KHN0cmluZyB1cmwsIEFjdGlvbjxzdHJpbmcsIEJyaWRnZS5FcnJvcj4gZnVuKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7Ly9uZXNzXG4gICAgICAgICAgICByZXEuT3BlbihcIkdFVFwiLCB1cmwpO1xuICAgICAgICAgICAgcmVxLk9uUmVhZHlTdGF0ZUNoYW5nZSA9ICgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5SZWFkeVN0YXRlID09IEJyaWRnZS5IdG1sNS5BamF4UmVhZHlTdGF0ZS5Eb25lKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuKHJlcS5SZXNwb25zZVRleHQsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEuT25FcnJvciA9IChlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgQnJpZGdlLkVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyLk1lc3NhZ2UgPSBcIm9uZXJyIGluIHJlcTpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW4obnVsbCwgZXJyKTsvL25lc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEuU2VuZCgpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgbG9hZEFycmF5QnVmZmVyKHN0cmluZyB1cmwsIEFjdGlvbjxCcmlkZ2UuSHRtbDUuQXJyYXlCdWZmZXIsIEJyaWRnZS5FcnJvcj4gZnVuKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHJlcS5PcGVuKFwiR0VUXCIsIHVybCk7XG4gICAgICAgICAgICByZXEuUmVzcG9uc2VUeXBlID0gWE1MSHR0cFJlcXVlc3RSZXNwb25zZVR5cGUuQXJyYXlCdWZmZXI7Ly8gXCJhcnJheWJ1ZmZlclwiOy8vaWUg5LiA5a6a6KaB5Zyob3BlbuS5i+WQjuS/ruaUuXJlc3BvbnNlVHlwZVxuICAgICAgICAgICAgcmVxLk9uUmVhZHlTdGF0ZUNoYW5nZSA9ICgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5SZWFkeVN0YXRlID09IEFqYXhSZWFkeVN0YXRlLkRvbmUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ290IGJpbjpcIiArIHR5cGVvZiAocmVxLnJlc3BvbnNlKSArIHJlcS5yZXNwb25zZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBmdW4ocmVxLlJlc3BvbnNlIGFzIEFycmF5QnVmZmVyLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxLk9uRXJyb3IgPSAoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyLk1lc3NhZ2UgPSBcIm9uZXJyIGluIHJlcTpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bihudWxsLCBlcnIpOy8vbmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxLlNlbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBsb2FkQmxvYihzdHJpbmcgdXJsLCBBY3Rpb248QmxvYiwgRXJyb3I+IGZ1bilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOy8vbmVzc1xuXG4gICAgICAgICAgICByZXEuT3BlbihcIkdFVFwiLCB1cmwpO1xuICAgICAgICAgICAgcmVxLlJlc3BvbnNlVHlwZSA9IFhNTEh0dHBSZXF1ZXN0UmVzcG9uc2VUeXBlLkJsb2I7Ly8gXCJibG9iXCI7Ly9pZSDkuIDlrpropoHlnKhvcGVu5LmL5ZCO5L+u5pS5cmVzcG9uc2VUeXBlXG4gICAgICAgICAgICByZXEuT25SZWFkeVN0YXRlQ2hhbmdlID0gKCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxLlJlYWR5U3RhdGUgPT0gQWpheFJlYWR5U3RhdGUuRG9uZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnb3QgX2Jsb2I6XCIgKyB0eXBlb2YgKHJlcS5yZXNwb25zZSkgKyByZXEucmVzcG9uc2VUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgZnVuKHJlcS5SZXNwb25zZSBhcyBCbG9iLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxLk9uRXJyb3IgPSAoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyLk1lc3NhZ2UgPSBcIm9uZXJyIGluIHJlcTpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bihudWxsLCBlcnIpOy8vbmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxLlNlbmQoKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgLy9zaGFkZXJcbiAgICBwdWJsaWMgY2xhc3Mgc2hhZGVyY29kZVxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyB2c2NvZGU7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgZnNjb2RlO1xuICAgICAgICBwdWJsaWMgV2ViR0xTaGFkZXIgdnM7XG4gICAgICAgIHB1YmxpYyBXZWJHTFNoYWRlciBmcztcbiAgICAgICAgcHVibGljIFdlYkdMUHJvZ3JhbSBwcm9ncmFtO1xuXG4gICAgICAgIHB1YmxpYyBpbnQgcG9zUG9zID0gLTE7XG4gICAgICAgIHB1YmxpYyBpbnQgcG9zQ29sb3IgPSAtMTtcbiAgICAgICAgcHVibGljIGludCBwb3NDb2xvcjIgPSAtMTtcbiAgICAgICAgcHVibGljIGludCBwb3NVViA9IC0xO1xuICAgICAgICBwdWJsaWMgV2ViR0xVbmlmb3JtTG9jYXRpb24gdW5pTWF0cml4ID0gbnVsbDtcbiAgICAgICAgcHVibGljIFdlYkdMVW5pZm9ybUxvY2F0aW9uIHVuaVRleDAgPSBudWxsO1xuICAgICAgICBwdWJsaWMgV2ViR0xVbmlmb3JtTG9jYXRpb24gdW5pVGV4MSA9IG51bGw7XG4gICAgICAgIHB1YmxpYyBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB1bmlDb2wwID0gbnVsbDtcbiAgICAgICAgcHVibGljIFdlYkdMVW5pZm9ybUxvY2F0aW9uIHVuaUNvbDEgPSBudWxsO1xuICAgICAgICBwdWJsaWMgdm9pZCBjb21waWxlKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52cyA9IHdlYmdsLkNyZWF0ZVNoYWRlcih3ZWJnbC5WRVJURVhfU0hBREVSKTtcbiAgICAgICAgICAgIHRoaXMuZnMgPSB3ZWJnbC5DcmVhdGVTaGFkZXIod2ViZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuICAgICAgICAgICAgLy/liIbliKvnvJbor5FzaGFkZXJcbiAgICAgICAgICAgIHdlYmdsLlNoYWRlclNvdXJjZSh0aGlzLnZzLCB0aGlzLnZzY29kZSk7XG4gICAgICAgICAgICB3ZWJnbC5Db21waWxlU2hhZGVyKHRoaXMudnMpO1xuICAgICAgICAgICAgdmFyIHIxID0gd2ViZ2wuR2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMudnMsIHdlYmdsLkNPTVBJTEVfU1RBVFVTKTtcbiAgICAgICAgICAgIGlmIChyMS5Bczxib29sPigpID09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFsZXJ0KHdlYmdsLkdldFNoYWRlckluZm9Mb2codGhpcy52cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHdlYmdsLlNoYWRlclNvdXJjZSh0aGlzLmZzLCB0aGlzLmZzY29kZSk7XG4gICAgICAgICAgICB3ZWJnbC5Db21waWxlU2hhZGVyKHRoaXMuZnMpO1xuICAgICAgICAgICAgdmFyIHIyID0gd2ViZ2wuR2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuZnMsIHdlYmdsLkNPTVBJTEVfU1RBVFVTKTtcbiAgICAgICAgICAgIGlmIChyMi5Bczxib29sPigpID09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFsZXJ0KHdlYmdsLkdldFNoYWRlckluZm9Mb2codGhpcy5mcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3Byb2dyYW0gbGlua1xuICAgICAgICAgICAgdGhpcy5wcm9ncmFtID0gd2ViZ2wuQ3JlYXRlUHJvZ3JhbSgpLkFzPFdlYkdMUHJvZ3JhbT4oKTtcblxuICAgICAgICAgICAgd2ViZ2wuQXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy52cyk7XG4gICAgICAgICAgICB3ZWJnbC5BdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmZzKTtcblxuICAgICAgICAgICAgd2ViZ2wuTGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcbiAgICAgICAgICAgIHZhciByMyA9IHdlYmdsLkdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCB3ZWJnbC5MSU5LX1NUQVRVUyk7XG4gICAgICAgICAgICBpZiAocjMuQXM8Ym9vbD4oKSA9PSBmYWxzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhbGVydCh3ZWJnbC5HZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByb2dyYW0pKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAvL+e7keWumnZib+WSjHNoYWRlcumhtueCueagvOW8j++8jOi/memDqOWIhuW6lOivpeimgeWMuuWIhuadkOi0qOaUueWPmOS4juWPguaVsOaUueWPmO+8jOWPr+S7peWwkeWIh+aNouS4gOS6m+eKtuaAgVxuICAgICAgICAgICAgdGhpcy5wb3NQb3MgPSB3ZWJnbC5HZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIFwicG9zaXRpb25cIik7XG4gICAgICAgICAgICB0aGlzLnBvc0NvbG9yID0gd2ViZ2wuR2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcImNvbG9yXCIpO1xuICAgICAgICAgICAgdGhpcy5wb3NDb2xvcjIgPSB3ZWJnbC5HZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIFwiY29sb3IyXCIpO1xuXG4gICAgICAgICAgICB0aGlzLnBvc1VWID0gd2ViZ2wuR2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcInV2XCIpO1xuXG4gICAgICAgICAgICB0aGlzLnVuaU1hdHJpeCA9IHdlYmdsLkdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIFwibWF0cml4XCIpO1xuICAgICAgICAgICAgdGhpcy51bmlUZXgwID0gd2ViZ2wuR2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJ0ZXgwXCIpO1xuICAgICAgICAgICAgdGhpcy51bmlUZXgxID0gd2ViZ2wuR2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJ0ZXgxXCIpO1xuICAgICAgICAgICAgdGhpcy51bmlDb2wwID0gd2ViZ2wuR2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJjb2wwXCIpO1xuICAgICAgICAgICAgdGhpcy51bmlDb2wxID0gd2ViZ2wuR2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJjb2wxXCIpO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBhbGVydChzdHJpbmcgcClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNsYXNzIHNoYWRlclBhcnNlclxuICAgIHtcbiAgICAgICAgcHVibGljIERpY3Rpb25hcnk8c3RyaW5nLCBzaGFkZXJjb2RlPiBtYXBzaGFkZXIgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHNoYWRlcmNvZGU+KCk7XG4gICAgICAgIC8vICAgIG1hcHNoYWRlcjogeyBbaWQ6IHN0cmluZ106IHNoYWRlcmNvZGVcbiAgICAgICAgLy99ID0ge307XG4gICAgICAgIHZvaWQgX3BhcnNlcihzdHJpbmcgdHh0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgczEgPSB0eHQuU3BsaXQobmV3W10geyBcIjwtLVwiIH0sIFN0cmluZ1NwbGl0T3B0aW9ucy5SZW1vdmVFbXB0eUVudHJpZXMpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzMS5MZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgczIgPSBzMVtpXS5TcGxpdChcIi0tPlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhZyA9IHMyWzBdLlNwbGl0KFwiIFwiKTsvL3RhZ3M7XG4gICAgICAgICAgICAgICAgdmFyIHNzaGFkZXIgPSBzMlsxXTsvL+ato+aWh1xuICAgICAgICAgICAgICAgIHZhciBsYXN0bmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3R0YWcgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdGFnLkxlbmd0aDsgaisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBzdGFnW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodC5MZW5ndGggPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ID09IFwidnNcIikvL3ZlY3RleHNoYWRlclxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0dGFnID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0ID09IFwiZnNcIikvL2ZyYWdtZW50c2hhZGVyXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3R0YWcgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdG5hbWUgPSB0LlN1YnN0cmluZygxLCB0Lkxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsYXN0bmFtZS5MZW5ndGggPT0gMCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwc2hhZGVyLkNvbnRhaW5zS2V5KGxhc3RuYW1lKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzaGFkZXJbbGFzdG5hbWVdID0gbmV3IHNoYWRlcmNvZGUoKTsvL25lc3NcbiAgICAgICAgICAgICAgICBpZiAobGFzdHRhZyA9PSAxKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNoYWRlcltsYXN0bmFtZV0udnNjb2RlID0gc3NoYWRlcjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXN0dGFnID09IDIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc2hhZGVyW2xhc3RuYW1lXS5mc2NvZGUgPSBzc2hhZGVyO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgcGFyc2VVcmwoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBzdHJpbmcgdXJsKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQodXJsLCAoQWN0aW9uPHN0cmluZyxFcnJvcj4pKCh0eHQsIGVycikgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJzZXIodHh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBpbGUod2ViZ2wpO1xuICAgICAgICAgICAgICAgIC8vc3ByaXRlQmF0Y2hlclxuICAgICAgICAgICAgfVxuKSAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgcGFyc2VEaXJlY3QoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBzdHJpbmcgdHh0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9wYXJzZXIodHh0KTtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZSh3ZWJnbCk7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCBkdW1wKClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG5hbWUgaW4gdGhpcy5tYXBzaGFkZXIuS2V5cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcInNoYWRlcm5hbWU6XCIgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcInZzOlwiICsgdGhpcy5tYXBzaGFkZXJbbmFtZV0udnNjb2RlKTtcbiAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcImZzOlwiICsgdGhpcy5tYXBzaGFkZXJbbmFtZV0uZnNjb2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHZvaWQgY29tcGlsZShXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBuYW1lIGluIHRoaXMubWFwc2hhZGVyLktleXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzaGFkZXJbbmFtZV0uY29tcGlsZSh3ZWJnbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9zcHJpdGUg5Z+65pys5pWw5o2u57uT5p6EXG4gICAgcHVibGljIHN0cnVjdCBzcHJpdGVSZWN0XG4gICAge1xuICAgICAgICBwdWJsaWMgc3ByaXRlUmVjdChmbG9hdCB4ID0gMCwgZmxvYXQgeSA9IDAsIGZsb2F0IHcgPSAwLCBmbG9hdCBoID0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICAgICAgdGhpcy5oID0gaDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZmxvYXQgeDtcbiAgICAgICAgcHVibGljIGZsb2F0IHk7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB3O1xuICAgICAgICBwdWJsaWMgZmxvYXQgaDtcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzcHJpdGVSZWN0IG9uZSA9IG5ldyBzcHJpdGVSZWN0KDAsIDAsIDEsIDEpOy8vbmVzc1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNwcml0ZVJlY3QgemVybyA9IG5ldyBzcHJpdGVSZWN0KDAsIDAsIDAsIDApOy8vbmVzc1xuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlQm9yZGVyXG4gICAge1xuICAgICAgICBwdWJsaWMgc3ByaXRlQm9yZGVyKGZsb2F0IGwgPSAwLCBmbG9hdCB0ID0gMCwgZmxvYXQgciA9IDAsIGZsb2F0IGIgPSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmwgPSBsO1xuICAgICAgICAgICAgdGhpcy50ID0gdDtcbiAgICAgICAgICAgIHRoaXMuciA9IHI7XG4gICAgICAgICAgICB0aGlzLmIgPSBiO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBmbG9hdCBsO1xuICAgICAgICBwdWJsaWMgZmxvYXQgdDtcbiAgICAgICAgcHVibGljIGZsb2F0IHI7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBiO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNwcml0ZUJvcmRlciB6ZXJvID0gbmV3IHNwcml0ZUJvcmRlcigwLCAwLCAwLCAwKTsvL25lc3NcblxuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlQ29sb3JcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVDb2xvcihmbG9hdCByID0gMSwgZmxvYXQgZyA9IDEsIGZsb2F0IGIgPSAxLCBmbG9hdCBhID0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yID0gcjtcbiAgICAgICAgICAgIHRoaXMuZyA9IGc7XG4gICAgICAgICAgICB0aGlzLmIgPSBiO1xuICAgICAgICAgICAgdGhpcy5hID0gYTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZmxvYXQgcjtcbiAgICAgICAgcHVibGljIGZsb2F0IGc7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBiO1xuICAgICAgICBwdWJsaWMgZmxvYXQgYTtcbiAgICAgICAgcHVibGljIHN0YXRpYyBzcHJpdGVDb2xvciB3aGl0ZVxuICAgICAgICB7XG4gICAgICAgICAgICBnZXRcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHNwcml0ZUNvbG9yKDEsIDEsIDEsIDEpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3ByaXRlQ29sb3IgYmxhY2sgPSBuZXcgc3ByaXRlQ29sb3IoMCwgMCwgMCwgMSk7Ly9uZXNzXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3ByaXRlQ29sb3IgZ3JheSA9IG5ldyBzcHJpdGVDb2xvcigwLjVmLCAwLjVmLCAwLjVmLCAxKTsvL25lc3NcbiAgICB9XG4gICAgcHVibGljIGNsYXNzIHNwcml0ZVBvaW50XG4gICAge1xuICAgICAgICBwdWJsaWMgZmxvYXQgeDtcbiAgICAgICAgcHVibGljIGZsb2F0IHk7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB6O1xuXG4gICAgICAgIHB1YmxpYyBmbG9hdCByO1xuICAgICAgICBwdWJsaWMgZmxvYXQgZztcbiAgICAgICAgcHVibGljIGZsb2F0IGI7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBhO1xuXG4gICAgICAgIHB1YmxpYyBmbG9hdCByMjtcbiAgICAgICAgcHVibGljIGZsb2F0IGcyO1xuICAgICAgICBwdWJsaWMgZmxvYXQgYjI7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBhMjtcblxuICAgICAgICBwdWJsaWMgZmxvYXQgdTtcbiAgICAgICAgcHVibGljIGZsb2F0IHY7XG4gICAgfVxuXG5cbiAgICAvL3Nwcml0ZeadkOi0qFxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGVNYXRcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgc2hhZGVyO1xuICAgICAgICBwdWJsaWMgYm9vbCB0cmFuc3BhcmVudDtcbiAgICAgICAgcHVibGljIHNwcml0ZVRleHR1cmUgdGV4MDtcbiAgICAgICAgcHVibGljIHNwcml0ZVRleHR1cmUgdGV4MTtcbiAgICAgICAgcHVibGljIHNwcml0ZUNvbG9yIGNvbDA7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVDb2xvciBjb2wxO1xuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc3RhdGVSZWNvcmRlclxuICAgIHtcbiAgICAgICAgcHVibGljIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbDtcbiAgICAgICAgcHVibGljIHN0YXRlUmVjb3JkZXIoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLndlYmdsID0gd2ViZ2w7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGJvb2wgREVQVEhfV1JJVEVNQVNLO1xuICAgICAgICBwdWJsaWMgYm9vbCBERVBUSF9URVNUO1xuICAgICAgICBwdWJsaWMgaW50IERFUFRIX0ZVTkM7XG4gICAgICAgIHB1YmxpYyBib29sIEJMRU5EO1xuICAgICAgICBwdWJsaWMgaW50IEJMRU5EX0VRVUFUSU9OO1xuICAgICAgICBwdWJsaWMgaW50IEJMRU5EX1NSQ19SR0I7XG4gICAgICAgIHB1YmxpYyBpbnQgQkxFTkRfU1JDX0FMUEhBO1xuICAgICAgICBwdWJsaWMgaW50IEJMRU5EX0RTVF9SR0I7XG4gICAgICAgIHB1YmxpYyBpbnQgQkxFTkRfRFNUX0FMUEhBO1xuICAgICAgICBwdWJsaWMgV2ViR0xQcm9ncmFtIENVUlJFTlRfUFJPR1JBTTtcbiAgICAgICAgcHVibGljIFdlYkdMQnVmZmVyIEFSUkFZX0JVRkZFUjtcbiAgICAgICAgcHVibGljIGludCBBQ1RJVkVfVEVYVFVSRTtcbiAgICAgICAgcHVibGljIFdlYkdMVGV4dHVyZSBURVhUVVJFX0JJTkRJTkdfMkQ7XG4gICAgICAgIHB1YmxpYyB2b2lkIHJlY29yZCgpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgLy/orrDlvZXnirbmgIFcbiAgICAgICAgICAgIHRoaXMuREVQVEhfV1JJVEVNQVNLID0gKGJvb2wpdGhpcy53ZWJnbC5HZXRQYXJhbWV0ZXIodGhpcy53ZWJnbC5ERVBUSF9XUklURU1BU0spO1xuICAgICAgICAgICAgdGhpcy5ERVBUSF9URVNUID0gKGJvb2wpdGhpcy53ZWJnbC5HZXRQYXJhbWV0ZXIodGhpcy53ZWJnbC5ERVBUSF9URVNUKTtcbiAgICAgICAgICAgIHRoaXMuREVQVEhfRlVOQyA9IChpbnQpdGhpcy53ZWJnbC5HZXRQYXJhbWV0ZXIodGhpcy53ZWJnbC5ERVBUSF9GVU5DKTtcbiAgICAgICAgICAgIC8vYWxwaGFibGVuZCDvvIzot5/nnYBtYXTotbBcbiAgICAgICAgICAgIHRoaXMuQkxFTkQgPSAoYm9vbCl0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkJMRU5EKTtcbiAgICAgICAgICAgIHRoaXMuQkxFTkRfRVFVQVRJT04gPSAoaW50KXRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQkxFTkRfRVFVQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5CTEVORF9TUkNfUkdCID0gKGludCl0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkJMRU5EX1NSQ19SR0IpO1xuICAgICAgICAgICAgdGhpcy5CTEVORF9TUkNfQUxQSEEgPSAoaW50KXRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQkxFTkRfU1JDX0FMUEhBKTtcbiAgICAgICAgICAgIHRoaXMuQkxFTkRfRFNUX1JHQiA9IChpbnQpdGhpcy53ZWJnbC5HZXRQYXJhbWV0ZXIodGhpcy53ZWJnbC5CTEVORF9EU1RfUkdCKTtcbiAgICAgICAgICAgIHRoaXMuQkxFTkRfRFNUX0FMUEhBID0gKGludCl0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkJMRU5EX0RTVF9BTFBIQSk7XG4gICAgICAgICAgICAvLyAgICB0aGlzLndlYmdsLmJsZW5kRnVuY1NlcGFyYXRlKHRoaXMud2ViZ2wuT05FLCB0aGlzLndlYmdsLk9ORV9NSU5VU19TUkNfQUxQSEEsXG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy53ZWJnbC5TUkNfQUxQSEEsIHRoaXMud2ViZ2wuT05FKTtcblxuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkNVUlJFTlRfUFJPR1JBTSk7XG4gICAgICAgICAgICB0aGlzLkNVUlJFTlRfUFJPR1JBTSA9IHAuQXM8V2ViR0xQcm9ncmFtPigpO1xuXG4gICAgICAgICAgICB2YXIgcGIgPSB0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkFSUkFZX0JVRkZFUl9CSU5ESU5HKTtcbiAgICAgICAgICAgIHRoaXMuQVJSQVlfQlVGRkVSID0gcGIuQXM8V2ViR0xCdWZmZXI+KCk7XG5cbiAgICAgICAgICAgIHRoaXMuQUNUSVZFX1RFWFRVUkUgPSAoaW50KXRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQUNUSVZFX1RFWFRVUkUpO1xuICAgICAgICAgICAgdGhpcy5URVhUVVJFX0JJTkRJTkdfMkQgPSB0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLlRFWFRVUkVfQklORElOR18yRCkuQXM8V2ViR0xUZXh0dXJlPigpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgcmVzdG9yZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8v5oGi5aSN54q25oCBXG4gICAgICAgICAgICB0aGlzLndlYmdsLkRlcHRoTWFzayh0aGlzLkRFUFRIX1dSSVRFTUFTSyk7XG4gICAgICAgICAgICBpZiAodGhpcy5ERVBUSF9URVNUKVxuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRW5hYmxlKHRoaXMud2ViZ2wuREVQVEhfVEVTVCk7Ly/ov5nmmK96dGVzdFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRGlzYWJsZSh0aGlzLndlYmdsLkRFUFRIX1RFU1QpOy8v6L+Z5pivenRlc3RcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuRGVwdGhGdW5jKHRoaXMuREVQVEhfRlVOQyk7Ly/ov5nmmK96dGVzdOaWueazlVxuXG4gICAgICAgICAgICBpZiAodGhpcy5CTEVORClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkVuYWJsZSh0aGlzLndlYmdsLkJMRU5EKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkRpc2FibGUodGhpcy53ZWJnbC5CTEVORCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLndlYmdsLkJsZW5kRXF1YXRpb24odGhpcy5CTEVORF9FUVVBVElPTik7XG5cbiAgICAgICAgICAgIHRoaXMud2ViZ2wuQmxlbmRGdW5jU2VwYXJhdGUodGhpcy5CTEVORF9TUkNfUkdCLCB0aGlzLkJMRU5EX0RTVF9SR0IsXG4gICAgICAgICAgICAgICAgdGhpcy5CTEVORF9TUkNfQUxQSEEsIHRoaXMuQkxFTkRfRFNUX0FMUEhBKTtcblxuICAgICAgICAgICAgdGhpcy53ZWJnbC5Vc2VQcm9ncmFtKHRoaXMuQ1VSUkVOVF9QUk9HUkFNKTtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuQmluZEJ1ZmZlcih0aGlzLndlYmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5BUlJBWV9CVUZGRVIpO1xuXG4gICAgICAgICAgICB0aGlzLndlYmdsLkFjdGl2ZVRleHR1cmUodGhpcy5BQ1RJVkVfVEVYVFVSRSk7XG4gICAgICAgICAgICB0aGlzLndlYmdsLkJpbmRUZXh0dXJlKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy5URVhUVVJFX0JJTkRJTkdfMkQpO1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNsYXNzIHNwcml0ZUJhdGNoZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2w7XG4gICAgICAgIHB1YmxpYyBzaGFkZXJQYXJzZXIgc2hhZGVycGFyc2VyO1xuICAgICAgICBwdWJsaWMgV2ViR0xCdWZmZXIgdmJvO1xuICAgICAgICAvL2RhdGE6IG51bWJlcltdID0gW107XG4gICAgICAgIHB1YmxpYyBGbG9hdDMyQXJyYXkgbWF0cml4O1xuICAgICAgICBwdWJsaWMgYm9vbCB6dGVzdCA9IHRydWU7XG4gICAgICAgIHB1YmxpYyBzdGF0ZVJlY29yZGVyIHJlY29yZGVyO1xuICAgICAgICBwdWJsaWMgc3ByaXRlQmF0Y2hlcihXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHNoYWRlclBhcnNlciBzaGFkZXJwYXJzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wgPSB3ZWJnbDtcbiAgICAgICAgICAgIHRoaXMuc2hhZGVycGFyc2VyID0gc2hhZGVycGFyc2VyO1xuICAgICAgICAgICAgdGhpcy52Ym8gPSB3ZWJnbC5DcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIHZhciBhc3AgPSAodGhpcy53ZWJnbC5EcmF3aW5nQnVmZmVyV2lkdGggLyB0aGlzLndlYmdsLkRyYXdpbmdCdWZmZXJIZWlnaHQpO1xuICAgICAgICAgICAgLy90aGlzLm1hdHJpeD1cbiAgICAgICAgICAgIGZsb2F0W10gYXJyYXkgPXtcbiAgICAgICAgICAgICAgICAxLjBmIC8gYXNwLCAwLCAwLCAwLC8v5Y675o6JYXNw55qE5b2x5ZONXG4gICAgICAgICAgICAgICAgMCwgMSwgMCwgMCxcbiAgICAgICAgICAgICAgICAwLCAwLCAxLCAwLFxuICAgICAgICAgICAgICAgIDAsIDAsIDAsIDFcbiAgICAgICAgICAgIH07Ly9uZXNzXG4gICAgICAgICAgICB0aGlzLm1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoYXJyYXkpO1xuXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyID0gbmV3IHN0YXRlUmVjb3JkZXIod2ViZ2wpOy8vbmVzc1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIGJlZ2luZHJhdygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIucmVjb3JkKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgZW5kZHJhdygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZW5kYmF0Y2goKTtcblxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNoYWRlcmNvZGUgc2hhZGVyY29kZSA9IG51bGw7XG4gICAgICAgIC8vYmVnaW5kcmF3IOWSjCBzZXRtYXQg5Yiw5bqV6KaB5LiN6KaB5YiG5byA77yM6L+Z5piv6ZyA6KaB5YaN5oCd6ICD5LiA5LiL55qEXG4gICAgICAgIHB1YmxpYyBzcHJpdGVNYXQgbWF0O1xuICAgICAgICBwdWJsaWMgdm9pZCBzZXRNYXQoc3ByaXRlTWF0IG1hdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKG1hdCA9PSB0aGlzLm1hdCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5lbmRiYXRjaCgpO1xuXG4gICAgICAgICAgICB0aGlzLndlYmdsLkRpc2FibGUodGhpcy53ZWJnbC5DVUxMX0ZBQ0UpO1xuXG4gICAgICAgICAgICB0aGlzLm1hdCA9IG1hdDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRlcnBhcnNlci5tYXBzaGFkZXIuQ29udGFpbnNLZXkodGhpcy5tYXQuc2hhZGVyKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnNoYWRlcmNvZGUgPSB0aGlzLnNoYWRlcnBhcnNlci5tYXBzaGFkZXJbdGhpcy5tYXQuc2hhZGVyXTtcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuc2hhZGVyY29kZSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAvL+aMh+WumnNoYWRlcuWSjHZib1xuXG4gICAgICAgICAgICAvL+WFs+S6jua3seW6piDvvIzot5/nnYBzcHJpdGViYXRjaGVy6LWwXG4gICAgICAgICAgICB0aGlzLndlYmdsLkRlcHRoTWFzayhmYWxzZSk7Ly/ov5nmmK96d3JpdGVcblxuICAgICAgICAgICAgaWYgKHRoaXMuenRlc3QpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5FbmFibGUodGhpcy53ZWJnbC5ERVBUSF9URVNUKTsvL+i/meaYr3p0ZXN0XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5EZXB0aEZ1bmModGhpcy53ZWJnbC5MRVFVQUwpOy8v6L+Z5pivenRlc3Tmlrnms5VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkRpc2FibGUodGhpcy53ZWJnbC5ERVBUSF9URVNUKTsvL+i/meaYr3p0ZXN0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1hdC50cmFuc3BhcmVudClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2FscGhhYmxlbmQg77yM6Lef552AbWF06LWwXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5FbmFibGUodGhpcy53ZWJnbC5CTEVORCk7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5CbGVuZEVxdWF0aW9uKHRoaXMud2ViZ2wuRlVOQ19BREQpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy53ZWJnbC5ibGVuZEZ1bmModGhpcy53ZWJnbC5PTkUsIHRoaXMud2ViZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5CbGVuZEZ1bmNTZXBhcmF0ZSh0aGlzLndlYmdsLk9ORSwgdGhpcy53ZWJnbC5PTkVfTUlOVVNfU1JDX0FMUEhBLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlNSQ19BTFBIQSwgdGhpcy53ZWJnbC5PTkUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRGlzYWJsZSh0aGlzLndlYmdsLkJMRU5EKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy53ZWJnbC5Vc2VQcm9ncmFtKHRoaXMuc2hhZGVyY29kZS5wcm9ncmFtKTtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuQmluZEJ1ZmZlcih0aGlzLndlYmdsLkFSUkFZX0JVRkZFUiwgdGhpcy52Ym8pO1xuXG5cbiAgICAgICAgICAgIC8v5oyH5a6a5Zu65a6a55qE5pWw5o2u57uT5p6E77yM54S25ZCO5qC55o2u5a2Y5ZyocHJvZ3JhbeeahOaVsOaNruWOu+e7keWumuWSr+OAglxuXG4gICAgICAgICAgICAvL+e7keWumnZib+WSjHNoYWRlcumhtueCueagvOW8j++8jOi/memDqOWIhuW6lOivpeimgeWMuuWIhuadkOi0qOaUueWPmOS4juWPguaVsOaUueWPmO+8jOWPr+S7peWwkeWIh+aNouS4gOS6m+eKtuaAgVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZS5wb3NQb3MgPj0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc2hhZGVyY29kZS5wb3NQb3MpO1xuICAgICAgICAgICAgICAgIC8vMjgg5piv5pWw5o2u5q2l6ZW/KOWtl+iKginvvIzlsLHmmK/mlbDmja7nu5PmnoTnmoTplb/luqZcbiAgICAgICAgICAgICAgICAvLzEyIOaYr+aVsOaNruWBj+enu++8iOWtl+iKgu+8iVxuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlcmNvZGUucG9zUG9zLCAzLCB0aGlzLndlYmdsLkZMT0FULCBmYWxzZSwgNTIsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZS5wb3NDb2xvciA+PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zaGFkZXJjb2RlLnBvc0NvbG9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJjb2RlLnBvc0NvbG9yLCA0LCB0aGlzLndlYmdsLkZMT0FULCBmYWxzZSwgNTIsIDEyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRlcmNvZGUucG9zQ29sb3IyID49IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5FbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNoYWRlcmNvZGUucG9zQ29sb3IyKTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXJjb2RlLnBvc0NvbG9yMiwgNCwgdGhpcy53ZWJnbC5GTE9BVCwgZmFsc2UsIDUyLCAyOCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlLnBvc1VWID49IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5FbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNoYWRlcmNvZGUucG9zVVYpO1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlcmNvZGUucG9zVVYsIDIsIHRoaXMud2ViZ2wuRkxPQVQsIGZhbHNlLCA1MiwgNDQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlLnVuaU1hdHJpeCAhPSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoYWRlcmNvZGUudW5pTWF0cml4LCBmYWxzZSwgKEFycmF5KShvYmplY3QpdGhpcy5tYXRyaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZS51bmlUZXgwICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5BY3RpdmVUZXh0dXJlKHRoaXMud2ViZ2wuVEVYVFVSRTApO1xuICAgICAgICAgICAgICAgIHZhciB0ZXggPSB0aGlzLm1hdC50ZXgwO1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuQmluZFRleHR1cmUodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0ZXggPT0gbnVsbCA/IG51bGwgOiB0ZXgudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5Vbmlmb3JtMWkodGhpcy5zaGFkZXJjb2RlLnVuaVRleDAsIDApO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzZXR0ZXhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlLnVuaVRleDEgIT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkFjdGl2ZVRleHR1cmUodGhpcy53ZWJnbC5URVhUVVJFMSk7XG4gICAgICAgICAgICAgICAgdmFyIHRleCA9IHRoaXMubWF0LnRleDE7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5CaW5kVGV4dHVyZSh0aGlzLndlYmdsLlRFWFRVUkVfMkQsIHRleCA9PSBudWxsID8gbnVsbCA6IHRleC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlVuaWZvcm0xaSh0aGlzLnNoYWRlcmNvZGUudW5pVGV4MSwgMSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInNldHRleFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRlcmNvZGUudW5pQ29sMCAhPSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVW5pZm9ybTRmKHRoaXMuc2hhZGVyY29kZS51bmlDb2wwLCBtYXQuY29sMC5yLCBtYXQuY29sMC5nLCBtYXQuY29sMC5iLCBtYXQuY29sMC5hKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic2V0dGV4XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZS51bmlDb2wxICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5Vbmlmb3JtNGYodGhpcy5zaGFkZXJjb2RlLnVuaUNvbDEsIG1hdC5jb2wxLnIsIG1hdC5jb2wxLmcsIG1hdC5jb2wxLmIsIG1hdC5jb2wxLmEpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzZXR0ZXhcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBGbG9hdDMyQXJyYXkgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDEwMjQgKiAxMyk7Ly9uZXNzXG4gICAgICAgIGludCBkYXRhc2VlayA9IDA7XG4gICAgICAgIHB1YmxpYyB2b2lkIGVuZGJhdGNoKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tYXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNlZWsgPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvL+Whq+WFhXZib1xuICAgICAgICAgICAgdGhpcy53ZWJnbC5CdWZmZXJEYXRhKHRoaXMud2ViZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmFycmF5LCB0aGlzLndlYmdsLkRZTkFNSUNfRFJBVyk7XG4gICAgICAgICAgICAvL+e7mOWItlxuICAgICAgICAgICAgdGhpcy53ZWJnbC5EcmF3QXJyYXlzKHRoaXMud2ViZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLmRhdGFzZWVrKTtcbiAgICAgICAgICAgIC8v5riF55CG54q25oCB77yM5Y+v5Lul5LiN5bmyXG4gICAgICAgICAgICAvL3RoaXMud2ViZ2wuYmluZEJ1ZmZlcih0aGlzLndlYmdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5kYXRhLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZWVrID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBhZGRRdWFkKHNwcml0ZVBvaW50W10gcHMpLy/mt7vliqDlm5vovrnlvaLvvIzlv4XpobvmmK/lm5vnmoTlgI3mlbDvvIzkuI3mjqXlj5foo4HliapcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZSA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgIGZvciAodmFyIGpjID0gMDsgamMgPCA2OyBqYysrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBqID0gamMgPCAzID8gamMgOiA2IC0gamM7Ly8gMC0+MCAxLT4xIDItPjJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChqID4gMikgaiA9IDYgLSBqYzsgLy8gMy0+MyA0LT4yIDUtPjFcblxuICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5kYXRhc2VlayAqIDEzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ueDtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS55O1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLno7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ucjtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5nO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmI7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYTtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5yMjtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5nMjtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5iMjtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5hMjtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS51O1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnY7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZWVrKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZWVrID49IDEwMDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRiYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIGFkZFRyaShzcHJpdGVQb2ludFtdIHBzKS8v5re75Yqg5LiJ6KeS5b2i77yM5b+F6aG75piv5LiJ55qE5YCN5pWwICzkuInop5LlvaLkuI3mlK/mjIHnoazoo4HliapcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZSA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7IGorKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5kYXRhc2VlayAqIDEzO1xuICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGUgaW4gcHNbal0pXG4gICAgICAgICAgICAgICAgICAgIC8ve1xuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXVtlXTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLno7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnIyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5nMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYjI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmEyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS51O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS52O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNlZWsrKztcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS54KTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS55KTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS56KTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5yKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5nKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5iKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5hKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5yKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5nKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5iKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS5hKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS51KTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGEucHVzaChwc1tqXS52KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZWVrID49IDEwMDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRiYXRjaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvL+i/meS4quaOpeWPo+aOpeWPl+ijgeWJqlxuICAgICAgICBwdWJsaWMgdm9pZCBhZGRSZWN0KHNwcml0ZVBvaW50W10gcHMpIC8v5re75Yqg5Zub6L655b2i77yM5b+F6aG75piv5Zub55qE5YCN5pWwXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRlcmNvZGUgPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWN0Q2xpcCAhPSBudWxsKSAvL+S9v+eUqOijgeWJqlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB4bWluID0gcHNbMF0ueDtcbiAgICAgICAgICAgICAgICB2YXIgeG1heCA9IHBzWzNdLng7XG4gICAgICAgICAgICAgICAgdmFyIHltaW4gPSBwc1swXS55O1xuICAgICAgICAgICAgICAgIHZhciB5bWF4ID0gcHNbM10ueTtcbiAgICAgICAgICAgICAgICB2YXIgdW1pbiA9IHBzWzBdLnU7XG4gICAgICAgICAgICAgICAgdmFyIHVtYXggPSBwc1szXS51O1xuICAgICAgICAgICAgICAgIHZhciB2bWluID0gcHNbMF0udjtcbiAgICAgICAgICAgICAgICB2YXIgdm1heCA9IHBzWzNdLnY7XG4gICAgICAgICAgICAgICAgdmFyIHdzaXplID0geG1heCAtIHhtaW47XG4gICAgICAgICAgICAgICAgdmFyIGhzaXplID0geW1heCAtIHltaW47XG4gICAgICAgICAgICAgICAgdmFyIHVzaXplID0gdW1heCAtIHVtaW47XG4gICAgICAgICAgICAgICAgdmFyIHZzaXplID0gdm1heCAtIHZtaW47XG4gICAgICAgICAgICAgICAgdmFyIHhsID0gTWF0aC5NYXgoeG1pbiwgdGhpcy5yZWN0Q2xpcC5WYWx1ZS54KTtcbiAgICAgICAgICAgICAgICB2YXIgeHIgPSBNYXRoLk1pbih4bWF4LCB0aGlzLnJlY3RDbGlwLlZhbHVlLnggKyB0aGlzLnJlY3RDbGlwLlZhbHVlLncpO1xuICAgICAgICAgICAgICAgIHZhciB5dCA9IE1hdGguTWF4KHltaW4sIHRoaXMucmVjdENsaXAuVmFsdWUueSk7XG4gICAgICAgICAgICAgICAgdmFyIHliID0gTWF0aC5NaW4oeW1heCwgdGhpcy5yZWN0Q2xpcC5WYWx1ZS55ICsgdGhpcy5yZWN0Q2xpcC5WYWx1ZS5oKTtcbiAgICAgICAgICAgICAgICB2YXIgbGYgPSAoeGwgLSB4bWluKSAvIHdzaXplO1xuICAgICAgICAgICAgICAgIHZhciB0ZiA9ICh5dCAtIHltaW4pIC8gaHNpemU7XG4gICAgICAgICAgICAgICAgdmFyIHJmID0gKHhyIC0geG1heCkgLyB3c2l6ZTtcbiAgICAgICAgICAgICAgICB2YXIgYmYgPSAoeWIgLSB5bWF4KSAvIGhzaXplO1xuICAgICAgICAgICAgICAgIHVtaW4gPSB1bWluICsgbGYgKiB1c2l6ZTtcbiAgICAgICAgICAgICAgICB2bWluID0gdm1pbiArIHRmICogdnNpemU7XG4gICAgICAgICAgICAgICAgdW1heCA9IHVtYXggKyByZiAqIHVzaXplO1xuICAgICAgICAgICAgICAgIHZtYXggPSB2bWF4ICsgYmYgKiB2c2l6ZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqYyA9IDA7IGpjIDwgNjsgamMrKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqID0gamMgPCAzID8gamMgOiA2IC0gamM7Ly8gMC0+MCAxLT4xIDItPjJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaiA+IDIpIGogPSA2IC0gamM7IC8vIDMtPjMgNC0+MiA1LT4xXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmRhdGFzZWVrICogMTM7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBwc1tqXS54O1xuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IHhsKSB4ID0geGw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4ID4geHIpIHggPSB4cjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSBwc1tqXS55O1xuICAgICAgICAgICAgICAgICAgICBpZiAoeSA8IHl0KSB5ID0geXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh5ID4geWIpIHkgPSB5YjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBwc1tqXS51O1xuICAgICAgICAgICAgICAgICAgICBpZiAodSA8IHVtaW4pIHUgPSB1bWluO1xuICAgICAgICAgICAgICAgICAgICBpZiAodSA+IHVtYXgpIHUgPSB1bWF4O1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IHBzW2pdLnY7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2IDwgdm1pbikgdiA9IHZtaW47XG4gICAgICAgICAgICAgICAgICAgIGlmICh2ID4gdm1heCkgdiA9IHZtYXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLno7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnIyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5nMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYjI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmEyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSB1O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSB2O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNlZWsrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgamMgPSAwOyBqYyA8IDY7IGpjKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaiA9IGpjIDwgMyA/IGpjIDogNiAtIGpjOy8vIDAtPjAgMS0+MSAyLT4yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGogPiAyKSBqID0gNiAtIGpjOyAvLyAzLT4zIDQtPjIgNS0+MVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5kYXRhc2VlayAqIDEzO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLno7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnIyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5nMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYjI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmEyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS51O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS52O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNlZWsrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2VlayA+PSAxMDAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kYmF0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzcHJpdGVSZWN0PyByZWN0Q2xpcCA9IG51bGw7XG4gICAgICAgIHB1YmxpYyB2b2lkIHNldFJlY3RDbGlwKHNwcml0ZVJlY3QgcmVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWN0Q2xpcCA9IHJlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgY2xvc2VSZWN0Q2xpcCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVjdENsaXAgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy90ZXh0dXJlXG4gICAgcHVibGljIGVudW0gdGV4dHVyZWZvcm1hdFxuICAgIHtcbiAgICAgICAgUkdCQSA9IDEsLy8gV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsXG4gICAgICAgIFJHQiA9IDIsLy9XZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCLFxuICAgICAgICBHUkFZID0gMywvL1dlYkdMUmVuZGVyaW5nQ29udGV4dC5MVU1JTkFOQ0UsXG4gICAgICAgIC8vQUxQSEEgPSB0aGlzLndlYmdsLkFMUEhBLFxuICAgIH1cbiAgICBwdWJsaWMgY2xhc3MgdGV4UmVhZGVyXG4gICAge1xuICAgICAgICBwdWJsaWMgdGV4UmVhZGVyKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgV2ViR0xUZXh0dXJlIHRleFJHQkEsIGludCB3aWR0aCwgaW50IGhlaWdodCwgYm9vbCBncmF5ID0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5ncmF5ID0gZ3JheTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICB2YXIgZmJvID0gd2ViZ2wuQ3JlYXRlRnJhbWVidWZmZXIoKTtcbiAgICAgICAgICAgIFdlYkdMRnJhbWVidWZmZXIgZmJvbGQgPSB3ZWJnbC5HZXRQYXJhbWV0ZXIod2ViZ2wuRlJBTUVCVUZGRVJfQklORElORykgYXMgV2ViR0xGcmFtZWJ1ZmZlcjtcbiAgICAgICAgICAgIHdlYmdsLkJpbmRGcmFtZWJ1ZmZlcih3ZWJnbC5GUkFNRUJVRkZFUiwgZmJvKTtcbiAgICAgICAgICAgIHdlYmdsLkZyYW1lYnVmZmVyVGV4dHVyZTJEKHdlYmdsLkZSQU1FQlVGRkVSLCB3ZWJnbC5DT0xPUl9BVFRBQ0hNRU5UMCwgd2ViZ2wuVEVYVFVSRV8yRCxcbiAgICAgICAgICAgICAgICB0ZXhSR0JBLCAwKTtcblxuICAgICAgICAgICAgdmFyIHJlYWREYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0ICogNCk7XG4gICAgICAgICAgICByZWFkRGF0YVswXSA9IDI7XG4gICAgICAgICAgICB3ZWJnbC5SZWFkUGl4ZWxzKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB3ZWJnbC5SR0JBLCB3ZWJnbC5VTlNJR05FRF9CWVRFLFxuICAgICAgICAgICAgICAgIHJlYWREYXRhKTtcbiAgICAgICAgICAgIHdlYmdsLkRlbGV0ZUZyYW1lYnVmZmVyKGZibyk7XG4gICAgICAgICAgICB3ZWJnbC5CaW5kRnJhbWVidWZmZXIod2ViZ2wuRlJBTUVCVUZGRVIsIGZib2xkKTtcblxuICAgICAgICAgICAgaWYgKGdyYXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoICogaGVpZ2h0OyBpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFbaV0gPSByZWFkRGF0YVtpICogNF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlYWREYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBpbnQgd2lkdGg7XG4gICAgICAgIHB1YmxpYyBpbnQgaGVpZ2h0O1xuICAgICAgICBwdWJsaWMgVWludDhBcnJheSBkYXRhO1xuICAgICAgICBwdWJsaWMgYm9vbCBncmF5O1xuICAgICAgICBwdWJsaWMgb2JqZWN0IGdldFBpeGVsKGZsb2F0IHUsIGZsb2F0IHYpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGludCB4ID0gKGludCkodSAqIHRoaXMud2lkdGgpO1xuICAgICAgICAgICAgaW50IHkgPSAoaW50KSh2ICogdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgaWYgKHggPCAwIHx8IHggPj0gdGhpcy53aWR0aCB8fCB5IDwgMCB8fCB5ID49IHRoaXMuaGVpZ2h0KSByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyYXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVt5ICogdGhpcy53aWR0aCArIHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBpID0gKHkgKiB0aGlzLndpZHRoICsgeCkgKiA0O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgc3ByaXRlQ29sb3IodGhpcy5kYXRhW2ldLCB0aGlzLmRhdGFbaSArIDFdLCB0aGlzLmRhdGFbaSArIDJdLCB0aGlzLmRhdGFbaSArIDNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlVGV4dHVyZVxuICAgIHtcbiAgICAgICAgcHVibGljIHNwcml0ZVRleHR1cmUoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBzdHJpbmcgdXJsID0gbnVsbCwgdGV4dHVyZWZvcm1hdCBmb3JtYXQgPSB0ZXh0dXJlZm9ybWF0LlJHQkEsIGJvb2wgbWlwbWFwID0gZmFsc2UsIGJvb2wgbGluZWFyID0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy53ZWJnbCA9IHdlYmdsO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXQgPSBmb3JtYXQ7XG5cbiAgICAgICAgICAgIHRoaXMubWF0ID0gbmV3IHNwcml0ZU1hdCgpOy8vbmVzc1xuICAgICAgICAgICAgdGhpcy5tYXQudGV4MCA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm1hdC50cmFuc3BhcmVudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hdC5zaGFkZXIgPSBcInNwcml0ZWRlZmF1bHRcIjtcblxuICAgICAgICAgICAgaWYgKHVybCA9PSBudWxsKS8v5LiN57uZ5a6adXJsIOWImSB0ZXh0dXJlIOS4jeWKoOi9vVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHdlYmdsLkNyZWF0ZVRleHR1cmUoKTtcblxuICAgICAgICAgICAgdGhpcy5pbWcgPSBuZXcgQnJpZGdlLkh0bWw1LkhUTUxJbWFnZUVsZW1lbnQoKTsvLyBJbWFnZSgpOy8vIEhUTUxJbWFnZUVsZW1lbnQoKTsgLy9uZXNzXG4gICAgICAgICAgICB0aGlzLmltZy5TcmMgPSB1cmw7XG4gICAgICAgICAgICB0aGlzLmltZy5PbkxvYWQgPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwb3NlaXQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGltZyhtaXBtYXAsIGxpbmVhcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSB2b2lkIF9sb2FkaW1nKGJvb2wgbWlwbWFwLCBib29sIGxpbmVhcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1nLldpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltZy5IZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndlYmdsLlBpeGVsU3RvcmVpKHRoaXMud2ViZ2wuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLCAxKTtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuUGl4ZWxTdG9yZWkodGhpcy53ZWJnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCAwKTtcblxuXG4gICAgICAgICAgICB0aGlzLndlYmdsLkJpbmRUZXh0dXJlKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXRHTCA9IHRoaXMud2ViZ2wuUkdCQTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1hdCA9PSB0ZXh0dXJlZm9ybWF0LlJHQilcbiAgICAgICAgICAgICAgICBmb3JtYXRHTCA9IHRoaXMud2ViZ2wuUkdCO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mb3JtYXQgPT0gdGV4dHVyZWZvcm1hdC5HUkFZKVxuICAgICAgICAgICAgICAgIGZvcm1hdEdMID0gdGhpcy53ZWJnbC5MVU1JTkFOQ0U7XG4gICAgICAgICAgICB0aGlzLndlYmdsLlRleEltYWdlMkQodGhpcy53ZWJnbC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgZm9ybWF0R0wsXG4gICAgICAgICAgICAgICAgZm9ybWF0R0wsXG4gICAgICAgICAgICAgICAgLy/mnIDlkI7ov5nkuKp0eXBl77yM5Y+v5Lul566h5qC85byPXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5VTlNJR05FRF9CWVRFXG4gICAgICAgICAgICAgICAgLCB0aGlzLmltZyk7XG5cbiAgICAgICAgICAgIGlmIChtaXBtYXApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy/nlJ/miJBtaXBtYXBcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkdlbmVyYXRlTWlwbWFwKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGluZWFyKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5UZXhQYXJhbWV0ZXJpKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy53ZWJnbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMud2ViZ2wuTElORUFSKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5UZXhQYXJhbWV0ZXJpKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy53ZWJnbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMud2ViZ2wuTElORUFSX01JUE1BUF9MSU5FQVIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlRleFBhcmFtZXRlcmkodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0aGlzLndlYmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy53ZWJnbC5ORUFSRVNUKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5UZXhQYXJhbWV0ZXJpKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy53ZWJnbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMud2ViZ2wuTkVBUkVTVF9NSVBNQVBfTkVBUkVTVCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmVhcilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVGV4UGFyYW1ldGVyaSh0aGlzLndlYmdsLlRFWFRVUkVfMkQsIHRoaXMud2ViZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLndlYmdsLkxJTkVBUik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVGV4UGFyYW1ldGVyaSh0aGlzLndlYmdsLlRFWFRVUkVfMkQsIHRoaXMud2ViZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLndlYmdsLkxJTkVBUik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVGV4UGFyYW1ldGVyaSh0aGlzLndlYmdsLlRFWFRVUkVfMkQsIHRoaXMud2ViZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLndlYmdsLk5FQVJFU1QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlRleFBhcmFtZXRlcmkodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0aGlzLndlYmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy53ZWJnbC5ORUFSRVNUKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1nID0gbnVsbDtcblxuXG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsO1xuICAgICAgICBwdWJsaWMgSFRNTEltYWdlRWxlbWVudCBpbWcgPSBudWxsO1xuICAgICAgICBwdWJsaWMgYm9vbCBsb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgcHVibGljIFdlYkdMVGV4dHVyZSB0ZXh0dXJlO1xuICAgICAgICBwdWJsaWMgdGV4dHVyZWZvcm1hdCBmb3JtYXQ7XG4gICAgICAgIHB1YmxpYyBpbnQgd2lkdGggPSAwO1xuICAgICAgICBwdWJsaWMgaW50IGhlaWdodCA9IDA7XG4gICAgICAgIHN0YXRpYyBwdWJsaWMgc3ByaXRlVGV4dHVyZSBmcm9tUmF3KFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgSFRNTEltYWdlRWxlbWVudCBpbWcsIHRleHR1cmVmb3JtYXQgZm9ybWF0ID0gdGV4dHVyZWZvcm1hdC5SR0JBLCBib29sIG1pcG1hcCA9IGZhbHNlLCBib29sIGxpbmVhciA9IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdCA9IG5ldyBzcHJpdGVUZXh0dXJlKHdlYmdsLCBudWxsLCBmb3JtYXQsIG1pcG1hcCwgbGluZWFyKTtcbiAgICAgICAgICAgIHN0LnRleHR1cmUgPSB3ZWJnbC5DcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgICAgICBzdC5pbWcgPSBpbWc7XG4gICAgICAgICAgICBzdC5fbG9hZGltZyhtaXBtYXAsIGxpbmVhcik7XG5cbiAgICAgICAgICAgIHJldHVybiBzdDtcblxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzcHJpdGVNYXQgbWF0ID0gbnVsbDtcbiAgICAgICAgLy/liJvlu7ror7vlj5blmajvvIzmnInlj6/og73lpLHotKVcbiAgICAgICAgcHVibGljIHRleFJlYWRlciByZWFkZXI7XG4gICAgICAgIHB1YmxpYyB0ZXhSZWFkZXIgZ2V0UmVhZGVyKGJvb2wgcmVkT25seSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZGVyICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZGVyLmdyYXkgIT0gcmVkT25seSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5c3RlbS5FeGNlcHRpb24oXCJnZXQgcGFyYW0gZGlmZiB3aXRoIHRoaXMucmVhZGVyXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1hdCAhPSB0ZXh0dXJlZm9ybWF0LlJHQkEpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5c3RlbS5FeGNlcHRpb24oXCJvbmx5IHJnYmEgdGV4dHVyZSBjYW4gcmVhZFwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmUgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRlciA9IG5ldyB0ZXhSZWFkZXIodGhpcy53ZWJnbCwgdGhpcy50ZXh0dXJlLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgcmVkT25seSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRlcjtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgYm9vbCBkaXNwb3NlaXQgPSBmYWxzZTtcbiAgICAgICAgcHVibGljIHZvaWQgZGlzcG9zZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmUgPT0gbnVsbCAmJiB0aGlzLmltZyAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZWl0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZSAhPSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRGVsZXRlVGV4dHVyZSh0aGlzLnRleHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzcHJpdGVQb2ludFtdIHBvaW50YnVmID0ge1xuICAgICAgICAgICAgbmV3IHNwcml0ZVBvaW50KCl7IHg9MCwgeT0gMCwgej0gMCwgcj0gMCwgZz0wLCBiPSAwLCBhPSAwLCByMj0wLCBnMj0wLCBiMj0gMCwgYTI9IDAsIHU9MCwgdj0wIH0sXG4gICAgICAgICAgICBuZXcgc3ByaXRlUG9pbnQoKXsgeD0gMCwgeT0gMCwgej0gMCwgcj0gMCwgZz0gMCwgYj0gMCwgYT0gMCwgcjI9MCwgZzI9IDAsIGIyPSAwLCBhMj0gMCwgdT0wLCB2PTAgfSxcbiAgICAgICAgICAgIG5ldyBzcHJpdGVQb2ludCgpeyB4PTAsIHk9IDAsIHo9IDAsIHI9IDAsIGc9IDAsIGI9IDAsIGE9IDAsIHIyPSAwLCBnMj0gMCwgYjI9IDAsIGEyPSAwLCB1PTAsIHY9IDAgfSxcbiAgICAgICAgICAgIG5ldyBzcHJpdGVQb2ludCgpeyB4PTAsIHk9MCwgej0wLCByPSAwLCBnPSAwLCBiPSAwLCBhPSAwLCByMj0gMCwgZzI9MCwgYjI9IDAsIGEyPTAsIHU9MCwgdj0gMCB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXcoc3ByaXRlQmF0Y2hlciBzcHJpdGVCYXRjaGVyLCBzcHJpdGVSZWN0IHV2LCBzcHJpdGVSZWN0IHJlY3QsIHNwcml0ZUNvbG9yIGMpXG4gICAgICAgIHtcblxuICAgICAgICAgICAge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcCA9IHRoaXMucG9pbnRidWZbMF07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54OyBwLnkgPSByZWN0Lnk7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gdXYueDsgcC52ID0gdXYueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsxXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueTsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSB1di54ICsgdXYudzsgcC52ID0gdXYueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsyXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0Lng7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSB1di54OyBwLnYgPSB1di55ICsgdXYuaDtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlszXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSB1di54ICsgdXYudzsgcC52ID0gdXYueSArIHV2Lmg7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ByaXRlQmF0Y2hlci5zZXRNYXQodGhpcy5tYXQpO1xuICAgICAgICAgICAgc3ByaXRlQmF0Y2hlci5hZGRSZWN0KHRoaXMucG9pbnRidWYpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBkcmF3Q3VzdG9tKHNwcml0ZUJhdGNoZXIgc3ByaXRlQmF0Y2hlciwgc3ByaXRlTWF0IF9tYXQsIHNwcml0ZVJlY3QgdXYsIHNwcml0ZVJlY3QgcmVjdCwgc3ByaXRlQ29sb3IgYywgc3ByaXRlQ29sb3IgYzIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9tYXQudGV4MCA9IHRoaXM7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSB0aGlzLnBvaW50YnVmWzBdO1xuICAgICAgICAgICAgICAgIHAueCA9IHJlY3QueDsgcC55ID0gcmVjdC55OyBwLnogPSAwO1xuICAgICAgICAgICAgICAgIHAudSA9IHV2Lng7IHAudiA9IHV2Lnk7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbMV07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54ICsgcmVjdC53OyBwLnkgPSByZWN0Lnk7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gdXYueCArIHV2Lnc7IHAudiA9IHV2Lnk7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbMl07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54OyBwLnkgPSByZWN0LnkgKyByZWN0Lmg7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gdXYueDsgcC52ID0gdXYueSArIHV2Lmg7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbM107XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54ICsgcmVjdC53OyBwLnkgPSByZWN0LnkgKyByZWN0Lmg7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gdXYueCArIHV2Lnc7IHAudiA9IHV2LnkgKyB1di5oO1xuICAgICAgICAgICAgICAgIHAuciA9IGMucjsgcC5nID0gYy5nOyBwLmIgPSBjLmI7IHAuYSA9IGMuYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwcml0ZUJhdGNoZXIuc2V0TWF0KF9tYXQpO1xuICAgICAgICAgICAgc3ByaXRlQmF0Y2hlci5hZGRSZWN0KHRoaXMucG9pbnRidWYpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlLy8gOiBzcHJpdGVSZWN0XG4gICAge1xuICAgICAgICBwdWJsaWMgZmxvYXQgeDtcbiAgICAgICAgcHVibGljIGZsb2F0IHk7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB3O1xuICAgICAgICBwdWJsaWMgZmxvYXQgaDtcbiAgICAgICAgcHVibGljIGZsb2F0IHhzaXplO1xuICAgICAgICBwdWJsaWMgZmxvYXQgeXNpemU7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVSZWN0IFRvUmVjdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgc3ByaXRlUmVjdCh4LCB5LCB3LCBoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2F0bGFzXG4gICAgcHVibGljIGNsYXNzIHNwcml0ZUF0bGFzXG4gICAge1xuICAgICAgICBwdWJsaWMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsO1xuICAgICAgICBwdWJsaWMgc3ByaXRlQXRsYXMoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBzdHJpbmcgYXRsYXN1cmwgPSBudWxsLCBzcHJpdGVUZXh0dXJlIHRleHR1cmUgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLndlYmdsID0gd2ViZ2w7XG4gICAgICAgICAgICBpZiAoYXRsYXN1cmwgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsaWdodHRvb2wubG9hZFRvb2wubG9hZFRleHQoYXRsYXN1cmwsIChBY3Rpb248c3RyaW5nLEVycm9yPikoKHR4dCwgZXJyKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyc2UodHh0KTtcbiAgICAgICAgICAgICAgICB9XG4pICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3ByaXRlQXRsYXMgZnJvbVJhdyhXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyB0eHQsIHNwcml0ZVRleHR1cmUgdGV4dHVyZSA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzYSA9IG5ldyBzcHJpdGVBdGxhcyh3ZWJnbCwgbnVsbCwgdGV4dHVyZSk7XG4gICAgICAgICAgICBzYS5fcGFyc2UodHh0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHNhO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgdGV4dHVyZXVybDtcbiAgICAgICAgcHVibGljIGludCB0ZXh0dXJld2lkdGg7XG4gICAgICAgIHB1YmxpYyBpbnQgdGV4dHVyZWhlaWdodDtcbiAgICAgICAgcHVibGljIHNwcml0ZVRleHR1cmUgdGV4dHVyZTtcbiAgICAgICAgcHVibGljIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkRpY3Rpb25hcnk8c3RyaW5nLCBzcHJpdGU+IHNwcml0ZXMgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHNwcml0ZT4oKTtcbiAgICAgICAgcHJpdmF0ZSB2b2lkIF9wYXJzZShzdHJpbmcgdHh0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIganNvbiA9IEpTT04uUGFyc2UodHh0KS5Ub0R5bmFtaWMoKTtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZXVybCA9IGpzb25bXCJ0XCJdO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJld2lkdGggPSBqc29uW1wid1wiXTtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZWhlaWdodCA9IGpzb25bXCJoXCJdO1xuICAgICAgICAgICAgdmFyIHMgPSAob2JqZWN0W10panNvbltcInNcIl07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5MZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgc3MgPSAob2JqZWN0W10pc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgciA9IG5ldyBzcHJpdGUoKTsvL25lc3NcbiAgICAgICAgICAgICAgICByLnggPSAoKGZsb2F0KXNzWzFdICsgMC41ZikgLyB0aGlzLnRleHR1cmV3aWR0aDtcbiAgICAgICAgICAgICAgICByLnkgPSAoKGZsb2F0KXNzWzJdICsgMC41ZikgLyB0aGlzLnRleHR1cmVoZWlnaHQ7XG4gICAgICAgICAgICAgICAgci53ID0gKChmbG9hdClzc1szXSAtIDFmKSAvIHRoaXMudGV4dHVyZXdpZHRoO1xuICAgICAgICAgICAgICAgIHIuaCA9ICgoZmxvYXQpc3NbNF0gLSAxZikgLyB0aGlzLnRleHR1cmVoZWlnaHQ7XG4gICAgICAgICAgICAgICAgci54c2l6ZSA9IChmbG9hdClzc1szXTtcbiAgICAgICAgICAgICAgICByLnlzaXplID0gKGZsb2F0KXNzWzRdO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlc1soc3RyaW5nKXNzWzBdXSA9IHI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBkcmF3QnlUZXh0dXJlKHNwcml0ZUJhdGNoZXIgc2IsIHN0cmluZyBzbmFtZSwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVDb2xvciBjKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIHZhciByID0gdGhpcy5zcHJpdGVzW3NuYW1lXTtcbiAgICAgICAgICAgIGlmIChyID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmRyYXcoc2IsIHIuVG9SZWN0KCksIHJlY3QsIGMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvL2ZvbnRcbiAgICBwdWJsaWMgY2xhc3MgY2hhcmluZm9cbiAgICB7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB4Oy8vdXZcbiAgICAgICAgcHVibGljIGZsb2F0IHk7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB3O1xuICAgICAgICBwdWJsaWMgZmxvYXQgaDtcbiAgICAgICAgcHVibGljIGZsb2F0IHhTaXplO1xuICAgICAgICBwdWJsaWMgZmxvYXQgeVNpemU7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB4T2Zmc2V0Oy8v5YGP56e7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB5T2Zmc2V0O1xuICAgICAgICBwdWJsaWMgZmxvYXQgeEFkZHZhbmNlOy8v5a2X56ym5a695bqmXG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGVGb250XG4gICAge1xuICAgICAgICBwdWJsaWMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsO1xuICAgICAgICBwdWJsaWMgc3ByaXRlVGV4dHVyZSB0ZXh0dXJlO1xuICAgICAgICBwdWJsaWMgc3ByaXRlTWF0IG1hdDtcblxuICAgICAgICBwdWJsaWMgZHluYW1pYyBjbWFwO1xuICAgICAgICBwdWJsaWMgc3RyaW5nIGZvbnRuYW1lO1xuICAgICAgICBwdWJsaWMgZmxvYXQgcG9pbnRTaXplOy8v5YOP57Sg5bC65a+4XG4gICAgICAgIHB1YmxpYyBmbG9hdCBwYWRkaW5nOy8v6Ze06ZqUXG4gICAgICAgIHB1YmxpYyBmbG9hdCBsaW5lSGVpZ2h0Oy8v6KGM6auYXG4gICAgICAgIHB1YmxpYyBmbG9hdCBiYXNlbGluZTsvL+Wfuue6v1xuICAgICAgICBwdWJsaWMgZmxvYXQgYXRsYXNXaWR0aDtcbiAgICAgICAgcHVibGljIGZsb2F0IGF0bGFzSGVpZ2h0O1xuICAgICAgICBwdWJsaWMgc3ByaXRlRm9udChXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyB1cmxjb25maWcsIHNwcml0ZVRleHR1cmUgdGV4dHVyZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy53ZWJnbCA9IHdlYmdsO1xuICAgICAgICAgICAgaWYgKHVybGNvbmZpZyAhPSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dCh1cmxjb25maWcsIChBY3Rpb248c3RyaW5nLEVycm9yPikoKHR4dCwgZXJyKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyc2UodHh0KTtcbiAgICAgICAgICAgICAgICB9XG4pICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICAgICAgdGhpcy5tYXQgPSBuZXcgc3ByaXRlTWF0KCk7Ly9uZXNzXG4gICAgICAgICAgICB0aGlzLm1hdC5zaGFkZXIgPSBcInNwcml0ZWZvbnRcIjtcbiAgICAgICAgICAgIHRoaXMubWF0LnRleDAgPSB0aGlzLnRleHR1cmU7XG4gICAgICAgICAgICB0aGlzLm1hdC50cmFuc3BhcmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHN0YXRpYyBzcHJpdGVGb250IGZyb21SYXcoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBzdHJpbmcgdHh0LCBzcHJpdGVUZXh0dXJlIHRleHR1cmUgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc2YgPSBuZXcgc3ByaXRlRm9udCh3ZWJnbCwgbnVsbCwgdGV4dHVyZSk7XG4gICAgICAgICAgICBzZi5fcGFyc2UodHh0KTtcbiAgICAgICAgICAgIHJldHVybiBzZjtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBfcGFyc2Uoc3RyaW5nIHR4dClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGQxID0gbmV3IERhdGUoKS5WYWx1ZU9mKCk7XG4gICAgICAgICAgICB2YXIganNvbiA9IEpTT04uUGFyc2UodHh0KTtcblxuICAgICAgICAgICAgLy9wYXJzZSBmb250aW5mb1xuICAgICAgICAgICAgdmFyIGZvbnQgPSAob2JqZWN0W10panNvbltcImZvbnRcIl07XG4gICAgICAgICAgICB0aGlzLmZvbnRuYW1lID0gKHN0cmluZylmb250WzBdO1xuICAgICAgICAgICAgdGhpcy5wb2ludFNpemUgPSAoZmxvYXQpZm9udFsxXTtcbiAgICAgICAgICAgIHRoaXMucGFkZGluZyA9IChmbG9hdClmb250WzJdO1xuICAgICAgICAgICAgdGhpcy5saW5lSGVpZ2h0ID0gKGZsb2F0KWZvbnRbM107XG4gICAgICAgICAgICB0aGlzLmJhc2VsaW5lID0gKGZsb2F0KWZvbnRbNF07XG4gICAgICAgICAgICB0aGlzLmF0bGFzV2lkdGggPSAoZmxvYXQpZm9udFs1XTtcbiAgICAgICAgICAgIHRoaXMuYXRsYXNIZWlnaHQgPSAoZmxvYXQpZm9udFs2XTtcblxuICAgICAgICAgICAgLy9wYXJzZSBjaGFyIG1hcFxuICAgICAgICAgICAgdGhpcy5jbWFwID0gbmV3IG9iamVjdCgpO1xuICAgICAgICAgICAgdmFyIG1hcCA9IGpzb25bXCJtYXBcIl07XG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYyBpbiBTY3JpcHQuR2V0T3duUHJvcGVydHlOYW1lcyhtYXApKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBmaW5mbyA9IG5ldyBjaGFyaW5mbygpOy8vbmVzc1xuICAgICAgICAgICAgICAgIHRoaXMuY21hcFtjXSA9IGZpbmZvO1xuICAgICAgICAgICAgICAgIGZpbmZvLnggPSBtYXBbY10uQXM8ZmxvYXRbXT4oKVswXSAvIHRoaXMuYXRsYXNXaWR0aDtcbiAgICAgICAgICAgICAgICBmaW5mby55ID0gbWFwW2NdLkFzPGZsb2F0W10+KClbMV0gLyB0aGlzLmF0bGFzSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGZpbmZvLncgPSBtYXBbY10uQXM8ZmxvYXRbXT4oKVsyXSAvIHRoaXMuYXRsYXNXaWR0aDtcbiAgICAgICAgICAgICAgICBmaW5mby5oID0gbWFwW2NdLkFzPGZsb2F0W10+KClbM10gLyB0aGlzLmF0bGFzSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGZpbmZvLnhTaXplID0gbWFwW2NdLkFzPGZsb2F0W10+KClbMl07XG4gICAgICAgICAgICAgICAgZmluZm8ueVNpemUgPSBtYXBbY10uQXM8ZmxvYXRbXT4oKVszXTtcbiAgICAgICAgICAgICAgICBmaW5mby54T2Zmc2V0ID0gbWFwW2NdLkFzPGZsb2F0W10+KClbNF07XG4gICAgICAgICAgICAgICAgZmluZm8ueU9mZnNldCA9IG1hcFtjXS5BczxmbG9hdFtdPigpWzVdO1xuICAgICAgICAgICAgICAgIGZpbmZvLnhBZGR2YW5jZSA9IG1hcFtjXS5BczxmbG9hdFtdPigpWzZdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFwID0gbnVsbDtcbiAgICAgICAgICAgIGpzb24gPSBudWxsO1xuXG5cbiAgICAgICAgICAgIHZhciBkMiA9IG5ldyBEYXRlKCkuVmFsdWVPZigpO1xuICAgICAgICAgICAgdmFyIG4gPSBkMiAtIGQxO1xuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoXCJqc29uIHRpbWU9XCIgKyBuKTtcblxuICAgICAgICB9XG4gICAgICAgIHNwcml0ZVBvaW50W10gcG9pbnRidWYgPSB7XG4gICAgICAgICAgICAgICAgICBuZXcgc3ByaXRlUG9pbnQgIHsgeD0wLCB5PSAwLCB6PSAwLCByPSAwLCBnPTAsIGI9MCwgYT0wLCByMj0wLCBnMj0gMCwgYjI9MCwgYTI9MCwgdT0wLHYgPSAwIH0sXG4gICAgICAgICAgICAgbmV3IHNwcml0ZVBvaW50eyB4PSAwLCB5PTAsIHo9MCwgcj0wLCBnPSAwLCBiPSAwLCBhPTAsIHIyPTAsIGcyPSAwLCBiMj0gMCwgYTI9MCwgdT0wLCB2PSAwIH0sXG4gICAgICAgICAgICAgbmV3IHNwcml0ZVBvaW50eyB4PSAwLCB5PSAwLCB6PSAwLCByPSAwLCBnPSAwLCBiPSAwLCBhPSAwLCByMj0gMCwgZzI9IDAsIGIyPSAwLCBhMj0gMCwgdT0gMCwgdj0gMCB9LFxuICAgICAgICAgICAgIG5ldyBzcHJpdGVQb2ludHsgeD0gMCwgeT0gMCwgej0wLCByPSAwLCBnPTAsIGI9IDAsIGE9IDAsIHIyPSAwLCBnMj0gMCwgYjI9MCwgYTI9IDAsIHU9IDAsIHY9IDAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgcHVibGljIHZvaWQgZHJhdyhzcHJpdGVCYXRjaGVyIHNiLCBjaGFyaW5mbyByLCBzcHJpdGVSZWN0IHJlY3QsIHNwcml0ZUNvbG9yIGMgPSBudWxsLCBzcHJpdGVDb2xvciBjb2xvckJvcmRlciA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjID09IG51bGwpXG4gICAgICAgICAgICAgICAgYyA9IHNwcml0ZUNvbG9yLndoaXRlO1xuICAgICAgICAgICAgaWYgKGNvbG9yQm9yZGVyID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3JCb3JkZXIgPSBuZXcgc3ByaXRlQ29sb3IoMGYsIDBmLCAwZiwgMC41Zik7XG4gICAgICAgICAgICAvL2lmIChyPT1udWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBwID0gdGhpcy5wb2ludGJ1ZlswXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0Lng7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLng7IHAudiA9IHIueSArIHIuaDtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsxXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLnggKyByLnc7IHAudiA9IHIueSArIHIuaDtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsyXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0Lng7IHAueSA9IHJlY3QueTsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLng7IHAudiA9IHIueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlszXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueTsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLnggKyByLnc7IHAudiA9IHIueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzYi5zZXRNYXQodGhpcy5tYXQpO1xuICAgICAgICAgICAgc2IuYWRkUmVjdCh0aGlzLnBvaW50YnVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdDaGFyKHNwcml0ZUJhdGNoZXIgc2IsIHN0cmluZyBjbmFtZSwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVDb2xvciBjID0gbnVsbCwgc3ByaXRlQ29sb3IgY29sb3JCb3JkZXIgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgciA9IHRoaXMuY21hcFtjbmFtZV07XG4gICAgICAgICAgICBpZiAociA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoYyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGMgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIGlmIChjb2xvckJvcmRlciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yQm9yZGVyID0gbmV3IHNwcml0ZUNvbG9yKDBmLCAwZiwgMGYsIDAuNWYpO1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBwID0gdGhpcy5wb2ludGJ1ZlswXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0Lng7IHAueSA9IHJlY3QueTsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLng7IHAudiA9IHIueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsxXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueTsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLnggKyByLnc7IHAudiA9IHIueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsyXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0Lng7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLng7IHAudiA9IHIueSArIHIuaDtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlszXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSByLnggKyByLnc7IHAudiA9IHIueSArIHIuaDtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICAgICAgcC5yMiA9IGNvbG9yQm9yZGVyLnI7IHAuZzIgPSBjb2xvckJvcmRlci5nOyBwLmIyID0gY29sb3JCb3JkZXIuYjsgcC5hMiA9IGNvbG9yQm9yZGVyLmE7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNiLnNldE1hdCh0aGlzLm1hdCk7XG4gICAgICAgICAgICBzYi5hZGRSZWN0KHRoaXMucG9pbnRidWYpO1xuICAgICAgICB9XG4gICAgfVxufSIsDQogICAgInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZTtcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5XZWJHTDtcblxubmFtZXNwYWNlIGxpZ2h0dG9vbC5OYXRpdmVcbntcbiAgICBwdWJsaWMgY2xhc3MgY2FudmFzQWRhcHRlclxuICAgIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBzcHJpdGVDYW52YXMgQ3JlYXRlU2NyZWVuQ2FudmFzKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgY2FudmFzQWN0aW9uIHVzZXJhY3Rpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHdlYmdsLkNhbnZhcztcbiAgICAgICAgICAgIGVsLldpZHRoID0gZWwuQ2xpZW50V2lkdGg7XG4gICAgICAgICAgICBlbC5IZWlnaHQgPSBlbC5DbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgIHZhciBjID0gbmV3IHNwcml0ZUNhbnZhcyh3ZWJnbCwgd2ViZ2wuRHJhd2luZ0J1ZmZlcldpZHRoLCB3ZWJnbC5EcmF3aW5nQnVmZmVySGVpZ2h0KTtcbiAgICAgICAgICAgIC8vdmFyIGFzcCA9IHJhbmdlLndpZHRoIC8gcmFuZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgYy5zcHJpdGVCYXRjaGVyLm1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkobmV3IGZsb2F0W10ge1xuICAgICAgICAgICAgICAgICAgICAxLjBmICogMiAvIGMud2lkdGgsIDAsIDAsIDAsLy/ljrvmjolhc3DnmoTlvbHlk41cbiAgICAgICAgICAgICAgICAgICAgMCwgMSAqIC0xICogMiAvIGMuaGVpZ2h0LCAwLCAwLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLCAxLCAwLFxuICAgICAgICAgICAgICAgICAgICAtMSwgMSwgMCwgMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjLnNwcml0ZUJhdGNoZXIuenRlc3QgPSBmYWxzZTsvL+acgOWJjeS4jemcgOimgXp0ZXN0XG5cbiAgICAgICAgICAgIHZhciB1YSA9IHVzZXJhY3Rpb247XG4gICAgICAgICAgICBCcmlkZ2UuSHRtbDUuV2luZG93LlNldEludGVydmFsKChBY3Rpb24pKCgpID0+XG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgd2ViZ2wuVmlld3BvcnQoMCwgMCwgd2ViZ2wuRHJhd2luZ0J1ZmZlcldpZHRoLCB3ZWJnbC5EcmF3aW5nQnVmZmVySGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICB3ZWJnbC5DbGVhcih3ZWJnbC5DT0xPUl9CVUZGRVJfQklUIHwgd2ViZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgICAgICAgICAgICAgICAgd2ViZ2wuQ2xlYXJDb2xvcigxLjAsIDAuMCwgMS4wLCAxLjApO1xuXG4gICAgICAgICAgICAgICAgICAgYy5zcHJpdGVCYXRjaGVyLmJlZ2luZHJhdygpO1xuXG4gICAgICAgICAgICAgICAgICAgdWEub25kcmF3KGMpO1xuXG4gICAgICAgICAgICAgICAgICAgYy5zcHJpdGVCYXRjaGVyLmVuZGRyYXcoKTtcblxuICAgICAgICAgICAgICAgICAgIGR5bmFtaWMgX3dlYmdsID0gd2ViZ2w7XG4gICAgICAgICAgICAgICAgICAgX3dlYmdsLmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgLy93ZWJnbC5GbHVzaCgpO1xuXG4gICAgICAgICAgICAgICB9KSwgMjApO1xuICAgICAgICAgICAgV2luZG93LkFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKEFjdGlvbikoKCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsID0gd2ViZ2wuQ2FudmFzO1xuICAgICAgICAgICAgICAgIHNlbC5XaWR0aCA9IHNlbC5DbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICBzZWwuSGVpZ2h0ID0gc2VsLkNsaWVudEhlaWdodDtcbiAgICAgICAgICAgICAgICBzZWwuV2lkdGggPSBzZWwuQ2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsLkhlaWdodCA9IHNlbC5DbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBjLndpZHRoID0gc2VsLldpZHRoO1xuICAgICAgICAgICAgICAgIGMuaGVpZ2h0ID0gc2VsLkhlaWdodDtcbiAgICAgICAgICAgICAgICBjLnNwcml0ZUJhdGNoZXIubWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheShuZXcgZmxvYXRbXXtcbiAgICAgICAgICAgICAgICAxLjBmICogMiAvIGMud2lkdGgsIDAsIDAsIDAsLy/ljrvmjolhc3DnmoTlvbHlk41cbiAgICAgICAgICAgICAgICAwLCAxLjBmICogLTEgKiAyIC8gYy5oZWlnaHQsIDAsIDAsXG4gICAgICAgICAgICAgICAgMCwgMCwgMSwgMCxcbiAgICAgICAgICAgICAgICAtMSwgMSwgMCwgMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8vL2RvIHJlc2l6ZSBmdW5jXG4gICAgICAgICAgICAgICAgdWEub25yZXNpemUoYyk7XG4gICAgICAgICAgICB9KSk7XG5cblxuICAgICAgICAgICAgZWwuT25Nb3VzZU1vdmUgPSAoZXYpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdWEub25wb2ludGV2ZW50KGMsIGNhbnZhc3BvaW50ZXZlbnQuUE9JTlRfTU9WRSwoZmxvYXQpIGV2W1wib2Zmc2V0WFwiXSwgKGZsb2F0KWV2W1wib2Zmc2V0WVwiXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZWwuT25Nb3VzZVVwID0gKCBNb3VzZUV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBldikgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1YS5vbnBvaW50ZXZlbnQoYywgY2FudmFzcG9pbnRldmVudC5QT0lOVF9VUCwgKGZsb2F0KWV2W1wib2Zmc2V0WFwiXSwgKGZsb2F0KWV2W1wib2Zmc2V0WVwiXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZWwuT25Nb3VzZURvd24gPSAoTW91c2VFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4gZXYpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdWEub25wb2ludGV2ZW50KGMsIGNhbnZhc3BvaW50ZXZlbnQuUE9JTlRfRE9XTiwgKGZsb2F0KWV2W1wib2Zmc2V0WFwiXSwgKGZsb2F0KWV2W1wib2Zmc2V0WVwiXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9zY2VuZS5vblBvaW50ZXJPYnNlcnZhYmxlLmFkZCgocGluZm86IEJBQllMT04uUG9pbnRlckluZm8sIHN0YXRlOiBCQUJZTE9OLkV2ZW50U3RhdGUpID0+XG4gICAgICAgICAgICAvL3tcbiAgICAgICAgICAgIC8vICAgIHZhciByYW5nZSA9IHNjZW5lLmdldEVuZ2luZSgpLmdldFJlbmRlcmluZ0NhbnZhc0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIC8vICAgIC8v6L6T5YWlXG4gICAgICAgICAgICAvLyAgICB2YXIgZTogbGlnaHR0b29sLmNhbnZhc3BvaW50ZXZlbnQgPSBsaWdodHRvb2wuY2FudmFzcG9pbnRldmVudC5OT05FO1xuICAgICAgICAgICAgLy8gICAgaWYgKHBpbmZvLnR5cGUgPT0gQkFCWUxPTi5Qb2ludGVyRXZlbnRUeXBlcy5QT0lOVEVSRE9XTilcbiAgICAgICAgICAgIC8vICAgICAgICBlID0gbGlnaHR0b29sLmNhbnZhc3BvaW50ZXZlbnQuUE9JTlRfRE9XTjtcbiAgICAgICAgICAgIC8vICAgIGlmIChwaW5mby50eXBlID09IEJBQllMT04uUG9pbnRlckV2ZW50VHlwZXMuUE9JTlRFUk1PVkUpXG4gICAgICAgICAgICAvLyAgICAgICAgZSA9IGxpZ2h0dG9vbC5jYW52YXNwb2ludGV2ZW50LlBPSU5UX01PVkU7XG4gICAgICAgICAgICAvLyAgICBpZiAocGluZm8udHlwZSA9PSBCQUJZTE9OLlBvaW50ZXJFdmVudFR5cGVzLlBPSU5URVJVUClcbiAgICAgICAgICAgIC8vICAgICAgICBlID0gbGlnaHR0b29sLmNhbnZhc3BvaW50ZXZlbnQuUE9JTlRfVVA7XG5cbiAgICAgICAgICAgIC8vICAgIC8v57yp5pS+5YiwY2FudmFzIHNpemVcbiAgICAgICAgICAgIC8vICAgIHZhciB4ID0gcGluZm8uZXZlbnQub2Zmc2V0WCAvIHJhbmdlLndpZHRoICogYy53aWR0aDtcbiAgICAgICAgICAgIC8vICAgIHZhciB5ID0gcGluZm8uZXZlbnQub2Zmc2V0WSAvIHJhbmdlLmhlaWdodCAqIGMuaGVpZ2h0O1xuXG4gICAgICAgICAgICAvLyAgICB2YXIgc2tpcDogYm9vbGVhbiA9IHVhLm9ucG9pbnRldmVudChjLCBlLCB4LCB5KTtcbiAgICAgICAgICAgIC8vICAgIC8v5a+5IGJhYnlsb27vvIzmnaXor7QgMmTlnKjov5nph4zovpPlhaXvvIwzZCDopoEgcGljayDku6XlkI7lkq9cblxuICAgICAgICAgICAgLy8gICAgc3RhdGUuc2tpcE5leHRPYnNlcnZlcnMgPSBza2lwOy8v5piv5ZCm5Lit5pat5LqL5Lu2XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vKTtcblxuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59IiwNCiAgICAidXNpbmcgQnJpZGdlO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLldlYkdMO1xuLy92MC42XG5uYW1lc3BhY2UgbGlnaHR0b29sXG57XG4gICAgcHVibGljIGVudW0gY2FudmFzcG9pbnRldmVudFxuICAgIHtcbiAgICAgICAgTk9ORSxcbiAgICAgICAgUE9JTlRfRE9XTixcbiAgICAgICAgUE9JTlRfVVAsXG4gICAgICAgIFBPSU5UX01PVkUsXG4gICAgfVxuICAgIHB1YmxpYyBpbnRlcmZhY2UgY2FudmFzQWN0aW9uXG4gICAge1xuICAgICAgICAvL3Jlc2l6ZSDkuovku7ZcbiAgICAgICAgdm9pZCBvbnJlc2l6ZShzcHJpdGVDYW52YXMgYyk7XG4gICAgICAgIHZvaWQgb25kcmF3KHNwcml0ZUNhbnZhcyBjKTtcbiAgICAgICAgYm9vbCBvbnBvaW50ZXZlbnQoc3ByaXRlQ2FudmFzIGMsIGNhbnZhc3BvaW50ZXZlbnQgZSwgZmxvYXQgeCwgZmxvYXQgeWspO1xuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlQ2FudmFzXG4gICAge1xuICAgICAgICBwdWJsaWMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsO1xuICAgICAgICAvL3BhbmVsIHNpemVcbiAgICAgICAgcHVibGljIGZsb2F0IHdpZHRoO1xuICAgICAgICBwdWJsaWMgZmxvYXQgaGVpZ2h0O1xuICAgICAgICBwdWJsaWMgc3ByaXRlQ2FudmFzKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgZmxvYXQgd2lkdGgsIGZsb2F0IGhlaWdodClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy53ZWJnbCA9IHdlYmdsO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJhdGNoZXIgPSBuZXcgc3ByaXRlQmF0Y2hlcih3ZWJnbCwgbGlnaHR0b29sLnNoYWRlck1nci5wYXJzZXJJbnN0YW5jZSgpKTsvL25lc3NcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc3ByaXRlQmF0Y2hlciBzcHJpdGVCYXRjaGVyO1xuXG4gICAgICAgIC8vZHJhdyB0b29sc1xuICAgICAgICBwdWJsaWMgdm9pZCBkcmF3VGV4dHVyZShzcHJpdGVUZXh0dXJlIHRleHR1cmUsIHNwcml0ZVJlY3QgcmVjdCwgc3ByaXRlUmVjdCB1dnJlY3QgLCBzcHJpdGVDb2xvciBjb2xvciA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vaWYgKHV2cmVjdCA9PSBudWxsKVxuICAgICAgICAgICAgLy8gICAgdXZyZWN0ID0gc3ByaXRlUmVjdC5vbmU7XG4gICAgICAgICAgICBpZiAoY29sb3IgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb2xvciA9IHNwcml0ZUNvbG9yLndoaXRlO1xuICAgICAgICAgICAgdGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgdXZyZWN0LCByZWN0LCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgZHJhd1RleHR1cmVDdXN0b20oc3ByaXRlVGV4dHVyZSB0ZXh0dXJlLCBzcHJpdGVNYXQgX21hdCwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVSZWN0IHV2cmVjdCAsIHNwcml0ZUNvbG9yIGNvbG9yID0gbnVsbCwgc3ByaXRlQ29sb3IgY29sb3IyID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgLy9pZiAodXZyZWN0ID09IG51bGwpXG4gICAgICAgICAgICAvLyAgICB1dnJlY3QgPSBzcHJpdGVSZWN0Lm9uZTtcbiAgICAgICAgICAgIGlmIChjb2xvciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICBpZiAoY29sb3IyID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IyID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICB0ZXh0dXJlLmRyYXdDdXN0b20odGhpcy5zcHJpdGVCYXRjaGVyLCBfbWF0LCB1dnJlY3QsIHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdTcHJpdGUoc3RyaW5nIGF0bGFzLCBzdHJpbmcgc3ByaXRlLCBzcHJpdGVSZWN0IHJlY3QsIHNwcml0ZUNvbG9yIGNvbG9yID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGNvbG9yID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IgPSBzcHJpdGVDb2xvci53aGl0ZTtcblxuICAgICAgICAgICAgdmFyIGEgPSBhdGxhc01nci5JbnN0YW5jZSgpLmxvYWQodGhpcy53ZWJnbCwgYXRsYXMpO1xuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHIgPSBhLnNwcml0ZXNbc3ByaXRlXTtcbiAgICAgICAgICAgIGlmIChyID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChhLnRleHR1cmUgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHIuVG9SZWN0KCksIHJlY3QsIGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBkcmF3U3ByaXRlQ3VzdG9tKHN0cmluZyBhdGxhcywgc3RyaW5nIHNwcml0ZSwgc3ByaXRlTWF0IF9tYXQsIHNwcml0ZVJlY3QgcmVjdCwgc3ByaXRlQ29sb3IgY29sb3IgPSBudWxsLCBzcHJpdGVDb2xvciBjb2xvcjIgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoY29sb3IgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb2xvciA9IHNwcml0ZUNvbG9yLndoaXRlO1xuICAgICAgICAgICAgaWYgKGNvbG9yMiA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yMiA9IHNwcml0ZUNvbG9yLndoaXRlO1xuICAgICAgICAgICAgdmFyIGEgPSBhdGxhc01nci5JbnN0YW5jZSgpLmxvYWQodGhpcy53ZWJnbCwgYXRsYXMpO1xuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHIgPSBhLnNwcml0ZXNbc3ByaXRlXTtcbiAgICAgICAgICAgIGlmIChyID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChhLnRleHR1cmUgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhd0N1c3RvbSh0aGlzLnNwcml0ZUJhdGNoZXIsIF9tYXQsIHIuVG9SZWN0KCksIHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdTcHJpdGU5KHN0cmluZyBhdGxhcywgc3RyaW5nIHNwcml0ZSwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVCb3JkZXIgYm9yZGVyLCBzcHJpdGVDb2xvciBjb2xvciA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjb2xvciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICB2YXIgYSA9IGF0bGFzTWdyLkluc3RhbmNlKCkubG9hZCh0aGlzLndlYmdsLCBhdGxhcyk7XG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgX3IgPSBhLnNwcml0ZXNbc3ByaXRlXTtcbiAgICAgICAgICAgIGlmIChfciA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBsID0gKGJvcmRlci5sIC0gMSkgLyBhLnRleHR1cmV3aWR0aDtcbiAgICAgICAgICAgIHZhciByID0gKGJvcmRlci5yIC0gMSkgLyBhLnRleHR1cmV3aWR0aDtcbiAgICAgICAgICAgIHZhciB0ID0gKGJvcmRlci50IC0gMSkgLyBhLnRleHR1cmVoZWlnaHQ7XG4gICAgICAgICAgICB2YXIgYiA9IChib3JkZXIuYiAtIDEpIC8gYS50ZXh0dXJlaGVpZ2h0O1xuICAgICAgICAgICAgLy9sZWZ0IHRvcFxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLng7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueTtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IHQ7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueTtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gYm9yZGVyLnQ7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvcik7XG5cbiAgICAgICAgICAgIC8vdG9wXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueCArIGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueTtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBfci53IC0gciAtIGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gdDtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0Lnk7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSByZWN0LncgLSBib3JkZXIuciAtIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gYm9yZGVyLnQ7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvcik7XG4gICAgICAgICAgICAvL3JpZ2h0IHRvcFxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLnggKyBfci53IC0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gdDtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgcmVjdC53IC0gYm9yZGVyLnI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0Lnk7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci50O1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXcodGhpcy5zcHJpdGVCYXRjaGVyLCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IpO1xuICAgICAgICAgICAgLy9sZWZ0XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55ICsgdDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IF9yLmggLSB0IC0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54O1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgYm9yZGVyLnQ7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IHJlY3QuaCAtIGJvcmRlci50IC0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvcik7XG4gICAgICAgICAgICAvL2NlbnRlclxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLnggKyBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLnkgKyB0O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IF9yLncgLSByIC0gbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSBfci5oIC0gdCAtIGI7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgYm9yZGVyLnQ7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSByZWN0LncgLSBib3JkZXIuciAtIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gcmVjdC5oIC0gYm9yZGVyLnQgLSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yKTtcbiAgICAgICAgICAgIC8vcmlnaHRcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgX3IudyAtIHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueSArIHQ7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSBfci5oIC0gdCAtIGI7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIHJlY3QudyAtIGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgYm9yZGVyLnQ7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IHJlY3QuaCAtIGJvcmRlci50IC0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvcik7XG5cbiAgICAgICAgICAgIC8vbGVmdCBib3R0b21cbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLmggKyBfci55IC0gYjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IGI7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueSArIHJlY3QuaCAtIGJvcmRlci5iO1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yKTtcbiAgICAgICAgICAgIC8vYm90dG9tXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueCArIGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IuaCArIF9yLnkgLSBiO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IF9yLncgLSByIC0gbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSBiO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueSArIHJlY3QuaCAtIGJvcmRlci5iO1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gcmVjdC53IC0gYm9yZGVyLnIgLSBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXcodGhpcy5zcHJpdGVCYXRjaGVyLCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IpO1xuICAgICAgICAgICAgLy9yaWdodCBib3R0b21cbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgX3IudyAtIHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IuaCArIF9yLnkgLSBiO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gYjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIHJlY3QudyAtIGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgcmVjdC5oIC0gYm9yZGVyLmI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXcodGhpcy5zcHJpdGVCYXRjaGVyLCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgZHJhd1Nwcml0ZTlDdXN0b20oc3RyaW5nIGF0bGFzLCBzdHJpbmcgc3ByaXRlLCBzcHJpdGVNYXQgX21hdCwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVCb3JkZXIgYm9yZGVyLCBzcHJpdGVDb2xvciBjb2xvciA9IG51bGwsIHNwcml0ZUNvbG9yIGNvbG9yMiA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjb2xvciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICBpZiAoY29sb3IyID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IyID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICB2YXIgYSA9IGF0bGFzTWdyLkluc3RhbmNlKCkubG9hZCh0aGlzLndlYmdsLCBhdGxhcyk7XG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgX3IgPSBhLnNwcml0ZXNbc3ByaXRlXTtcbiAgICAgICAgICAgIGlmIChfciA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBsID0gKGJvcmRlci5sIC0gMSkgLyBhLnRleHR1cmV3aWR0aDtcbiAgICAgICAgICAgIHZhciByID0gKGJvcmRlci5yIC0gMSkgLyBhLnRleHR1cmV3aWR0aDtcbiAgICAgICAgICAgIHZhciB0ID0gKGJvcmRlci50IC0gMSkgLyBhLnRleHR1cmVoZWlnaHQ7XG4gICAgICAgICAgICB2YXIgYiA9IChib3JkZXIuYiAtIDEpIC8gYS50ZXh0dXJlaGVpZ2h0O1xuICAgICAgICAgICAgLy9sZWZ0IHRvcFxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLng7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueTtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IHQ7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueTtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gYm9yZGVyLnQ7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhd0N1c3RvbSh0aGlzLnNwcml0ZUJhdGNoZXIsIF9tYXQsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvciwgY29sb3IyKTtcblxuICAgICAgICAgICAgLy90b3BcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IF9yLncgLSByIC0gbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSB0O1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueTtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IHJlY3QudyAtIGJvcmRlci5yIC0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIudDtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICAgICAgLy9yaWdodCB0b3BcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgX3IudyAtIHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueTtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSByO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IHQ7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIHJlY3QudyAtIGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55O1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gYm9yZGVyLnI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIudDtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICAgICAgLy9sZWZ0XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55ICsgdDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IF9yLmggLSB0IC0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54O1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgYm9yZGVyLnQ7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IHJlY3QuaCAtIGJvcmRlci50IC0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhd0N1c3RvbSh0aGlzLnNwcml0ZUJhdGNoZXIsIF9tYXQsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvciwgY29sb3IyKTtcbiAgICAgICAgICAgIC8vY2VudGVyXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueCArIGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueSArIHQ7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gX3IudyAtIHIgLSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IF9yLmggLSB0IC0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0LnkgKyBib3JkZXIudDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IHJlY3QudyAtIGJvcmRlci5yIC0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSByZWN0LmggLSBib3JkZXIudCAtIGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXdDdXN0b20odGhpcy5zcHJpdGVCYXRjaGVyLCBfbWF0LCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IsIGNvbG9yMik7XG4gICAgICAgICAgICAvL3JpZ2h0XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueCArIF9yLncgLSByO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLnkgKyB0O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gX3IuaCAtIHQgLSBiO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyByZWN0LncgLSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueSArIGJvcmRlci50O1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gYm9yZGVyLnI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSByZWN0LmggLSBib3JkZXIudCAtIGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXdDdXN0b20odGhpcy5zcHJpdGVCYXRjaGVyLCBfbWF0LCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IsIGNvbG9yMik7XG5cbiAgICAgICAgICAgIC8vbGVmdCBib3R0b21cbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLmggKyBfci55IC0gYjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IGI7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueSArIHJlY3QuaCAtIGJvcmRlci5iO1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICAgICAgLy9ib3R0b21cbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci5oICsgX3IueSAtIGI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gX3IudyAtIHIgLSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IGI7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgcmVjdC5oIC0gYm9yZGVyLmI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSByZWN0LncgLSBib3JkZXIuciAtIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhd0N1c3RvbSh0aGlzLnNwcml0ZUJhdGNoZXIsIF9tYXQsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvciwgY29sb3IyKTtcbiAgICAgICAgICAgIC8vcmlnaHQgYm90dG9tXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueCArIF9yLncgLSByO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLmggKyBfci55IC0gYjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSByO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IGI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyByZWN0LncgLSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueSArIHJlY3QuaCAtIGJvcmRlci5iO1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gYm9yZGVyLnI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuXG4gICAgICAgIH1cbiAgICAgICAgc3ByaXRlUmVjdCB1dnJlY3QgPSBuZXcgc3ByaXRlUmVjdCgpO1xuXG4gICAgICAgIHNwcml0ZVJlY3QgdHJlY3QgPSBuZXcgc3ByaXRlUmVjdCgpOy8vbmVzc1xuXG4gICAgICAgIC8v57uY5Yi25a2X5L2T77yM5Y+q55S75LiA6KGM77yM5a2X5L2T5rK/552A5bem5LiK6KeS5a+56b2Q77yM5aaC6ZyA5YW25LuW77yM5Y+C6ICD5rqQ56CB6Ieq5Yi2XG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdUZXh0KHN0cmluZyBmb250ICwgc3RyaW5nIHRleHQgLCBzcHJpdGVSZWN0IHJlY3QgLCBzcHJpdGVDb2xvciBjb2xvciA9IG51bGwsIHNwcml0ZUNvbG9yIGNvbG9yMiA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjb2xvciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICBpZiAoY29sb3IyID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IyID0gc3ByaXRlQ29sb3IuYmxhY2s7XG4gICAgICAgICAgICB2YXIgZiA9IGZvbnRNZ3IuSW5zdGFuY2UoKS5sb2FkKHRoaXMud2ViZ2wsIGZvbnQpO1xuICAgICAgICAgICAgaWYgKGYgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGYuY21hcCA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgeGFkZCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQuTGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0ZXh0LkNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICB2YXIgY2luZm8gPSBmLmNtYXBbY107XG4gICAgICAgICAgICAgICAgaWYgKGNpbmZvID09IFNjcmlwdC5VbmRlZmluZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHMgPSByZWN0LmggLyBmLmxpbmVIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyB4YWRkICsgY2luZm8ueE9mZnNldCAqIHM7Ly94YWRkIOaoquenu++8jGNpbmZvLnhPZmZzZXQgKiBzIOWBj+enu1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55IC0gY2luZm8ueU9mZnNldCAqIHMgKyBmLmJhc2VsaW5lICogcztcbiAgICAgICAgICAgICAgICAvL2NpbmZvLnlPZmZzZXQgKiBzIOWBj+enu1xuICAgICAgICAgICAgICAgIC8vZi5iYXNlbGluZSAqIHPlrZfkvZPln7rnur/vvIzkuI3nrqHlrZfkvZPln7rnur/lrZfkvZPnmoTpm7bpm7bngrnlnKjlrZfkvZPlt6bkuIvop5LvvIznjrDlnKjpnIDopoHlt6bkuIrohJrvvIzpnIDopoHlhbbku5blr7npvZDmlrnlvI/lj6bor7RcblxuXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gcyAqIGNpbmZvLnlTaXplO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IHMgKiBjaW5mby54U2l6ZTtcblxuICAgICAgICAgICAgICAgIHhhZGQgKz0gY2luZm8ueEFkZHZhbmNlICogcztcbiAgICAgICAgICAgICAgICBpZiAoeGFkZCA+PSByZWN0LncpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOy8v6LaF5Ye657uY5Yi26ZmQ5a6a5qGG77yM5LiN55S75LqGXG4gICAgICAgICAgICAgICAgZi5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgY2luZm8sIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59Ig0KICBdDQp9
