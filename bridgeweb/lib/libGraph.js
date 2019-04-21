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
                        console.info("shadername:" + (name || ""));
                        console.info("vs:" + (this.mapshader.getItem(name).vscode || ""));
                        console.info("fs:" + (this.mapshader.getItem(name).fscode || ""));
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
                this.textureurl = Bridge.unbox(json.t);
                this.texturewidth = Bridge.unbox(json.w);
                this.textureheight = Bridge.unbox(json.h);
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
                    var cinfo = Bridge.as(f.cmap[c], lighttool.charinfo);
                    if (Bridge.referenceEquals(cinfo, undefined)) {
                        continue;
                    }
                    var s = rect.h / f.lineHeight;

                    this.trect.x = rect.x + xadd + cinfo.xOffset * s;

                    this.trect.y = rect.y - cinfo.yOffset * s + f.baseline * s;


                    this.trect.h = s * cinfo.ySize;
                    this.trect.w = s * cinfo.xSize;

                    xadd += (cinfo.xAddvance * s);
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

    Bridge.define("lighttool.spriteDynamicFont");

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
                console.info("json time=" + System.Double.format(n));

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
                var r = Bridge.as(this.cmap[cname], lighttool.charinfo);
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

//# sourceMappingURL=data:application/json;base64,ew0KICAidmVyc2lvbiI6IDMsDQogICJmaWxlIjogImxpYkdyYXBoLmpzIiwNCiAgInNvdXJjZVJvb3QiOiAiIiwNCiAgInNvdXJjZXMiOiBbDQogICAgIi4uLy4uL2xpYkdyYXBoL2NhbnZhcy9yZXNtZ3IuY3MiLA0KICAgICIuLi8uLi9saWJHcmFwaC9jYW52YXMvc3ByaXRlYmF0Y2hlci5jcyIsDQogICAgIi4uLy4uL2xpYkdyYXBoL2NhbnZhcy9jYW52YXNBZGFwdGVyX05hdGl2ZS5jcyIsDQogICAgIi4uLy4uL2xpYkdyYXBoL2NhbnZhcy9jYW52YXMuY3MiDQogIF0sDQogICJuYW1lcyI6IFsNCiAgICAiIg0KICBdLA0KICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O29CQTZHWUEsSUFBSUEsNkJBQW1CQTt3QkFDbkJBLDRCQUFrQkEsSUFBSUE7OztvQkFFMUJBLE9BQU9BOzs7Ozs7Ozs7K0JBRzJEQSxLQUFJQTs7OzsyQkFFMURBLE1BQWFBLFVBQWlCQSxhQUFvQkE7Z0JBRzlEQSxJQUFJQSx5QkFBeUJBO29CQUl6QkEsTUFBTUEsSUFBSUE7O2dCQUVkQSxXQUFXQSxJQUFJQTs7Z0JBRWZBLHFCQUFhQSxNQUFRQTtnQkFDckJBLFdBQVdBO2dCQUNYQSxtQkFBbUJBO2dCQUNuQkEsdUJBQXVCQTs7NkJBRVRBLE1BQWFBO2dCQUUzQkEsV0FBV0EscUJBQWFBO2dCQUN4QkEsSUFBSUEsNkJBQVFBO29CQUFrQkE7O2dCQUM5QkEsWUFBWUEsTUFBTUE7O2dCQUVsQkEsb0JBQW9CQTs7O2lDQUlGQSxNQUFhQTtnQkFFL0JBLElBQUlBLHlCQUF5QkE7b0JBSXpCQSxNQUFNQSxJQUFJQTs7Z0JBRWRBLFdBQVdBLElBQUlBOztnQkFFZkEscUJBQWFBLE1BQVFBO2dCQUNyQkEsYUFBYUE7OzhCQUVFQSxNQUFhQTtnQkFFNUJBLElBQUlBLHlCQUF5QkE7b0JBQ3pCQTs7Z0JBQ0pBLFdBQVdBLHFCQUFhQTs7Z0JBR3hCQSxJQUFJQTtvQkFFQUE7b0JBQ0FBLHFCQUFxQkE7O2dCQUV6QkEsYUFBYUE7OzRC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Ww0KICAgICJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuV2ViR0w7XG5cbi8vdjAuNFxubmFtZXNwYWNlIGxpZ2h0dG9vbFxue1xuICAgIHB1YmxpYyBjbGFzcyB0ZXh1dHJlTWdySXRlbVxuICAgIHtcbiAgICAgICAgcHVibGljIHNwcml0ZVRleHR1cmUgdGV4O1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHVybDtcbiAgICAgICAgcHVibGljIHN0cmluZyB1cmxhZGQ7XG4gICAgICAgIHB1YmxpYyB0ZXh0dXJlZm9ybWF0IGZvcm1hdDtcbiAgICAgICAgcHVibGljIGJvb2wgbWlwbWFwO1xuICAgICAgICBwdWJsaWMgYm9vbCBsaW5lYXI7XG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyB0ZXh0dXJlTWdyXG4gICAge1xuXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHRleHR1cmVNZ3IgZ190aGlzO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHRleHR1cmVNZ3IgSW5zdGFuY2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGV4dHVyZU1nci5nX3RoaXMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0ZXh0dXJlTWdyLmdfdGhpcyA9IG5ldyB0ZXh0dXJlTWdyKCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlTWdyLmdfdGhpcztcbiAgICAgICAgfVxuICAgICAgICBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5EaWN0aW9uYXJ5PHN0cmluZywgdGV4dXRyZU1nckl0ZW0+IG1hcEluZm8gPSBuZXcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuRGljdGlvbmFyeTxzdHJpbmcsIHRleHV0cmVNZ3JJdGVtPigpO1xuXG4gICAgICAgIHB1YmxpYyB2b2lkIHJlZyhzdHJpbmcgdXJsLCBzdHJpbmcgdXJsYWRkLCB0ZXh0dXJlZm9ybWF0IGZvcm1hdCwgYm9vbCBtaXBtYXAsIGJvb2wgbGluZWFyKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL+mHjeWkjeazqOWGjOWkhOeQhlxuICAgICAgICAgICAgaWYgKHRoaXMubWFwSW5mby5Db250YWluc0tleSh1cmwpKVxuICAgICAgICAgICAgLy92YXIgaXRlbSA9IHRoaXMubWFwSW5mb1t1cmxdO1xuICAgICAgICAgICAgLy9pZiAoaXRlbSAhPSBTY3JpcHQuVW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJ5b3UgY2FuJ3QgcmVnIHRoZSBzYW1lIG5hbWVcIik7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyB0ZXh1dHJlTWdySXRlbSgpOy8vbmVzc1xuXG4gICAgICAgICAgICB0aGlzLm1hcEluZm9bdXJsXSA9IGl0ZW07XG4gICAgICAgICAgICBpdGVtLnVybCA9IHVybDtcbiAgICAgICAgICAgIGl0ZW0udXJsYWRkID0gdXJsYWRkO1xuICAgICAgICAgICAgaXRlbS5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgICAgICBpdGVtLm1pcG1hcCA9IG1pcG1hcDtcbiAgICAgICAgICAgIGl0ZW0ubGluZWFyID0gbGluZWFyO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIHJlZ0RpcmVjdChzdHJpbmcgdXJsLCBzcHJpdGVUZXh0dXJlIHRleClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwSW5mby5Db250YWluc0tleSh1cmwpKVxuICAgICAgICAgICAgLy92YXIgaXRlbSA9IHRoaXMubWFwSW5mb1t1cmxdO1xuICAgICAgICAgICAgLy9pZiAoaXRlbSAhPSBTY3JpcHQuVW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJ5b3UgY2FuJ3QgcmVnIHRoZSBzYW1lIG5hbWVcIik7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyB0ZXh1dHJlTWdySXRlbSgpOy8vbmVzc1xuXG4gICAgICAgICAgICB0aGlzLm1hcEluZm9bdXJsXSA9IGl0ZW07XG4gICAgICAgICAgICBpdGVtLnVybCA9IHVybDtcbiAgICAgICAgICAgIGl0ZW0udGV4ID0gdGV4O1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIHVucmVnKHN0cmluZyB1cmwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkodXJsKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvL3ZhciBpdGVtID0gdGhpcy5tYXBJbmZvW3VybF07XG4gICAgICAgICAgICAvL2lmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMudW5sb2FkKHVybCk7XG5cbiAgICAgICAgICAgIHRoaXMubWFwSW5mb1t1cmxdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCB1bmxvYWQoc3RyaW5nIHVybClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwSW5mby5Db250YWluc0tleSh1cmwpID09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bdXJsXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpdGVtLnRleC5kaXNwb3NlKCk7XG4gICAgICAgICAgICBpdGVtLnRleCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNwcml0ZVRleHR1cmUgbG9hZChXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyB1cmwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkodXJsKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bdXJsXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoaXRlbS50ZXggPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdGVtLnRleCA9IG5ldyBzcHJpdGVUZXh0dXJlKHdlYmdsLCBpdGVtLnVybCArIGl0ZW0udXJsYWRkLCBpdGVtLmZvcm1hdCwgaXRlbS5taXBtYXAsIGl0ZW0ubGluZWFyKTsvL25lc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY2xhc3MgYXRsYXNNZ3JJdGVtXG4gICAge1xuICAgICAgICBwdWJsaWMgc3ByaXRlQXRsYXMgYXRhbHM7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgdXJsO1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHVybGF0YWxzdGV4O1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHVybGF0YWxzdGV4X2FkZDtcbiAgICB9XG4gICAgcHVibGljIGNsYXNzIGF0bGFzTWdyXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBhdGxhc01nciBnX3RoaXM7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYXRsYXNNZ3IgSW5zdGFuY2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoYXRsYXNNZ3IuZ190aGlzID09IG51bGwpXG4gICAgICAgICAgICAgICAgYXRsYXNNZ3IuZ190aGlzID0gbmV3IGF0bGFzTWdyKCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHJldHVybiBhdGxhc01nci5nX3RoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5EaWN0aW9uYXJ5PHN0cmluZywgYXRsYXNNZ3JJdGVtPiBtYXBJbmZvID0gbmV3IFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkRpY3Rpb25hcnk8c3RyaW5nLCBhdGxhc01nckl0ZW0+KCk7XG5cbiAgICAgICAgcHVibGljIHZvaWQgcmVnKHN0cmluZyBuYW1lLCBzdHJpbmcgdXJsYXRsYXMsIHN0cmluZyB1cmxhdGFsc3RleCwgc3RyaW5nIHVybGF0YWxzdGV4X2FkZClcbiAgICAgICAge1xuICAgICAgICAgICAgLy/ph43lpI3ms6jlhozlpITnkIZcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkobmFtZSkpXG4gICAgICAgICAgICAvL3ZhciBpdGVtID0gdGhpcy5tYXBJbmZvW25hbWVdO1xuICAgICAgICAgICAgLy9pZiAoaXRlbSAhPSBTY3JpcHQuVW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJ5b3UgY2FuJ3QgcmVnIHRoZSBzYW1lIG5hbWVcIik7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBhdGxhc01nckl0ZW0oKTsvL25lc3NcblxuICAgICAgICAgICAgdGhpcy5tYXBJbmZvW25hbWVdID0gaXRlbTtcbiAgICAgICAgICAgIGl0ZW0udXJsID0gdXJsYXRsYXM7XG4gICAgICAgICAgICBpdGVtLnVybGF0YWxzdGV4ID0gdXJsYXRhbHN0ZXg7XG4gICAgICAgICAgICBpdGVtLnVybGF0YWxzdGV4X2FkZCA9IHVybGF0YWxzdGV4X2FkZDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCB1bnJlZyhzdHJpbmcgbmFtZSwgYm9vbCBkaXNwb3NldGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMudW5sb2FkKG5hbWUsIGRpc3Bvc2V0ZXgpO1xuXG4gICAgICAgICAgICB0aGlzLm1hcEluZm8uUmVtb3ZlKG5hbWUpO1xuICAgICAgICAgICAgLy90aGlzLm1hcEluZm9bbmFtZV0gPSBTY3JpcHQuVW5kZWZpbmVkO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgcmVnRGlyZWN0KHN0cmluZyBuYW1lLCBzcHJpdGVBdGxhcyBhdGxhcylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwSW5mby5Db250YWluc0tleShuYW1lKSlcbiAgICAgICAgICAgIC8vICAgIHZhciBpdGVtID0gdGhpcy5tYXBJbmZvW25hbWVdO1xuICAgICAgICAgICAgLy9pZiAoaXRlbSAhPSBTY3JpcHQuVW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJ5b3UgY2FuJ3QgcmVnIHRoZSBzYW1lIG5hbWVcIik7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBhdGxhc01nckl0ZW0oKTsvL25lc3NcblxuICAgICAgICAgICAgdGhpcy5tYXBJbmZvW25hbWVdID0gaXRlbTtcbiAgICAgICAgICAgIGl0ZW0uYXRhbHMgPSBhdGxhcztcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCB1bmxvYWQoc3RyaW5nIG5hbWUsIGJvb2wgZGlzcG9zZXRleClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwSW5mby5Db250YWluc0tleShuYW1lKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZGlzcG9zZXRleClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdGVtLmF0YWxzLnRleHR1cmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGl0ZW0uYXRhbHMudGV4dHVyZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmF0YWxzID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzcHJpdGVBdGxhcyBsb2FkKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgc3RyaW5nIG5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkobmFtZSkgPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoaXRlbS5hdGFscyA9PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB0ZXggPSB0ZXh0dXJlTWdyLkluc3RhbmNlKCkubG9hZCh3ZWJnbCwgaXRlbS51cmxhdGFsc3RleCk7XG4gICAgICAgICAgICAgICAgaWYgKHRleCA9PSBTY3JpcHQuVW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZU1nci5JbnN0YW5jZSgpLnJlZyhpdGVtLnVybGF0YWxzdGV4LCBpdGVtLnVybGF0YWxzdGV4X2FkZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC50ZXh0dXJlZm9ybWF0LlJHQkEsIGZhbHNlLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB0ZXggPSB0ZXh0dXJlTWdyLkluc3RhbmNlKCkubG9hZCh3ZWJnbCwgaXRlbS51cmxhdGFsc3RleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0uYXRhbHMgPSBuZXcgc3ByaXRlQXRsYXMod2ViZ2wsIGl0ZW0udXJsLCB0ZXgpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYXRhbHM7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY2xhc3MgZm9udE1nckl0ZW1cbiAgICB7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVGb250IGZvbnQ7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgdXJsO1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHVybGF0YWxzdGV4O1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHVybGF0YWxzdGV4X2FkZDtcbiAgICB9XG4gICAgcHVibGljIGNsYXNzIGZvbnRNZ3JcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIGZvbnRNZ3IgZ190aGlzO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGZvbnRNZ3IgSW5zdGFuY2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoZm9udE1nci5nX3RoaXMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBmb250TWdyLmdfdGhpcyA9IG5ldyBmb250TWdyKCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHJldHVybiBmb250TWdyLmdfdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkRpY3Rpb25hcnk8c3RyaW5nLCBmb250TWdySXRlbT4gbWFwSW5mbyA9IG5ldyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5EaWN0aW9uYXJ5PHN0cmluZywgZm9udE1nckl0ZW0+KCk7XG5cbiAgICAgICAgcHVibGljIHZvaWQgcmVnKHN0cmluZyBuYW1lLCBzdHJpbmcgdXJsZm9udCwgc3RyaW5nIHVybGF0YWxzdGV4LCBzdHJpbmcgdXJsYXRhbHN0ZXhfYWRkKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL+mHjeWkjeazqOWGjOWkhOeQhlxuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bbmFtZV07XG4gICAgICAgICAgICBpZiAoaXRlbSAhPSBTY3JpcHQuVW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJ5b3UgY2FuJ3QgcmVnIHRoZSBzYW1lIG5hbWVcIik7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtID0gbmV3IGZvbnRNZ3JJdGVtKCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHRoaXMubWFwSW5mb1tuYW1lXSA9IGl0ZW07XG4gICAgICAgICAgICBpdGVtLnVybCA9IHVybGZvbnQ7XG4gICAgICAgICAgICBpdGVtLnVybGF0YWxzdGV4ID0gdXJsYXRhbHN0ZXg7XG4gICAgICAgICAgICBpdGVtLnVybGF0YWxzdGV4X2FkZCA9IHVybGF0YWxzdGV4X2FkZDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCByZWdEaXJlY3Qoc3RyaW5nIG5hbWUsIHNwcml0ZUZvbnQgZm9udClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodGhpcy5tYXBJbmZvLkNvbnRhaW5zS2V5KG5hbWUpKVxuICAgICAgICAgICAgLy92YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gIT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwieW91IGNhbid0IHJlZyB0aGUgc2FtZSBuYW1lXCIpOy8vbmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgZm9udE1nckl0ZW0oKTsvL25lc3NcblxuICAgICAgICAgICAgdGhpcy5tYXBJbmZvW25hbWVdID0gaXRlbTtcbiAgICAgICAgICAgIGl0ZW0uZm9udCA9IGZvbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgdW5yZWcoc3RyaW5nIG5hbWUsIGJvb2wgZGlzcG9zZXRleClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFwSW5mby5Db250YWluc0tleShuYW1lKSA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMubWFwSW5mb1tuYW1lXTtcbiAgICAgICAgICAgIC8vaWYgKGl0ZW0gPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy51bmxvYWQobmFtZSwgZGlzcG9zZXRleCk7XG5cbiAgICAgICAgICAgIHRoaXMubWFwSW5mby5SZW1vdmUobmFtZSk7XG4gICAgICAgICAgICAvL3RoaXMubWFwSW5mb1tuYW1lXSA9IFNjcmlwdC5VbmRlZmluZWQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIHVubG9hZChzdHJpbmcgbmFtZSwgYm9vbCBkaXNwb3NldGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXBJbmZvLkNvbnRhaW5zS2V5KG5hbWUpID09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcEluZm9bbmFtZV07XG4gICAgICAgICAgICAvL2lmIChpdGVtID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGRpc3Bvc2V0ZXgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbS5mb250LnRleHR1cmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGl0ZW0uZm9udC50ZXh0dXJlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0uZm9udCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3ByaXRlRm9udCBsb2FkKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgc3RyaW5nIG5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcEluZm8uQ29udGFpbnNLZXkobmFtZSkgPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5tYXBJbmZvW25hbWVdO1xuICAgICAgICAgICAgLy9pZiAoaXRlbSA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGlmIChpdGVtLmZvbnQgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdGV4ID0gdGV4dHVyZU1nci5JbnN0YW5jZSgpLmxvYWQod2ViZ2wsIGl0ZW0udXJsYXRhbHN0ZXgpO1xuICAgICAgICAgICAgICAgIGlmICh0ZXggPT0gU2NyaXB0LlVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVNZ3IuSW5zdGFuY2UoKS5yZWcoaXRlbS51cmxhdGFsc3RleCwgaXRlbS51cmxhdGFsc3RleF9hZGQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodHRvb2wudGV4dHVyZWZvcm1hdC5HUkFZLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGV4ID0gdGV4dHVyZU1nci5JbnN0YW5jZSgpLmxvYWQod2ViZ2wsIGl0ZW0udXJsYXRhbHN0ZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtLmZvbnQgPSBuZXcgc3ByaXRlRm9udCh3ZWJnbCwgaXRlbS51cmwsIHRleCk7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5mb250O1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNsYXNzIHNoYWRlck1nclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbGlnaHR0b29sLnNoYWRlclBhcnNlciBnX3NoYWRlclBhcnNlcjtcbiAgICAgICAgcHVibGljIHN0YXRpYyBsaWdodHRvb2wuc2hhZGVyUGFyc2VyIHBhcnNlckluc3RhbmNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHNoYWRlck1nci5nX3NoYWRlclBhcnNlciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHNoYWRlck1nci5nX3NoYWRlclBhcnNlciA9IG5ldyBsaWdodHRvb2wuc2hhZGVyUGFyc2VyKCk7Ly9uZXNzXG4gICAgICAgICAgICByZXR1cm4gc2hhZGVyTWdyLmdfc2hhZGVyUGFyc2VyO1xuICAgICAgICB9XG4gICAgfVxufSIsDQogICAgInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuV2ViR0w7XG5cbm5hbWVzcGFjZSBsaWdodHRvb2xcbntcbiAgICAvL+WKoOi9veW3peWFt1xuXG4gICAgcHVibGljIGNsYXNzIGxvYWRUb29sXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgbG9hZFRleHQoc3RyaW5nIHVybCwgQWN0aW9uPHN0cmluZywgQnJpZGdlLkVycm9yPiBmdW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsvL25lc3NcbiAgICAgICAgICAgIHJlcS5PcGVuKFwiR0VUXCIsIHVybCk7XG4gICAgICAgICAgICByZXEuT25SZWFkeVN0YXRlQ2hhbmdlID0gKCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxLlJlYWR5U3RhdGUgPT0gQnJpZGdlLkh0bWw1LkFqYXhSZWFkeVN0YXRlLkRvbmUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmdW4ocmVxLlJlc3BvbnNlVGV4dCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcS5PbkVycm9yID0gKGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBCcmlkZ2UuRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIuTWVzc2FnZSA9IFwib25lcnIgaW4gcmVxOlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bihudWxsLCBlcnIpOy8vbmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcS5TZW5kKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBsb2FkQXJyYXlCdWZmZXIoc3RyaW5nIHVybCwgQWN0aW9uPEJyaWRnZS5IdG1sNS5BcnJheUJ1ZmZlciwgQnJpZGdlLkVycm9yPiBmdW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsvL25lc3NcblxuICAgICAgICAgICAgcmVxLk9wZW4oXCJHRVRcIiwgdXJsKTtcbiAgICAgICAgICAgIHJlcS5SZXNwb25zZVR5cGUgPSBYTUxIdHRwUmVxdWVzdFJlc3BvbnNlVHlwZS5BcnJheUJ1ZmZlcjsvLyBcImFycmF5YnVmZmVyXCI7Ly9pZSDkuIDlrpropoHlnKhvcGVu5LmL5ZCO5L+u5pS5cmVzcG9uc2VUeXBlXG4gICAgICAgICAgICByZXEuT25SZWFkeVN0YXRlQ2hhbmdlID0gKCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxLlJlYWR5U3RhdGUgPT0gQWpheFJlYWR5U3RhdGUuRG9uZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnb3QgYmluOlwiICsgdHlwZW9mIChyZXEucmVzcG9uc2UpICsgcmVxLnJlc3BvbnNlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bihyZXEuUmVzcG9uc2UgYXMgQXJyYXlCdWZmZXIsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEuT25FcnJvciA9IChlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIuTWVzc2FnZSA9IFwib25lcnIgaW4gcmVxOlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuKG51bGwsIGVycik7Ly9uZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEuU2VuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIGxvYWRCbG9iKHN0cmluZyB1cmwsIEFjdGlvbjxCbG9iLCBFcnJvcj4gZnVuKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7Ly9uZXNzXG5cbiAgICAgICAgICAgIHJlcS5PcGVuKFwiR0VUXCIsIHVybCk7XG4gICAgICAgICAgICByZXEuUmVzcG9uc2VUeXBlID0gWE1MSHR0cFJlcXVlc3RSZXNwb25zZVR5cGUuQmxvYjsvLyBcImJsb2JcIjsvL2llIOS4gOWumuimgeWcqG9wZW7kuYvlkI7kv67mlLlyZXNwb25zZVR5cGVcbiAgICAgICAgICAgIHJlcS5PblJlYWR5U3RhdGVDaGFuZ2UgPSAoKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChyZXEuUmVhZHlTdGF0ZSA9PSBBamF4UmVhZHlTdGF0ZS5Eb25lKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImdvdCBfYmxvYjpcIiArIHR5cGVvZiAocmVxLnJlc3BvbnNlKSArIHJlcS5yZXNwb25zZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBmdW4ocmVxLlJlc3BvbnNlIGFzIEJsb2IsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEuT25FcnJvciA9IChlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIuTWVzc2FnZSA9IFwib25lcnIgaW4gcmVxOlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuKG51bGwsIGVycik7Ly9uZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXEuU2VuZCgpO1xuICAgICAgICB9XG5cblxuICAgIH1cbiAgICAvL3NoYWRlclxuICAgIHB1YmxpYyBjbGFzcyBzaGFkZXJjb2RlXG4gICAge1xuICAgICAgICBwdWJsaWMgc3RyaW5nIHZzY29kZTtcbiAgICAgICAgcHVibGljIHN0cmluZyBmc2NvZGU7XG4gICAgICAgIHB1YmxpYyBXZWJHTFNoYWRlciB2cztcbiAgICAgICAgcHVibGljIFdlYkdMU2hhZGVyIGZzO1xuICAgICAgICBwdWJsaWMgV2ViR0xQcm9ncmFtIHByb2dyYW07XG5cbiAgICAgICAgcHVibGljIGludCBwb3NQb3MgPSAtMTtcbiAgICAgICAgcHVibGljIGludCBwb3NDb2xvciA9IC0xO1xuICAgICAgICBwdWJsaWMgaW50IHBvc0NvbG9yMiA9IC0xO1xuICAgICAgICBwdWJsaWMgaW50IHBvc1VWID0gLTE7XG4gICAgICAgIHB1YmxpYyBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB1bmlNYXRyaXggPSBudWxsO1xuICAgICAgICBwdWJsaWMgV2ViR0xVbmlmb3JtTG9jYXRpb24gdW5pVGV4MCA9IG51bGw7XG4gICAgICAgIHB1YmxpYyBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB1bmlUZXgxID0gbnVsbDtcbiAgICAgICAgcHVibGljIFdlYkdMVW5pZm9ybUxvY2F0aW9uIHVuaUNvbDAgPSBudWxsO1xuICAgICAgICBwdWJsaWMgV2ViR0xVbmlmb3JtTG9jYXRpb24gdW5pQ29sMSA9IG51bGw7XG4gICAgICAgIHB1YmxpYyB2b2lkIGNvbXBpbGUoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnZzID0gd2ViZ2wuQ3JlYXRlU2hhZGVyKHdlYmdsLlZFUlRFWF9TSEFERVIpO1xuICAgICAgICAgICAgdGhpcy5mcyA9IHdlYmdsLkNyZWF0ZVNoYWRlcih3ZWJnbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgICAgICAgICAvL+WIhuWIq+e8luivkXNoYWRlclxuICAgICAgICAgICAgd2ViZ2wuU2hhZGVyU291cmNlKHRoaXMudnMsIHRoaXMudnNjb2RlKTtcbiAgICAgICAgICAgIHdlYmdsLkNvbXBpbGVTaGFkZXIodGhpcy52cyk7XG4gICAgICAgICAgICB2YXIgcjEgPSB3ZWJnbC5HZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy52cywgd2ViZ2wuQ09NUElMRV9TVEFUVVMpO1xuICAgICAgICAgICAgaWYgKHIxLkFzPGJvb2w+KCkgPT0gZmFsc2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWxlcnQod2ViZ2wuR2V0U2hhZGVySW5mb0xvZyh0aGlzLnZzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgd2ViZ2wuU2hhZGVyU291cmNlKHRoaXMuZnMsIHRoaXMuZnNjb2RlKTtcbiAgICAgICAgICAgIHdlYmdsLkNvbXBpbGVTaGFkZXIodGhpcy5mcyk7XG4gICAgICAgICAgICB2YXIgcjIgPSB3ZWJnbC5HZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy5mcywgd2ViZ2wuQ09NUElMRV9TVEFUVVMpO1xuICAgICAgICAgICAgaWYgKHIyLkFzPGJvb2w+KCkgPT0gZmFsc2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWxlcnQod2ViZ2wuR2V0U2hhZGVySW5mb0xvZyh0aGlzLmZzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcHJvZ3JhbSBsaW5rXG4gICAgICAgICAgICB0aGlzLnByb2dyYW0gPSB3ZWJnbC5DcmVhdGVQcm9ncmFtKCkuQXM8V2ViR0xQcm9ncmFtPigpO1xuXG4gICAgICAgICAgICB3ZWJnbC5BdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZzKTtcbiAgICAgICAgICAgIHdlYmdsLkF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuZnMpO1xuXG4gICAgICAgICAgICB3ZWJnbC5MaW5rUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgICAgICAgdmFyIHIzID0gd2ViZ2wuR2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sIHdlYmdsLkxJTktfU1RBVFVTKTtcbiAgICAgICAgICAgIGlmIChyMy5Bczxib29sPigpID09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFsZXJ0KHdlYmdsLkdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8v57uR5a6admJv5ZKMc2hhZGVy6aG254K55qC85byP77yM6L+Z6YOo5YiG5bqU6K+l6KaB5Yy65YiG5p2Q6LSo5pS55Y+Y5LiO5Y+C5pWw5pS55Y+Y77yM5Y+v5Lul5bCR5YiH5o2i5LiA5Lqb54q25oCBXG4gICAgICAgICAgICB0aGlzLnBvc1BvcyA9IHdlYmdsLkdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJwb3NpdGlvblwiKTtcbiAgICAgICAgICAgIHRoaXMucG9zQ29sb3IgPSB3ZWJnbC5HZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIFwiY29sb3JcIik7XG4gICAgICAgICAgICB0aGlzLnBvc0NvbG9yMiA9IHdlYmdsLkdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJjb2xvcjJcIik7XG5cbiAgICAgICAgICAgIHRoaXMucG9zVVYgPSB3ZWJnbC5HZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIFwidXZcIik7XG5cbiAgICAgICAgICAgIHRoaXMudW5pTWF0cml4ID0gd2ViZ2wuR2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgXCJtYXRyaXhcIik7XG4gICAgICAgICAgICB0aGlzLnVuaVRleDAgPSB3ZWJnbC5HZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcInRleDBcIik7XG4gICAgICAgICAgICB0aGlzLnVuaVRleDEgPSB3ZWJnbC5HZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcInRleDFcIik7XG4gICAgICAgICAgICB0aGlzLnVuaUNvbDAgPSB3ZWJnbC5HZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcImNvbDBcIik7XG4gICAgICAgICAgICB0aGlzLnVuaUNvbDEgPSB3ZWJnbC5HZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCBcImNvbDFcIik7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIGFsZXJ0KHN0cmluZyBwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc2hhZGVyUGFyc2VyXG4gICAge1xuICAgICAgICBwdWJsaWMgRGljdGlvbmFyeTxzdHJpbmcsIHNoYWRlcmNvZGU+IG1hcHNoYWRlciA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc2hhZGVyY29kZT4oKTtcbiAgICAgICAgLy8gICAgbWFwc2hhZGVyOiB7IFtpZDogc3RyaW5nXTogc2hhZGVyY29kZVxuICAgICAgICAvL30gPSB7fTtcbiAgICAgICAgdm9pZCBfcGFyc2VyKHN0cmluZyB0eHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzMSA9IHR4dC5TcGxpdChuZXdbXSB7IFwiPC0tXCIgfSwgU3RyaW5nU3BsaXRPcHRpb25zLlJlbW92ZUVtcHR5RW50cmllcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMxLkxlbmd0aDsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzMiA9IHMxW2ldLlNwbGl0KFwiLS0+XCIpO1xuICAgICAgICAgICAgICAgIHZhciBzdGFnID0gczJbMF0uU3BsaXQoXCIgXCIpOy8vdGFncztcbiAgICAgICAgICAgICAgICB2YXIgc3NoYWRlciA9IHMyWzFdOy8v5q2j5paHXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RuYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdHRhZyA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0YWcuTGVuZ3RoOyBqKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHN0YWdbal07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0Lkxlbmd0aCA9PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgPT0gXCJ2c1wiKS8vdmVjdGV4c2hhZGVyXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3R0YWcgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHQgPT0gXCJmc1wiKS8vZnJhZ21lbnRzaGFkZXJcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdHRhZyA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0bmFtZSA9IHQuU3Vic3RyaW5nKDEsIHQuTGVuZ3RoIC0gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RuYW1lLkxlbmd0aCA9PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXBzaGFkZXIuQ29udGFpbnNLZXkobGFzdG5hbWUpID09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNoYWRlcltsYXN0bmFtZV0gPSBuZXcgc2hhZGVyY29kZSgpOy8vbmVzc1xuICAgICAgICAgICAgICAgIGlmIChsYXN0dGFnID09IDEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc2hhZGVyW2xhc3RuYW1lXS52c2NvZGUgPSBzc2hhZGVyO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxhc3R0YWcgPT0gMilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzaGFkZXJbbGFzdG5hbWVdLmZzY29kZSA9IHNzaGFkZXI7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBwYXJzZVVybChXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyB1cmwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dCh1cmwsIChBY3Rpb248c3RyaW5nLEVycm9yPikoKHR4dCwgZXJyKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnNlcih0eHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZSh3ZWJnbCk7XG4gICAgICAgICAgICAgICAgLy9zcHJpdGVCYXRjaGVyXG4gICAgICAgICAgICB9XG4pICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBwYXJzZURpcmVjdChXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyB0eHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcnNlcih0eHQpO1xuICAgICAgICAgICAgdGhpcy5jb21waWxlKHdlYmdsKTtcbiAgICAgICAgfVxuICAgICAgICB2b2lkIGR1bXAoKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbmFtZSBpbiB0aGlzLm1hcHNoYWRlci5LZXlzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5Db25zb2xlLkluZm8oXCJzaGFkZXJuYW1lOlwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgQnJpZGdlLkh0bWw1LkNvbnNvbGUuSW5mbyhcInZzOlwiICsgdGhpcy5tYXBzaGFkZXJbbmFtZV0udnNjb2RlKTtcbiAgICAgICAgICAgICAgICBCcmlkZ2UuSHRtbDUuQ29uc29sZS5JbmZvKFwiZnM6XCIgKyB0aGlzLm1hcHNoYWRlcltuYW1lXS5mc2NvZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgdm9pZCBjb21waWxlKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG5hbWUgaW4gdGhpcy5tYXBzaGFkZXIuS2V5cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNoYWRlcltuYW1lXS5jb21waWxlKHdlYmdsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3Nwcml0ZSDln7rmnKzmlbDmja7nu5PmnoRcbiAgICBwdWJsaWMgc3RydWN0IHNwcml0ZVJlY3RcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVSZWN0KGZsb2F0IHggPSAwLCBmbG9hdCB5ID0gMCwgZmxvYXQgdyA9IDAsIGZsb2F0IGggPSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMudyA9IHc7XG4gICAgICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBmbG9hdCB4O1xuICAgICAgICBwdWJsaWMgZmxvYXQgeTtcbiAgICAgICAgcHVibGljIGZsb2F0IHc7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBoO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNwcml0ZVJlY3Qgb25lID0gbmV3IHNwcml0ZVJlY3QoMCwgMCwgMSwgMSk7Ly9uZXNzXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3ByaXRlUmVjdCB6ZXJvID0gbmV3IHNwcml0ZVJlY3QoMCwgMCwgMCwgMCk7Ly9uZXNzXG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGVCb3JkZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVCb3JkZXIoZmxvYXQgbCA9IDAsIGZsb2F0IHQgPSAwLCBmbG9hdCByID0gMCwgZmxvYXQgYiA9IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubCA9IGw7XG4gICAgICAgICAgICB0aGlzLnQgPSB0O1xuICAgICAgICAgICAgdGhpcy5yID0gcjtcbiAgICAgICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGZsb2F0IGw7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB0O1xuICAgICAgICBwdWJsaWMgZmxvYXQgcjtcbiAgICAgICAgcHVibGljIGZsb2F0IGI7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3ByaXRlQm9yZGVyIHplcm8gPSBuZXcgc3ByaXRlQm9yZGVyKDAsIDAsIDAsIDApOy8vbmVzc1xuXG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGVDb2xvclxuICAgIHtcbiAgICAgICAgcHVibGljIHNwcml0ZUNvbG9yKGZsb2F0IHIgPSAxLCBmbG9hdCBnID0gMSwgZmxvYXQgYiA9IDEsIGZsb2F0IGEgPSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnIgPSByO1xuICAgICAgICAgICAgdGhpcy5nID0gZztcbiAgICAgICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgICAgICB0aGlzLmEgPSBhO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBmbG9hdCByO1xuICAgICAgICBwdWJsaWMgZmxvYXQgZztcbiAgICAgICAgcHVibGljIGZsb2F0IGI7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBhO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHNwcml0ZUNvbG9yIHdoaXRlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgc3ByaXRlQ29sb3IoMSwgMSwgMSwgMSk7Ly9uZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzcHJpdGVDb2xvciBibGFjayA9IG5ldyBzcHJpdGVDb2xvcigwLCAwLCAwLCAxKTsvL25lc3NcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzcHJpdGVDb2xvciBncmF5ID0gbmV3IHNwcml0ZUNvbG9yKDAuNWYsIDAuNWYsIDAuNWYsIDEpOy8vbmVzc1xuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlUG9pbnRcbiAgICB7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB4O1xuICAgICAgICBwdWJsaWMgZmxvYXQgeTtcbiAgICAgICAgcHVibGljIGZsb2F0IHo7XG5cbiAgICAgICAgcHVibGljIGZsb2F0IHI7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBnO1xuICAgICAgICBwdWJsaWMgZmxvYXQgYjtcbiAgICAgICAgcHVibGljIGZsb2F0IGE7XG5cbiAgICAgICAgcHVibGljIGZsb2F0IHIyO1xuICAgICAgICBwdWJsaWMgZmxvYXQgZzI7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBiMjtcbiAgICAgICAgcHVibGljIGZsb2F0IGEyO1xuXG4gICAgICAgIHB1YmxpYyBmbG9hdCB1O1xuICAgICAgICBwdWJsaWMgZmxvYXQgdjtcbiAgICB9XG5cblxuICAgIC8vc3ByaXRl5p2Q6LSoXG4gICAgcHVibGljIGNsYXNzIHNwcml0ZU1hdFxuICAgIHtcbiAgICAgICAgcHVibGljIHN0cmluZyBzaGFkZXI7XG4gICAgICAgIHB1YmxpYyBib29sIHRyYW5zcGFyZW50O1xuICAgICAgICBwdWJsaWMgc3ByaXRlVGV4dHVyZSB0ZXgwO1xuICAgICAgICBwdWJsaWMgc3ByaXRlVGV4dHVyZSB0ZXgxO1xuICAgICAgICBwdWJsaWMgc3ByaXRlQ29sb3IgY29sMDtcbiAgICAgICAgcHVibGljIHNwcml0ZUNvbG9yIGNvbDE7XG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzdGF0ZVJlY29yZGVyXG4gICAge1xuICAgICAgICBwdWJsaWMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsO1xuICAgICAgICBwdWJsaWMgc3RhdGVSZWNvcmRlcihXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wgPSB3ZWJnbDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgYm9vbCBERVBUSF9XUklURU1BU0s7XG4gICAgICAgIHB1YmxpYyBib29sIERFUFRIX1RFU1Q7XG4gICAgICAgIHB1YmxpYyBpbnQgREVQVEhfRlVOQztcbiAgICAgICAgcHVibGljIGJvb2wgQkxFTkQ7XG4gICAgICAgIHB1YmxpYyBpbnQgQkxFTkRfRVFVQVRJT047XG4gICAgICAgIHB1YmxpYyBpbnQgQkxFTkRfU1JDX1JHQjtcbiAgICAgICAgcHVibGljIGludCBCTEVORF9TUkNfQUxQSEE7XG4gICAgICAgIHB1YmxpYyBpbnQgQkxFTkRfRFNUX1JHQjtcbiAgICAgICAgcHVibGljIGludCBCTEVORF9EU1RfQUxQSEE7XG4gICAgICAgIHB1YmxpYyBXZWJHTFByb2dyYW0gQ1VSUkVOVF9QUk9HUkFNO1xuICAgICAgICBwdWJsaWMgV2ViR0xCdWZmZXIgQVJSQVlfQlVGRkVSO1xuICAgICAgICBwdWJsaWMgaW50IEFDVElWRV9URVhUVVJFO1xuICAgICAgICBwdWJsaWMgV2ViR0xUZXh0dXJlIFRFWFRVUkVfQklORElOR18yRDtcbiAgICAgICAgcHVibGljIHZvaWQgcmVjb3JkKClcbiAgICAgICAge1xuXG4gICAgICAgICAgICAvL+iusOW9leeKtuaAgVxuICAgICAgICAgICAgdGhpcy5ERVBUSF9XUklURU1BU0sgPSAoYm9vbCl0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkRFUFRIX1dSSVRFTUFTSyk7XG4gICAgICAgICAgICB0aGlzLkRFUFRIX1RFU1QgPSAoYm9vbCl0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkRFUFRIX1RFU1QpO1xuICAgICAgICAgICAgdGhpcy5ERVBUSF9GVU5DID0gKGludCl0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkRFUFRIX0ZVTkMpO1xuICAgICAgICAgICAgLy9hbHBoYWJsZW5kIO+8jOi3n+edgG1hdOi1sFxuICAgICAgICAgICAgdGhpcy5CTEVORCA9IChib29sKXRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQkxFTkQpO1xuICAgICAgICAgICAgdGhpcy5CTEVORF9FUVVBVElPTiA9IChpbnQpdGhpcy53ZWJnbC5HZXRQYXJhbWV0ZXIodGhpcy53ZWJnbC5CTEVORF9FUVVBVElPTik7XG4gICAgICAgICAgICB0aGlzLkJMRU5EX1NSQ19SR0IgPSAoaW50KXRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQkxFTkRfU1JDX1JHQik7XG4gICAgICAgICAgICB0aGlzLkJMRU5EX1NSQ19BTFBIQSA9IChpbnQpdGhpcy53ZWJnbC5HZXRQYXJhbWV0ZXIodGhpcy53ZWJnbC5CTEVORF9TUkNfQUxQSEEpO1xuICAgICAgICAgICAgdGhpcy5CTEVORF9EU1RfUkdCID0gKGludCl0aGlzLndlYmdsLkdldFBhcmFtZXRlcih0aGlzLndlYmdsLkJMRU5EX0RTVF9SR0IpO1xuICAgICAgICAgICAgdGhpcy5CTEVORF9EU1RfQUxQSEEgPSAoaW50KXRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQkxFTkRfRFNUX0FMUEhBKTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMud2ViZ2wuYmxlbmRGdW5jU2VwYXJhdGUodGhpcy53ZWJnbC5PTkUsIHRoaXMud2ViZ2wuT05FX01JTlVTX1NSQ19BTFBIQSxcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLndlYmdsLlNSQ19BTFBIQSwgdGhpcy53ZWJnbC5PTkUpO1xuXG4gICAgICAgICAgICB2YXIgcCA9IHRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQ1VSUkVOVF9QUk9HUkFNKTtcbiAgICAgICAgICAgIHRoaXMuQ1VSUkVOVF9QUk9HUkFNID0gcC5BczxXZWJHTFByb2dyYW0+KCk7XG5cbiAgICAgICAgICAgIHZhciBwYiA9IHRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuQVJSQVlfQlVGRkVSX0JJTkRJTkcpO1xuICAgICAgICAgICAgdGhpcy5BUlJBWV9CVUZGRVIgPSBwYi5BczxXZWJHTEJ1ZmZlcj4oKTtcblxuICAgICAgICAgICAgdGhpcy5BQ1RJVkVfVEVYVFVSRSA9IChpbnQpdGhpcy53ZWJnbC5HZXRQYXJhbWV0ZXIodGhpcy53ZWJnbC5BQ1RJVkVfVEVYVFVSRSk7XG4gICAgICAgICAgICB0aGlzLlRFWFRVUkVfQklORElOR18yRCA9IHRoaXMud2ViZ2wuR2V0UGFyYW1ldGVyKHRoaXMud2ViZ2wuVEVYVFVSRV9CSU5ESU5HXzJEKS5BczxXZWJHTFRleHR1cmU+KCk7XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCByZXN0b3JlKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy/mgaLlpI3nirbmgIFcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuRGVwdGhNYXNrKHRoaXMuREVQVEhfV1JJVEVNQVNLKTtcbiAgICAgICAgICAgIGlmICh0aGlzLkRFUFRIX1RFU1QpXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5FbmFibGUodGhpcy53ZWJnbC5ERVBUSF9URVNUKTsvL+i/meaYr3p0ZXN0XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5EaXNhYmxlKHRoaXMud2ViZ2wuREVQVEhfVEVTVCk7Ly/ov5nmmK96dGVzdFxuICAgICAgICAgICAgdGhpcy53ZWJnbC5EZXB0aEZ1bmModGhpcy5ERVBUSF9GVU5DKTsvL+i/meaYr3p0ZXN05pa55rOVXG5cbiAgICAgICAgICAgIGlmICh0aGlzLkJMRU5EKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRW5hYmxlKHRoaXMud2ViZ2wuQkxFTkQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRGlzYWJsZSh0aGlzLndlYmdsLkJMRU5EKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud2ViZ2wuQmxlbmRFcXVhdGlvbih0aGlzLkJMRU5EX0VRVUFUSU9OKTtcblxuICAgICAgICAgICAgdGhpcy53ZWJnbC5CbGVuZEZ1bmNTZXBhcmF0ZSh0aGlzLkJMRU5EX1NSQ19SR0IsIHRoaXMuQkxFTkRfRFNUX1JHQixcbiAgICAgICAgICAgICAgICB0aGlzLkJMRU5EX1NSQ19BTFBIQSwgdGhpcy5CTEVORF9EU1RfQUxQSEEpO1xuXG4gICAgICAgICAgICB0aGlzLndlYmdsLlVzZVByb2dyYW0odGhpcy5DVVJSRU5UX1BST0dSQU0pO1xuICAgICAgICAgICAgdGhpcy53ZWJnbC5CaW5kQnVmZmVyKHRoaXMud2ViZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLkFSUkFZX0JVRkZFUik7XG5cbiAgICAgICAgICAgIHRoaXMud2ViZ2wuQWN0aXZlVGV4dHVyZSh0aGlzLkFDVElWRV9URVhUVVJFKTtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuQmluZFRleHR1cmUodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0aGlzLlRFWFRVUkVfQklORElOR18yRCk7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlQmF0Y2hlclxuICAgIHtcbiAgICAgICAgcHVibGljIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbDtcbiAgICAgICAgcHVibGljIHNoYWRlclBhcnNlciBzaGFkZXJwYXJzZXI7XG4gICAgICAgIHB1YmxpYyBXZWJHTEJ1ZmZlciB2Ym87XG4gICAgICAgIC8vZGF0YTogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgcHVibGljIEZsb2F0MzJBcnJheSBtYXRyaXg7XG4gICAgICAgIHB1YmxpYyBib29sIHp0ZXN0ID0gdHJ1ZTtcbiAgICAgICAgcHVibGljIHN0YXRlUmVjb3JkZXIgcmVjb3JkZXI7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVCYXRjaGVyKFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgc2hhZGVyUGFyc2VyIHNoYWRlcnBhcnNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy53ZWJnbCA9IHdlYmdsO1xuICAgICAgICAgICAgdGhpcy5zaGFkZXJwYXJzZXIgPSBzaGFkZXJwYXJzZXI7XG4gICAgICAgICAgICB0aGlzLnZibyA9IHdlYmdsLkNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgdmFyIGFzcCA9ICh0aGlzLndlYmdsLkRyYXdpbmdCdWZmZXJXaWR0aCAvIHRoaXMud2ViZ2wuRHJhd2luZ0J1ZmZlckhlaWdodCk7XG4gICAgICAgICAgICAvL3RoaXMubWF0cml4PVxuICAgICAgICAgICAgZmxvYXRbXSBhcnJheSA9e1xuICAgICAgICAgICAgICAgIDEuMGYgLyBhc3AsIDAsIDAsIDAsLy/ljrvmjolhc3DnmoTlvbHlk41cbiAgICAgICAgICAgICAgICAwLCAxLCAwLCAwLFxuICAgICAgICAgICAgICAgIDAsIDAsIDEsIDAsXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMVxuICAgICAgICAgICAgfTsvL25lc3NcbiAgICAgICAgICAgIHRoaXMubWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheShhcnJheSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSBuZXcgc3RhdGVSZWNvcmRlcih3ZWJnbCk7Ly9uZXNzXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgYmVnaW5kcmF3KClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5yZWNvcmQoKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBlbmRkcmF3KClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5lbmRiYXRjaCgpO1xuXG4gICAgICAgICAgICB0aGlzLnJlY29yZGVyLnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2hhZGVyY29kZSBzaGFkZXJjb2RlID0gbnVsbDtcbiAgICAgICAgLy9iZWdpbmRyYXcg5ZKMIHNldG1hdCDliLDlupXopoHkuI3opoHliIblvIDvvIzov5nmmK/pnIDopoHlho3mgJ3ogIPkuIDkuIvnmoRcbiAgICAgICAgcHVibGljIHNwcml0ZU1hdCBtYXQ7XG4gICAgICAgIHB1YmxpYyB2b2lkIHNldE1hdChzcHJpdGVNYXQgbWF0KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAobWF0ID09IHRoaXMubWF0KSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmVuZGJhdGNoKCk7XG5cbiAgICAgICAgICAgIHRoaXMud2ViZ2wuRGlzYWJsZSh0aGlzLndlYmdsLkNVTExfRkFDRSk7XG5cbiAgICAgICAgICAgIHRoaXMubWF0ID0gbWF0O1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVycGFyc2VyLm1hcHNoYWRlci5Db250YWluc0tleSh0aGlzLm1hdC5zaGFkZXIpID09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyY29kZSA9IHRoaXMuc2hhZGVycGFyc2VyLm1hcHNoYWRlclt0aGlzLm1hdC5zaGFkZXJdO1xuICAgICAgICAgICAgLy9pZiAodGhpcy5zaGFkZXJjb2RlID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIC8v5oyH5a6ac2hhZGVy5ZKMdmJvXG5cbiAgICAgICAgICAgIC8v5YWz5LqO5rex5bqmIO+8jOi3n+edgHNwcml0ZWJhdGNoZXLotbBcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuRGVwdGhNYXNrKGZhbHNlKTsvL+i/meaYr3p3cml0ZVxuXG4gICAgICAgICAgICBpZiAodGhpcy56dGVzdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkVuYWJsZSh0aGlzLndlYmdsLkRFUFRIX1RFU1QpOy8v6L+Z5pivenRlc3RcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkRlcHRoRnVuYyh0aGlzLndlYmdsLkxFUVVBTCk7Ly/ov5nmmK96dGVzdOaWueazlVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRGlzYWJsZSh0aGlzLndlYmdsLkRFUFRIX1RFU1QpOy8v6L+Z5pivenRlc3RcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWF0LnRyYW5zcGFyZW50KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vYWxwaGFibGVuZCDvvIzot5/nnYBtYXTotbBcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkVuYWJsZSh0aGlzLndlYmdsLkJMRU5EKTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkJsZW5kRXF1YXRpb24odGhpcy53ZWJnbC5GVU5DX0FERCk7XG4gICAgICAgICAgICAgICAgLy90aGlzLndlYmdsLmJsZW5kRnVuYyh0aGlzLndlYmdsLk9ORSwgdGhpcy53ZWJnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkJsZW5kRnVuY1NlcGFyYXRlKHRoaXMud2ViZ2wuT05FLCB0aGlzLndlYmdsLk9ORV9NSU5VU19TUkNfQUxQSEEsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuU1JDX0FMUEhBLCB0aGlzLndlYmdsLk9ORSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5EaXNhYmxlKHRoaXMud2ViZ2wuQkxFTkQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLndlYmdsLlVzZVByb2dyYW0odGhpcy5zaGFkZXJjb2RlLnByb2dyYW0pO1xuICAgICAgICAgICAgdGhpcy53ZWJnbC5CaW5kQnVmZmVyKHRoaXMud2ViZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZibyk7XG5cblxuICAgICAgICAgICAgLy/mjIflrprlm7rlrprnmoTmlbDmja7nu5PmnoTvvIznhLblkI7moLnmja7lrZjlnKhwcm9ncmFt55qE5pWw5o2u5Y6757uR5a6a5ZKv44CCXG5cbiAgICAgICAgICAgIC8v57uR5a6admJv5ZKMc2hhZGVy6aG254K55qC85byP77yM6L+Z6YOo5YiG5bqU6K+l6KaB5Yy65YiG5p2Q6LSo5pS55Y+Y5LiO5Y+C5pWw5pS55Y+Y77yM5Y+v5Lul5bCR5YiH5o2i5LiA5Lqb54q25oCBXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlLnBvc1BvcyA+PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuRW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5zaGFkZXJjb2RlLnBvc1Bvcyk7XG4gICAgICAgICAgICAgICAgLy8yOCDmmK/mlbDmja7mraXplb8o5a2X6IqCKe+8jOWwseaYr+aVsOaNrue7k+aehOeahOmVv+W6plxuICAgICAgICAgICAgICAgIC8vMTIg5piv5pWw5o2u5YGP56e777yI5a2X6IqC77yJXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5WZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyY29kZS5wb3NQb3MsIDMsIHRoaXMud2ViZ2wuRkxPQVQsIGZhbHNlLCA1MiwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlLnBvc0NvbG9yID49IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5FbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNoYWRlcmNvZGUucG9zQ29sb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlcmNvZGUucG9zQ29sb3IsIDQsIHRoaXMud2ViZ2wuRkxPQVQsIGZhbHNlLCA1MiwgMTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZS5wb3NDb2xvcjIgPj0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc2hhZGVyY29kZS5wb3NDb2xvcjIpO1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlcmNvZGUucG9zQ29sb3IyLCA0LCB0aGlzLndlYmdsLkZMT0FULCBmYWxzZSwgNTIsIDI4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRlcmNvZGUucG9zVVYgPj0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuc2hhZGVyY29kZS5wb3NVVik7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5WZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyY29kZS5wb3NVViwgMiwgdGhpcy53ZWJnbC5GTE9BVCwgZmFsc2UsIDUyLCA0NCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRlcmNvZGUudW5pTWF0cml4ICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5Vbmlmb3JtTWF0cml4NGZ2KHRoaXMuc2hhZGVyY29kZS51bmlNYXRyaXgsIGZhbHNlLCAoQXJyYXkpKG9iamVjdCl0aGlzLm1hdHJpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlLnVuaVRleDAgIT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkFjdGl2ZVRleHR1cmUodGhpcy53ZWJnbC5URVhUVVJFMCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleCA9IHRoaXMubWF0LnRleDA7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5CaW5kVGV4dHVyZSh0aGlzLndlYmdsLlRFWFRVUkVfMkQsIHRleCA9PSBudWxsID8gbnVsbCA6IHRleC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlVuaWZvcm0xaSh0aGlzLnNoYWRlcmNvZGUudW5pVGV4MCwgMCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInNldHRleFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRlcmNvZGUudW5pVGV4MSAhPSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuQWN0aXZlVGV4dHVyZSh0aGlzLndlYmdsLlRFWFRVUkUxKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4ID0gdGhpcy5tYXQudGV4MTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLkJpbmRUZXh0dXJlKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGV4ID09IG51bGwgPyBudWxsIDogdGV4LnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVW5pZm9ybTFpKHRoaXMuc2hhZGVyY29kZS51bmlUZXgxLCAxKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic2V0dGV4XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZS51bmlDb2wwICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5Vbmlmb3JtNGYodGhpcy5zaGFkZXJjb2RlLnVuaUNvbDAsIG1hdC5jb2wwLnIsIG1hdC5jb2wwLmcsIG1hdC5jb2wwLmIsIG1hdC5jb2wwLmEpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzZXR0ZXhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlLnVuaUNvbDEgIT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlVuaWZvcm00Zih0aGlzLnNoYWRlcmNvZGUudW5pQ29sMSwgbWF0LmNvbDEuciwgbWF0LmNvbDEuZywgbWF0LmNvbDEuYiwgbWF0LmNvbDEuYSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInNldHRleFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIEZsb2F0MzJBcnJheSBhcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoMTAyNCAqIDEzKTsvL25lc3NcbiAgICAgICAgaW50IGRhdGFzZWVrID0gMDtcbiAgICAgICAgcHVibGljIHZvaWQgZW5kYmF0Y2goKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm1hdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2VlayA9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8v5aGr5YWFdmJvXG4gICAgICAgICAgICB0aGlzLndlYmdsLkJ1ZmZlckRhdGEodGhpcy53ZWJnbC5BUlJBWV9CVUZGRVIsIHRoaXMuYXJyYXksIHRoaXMud2ViZ2wuRFlOQU1JQ19EUkFXKTtcbiAgICAgICAgICAgIC8v57uY5Yi2XG4gICAgICAgICAgICB0aGlzLndlYmdsLkRyYXdBcnJheXModGhpcy53ZWJnbC5UUklBTkdMRVMsIDAsIHRoaXMuZGF0YXNlZWspO1xuICAgICAgICAgICAgLy/muIXnkIbnirbmgIHvvIzlj6/ku6XkuI3lubJcbiAgICAgICAgICAgIC8vdGhpcy53ZWJnbC5iaW5kQnVmZmVyKHRoaXMud2ViZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcblxuICAgICAgICAgICAgLy90aGlzLmRhdGEubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNlZWsgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIGFkZFF1YWQoc3ByaXRlUG9pbnRbXSBwcykvL+a3u+WKoOWbm+i+ueW9ou+8jOW/hemhu+aYr+Wbm+eahOWAjeaVsO+8jOS4jeaOpeWPl+ijgeWJqlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlID09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgZm9yICh2YXIgamMgPSAwOyBqYyA8IDY7IGpjKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGogPSBqYyA8IDMgPyBqYyA6IDYgLSBqYzsvLyAwLT4wIDEtPjEgMi0+MlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGogPiAyKSBqID0gNiAtIGpjOyAvLyAzLT4zIDQtPjIgNS0+MVxuXG4gICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmRhdGFzZWVrICogMTM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS54O1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uejtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5yO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmc7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYjtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5hO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnIyO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmcyO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmIyO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmEyO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnU7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0udjtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNlZWsrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNlZWsgPj0gMTAwMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZGJhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgYWRkVHJpKHNwcml0ZVBvaW50W10gcHMpLy/mt7vliqDkuInop5LlvaLvvIzlv4XpobvmmK/kuInnmoTlgI3mlbAgLOS4ieinkuW9ouS4jeaUr+aMgeehrOijgeWJqlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkZXJjb2RlID09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzsgaisrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmRhdGFzZWVrICogMTM7XG4gICAgICAgICAgICAgICAgICAgIC8vZm9yICh2YXIgZSBpbiBwc1tqXSlcbiAgICAgICAgICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdW2VdO1xuICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uejtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ucjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ucjI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmcyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5iMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYTI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnY7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc2VlaysrO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLngpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLnkpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLnopO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLnIpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLmcpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLmIpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLmEpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLnIpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLmcpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLmIpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLmEpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLnUpO1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZGF0YS5wdXNoKHBzW2pdLnYpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNlZWsgPj0gMTAwMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZGJhdGNoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8v6L+Z5Liq5o6l5Y+j5o6l5Y+X6KOB5YmqXG4gICAgICAgIHB1YmxpYyB2b2lkIGFkZFJlY3Qoc3ByaXRlUG9pbnRbXSBwcykgLy/mt7vliqDlm5vovrnlvaLvvIzlv4XpobvmmK/lm5vnmoTlgI3mlbBcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZGVyY29kZSA9PSBTY3JpcHQuVW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlY3RDbGlwICE9IG51bGwpIC8v5L2/55So6KOB5YmqXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHhtaW4gPSBwc1swXS54O1xuICAgICAgICAgICAgICAgIHZhciB4bWF4ID0gcHNbM10ueDtcbiAgICAgICAgICAgICAgICB2YXIgeW1pbiA9IHBzWzBdLnk7XG4gICAgICAgICAgICAgICAgdmFyIHltYXggPSBwc1szXS55O1xuICAgICAgICAgICAgICAgIHZhciB1bWluID0gcHNbMF0udTtcbiAgICAgICAgICAgICAgICB2YXIgdW1heCA9IHBzWzNdLnU7XG4gICAgICAgICAgICAgICAgdmFyIHZtaW4gPSBwc1swXS52O1xuICAgICAgICAgICAgICAgIHZhciB2bWF4ID0gcHNbM10udjtcbiAgICAgICAgICAgICAgICB2YXIgd3NpemUgPSB4bWF4IC0geG1pbjtcbiAgICAgICAgICAgICAgICB2YXIgaHNpemUgPSB5bWF4IC0geW1pbjtcbiAgICAgICAgICAgICAgICB2YXIgdXNpemUgPSB1bWF4IC0gdW1pbjtcbiAgICAgICAgICAgICAgICB2YXIgdnNpemUgPSB2bWF4IC0gdm1pbjtcbiAgICAgICAgICAgICAgICB2YXIgeGwgPSBNYXRoLk1heCh4bWluLCB0aGlzLnJlY3RDbGlwLlZhbHVlLngpO1xuICAgICAgICAgICAgICAgIHZhciB4ciA9IE1hdGguTWluKHhtYXgsIHRoaXMucmVjdENsaXAuVmFsdWUueCArIHRoaXMucmVjdENsaXAuVmFsdWUudyk7XG4gICAgICAgICAgICAgICAgdmFyIHl0ID0gTWF0aC5NYXgoeW1pbiwgdGhpcy5yZWN0Q2xpcC5WYWx1ZS55KTtcbiAgICAgICAgICAgICAgICB2YXIgeWIgPSBNYXRoLk1pbih5bWF4LCB0aGlzLnJlY3RDbGlwLlZhbHVlLnkgKyB0aGlzLnJlY3RDbGlwLlZhbHVlLmgpO1xuICAgICAgICAgICAgICAgIHZhciBsZiA9ICh4bCAtIHhtaW4pIC8gd3NpemU7XG4gICAgICAgICAgICAgICAgdmFyIHRmID0gKHl0IC0geW1pbikgLyBoc2l6ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmYgPSAoeHIgLSB4bWF4KSAvIHdzaXplO1xuICAgICAgICAgICAgICAgIHZhciBiZiA9ICh5YiAtIHltYXgpIC8gaHNpemU7XG4gICAgICAgICAgICAgICAgdW1pbiA9IHVtaW4gKyBsZiAqIHVzaXplO1xuICAgICAgICAgICAgICAgIHZtaW4gPSB2bWluICsgdGYgKiB2c2l6ZTtcbiAgICAgICAgICAgICAgICB1bWF4ID0gdW1heCArIHJmICogdXNpemU7XG4gICAgICAgICAgICAgICAgdm1heCA9IHZtYXggKyBiZiAqIHZzaXplO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGpjID0gMDsgamMgPCA2OyBqYysrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGogPSBqYyA8IDMgPyBqYyA6IDYgLSBqYzsvLyAwLT4wIDEtPjEgMi0+MlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChqID4gMikgaiA9IDYgLSBqYzsgLy8gMy0+MyA0LT4yIDUtPjFcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMuZGF0YXNlZWsgKiAxMztcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IHBzW2pdLng7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4IDwgeGwpIHggPSB4bDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPiB4cikgeCA9IHhyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IHBzW2pdLnk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh5IDwgeXQpIHkgPSB5dDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkgPiB5YikgeSA9IHliO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdSA9IHBzW2pdLnU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1IDwgdW1pbikgdSA9IHVtaW47XG4gICAgICAgICAgICAgICAgICAgIGlmICh1ID4gdW1heCkgdSA9IHVtYXg7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gcHNbal0udjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYgPCB2bWluKSB2ID0gdm1pbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYgPiB2bWF4KSB2ID0gdm1heDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0geDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uejtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ucjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ucjI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmcyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5iMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYTI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHY7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc2VlaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqYyA9IDA7IGpjIDwgNjsgamMrKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqID0gamMgPCAzID8gamMgOiA2IC0gamM7Ly8gMC0+MCAxLT4xIDItPjJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaiA+IDIpIGogPSA2IC0gamM7IC8vIDMtPjMgNC0+MiA1LT4xXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmRhdGFzZWVrICogMTM7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uejtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ucjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0ucjI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLmcyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5W2krK10gPSBwc1tqXS5iMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheVtpKytdID0gcHNbal0uYTI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlbaSsrXSA9IHBzW2pdLnY7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc2VlaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZWVrID49IDEwMDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRiYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNwcml0ZVJlY3Q/IHJlY3RDbGlwID0gbnVsbDtcbiAgICAgICAgcHVibGljIHZvaWQgc2V0UmVjdENsaXAoc3ByaXRlUmVjdCByZWN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlY3RDbGlwID0gcmVjdDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBjbG9zZVJlY3RDbGlwKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWN0Q2xpcCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL3RleHR1cmVcbiAgICBwdWJsaWMgZW51bSB0ZXh0dXJlZm9ybWF0XG4gICAge1xuICAgICAgICBSR0JBID0gMSwvLyBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCQSxcbiAgICAgICAgUkdCID0gMiwvL1dlYkdMUmVuZGVyaW5nQ29udGV4dC5SR0IsXG4gICAgICAgIEdSQVkgPSAzLC8vV2ViR0xSZW5kZXJpbmdDb250ZXh0LkxVTUlOQU5DRSxcbiAgICAgICAgLy9BTFBIQSA9IHRoaXMud2ViZ2wuQUxQSEEsXG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyB0ZXhSZWFkZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyB0ZXhSZWFkZXIoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBXZWJHTFRleHR1cmUgdGV4UkdCQSwgaW50IHdpZHRoLCBpbnQgaGVpZ2h0LCBib29sIGdyYXkgPSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmdyYXkgPSBncmF5O1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgICAgIHZhciBmYm8gPSB3ZWJnbC5DcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgICAgICAgICAgV2ViR0xGcmFtZWJ1ZmZlciBmYm9sZCA9IHdlYmdsLkdldFBhcmFtZXRlcih3ZWJnbC5GUkFNRUJVRkZFUl9CSU5ESU5HKSBhcyBXZWJHTEZyYW1lYnVmZmVyO1xuICAgICAgICAgICAgd2ViZ2wuQmluZEZyYW1lYnVmZmVyKHdlYmdsLkZSQU1FQlVGRkVSLCBmYm8pO1xuICAgICAgICAgICAgd2ViZ2wuRnJhbWVidWZmZXJUZXh0dXJlMkQod2ViZ2wuRlJBTUVCVUZGRVIsIHdlYmdsLkNPTE9SX0FUVEFDSE1FTlQwLCB3ZWJnbC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgIHRleFJHQkEsIDApO1xuXG4gICAgICAgICAgICB2YXIgcmVhZERhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKiA0KTtcbiAgICAgICAgICAgIHJlYWREYXRhWzBdID0gMjtcbiAgICAgICAgICAgIHdlYmdsLlJlYWRQaXhlbHMoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHdlYmdsLlJHQkEsIHdlYmdsLlVOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgICAgICAgcmVhZERhdGEpO1xuICAgICAgICAgICAgd2ViZ2wuRGVsZXRlRnJhbWVidWZmZXIoZmJvKTtcbiAgICAgICAgICAgIHdlYmdsLkJpbmRGcmFtZWJ1ZmZlcih3ZWJnbC5GUkFNRUJVRkZFUiwgZmJvbGQpO1xuXG4gICAgICAgICAgICBpZiAoZ3JheSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2lkdGggKiBoZWlnaHQ7IGkrKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVtpXSA9IHJlYWREYXRhW2kgKiA0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVhZERhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGludCB3aWR0aDtcbiAgICAgICAgcHVibGljIGludCBoZWlnaHQ7XG4gICAgICAgIHB1YmxpYyBVaW50OEFycmF5IGRhdGE7XG4gICAgICAgIHB1YmxpYyBib29sIGdyYXk7XG4gICAgICAgIHB1YmxpYyBvYmplY3QgZ2V0UGl4ZWwoZmxvYXQgdSwgZmxvYXQgdilcbiAgICAgICAge1xuICAgICAgICAgICAgaW50IHggPSAoaW50KSh1ICogdGhpcy53aWR0aCk7XG4gICAgICAgICAgICBpbnQgeSA9IChpbnQpKHYgKiB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSB0aGlzLndpZHRoIHx8IHkgPCAwIHx8IHkgPj0gdGhpcy5oZWlnaHQpIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JheSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3kgKiB0aGlzLndpZHRoICsgeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAoeSAqIHRoaXMud2lkdGggKyB4KSAqIDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBzcHJpdGVDb2xvcih0aGlzLmRhdGFbaV0sIHRoaXMuZGF0YVtpICsgMV0sIHRoaXMuZGF0YVtpICsgMl0sIHRoaXMuZGF0YVtpICsgM10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGVUZXh0dXJlXG4gICAge1xuICAgICAgICBwdWJsaWMgc3ByaXRlVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyB1cmwgPSBudWxsLCB0ZXh0dXJlZm9ybWF0IGZvcm1hdCA9IHRleHR1cmVmb3JtYXQuUkdCQSwgYm9vbCBtaXBtYXAgPSBmYWxzZSwgYm9vbCBsaW5lYXIgPSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLndlYmdsID0gd2ViZ2w7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcblxuICAgICAgICAgICAgdGhpcy5tYXQgPSBuZXcgc3ByaXRlTWF0KCk7Ly9uZXNzXG4gICAgICAgICAgICB0aGlzLm1hdC50ZXgwID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMubWF0LnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWF0LnNoYWRlciA9IFwic3ByaXRlZGVmYXVsdFwiO1xuXG4gICAgICAgICAgICBpZiAodXJsID09IG51bGwpLy/kuI3nu5nlrpp1cmwg5YiZIHRleHR1cmUg5LiN5Yqg6L29XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gd2ViZ2wuQ3JlYXRlVGV4dHVyZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmltZyA9IG5ldyBCcmlkZ2UuSHRtbDUuSFRNTEltYWdlRWxlbWVudCgpOy8vIEltYWdlKCk7Ly8gSFRNTEltYWdlRWxlbWVudCgpOyAvL25lc3NcbiAgICAgICAgICAgIHRoaXMuaW1nLlNyYyA9IHVybDtcbiAgICAgICAgICAgIHRoaXMuaW1nLk9uTG9hZCA9IChlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3Bvc2VpdClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1nID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW1nKG1pcG1hcCwgbGluZWFyKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIHZvaWQgX2xvYWRpbWcoYm9vbCBtaXBtYXAsIGJvb2wgbGluZWFyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWcuV2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1nLkhlaWdodDtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuUGl4ZWxTdG9yZWkodGhpcy53ZWJnbC5VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wsIDEpO1xuICAgICAgICAgICAgdGhpcy53ZWJnbC5QaXhlbFN0b3JlaSh0aGlzLndlYmdsLlVOUEFDS19GTElQX1lfV0VCR0wsIDApO1xuXG5cbiAgICAgICAgICAgIHRoaXMud2ViZ2wuQmluZFRleHR1cmUodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmUpO1xuICAgICAgICAgICAgdmFyIGZvcm1hdEdMID0gdGhpcy53ZWJnbC5SR0JBO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybWF0ID09IHRleHR1cmVmb3JtYXQuUkdCKVxuICAgICAgICAgICAgICAgIGZvcm1hdEdMID0gdGhpcy53ZWJnbC5SR0I7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZvcm1hdCA9PSB0ZXh0dXJlZm9ybWF0LkdSQVkpXG4gICAgICAgICAgICAgICAgZm9ybWF0R0wgPSB0aGlzLndlYmdsLkxVTUlOQU5DRTtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wuVGV4SW1hZ2UyRCh0aGlzLndlYmdsLlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBmb3JtYXRHTCxcbiAgICAgICAgICAgICAgICBmb3JtYXRHTCxcbiAgICAgICAgICAgICAgICAvL+acgOWQjui/meS4qnR5cGXvvIzlj6/ku6XnrqHmoLzlvI9cbiAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlVOU0lHTkVEX0JZVEVcbiAgICAgICAgICAgICAgICAsIHRoaXMuaW1nKTtcblxuICAgICAgICAgICAgaWYgKG1pcG1hcClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL+eUn+aIkG1pcG1hcFxuICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuR2VuZXJhdGVNaXBtYXAodGhpcy53ZWJnbC5URVhUVVJFXzJEKTtcblxuICAgICAgICAgICAgICAgIGlmIChsaW5lYXIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlRleFBhcmFtZXRlcmkodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0aGlzLndlYmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgdGhpcy53ZWJnbC5MSU5FQVIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlRleFBhcmFtZXRlcmkodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0aGlzLndlYmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy53ZWJnbC5MSU5FQVJfTUlQTUFQX0xJTkVBUik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVGV4UGFyYW1ldGVyaSh0aGlzLndlYmdsLlRFWFRVUkVfMkQsIHRoaXMud2ViZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLndlYmdsLk5FQVJFU1QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYmdsLlRleFBhcmFtZXRlcmkodGhpcy53ZWJnbC5URVhUVVJFXzJELCB0aGlzLndlYmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgdGhpcy53ZWJnbC5ORUFSRVNUX01JUE1BUF9ORUFSRVNUKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAobGluZWFyKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5UZXhQYXJhbWV0ZXJpKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy53ZWJnbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMud2ViZ2wuTElORUFSKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5UZXhQYXJhbWV0ZXJpKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy53ZWJnbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMud2ViZ2wuTElORUFSKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5UZXhQYXJhbWV0ZXJpKHRoaXMud2ViZ2wuVEVYVFVSRV8yRCwgdGhpcy53ZWJnbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMud2ViZ2wuTkVBUkVTVCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2ViZ2wuVGV4UGFyYW1ldGVyaSh0aGlzLndlYmdsLlRFWFRVUkVfMkQsIHRoaXMud2ViZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLndlYmdsLk5FQVJFU1QpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWcgPSBudWxsO1xuXG5cblxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2w7XG4gICAgICAgIHB1YmxpYyBIVE1MSW1hZ2VFbGVtZW50IGltZyA9IG51bGw7XG4gICAgICAgIHB1YmxpYyBib29sIGxvYWRlZCA9IGZhbHNlO1xuICAgICAgICBwdWJsaWMgV2ViR0xUZXh0dXJlIHRleHR1cmU7XG4gICAgICAgIHB1YmxpYyB0ZXh0dXJlZm9ybWF0IGZvcm1hdDtcbiAgICAgICAgcHVibGljIGludCB3aWR0aCA9IDA7XG4gICAgICAgIHB1YmxpYyBpbnQgaGVpZ2h0ID0gMDtcbiAgICAgICAgc3RhdGljIHB1YmxpYyBzcHJpdGVUZXh0dXJlIGZyb21SYXcoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBIVE1MSW1hZ2VFbGVtZW50IGltZywgdGV4dHVyZWZvcm1hdCBmb3JtYXQgPSB0ZXh0dXJlZm9ybWF0LlJHQkEsIGJvb2wgbWlwbWFwID0gZmFsc2UsIGJvb2wgbGluZWFyID0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0ID0gbmV3IHNwcml0ZVRleHR1cmUod2ViZ2wsIG51bGwsIGZvcm1hdCwgbWlwbWFwLCBsaW5lYXIpO1xuICAgICAgICAgICAgc3QudGV4dHVyZSA9IHdlYmdsLkNyZWF0ZVRleHR1cmUoKTtcbiAgICAgICAgICAgIHN0LmltZyA9IGltZztcbiAgICAgICAgICAgIHN0Ll9sb2FkaW1nKG1pcG1hcCwgbGluZWFyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0O1xuXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNwcml0ZU1hdCBtYXQgPSBudWxsO1xuICAgICAgICAvL+WIm+W7uuivu+WPluWZqO+8jOacieWPr+iDveWksei0pVxuICAgICAgICBwdWJsaWMgdGV4UmVhZGVyIHJlYWRlcjtcbiAgICAgICAgcHVibGljIHRleFJlYWRlciBnZXRSZWFkZXIoYm9vbCByZWRPbmx5KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkZXIgIT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkZXIuZ3JheSAhPSByZWRPbmx5KVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3lzdGVtLkV4Y2VwdGlvbihcImdldCBwYXJhbSBkaWZmIHdpdGggdGhpcy5yZWFkZXJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybWF0ICE9IHRleHR1cmVmb3JtYXQuUkdCQSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3lzdGVtLkV4Y2VwdGlvbihcIm9ubHkgcmdiYSB0ZXh0dXJlIGNhbiByZWFkXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWRlciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRoaXMucmVhZGVyID0gbmV3IHRleFJlYWRlcih0aGlzLndlYmdsLCB0aGlzLnRleHR1cmUsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCByZWRPbmx5KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZGVyO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBib29sIGRpc3Bvc2VpdCA9IGZhbHNlO1xuICAgICAgICBwdWJsaWMgdm9pZCBkaXNwb3NlKClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZSA9PSBudWxsICYmIHRoaXMuaW1nICE9IG51bGwpXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlaXQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0dXJlICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJnbC5EZWxldGVUZXh0dXJlKHRoaXMudGV4dHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNwcml0ZVBvaW50W10gcG9pbnRidWYgPSB7XG4gICAgICAgICAgICBuZXcgc3ByaXRlUG9pbnQoKXsgeD0wLCB5PSAwLCB6PSAwLCByPSAwLCBnPTAsIGI9IDAsIGE9IDAsIHIyPTAsIGcyPTAsIGIyPSAwLCBhMj0gMCwgdT0wLCB2PTAgfSxcbiAgICAgICAgICAgIG5ldyBzcHJpdGVQb2ludCgpeyB4PSAwLCB5PSAwLCB6PSAwLCByPSAwLCBnPSAwLCBiPSAwLCBhPSAwLCByMj0wLCBnMj0gMCwgYjI9IDAsIGEyPSAwLCB1PTAsIHY9MCB9LFxuICAgICAgICAgICAgbmV3IHNwcml0ZVBvaW50KCl7IHg9MCwgeT0gMCwgej0gMCwgcj0gMCwgZz0gMCwgYj0gMCwgYT0gMCwgcjI9IDAsIGcyPSAwLCBiMj0gMCwgYTI9IDAsIHU9MCwgdj0gMCB9LFxuICAgICAgICAgICAgbmV3IHNwcml0ZVBvaW50KCl7IHg9MCwgeT0wLCB6PTAsIHI9IDAsIGc9IDAsIGI9IDAsIGE9IDAsIHIyPSAwLCBnMj0wLCBiMj0gMCwgYTI9MCwgdT0wLCB2PSAwIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgcHVibGljIHZvaWQgZHJhdyhzcHJpdGVCYXRjaGVyIHNwcml0ZUJhdGNoZXIsIHNwcml0ZVJlY3QgdXYsIHNwcml0ZVJlY3QgcmVjdCwgc3ByaXRlQ29sb3IgYylcbiAgICAgICAge1xuXG4gICAgICAgICAgICB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwID0gdGhpcy5wb2ludGJ1ZlswXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0Lng7IHAueSA9IHJlY3QueTsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSB1di54OyBwLnYgPSB1di55O1xuICAgICAgICAgICAgICAgIHAuciA9IGMucjsgcC5nID0gYy5nOyBwLmIgPSBjLmI7IHAuYSA9IGMuYTtcblxuICAgICAgICAgICAgICAgIHAgPSB0aGlzLnBvaW50YnVmWzFdO1xuICAgICAgICAgICAgICAgIHAueCA9IHJlY3QueCArIHJlY3QudzsgcC55ID0gcmVjdC55OyBwLnogPSAwO1xuICAgICAgICAgICAgICAgIHAudSA9IHV2LnggKyB1di53OyBwLnYgPSB1di55O1xuICAgICAgICAgICAgICAgIHAuciA9IGMucjsgcC5nID0gYy5nOyBwLmIgPSBjLmI7IHAuYSA9IGMuYTtcblxuICAgICAgICAgICAgICAgIHAgPSB0aGlzLnBvaW50YnVmWzJdO1xuICAgICAgICAgICAgICAgIHAueCA9IHJlY3QueDsgcC55ID0gcmVjdC55ICsgcmVjdC5oOyBwLnogPSAwO1xuICAgICAgICAgICAgICAgIHAudSA9IHV2Lng7IHAudiA9IHV2LnkgKyB1di5oO1xuICAgICAgICAgICAgICAgIHAuciA9IGMucjsgcC5nID0gYy5nOyBwLmIgPSBjLmI7IHAuYSA9IGMuYTtcblxuICAgICAgICAgICAgICAgIHAgPSB0aGlzLnBvaW50YnVmWzNdO1xuICAgICAgICAgICAgICAgIHAueCA9IHJlY3QueCArIHJlY3QudzsgcC55ID0gcmVjdC55ICsgcmVjdC5oOyBwLnogPSAwO1xuICAgICAgICAgICAgICAgIHAudSA9IHV2LnggKyB1di53OyBwLnYgPSB1di55ICsgdXYuaDtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcHJpdGVCYXRjaGVyLnNldE1hdCh0aGlzLm1hdCk7XG4gICAgICAgICAgICBzcHJpdGVCYXRjaGVyLmFkZFJlY3QodGhpcy5wb2ludGJ1Zik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdDdXN0b20oc3ByaXRlQmF0Y2hlciBzcHJpdGVCYXRjaGVyLCBzcHJpdGVNYXQgX21hdCwgc3ByaXRlUmVjdCB1diwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVDb2xvciBjLCBzcHJpdGVDb2xvciBjMilcbiAgICAgICAge1xuICAgICAgICAgICAgX21hdC50ZXgwID0gdGhpcztcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHRoaXMucG9pbnRidWZbMF07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54OyBwLnkgPSByZWN0Lnk7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gdXYueDsgcC52ID0gdXYueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsxXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueTsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSB1di54ICsgdXYudzsgcC52ID0gdXYueTtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlsyXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0Lng7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSB1di54OyBwLnYgPSB1di55ICsgdXYuaDtcbiAgICAgICAgICAgICAgICBwLnIgPSBjLnI7IHAuZyA9IGMuZzsgcC5iID0gYy5iOyBwLmEgPSBjLmE7XG5cbiAgICAgICAgICAgICAgICBwID0gdGhpcy5wb2ludGJ1ZlszXTtcbiAgICAgICAgICAgICAgICBwLnggPSByZWN0LnggKyByZWN0Lnc7IHAueSA9IHJlY3QueSArIHJlY3QuaDsgcC56ID0gMDtcbiAgICAgICAgICAgICAgICBwLnUgPSB1di54ICsgdXYudzsgcC52ID0gdXYueSArIHV2Lmg7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ByaXRlQmF0Y2hlci5zZXRNYXQoX21hdCk7XG4gICAgICAgICAgICBzcHJpdGVCYXRjaGVyLmFkZFJlY3QodGhpcy5wb2ludGJ1Zik7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGUvLyA6IHNwcml0ZVJlY3RcbiAgICB7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB4O1xuICAgICAgICBwdWJsaWMgZmxvYXQgeTtcbiAgICAgICAgcHVibGljIGZsb2F0IHc7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBoO1xuICAgICAgICBwdWJsaWMgZmxvYXQgeHNpemU7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB5c2l6ZTtcbiAgICAgICAgcHVibGljIHNwcml0ZVJlY3QgVG9SZWN0KClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBzcHJpdGVSZWN0KHgsIHksIHcsIGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vYXRsYXNcbiAgICBwdWJsaWMgY2xhc3Mgc3ByaXRlQXRsYXNcbiAgICB7XG4gICAgICAgIHB1YmxpYyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2w7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVBdGxhcyhXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyBhdGxhc3VybCA9IG51bGwsIHNwcml0ZVRleHR1cmUgdGV4dHVyZSA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMud2ViZ2wgPSB3ZWJnbDtcbiAgICAgICAgICAgIGlmIChhdGxhc3VybCA9PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxpZ2h0dG9vbC5sb2FkVG9vbC5sb2FkVGV4dChhdGxhc3VybCwgKEFjdGlvbjxzdHJpbmcsRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJzZSh0eHQpO1xuICAgICAgICAgICAgICAgIH1cbikgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHN0YXRpYyBzcHJpdGVBdGxhcyBmcm9tUmF3KFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgc3RyaW5nIHR4dCwgc3ByaXRlVGV4dHVyZSB0ZXh0dXJlID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHNhID0gbmV3IHNwcml0ZUF0bGFzKHdlYmdsLCBudWxsLCB0ZXh0dXJlKTtcbiAgICAgICAgICAgIHNhLl9wYXJzZSh0eHQpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2E7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHN0cmluZyB0ZXh0dXJldXJsO1xuICAgICAgICBwdWJsaWMgaW50IHRleHR1cmV3aWR0aDtcbiAgICAgICAgcHVibGljIGludCB0ZXh0dXJlaGVpZ2h0O1xuICAgICAgICBwdWJsaWMgc3ByaXRlVGV4dHVyZSB0ZXh0dXJlO1xuICAgICAgICBwdWJsaWMgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuRGljdGlvbmFyeTxzdHJpbmcsIHNwcml0ZT4gc3ByaXRlcyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc3ByaXRlPigpO1xuICAgICAgICBwcml2YXRlIHZvaWQgX3BhcnNlKHN0cmluZyB0eHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5QYXJzZSh0eHQpO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJldXJsID0ganNvbltcInRcIl0uQXM8U3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJld2lkdGggPSBqc29uW1wid1wiXS5BczxpbnQ+KCk7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmVoZWlnaHQgPSBqc29uW1wiaFwiXS5BczxpbnQ+KCk7XG4gICAgICAgICAgICB2YXIgcyA9IChvYmplY3RbXSlqc29uW1wic1wiXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLkxlbmd0aDsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzcyA9IChvYmplY3RbXSlzW2ldO1xuICAgICAgICAgICAgICAgIHZhciByID0gbmV3IHNwcml0ZSgpOy8vbmVzc1xuICAgICAgICAgICAgICAgIHIueCA9ICgoZmxvYXQpc3NbMV0gKyAwLjVmKSAvIHRoaXMudGV4dHVyZXdpZHRoO1xuICAgICAgICAgICAgICAgIHIueSA9ICgoZmxvYXQpc3NbMl0gKyAwLjVmKSAvIHRoaXMudGV4dHVyZWhlaWdodDtcbiAgICAgICAgICAgICAgICByLncgPSAoKGZsb2F0KXNzWzNdIC0gMWYpIC8gdGhpcy50ZXh0dXJld2lkdGg7XG4gICAgICAgICAgICAgICAgci5oID0gKChmbG9hdClzc1s0XSAtIDFmKSAvIHRoaXMudGV4dHVyZWhlaWdodDtcbiAgICAgICAgICAgICAgICByLnhzaXplID0gKGZsb2F0KXNzWzNdO1xuICAgICAgICAgICAgICAgIHIueXNpemUgPSAoZmxvYXQpc3NbNF07XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzWyhzdHJpbmcpc3NbMF1dID0gcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdCeVRleHR1cmUoc3ByaXRlQmF0Y2hlciBzYiwgc3RyaW5nIHNuYW1lLCBzcHJpdGVSZWN0IHJlY3QsIHNwcml0ZUNvbG9yIGMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmUgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHIgPSB0aGlzLnNwcml0ZXNbc25hbWVdO1xuICAgICAgICAgICAgaWYgKHIgPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnRleHR1cmUuZHJhdyhzYiwgci5Ub1JlY3QoKSwgcmVjdCwgYyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vZm9udFxuICAgIHB1YmxpYyBjbGFzcyBjaGFyaW5mb1xuICAgIHtcbiAgICAgICAgcHVibGljIGZsb2F0IHg7Ly91dlxuICAgICAgICBwdWJsaWMgZmxvYXQgeTtcbiAgICAgICAgcHVibGljIGZsb2F0IHc7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBoO1xuICAgICAgICBwdWJsaWMgZmxvYXQgeFNpemU7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB5U2l6ZTtcbiAgICAgICAgcHVibGljIGZsb2F0IHhPZmZzZXQ7Ly/lgY/np7tcbiAgICAgICAgcHVibGljIGZsb2F0IHlPZmZzZXQ7XG4gICAgICAgIHB1YmxpYyBmbG9hdCB4QWRkdmFuY2U7Ly/lrZfnrKblrr3luqZcbiAgICB9XG4gICAgcHVibGljIGNsYXNzIHNwcml0ZUR5bmFtaWNGb250XHJcbiAgICB7XHJcblxyXG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGVGb250XG4gICAge1xuICAgICAgICBwdWJsaWMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsO1xuICAgICAgICBwdWJsaWMgc3ByaXRlVGV4dHVyZSB0ZXh0dXJlO1xuICAgICAgICBwdWJsaWMgc3ByaXRlTWF0IG1hdDtcblxuICAgICAgICBwdWJsaWMgT2JqZWN0IGNtYXA7XG4gICAgICAgIHB1YmxpYyBzdHJpbmcgZm9udG5hbWU7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBwb2ludFNpemU7Ly/lg4/ntKDlsLrlr7hcbiAgICAgICAgcHVibGljIGZsb2F0IHBhZGRpbmc7Ly/pl7TpmpRcbiAgICAgICAgcHVibGljIGZsb2F0IGxpbmVIZWlnaHQ7Ly/ooYzpq5hcbiAgICAgICAgcHVibGljIGZsb2F0IGJhc2VsaW5lOy8v5Z+657q/XG4gICAgICAgIHB1YmxpYyBmbG9hdCBhdGxhc1dpZHRoO1xuICAgICAgICBwdWJsaWMgZmxvYXQgYXRsYXNIZWlnaHQ7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVGb250KFdlYkdMUmVuZGVyaW5nQ29udGV4dCB3ZWJnbCwgc3RyaW5nIHVybGNvbmZpZywgc3ByaXRlVGV4dHVyZSB0ZXh0dXJlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLndlYmdsID0gd2ViZ2w7XG4gICAgICAgICAgICBpZiAodXJsY29uZmlnICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGlnaHR0b29sLmxvYWRUb29sLmxvYWRUZXh0KHVybGNvbmZpZywgKEFjdGlvbjxzdHJpbmcsRXJyb3I+KSgodHh0LCBlcnIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJzZSh0eHQpO1xuICAgICAgICAgICAgICAgIH1cbikgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgICAgICB0aGlzLm1hdCA9IG5ldyBzcHJpdGVNYXQoKTsvL25lc3NcbiAgICAgICAgICAgIHRoaXMubWF0LnNoYWRlciA9IFwic3ByaXRlZm9udFwiO1xuICAgICAgICAgICAgdGhpcy5tYXQudGV4MCA9IHRoaXMudGV4dHVyZTtcbiAgICAgICAgICAgIHRoaXMubWF0LnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc3RhdGljIHNwcml0ZUZvbnQgZnJvbVJhdyhXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIHN0cmluZyB0eHQsIHNwcml0ZVRleHR1cmUgdGV4dHVyZSA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzZiA9IG5ldyBzcHJpdGVGb250KHdlYmdsLCBudWxsLCB0ZXh0dXJlKTtcbiAgICAgICAgICAgIHNmLl9wYXJzZSh0eHQpO1xuICAgICAgICAgICAgcmV0dXJuIHNmO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIF9wYXJzZShzdHJpbmcgdHh0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZDEgPSBuZXcgRGF0ZSgpLlZhbHVlT2YoKTtcbiAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5QYXJzZSh0eHQpO1xuXG4gICAgICAgICAgICAvL3BhcnNlIGZvbnRpbmZvXG4gICAgICAgICAgICB2YXIgZm9udCA9IChvYmplY3RbXSlqc29uW1wiZm9udFwiXTtcbiAgICAgICAgICAgIHRoaXMuZm9udG5hbWUgPSAoc3RyaW5nKWZvbnRbMF07XG4gICAgICAgICAgICB0aGlzLnBvaW50U2l6ZSA9IChmbG9hdClmb250WzFdO1xuICAgICAgICAgICAgdGhpcy5wYWRkaW5nID0gKGZsb2F0KWZvbnRbMl07XG4gICAgICAgICAgICB0aGlzLmxpbmVIZWlnaHQgPSAoZmxvYXQpZm9udFszXTtcbiAgICAgICAgICAgIHRoaXMuYmFzZWxpbmUgPSAoZmxvYXQpZm9udFs0XTtcbiAgICAgICAgICAgIHRoaXMuYXRsYXNXaWR0aCA9IChmbG9hdClmb250WzVdO1xuICAgICAgICAgICAgdGhpcy5hdGxhc0hlaWdodCA9IChmbG9hdClmb250WzZdO1xuXG4gICAgICAgICAgICAvL3BhcnNlIGNoYXIgbWFwXG4gICAgICAgICAgICB0aGlzLmNtYXAgPSBuZXcgb2JqZWN0KCk7XG4gICAgICAgICAgICB2YXIgbWFwID0ganNvbltcIm1hcFwiXTtcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjIGluIFNjcmlwdC5HZXRPd25Qcm9wZXJ0eU5hbWVzKG1hcCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbmZvID0gbmV3IGNoYXJpbmZvKCk7Ly9uZXNzXG4gICAgICAgICAgICAgICAgdGhpcy5jbWFwW2NdID0gZmluZm87XG4gICAgICAgICAgICAgICAgZmluZm8ueCA9IG1hcFtjXS5BczxmbG9hdFtdPigpWzBdIC8gdGhpcy5hdGxhc1dpZHRoO1xuICAgICAgICAgICAgICAgIGZpbmZvLnkgPSBtYXBbY10uQXM8ZmxvYXRbXT4oKVsxXSAvIHRoaXMuYXRsYXNIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZmluZm8udyA9IG1hcFtjXS5BczxmbG9hdFtdPigpWzJdIC8gdGhpcy5hdGxhc1dpZHRoO1xuICAgICAgICAgICAgICAgIGZpbmZvLmggPSBtYXBbY10uQXM8ZmxvYXRbXT4oKVszXSAvIHRoaXMuYXRsYXNIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZmluZm8ueFNpemUgPSBtYXBbY10uQXM8ZmxvYXRbXT4oKVsyXTtcbiAgICAgICAgICAgICAgICBmaW5mby55U2l6ZSA9IG1hcFtjXS5BczxmbG9hdFtdPigpWzNdO1xuICAgICAgICAgICAgICAgIGZpbmZvLnhPZmZzZXQgPSBtYXBbY10uQXM8ZmxvYXRbXT4oKVs0XTtcbiAgICAgICAgICAgICAgICBmaW5mby55T2Zmc2V0ID0gbWFwW2NdLkFzPGZsb2F0W10+KClbNV07XG4gICAgICAgICAgICAgICAgZmluZm8ueEFkZHZhbmNlID0gbWFwW2NdLkFzPGZsb2F0W10+KClbNl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXAgPSBudWxsO1xuICAgICAgICAgICAganNvbiA9IG51bGw7XG5cblxuICAgICAgICAgICAgdmFyIGQyID0gbmV3IERhdGUoKS5WYWx1ZU9mKCk7XG4gICAgICAgICAgICB2YXIgbiA9IGQyIC0gZDE7XG4gICAgICAgICAgICBCcmlkZ2UuSHRtbDUuQ29uc29sZS5JbmZvKFwianNvbiB0aW1lPVwiICsgbik7XG5cbiAgICAgICAgfVxuICAgICAgICBzcHJpdGVQb2ludFtdIHBvaW50YnVmID0ge1xuICAgICAgICAgICAgICAgICAgbmV3IHNwcml0ZVBvaW50ICB7IHg9MCwgeT0gMCwgej0gMCwgcj0gMCwgZz0wLCBiPTAsIGE9MCwgcjI9MCwgZzI9IDAsIGIyPTAsIGEyPTAsIHU9MCx2ID0gMCB9LFxuICAgICAgICAgICAgIG5ldyBzcHJpdGVQb2ludHsgeD0gMCwgeT0wLCB6PTAsIHI9MCwgZz0gMCwgYj0gMCwgYT0wLCByMj0wLCBnMj0gMCwgYjI9IDAsIGEyPTAsIHU9MCwgdj0gMCB9LFxuICAgICAgICAgICAgIG5ldyBzcHJpdGVQb2ludHsgeD0gMCwgeT0gMCwgej0gMCwgcj0gMCwgZz0gMCwgYj0gMCwgYT0gMCwgcjI9IDAsIGcyPSAwLCBiMj0gMCwgYTI9IDAsIHU9IDAsIHY9IDAgfSxcbiAgICAgICAgICAgICBuZXcgc3ByaXRlUG9pbnR7IHg9IDAsIHk9IDAsIHo9MCwgcj0gMCwgZz0wLCBiPSAwLCBhPSAwLCByMj0gMCwgZzI9IDAsIGIyPTAsIGEyPSAwLCB1PSAwLCB2PSAwIH0sXG4gICAgICAgIH07XG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXcoc3ByaXRlQmF0Y2hlciBzYiwgY2hhcmluZm8gciwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVDb2xvciBjID0gbnVsbCwgc3ByaXRlQ29sb3IgY29sb3JCb3JkZXIgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoYyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGMgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIGlmIChjb2xvckJvcmRlciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yQm9yZGVyID0gbmV3IHNwcml0ZUNvbG9yKDBmLCAwZiwgMGYsIDAuNWYpO1xuICAgICAgICAgICAgLy9pZiAocj09bnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHRoaXMucG9pbnRidWZbMF07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54OyBwLnkgPSByZWN0LnkgKyByZWN0Lmg7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54OyBwLnYgPSByLnkgKyByLmg7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbMV07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54ICsgcmVjdC53OyBwLnkgPSByZWN0LnkgKyByZWN0Lmg7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54ICsgci53OyBwLnYgPSByLnkgKyByLmg7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbMl07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54OyBwLnkgPSByZWN0Lnk7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54OyBwLnYgPSByLnk7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbM107XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54ICsgcmVjdC53OyBwLnkgPSByZWN0Lnk7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54ICsgci53OyBwLnYgPSByLnk7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Iuc2V0TWF0KHRoaXMubWF0KTtcbiAgICAgICAgICAgIHNiLmFkZFJlY3QodGhpcy5wb2ludGJ1Zik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBkcmF3Q2hhcihzcHJpdGVCYXRjaGVyIHNiLCBzdHJpbmcgY25hbWUsIHNwcml0ZVJlY3QgcmVjdCwgc3ByaXRlQ29sb3IgYyA9IG51bGwsIHNwcml0ZUNvbG9yIGNvbG9yQm9yZGVyID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHIgPSB0aGlzLmNtYXBbY25hbWVdIGFzIGNoYXJpbmZvO1xuICAgICAgICAgICAgaWYgKHIgPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICBpZiAoY29sb3JCb3JkZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb2xvckJvcmRlciA9IG5ldyBzcHJpdGVDb2xvcigwZiwgMGYsIDBmLCAwLjVmKTtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHRoaXMucG9pbnRidWZbMF07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54OyBwLnkgPSByZWN0Lnk7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54OyBwLnYgPSByLnk7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbMV07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54ICsgcmVjdC53OyBwLnkgPSByZWN0Lnk7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54ICsgci53OyBwLnYgPSByLnk7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbMl07XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54OyBwLnkgPSByZWN0LnkgKyByZWN0Lmg7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54OyBwLnYgPSByLnkgKyByLmg7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuXG4gICAgICAgICAgICAgICAgcCA9IHRoaXMucG9pbnRidWZbM107XG4gICAgICAgICAgICAgICAgcC54ID0gcmVjdC54ICsgcmVjdC53OyBwLnkgPSByZWN0LnkgKyByZWN0Lmg7IHAueiA9IDA7XG4gICAgICAgICAgICAgICAgcC51ID0gci54ICsgci53OyBwLnYgPSByLnkgKyByLmg7XG4gICAgICAgICAgICAgICAgcC5yID0gYy5yOyBwLmcgPSBjLmc7IHAuYiA9IGMuYjsgcC5hID0gYy5hO1xuICAgICAgICAgICAgICAgIHAucjIgPSBjb2xvckJvcmRlci5yOyBwLmcyID0gY29sb3JCb3JkZXIuZzsgcC5iMiA9IGNvbG9yQm9yZGVyLmI7IHAuYTIgPSBjb2xvckJvcmRlci5hO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzYi5zZXRNYXQodGhpcy5tYXQpO1xuICAgICAgICAgICAgc2IuYWRkUmVjdCh0aGlzLnBvaW50YnVmKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLA0KICAgICJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuV2ViR0w7XG5cbm5hbWVzcGFjZSBsaWdodHRvb2wuTmF0aXZlXG57XG4gICAgcHVibGljIGNsYXNzIGNhbnZhc0FkYXB0ZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3ByaXRlQ2FudmFzIENyZWF0ZVNjcmVlbkNhbnZhcyhXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2wsIGNhbnZhc0FjdGlvbiB1c2VyYWN0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZWwgPSB3ZWJnbC5DYW52YXM7XG4gICAgICAgICAgICBlbC5XaWR0aCA9IGVsLkNsaWVudFdpZHRoO1xuICAgICAgICAgICAgZWwuSGVpZ2h0ID0gZWwuQ2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICB2YXIgYyA9IG5ldyBzcHJpdGVDYW52YXMod2ViZ2wsIHdlYmdsLkRyYXdpbmdCdWZmZXJXaWR0aCwgd2ViZ2wuRHJhd2luZ0J1ZmZlckhlaWdodCk7XG4gICAgICAgICAgICAvL3ZhciBhc3AgPSByYW5nZS53aWR0aCAvIHJhbmdlLmhlaWdodDtcbiAgICAgICAgICAgIGMuc3ByaXRlQmF0Y2hlci5tYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KG5ldyBmbG9hdFtdIHtcbiAgICAgICAgICAgICAgICAgICAgMS4wZiAqIDIgLyBjLndpZHRoLCAwLCAwLCAwLC8v5Y675o6JYXNw55qE5b2x5ZONXG4gICAgICAgICAgICAgICAgICAgIDAsIDEgKiAtMSAqIDIgLyBjLmhlaWdodCwgMCwgMCxcbiAgICAgICAgICAgICAgICAgICAgMCwgMCwgMSwgMCxcbiAgICAgICAgICAgICAgICAgICAgLTEsIDEsIDAsIDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYy5zcHJpdGVCYXRjaGVyLnp0ZXN0ID0gZmFsc2U7Ly/mnIDliY3kuI3pnIDopoF6dGVzdFxuXG4gICAgICAgICAgICB2YXIgdWEgPSB1c2VyYWN0aW9uO1xuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5TZXRJbnRlcnZhbCgoQWN0aW9uKSgoKSA9PlxuICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgIHdlYmdsLlZpZXdwb3J0KDAsIDAsIHdlYmdsLkRyYXdpbmdCdWZmZXJXaWR0aCwgd2ViZ2wuRHJhd2luZ0J1ZmZlckhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgd2ViZ2wuQ2xlYXIod2ViZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHdlYmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuICAgICAgICAgICAgICAgICAgIHdlYmdsLkNsZWFyQ29sb3IoMS4wLCAwLjAsIDEuMCwgMS4wKTtcblxuICAgICAgICAgICAgICAgICAgIGMuc3ByaXRlQmF0Y2hlci5iZWdpbmRyYXcoKTtcblxuICAgICAgICAgICAgICAgICAgIHVhLm9uZHJhdyhjKTtcblxuICAgICAgICAgICAgICAgICAgIGMuc3ByaXRlQmF0Y2hlci5lbmRkcmF3KCk7XG5cbiAgICAgICAgICAgICAgICAgICAvL2R5bmFtaWMgX3dlYmdsID0gd2ViZ2w7XG4gICAgICAgICAgICAgICAgICAgLy9fd2ViZ2wuZmx1c2goKTtcbiAgICAgICAgICAgICAgICAgICAvL3dlYmdsLkZsdXNoKCk7XG5cbiAgICAgICAgICAgICAgIH0pLCAyMCk7XG4gICAgICAgICAgICBXaW5kb3cuQWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoQWN0aW9uKSgoKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzZWwgPSB3ZWJnbC5DYW52YXM7XG4gICAgICAgICAgICAgICAgc2VsLldpZHRoID0gc2VsLkNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIHNlbC5IZWlnaHQgPSBzZWwuQ2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHNlbC5XaWR0aCA9IHNlbC5DbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICBzZWwuSGVpZ2h0ID0gc2VsLkNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgICAgIGMud2lkdGggPSBzZWwuV2lkdGg7XG4gICAgICAgICAgICAgICAgYy5oZWlnaHQgPSBzZWwuSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGMuc3ByaXRlQmF0Y2hlci5tYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KG5ldyBmbG9hdFtde1xuICAgICAgICAgICAgICAgIDEuMGYgKiAyIC8gYy53aWR0aCwgMCwgMCwgMCwvL+WOu+aOiWFzcOeahOW9seWTjVxuICAgICAgICAgICAgICAgIDAsIDEuMGYgKiAtMSAqIDIgLyBjLmhlaWdodCwgMCwgMCxcbiAgICAgICAgICAgICAgICAwLCAwLCAxLCAwLFxuICAgICAgICAgICAgICAgIC0xLCAxLCAwLCAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLy8vZG8gcmVzaXplIGZ1bmNcbiAgICAgICAgICAgICAgICB1YS5vbnJlc2l6ZShjKTtcbiAgICAgICAgICAgIH0pKTtcblxuXG4gICAgICAgICAgICBlbC5Pbk1vdXNlTW92ZSA9IChldikgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1YS5vbnBvaW50ZXZlbnQoYywgY2FudmFzcG9pbnRldmVudC5QT0lOVF9NT1ZFLChmbG9hdCkgZXZbXCJvZmZzZXRYXCJdLCAoZmxvYXQpZXZbXCJvZmZzZXRZXCJdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlbC5Pbk1vdXNlVXAgPSAoIE1vdXNlRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+IGV2KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVhLm9ucG9pbnRldmVudChjLCBjYW52YXNwb2ludGV2ZW50LlBPSU5UX1VQLCAoZmxvYXQpZXZbXCJvZmZzZXRYXCJdLCAoZmxvYXQpZXZbXCJvZmZzZXRZXCJdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlbC5Pbk1vdXNlRG93biA9IChNb3VzZUV2ZW50PEhUTUxDYW52YXNFbGVtZW50PiBldikgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1YS5vbnBvaW50ZXZlbnQoYywgY2FudmFzcG9pbnRldmVudC5QT0lOVF9ET1dOLCAoZmxvYXQpZXZbXCJvZmZzZXRYXCJdLCAoZmxvYXQpZXZbXCJvZmZzZXRZXCJdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL3NjZW5lLm9uUG9pbnRlck9ic2VydmFibGUuYWRkKChwaW5mbzogQkFCWUxPTi5Qb2ludGVySW5mbywgc3RhdGU6IEJBQllMT04uRXZlbnRTdGF0ZSkgPT5cbiAgICAgICAgICAgIC8ve1xuICAgICAgICAgICAgLy8gICAgdmFyIHJhbmdlID0gc2NlbmUuZ2V0RW5naW5lKCkuZ2V0UmVuZGVyaW5nQ2FudmFzQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgLy8gICAgLy/ovpPlhaVcbiAgICAgICAgICAgIC8vICAgIHZhciBlOiBsaWdodHRvb2wuY2FudmFzcG9pbnRldmVudCA9IGxpZ2h0dG9vbC5jYW52YXNwb2ludGV2ZW50Lk5PTkU7XG4gICAgICAgICAgICAvLyAgICBpZiAocGluZm8udHlwZSA9PSBCQUJZTE9OLlBvaW50ZXJFdmVudFR5cGVzLlBPSU5URVJET1dOKVxuICAgICAgICAgICAgLy8gICAgICAgIGUgPSBsaWdodHRvb2wuY2FudmFzcG9pbnRldmVudC5QT0lOVF9ET1dOO1xuICAgICAgICAgICAgLy8gICAgaWYgKHBpbmZvLnR5cGUgPT0gQkFCWUxPTi5Qb2ludGVyRXZlbnRUeXBlcy5QT0lOVEVSTU9WRSlcbiAgICAgICAgICAgIC8vICAgICAgICBlID0gbGlnaHR0b29sLmNhbnZhc3BvaW50ZXZlbnQuUE9JTlRfTU9WRTtcbiAgICAgICAgICAgIC8vICAgIGlmIChwaW5mby50eXBlID09IEJBQllMT04uUG9pbnRlckV2ZW50VHlwZXMuUE9JTlRFUlVQKVxuICAgICAgICAgICAgLy8gICAgICAgIGUgPSBsaWdodHRvb2wuY2FudmFzcG9pbnRldmVudC5QT0lOVF9VUDtcblxuICAgICAgICAgICAgLy8gICAgLy/nvKnmlL7liLBjYW52YXMgc2l6ZVxuICAgICAgICAgICAgLy8gICAgdmFyIHggPSBwaW5mby5ldmVudC5vZmZzZXRYIC8gcmFuZ2Uud2lkdGggKiBjLndpZHRoO1xuICAgICAgICAgICAgLy8gICAgdmFyIHkgPSBwaW5mby5ldmVudC5vZmZzZXRZIC8gcmFuZ2UuaGVpZ2h0ICogYy5oZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vICAgIHZhciBza2lwOiBib29sZWFuID0gdWEub25wb2ludGV2ZW50KGMsIGUsIHgsIHkpO1xuICAgICAgICAgICAgLy8gICAgLy/lr7kgYmFieWxvbu+8jOadpeivtCAyZOWcqOi/memHjOi+k+WFpe+8jDNkIOimgSBwaWNrIOS7peWQjuWSr1xuXG4gICAgICAgICAgICAvLyAgICBzdGF0ZS5za2lwTmV4dE9ic2VydmVycyA9IHNraXA7Ly/mmK/lkKbkuK3mlq3kuovku7ZcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy8pO1xuXG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn0iLA0KICAgICJ1c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuV2ViR0w7XG4vL3YwLjZcbm5hbWVzcGFjZSBsaWdodHRvb2xcbntcbiAgICBwdWJsaWMgZW51bSBjYW52YXNwb2ludGV2ZW50XG4gICAge1xuICAgICAgICBOT05FLFxuICAgICAgICBQT0lOVF9ET1dOLFxuICAgICAgICBQT0lOVF9VUCxcbiAgICAgICAgUE9JTlRfTU9WRSxcbiAgICB9XG4gICAgcHVibGljIGludGVyZmFjZSBjYW52YXNBY3Rpb25cbiAgICB7XG4gICAgICAgIC8vcmVzaXplIOS6i+S7tlxuICAgICAgICB2b2lkIG9ucmVzaXplKHNwcml0ZUNhbnZhcyBjKTtcbiAgICAgICAgdm9pZCBvbmRyYXcoc3ByaXRlQ2FudmFzIGMpO1xuICAgICAgICBib29sIG9ucG9pbnRldmVudChzcHJpdGVDYW52YXMgYywgY2FudmFzcG9pbnRldmVudCBlLCBmbG9hdCB4LCBmbG9hdCB5ayk7XG4gICAgfVxuICAgIHB1YmxpYyBjbGFzcyBzcHJpdGVDYW52YXNcbiAgICB7XG4gICAgICAgIHB1YmxpYyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgd2ViZ2w7XG4gICAgICAgIC8vcGFuZWwgc2l6ZVxuICAgICAgICBwdWJsaWMgZmxvYXQgd2lkdGg7XG4gICAgICAgIHB1YmxpYyBmbG9hdCBoZWlnaHQ7XG4gICAgICAgIHB1YmxpYyBzcHJpdGVDYW52YXMoV2ViR0xSZW5kZXJpbmdDb250ZXh0IHdlYmdsLCBmbG9hdCB3aWR0aCwgZmxvYXQgaGVpZ2h0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLndlYmdsID0gd2ViZ2w7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmF0Y2hlciA9IG5ldyBzcHJpdGVCYXRjaGVyKHdlYmdsLCBsaWdodHRvb2wuc2hhZGVyTWdyLnBhcnNlckluc3RhbmNlKCkpOy8vbmVzc1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzcHJpdGVCYXRjaGVyIHNwcml0ZUJhdGNoZXI7XG5cbiAgICAgICAgLy9kcmF3IHRvb2xzXG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdUZXh0dXJlKHNwcml0ZVRleHR1cmUgdGV4dHVyZSwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVSZWN0IHV2cmVjdCAsIHNwcml0ZUNvbG9yIGNvbG9yID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgLy9pZiAodXZyZWN0ID09IG51bGwpXG4gICAgICAgICAgICAvLyAgICB1dnJlY3QgPSBzcHJpdGVSZWN0Lm9uZTtcbiAgICAgICAgICAgIGlmIChjb2xvciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICB0ZXh0dXJlLmRyYXcodGhpcy5zcHJpdGVCYXRjaGVyLCB1dnJlY3QsIHJlY3QsIGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBkcmF3VGV4dHVyZUN1c3RvbShzcHJpdGVUZXh0dXJlIHRleHR1cmUsIHNwcml0ZU1hdCBfbWF0LCBzcHJpdGVSZWN0IHJlY3QsIHNwcml0ZVJlY3QgdXZyZWN0ICwgc3ByaXRlQ29sb3IgY29sb3IgPSBudWxsLCBzcHJpdGVDb2xvciBjb2xvcjIgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICAvL2lmICh1dnJlY3QgPT0gbnVsbClcbiAgICAgICAgICAgIC8vICAgIHV2cmVjdCA9IHNwcml0ZVJlY3Qub25lO1xuICAgICAgICAgICAgaWYgKGNvbG9yID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIGlmIChjb2xvcjIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb2xvcjIgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIHRleHR1cmUuZHJhd0N1c3RvbSh0aGlzLnNwcml0ZUJhdGNoZXIsIF9tYXQsIHV2cmVjdCwgcmVjdCwgY29sb3IsIGNvbG9yMik7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgZHJhd1Nwcml0ZShzdHJpbmcgYXRsYXMsIHN0cmluZyBzcHJpdGUsIHNwcml0ZVJlY3QgcmVjdCwgc3ByaXRlQ29sb3IgY29sb3IgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoY29sb3IgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb2xvciA9IHNwcml0ZUNvbG9yLndoaXRlO1xuXG4gICAgICAgICAgICB2YXIgYSA9IGF0bGFzTWdyLkluc3RhbmNlKCkubG9hZCh0aGlzLndlYmdsLCBhdGxhcyk7XG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgciA9IGEuc3ByaXRlc1tzcHJpdGVdO1xuICAgICAgICAgICAgaWYgKHIgPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGEudGV4dHVyZSA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgci5Ub1JlY3QoKSwgcmVjdCwgY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB2b2lkIGRyYXdTcHJpdGVDdXN0b20oc3RyaW5nIGF0bGFzLCBzdHJpbmcgc3ByaXRlLCBzcHJpdGVNYXQgX21hdCwgc3ByaXRlUmVjdCByZWN0LCBzcHJpdGVDb2xvciBjb2xvciA9IG51bGwsIHNwcml0ZUNvbG9yIGNvbG9yMiA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjb2xvciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICBpZiAoY29sb3IyID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IyID0gc3ByaXRlQ29sb3Iud2hpdGU7XG4gICAgICAgICAgICB2YXIgYSA9IGF0bGFzTWdyLkluc3RhbmNlKCkubG9hZCh0aGlzLndlYmdsLCBhdGxhcyk7XG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgciA9IGEuc3ByaXRlc1tzcHJpdGVdO1xuICAgICAgICAgICAgaWYgKHIgPT0gU2NyaXB0LlVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGEudGV4dHVyZSA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgci5Ub1JlY3QoKSwgcmVjdCwgY29sb3IsIGNvbG9yMik7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHZvaWQgZHJhd1Nwcml0ZTkoc3RyaW5nIGF0bGFzLCBzdHJpbmcgc3ByaXRlLCBzcHJpdGVSZWN0IHJlY3QsIHNwcml0ZUJvcmRlciBib3JkZXIsIHNwcml0ZUNvbG9yIGNvbG9yID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGNvbG9yID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIHZhciBhID0gYXRsYXNNZ3IuSW5zdGFuY2UoKS5sb2FkKHRoaXMud2ViZ2wsIGF0bGFzKTtcbiAgICAgICAgICAgIGlmIChhID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBfciA9IGEuc3ByaXRlc1tzcHJpdGVdO1xuICAgICAgICAgICAgaWYgKF9yID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGwgPSAoYm9yZGVyLmwgLSAxKSAvIGEudGV4dHVyZXdpZHRoO1xuICAgICAgICAgICAgdmFyIHIgPSAoYm9yZGVyLnIgLSAxKSAvIGEudGV4dHVyZXdpZHRoO1xuICAgICAgICAgICAgdmFyIHQgPSAoYm9yZGVyLnQgLSAxKSAvIGEudGV4dHVyZWhlaWdodDtcbiAgICAgICAgICAgIHZhciBiID0gKGJvcmRlci5iIC0gMSkgLyBhLnRleHR1cmVoZWlnaHQ7XG4gICAgICAgICAgICAvL2xlZnQgdG9wXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gdDtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54O1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55O1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIudDtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yKTtcblxuICAgICAgICAgICAgLy90b3BcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IF9yLncgLSByIC0gbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSB0O1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueTtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IHJlY3QudyAtIGJvcmRlci5yIC0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIudDtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yKTtcbiAgICAgICAgICAgIC8vcmlnaHQgdG9wXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueCArIF9yLncgLSByO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLnk7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSB0O1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyByZWN0LncgLSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueTtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gYm9yZGVyLnQ7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvcik7XG4gICAgICAgICAgICAvL2xlZnRcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLnkgKyB0O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gX3IuaCAtIHQgLSBiO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0Lng7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0LnkgKyBib3JkZXIudDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gcmVjdC5oIC0gYm9yZGVyLnQgLSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yKTtcbiAgICAgICAgICAgIC8vY2VudGVyXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueCArIGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueSArIHQ7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gX3IudyAtIHIgLSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IF9yLmggLSB0IC0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0LnkgKyBib3JkZXIudDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IHJlY3QudyAtIGJvcmRlci5yIC0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSByZWN0LmggLSBib3JkZXIudCAtIGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXcodGhpcy5zcHJpdGVCYXRjaGVyLCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IpO1xuICAgICAgICAgICAgLy9yaWdodFxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLnggKyBfci53IC0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55ICsgdDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSByO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IF9yLmggLSB0IC0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgcmVjdC53IC0gYm9yZGVyLnI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0LnkgKyBib3JkZXIudDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gcmVjdC5oIC0gYm9yZGVyLnQgLSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yKTtcblxuICAgICAgICAgICAgLy9sZWZ0IGJvdHRvbVxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLng7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IuaCArIF9yLnkgLSBiO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54O1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgcmVjdC5oIC0gYm9yZGVyLmI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXcodGhpcy5zcHJpdGVCYXRjaGVyLCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IpO1xuICAgICAgICAgICAgLy9ib3R0b21cbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci5oICsgX3IueSAtIGI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gX3IudyAtIHIgLSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IGI7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgcmVjdC5oIC0gYm9yZGVyLmI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSByZWN0LncgLSBib3JkZXIuciAtIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvcik7XG4gICAgICAgICAgICAvL3JpZ2h0IGJvdHRvbVxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLnggKyBfci53IC0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci5oICsgX3IueSAtIGI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSBiO1xuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgcmVjdC53IC0gYm9yZGVyLnI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0LnkgKyByZWN0LmggLSBib3JkZXIuYjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhdyh0aGlzLnNwcml0ZUJhdGNoZXIsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvcik7XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdm9pZCBkcmF3U3ByaXRlOUN1c3RvbShzdHJpbmcgYXRsYXMsIHN0cmluZyBzcHJpdGUsIHNwcml0ZU1hdCBfbWF0LCBzcHJpdGVSZWN0IHJlY3QsIHNwcml0ZUJvcmRlciBib3JkZXIsIHNwcml0ZUNvbG9yIGNvbG9yID0gbnVsbCwgc3ByaXRlQ29sb3IgY29sb3IyID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGNvbG9yID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIGlmIChjb2xvcjIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb2xvcjIgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIHZhciBhID0gYXRsYXNNZ3IuSW5zdGFuY2UoKS5sb2FkKHRoaXMud2ViZ2wsIGF0bGFzKTtcbiAgICAgICAgICAgIGlmIChhID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBfciA9IGEuc3ByaXRlc1tzcHJpdGVdO1xuICAgICAgICAgICAgaWYgKF9yID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGwgPSAoYm9yZGVyLmwgLSAxKSAvIGEudGV4dHVyZXdpZHRoO1xuICAgICAgICAgICAgdmFyIHIgPSAoYm9yZGVyLnIgLSAxKSAvIGEudGV4dHVyZXdpZHRoO1xuICAgICAgICAgICAgdmFyIHQgPSAoYm9yZGVyLnQgLSAxKSAvIGEudGV4dHVyZWhlaWdodDtcbiAgICAgICAgICAgIHZhciBiID0gKGJvcmRlci5iIC0gMSkgLyBhLnRleHR1cmVoZWlnaHQ7XG4gICAgICAgICAgICAvL2xlZnQgdG9wXG4gICAgICAgICAgICB0aGlzLnV2cmVjdC54ID0gX3IueDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gdDtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54O1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55O1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIudDtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuXG4gICAgICAgICAgICAvL3RvcFxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLnggKyBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLnk7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gX3IudyAtIHIgLSBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QuaCA9IHQ7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55O1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gcmVjdC53IC0gYm9yZGVyLnIgLSBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci50O1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXdDdXN0b20odGhpcy5zcHJpdGVCYXRjaGVyLCBfbWF0LCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IsIGNvbG9yMik7XG4gICAgICAgICAgICAvL3JpZ2h0IHRvcFxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLnggKyBfci53IC0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gdDtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgcmVjdC53IC0gYm9yZGVyLnI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0Lnk7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci50O1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXdDdXN0b20odGhpcy5zcHJpdGVCYXRjaGVyLCBfbWF0LCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IsIGNvbG9yMik7XG4gICAgICAgICAgICAvL2xlZnRcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLnkgKyB0O1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gX3IuaCAtIHQgLSBiO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0Lng7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0LnkgKyBib3JkZXIudDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IGJvcmRlci5sO1xuICAgICAgICAgICAgdGhpcy50cmVjdC5oID0gcmVjdC5oIC0gYm9yZGVyLnQgLSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICAgICAgLy9jZW50ZXJcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgbDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnkgPSBfci55ICsgdDtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBfci53IC0gciAtIGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gX3IuaCAtIHQgLSBiO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWN0LnggPSByZWN0LnggKyBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueSArIGJvcmRlci50O1xuICAgICAgICAgICAgdGhpcy50cmVjdC53ID0gcmVjdC53IC0gYm9yZGVyLnIgLSBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IHJlY3QuaCAtIGJvcmRlci50IC0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhd0N1c3RvbSh0aGlzLnNwcml0ZUJhdGNoZXIsIF9tYXQsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvciwgY29sb3IyKTtcbiAgICAgICAgICAgIC8vcmlnaHRcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgX3IudyAtIHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IueSArIHQ7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC53ID0gcjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LmggPSBfci5oIC0gdCAtIGI7XG5cbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIHJlY3QudyAtIGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgYm9yZGVyLnQ7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IHJlY3QuaCAtIGJvcmRlci50IC0gYm9yZGVyLmI7XG4gICAgICAgICAgICBhLnRleHR1cmUuZHJhd0N1c3RvbSh0aGlzLnNwcml0ZUJhdGNoZXIsIF9tYXQsIHRoaXMudXZyZWN0LCB0aGlzLnRyZWN0LCBjb2xvciwgY29sb3IyKTtcblxuICAgICAgICAgICAgLy9sZWZ0IGJvdHRvbVxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLng7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IuaCArIF9yLnkgLSBiO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54O1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgcmVjdC5oIC0gYm9yZGVyLmI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIubDtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXdDdXN0b20odGhpcy5zcHJpdGVCYXRjaGVyLCBfbWF0LCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IsIGNvbG9yMik7XG4gICAgICAgICAgICAvL2JvdHRvbVxuICAgICAgICAgICAgdGhpcy51dnJlY3QueCA9IF9yLnggKyBsO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QueSA9IF9yLmggKyBfci55IC0gYjtcbiAgICAgICAgICAgIHRoaXMudXZyZWN0LncgPSBfci53IC0gciAtIGw7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gYjtcblxuICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LnkgPSByZWN0LnkgKyByZWN0LmggLSBib3JkZXIuYjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QudyA9IHJlY3QudyAtIGJvcmRlci5yIC0gYm9yZGVyLmw7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LmggPSBib3JkZXIuYjtcbiAgICAgICAgICAgIGEudGV4dHVyZS5kcmF3Q3VzdG9tKHRoaXMuc3ByaXRlQmF0Y2hlciwgX21hdCwgdGhpcy51dnJlY3QsIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICAgICAgLy9yaWdodCBib3R0b21cbiAgICAgICAgICAgIHRoaXMudXZyZWN0LnggPSBfci54ICsgX3IudyAtIHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC55ID0gX3IuaCArIF9yLnkgLSBiO1xuICAgICAgICAgICAgdGhpcy51dnJlY3QudyA9IHI7XG4gICAgICAgICAgICB0aGlzLnV2cmVjdC5oID0gYjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QueCA9IHJlY3QueCArIHJlY3QudyAtIGJvcmRlci5yO1xuICAgICAgICAgICAgdGhpcy50cmVjdC55ID0gcmVjdC55ICsgcmVjdC5oIC0gYm9yZGVyLmI7XG4gICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBib3JkZXIucjtcbiAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IGJvcmRlci5iO1xuICAgICAgICAgICAgYS50ZXh0dXJlLmRyYXdDdXN0b20odGhpcy5zcHJpdGVCYXRjaGVyLCBfbWF0LCB0aGlzLnV2cmVjdCwgdGhpcy50cmVjdCwgY29sb3IsIGNvbG9yMik7XG5cbiAgICAgICAgfVxuICAgICAgICBzcHJpdGVSZWN0IHV2cmVjdCA9IG5ldyBzcHJpdGVSZWN0KCk7XG5cbiAgICAgICAgc3ByaXRlUmVjdCB0cmVjdCA9IG5ldyBzcHJpdGVSZWN0KCk7Ly9uZXNzXG5cbiAgICAgICAgLy/nu5jliLblrZfkvZPvvIzlj6rnlLvkuIDooYzvvIzlrZfkvZPmsr/nnYDlt6bkuIrop5Llr7npvZDvvIzlpoLpnIDlhbbku5bvvIzlj4LogIPmupDnoIHoh6rliLZcbiAgICAgICAgcHVibGljIHZvaWQgZHJhd1RleHQoc3RyaW5nIGZvbnQgLCBzdHJpbmcgdGV4dCAsIHNwcml0ZVJlY3QgcmVjdCAsIHNwcml0ZUNvbG9yIGNvbG9yID0gbnVsbCwgc3ByaXRlQ29sb3IgY29sb3IyID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGNvbG9yID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29sb3IgPSBzcHJpdGVDb2xvci53aGl0ZTtcbiAgICAgICAgICAgIGlmIChjb2xvcjIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb2xvcjIgPSBzcHJpdGVDb2xvci5ibGFjaztcbiAgICAgICAgICAgIHZhciBmID0gZm9udE1nci5JbnN0YW5jZSgpLmxvYWQodGhpcy53ZWJnbCwgZm9udCk7XG4gICAgICAgICAgICBpZiAoZiA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoZi5jbWFwID09IFNjcmlwdC5VbmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgICAgIGZsb2F0IHhhZGQgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lkxlbmd0aDsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBjID0gdGV4dC5DaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgdmFyIGNpbmZvID0gZi5jbWFwW2NdIGFzIGNoYXJpbmZvO1xuICAgICAgICAgICAgICAgIGlmIChjaW5mbyA9PSBTY3JpcHQuVW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzID0gcmVjdC5oIC8gZi5saW5lSGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmVjdC54ID0gcmVjdC54ICsgeGFkZCArIGNpbmZvLnhPZmZzZXQgKiBzOy8veGFkZCDmqKrnp7vvvIxjaW5mby54T2Zmc2V0ICogcyDlgY/np7tcblxuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QueSA9IHJlY3QueSAtIGNpbmZvLnlPZmZzZXQgKiBzICsgZi5iYXNlbGluZSAqIHM7XG4gICAgICAgICAgICAgICAgLy9jaW5mby55T2Zmc2V0ICogcyDlgY/np7tcbiAgICAgICAgICAgICAgICAvL2YuYmFzZWxpbmUgKiBz5a2X5L2T5Z+657q/77yM5LiN566h5a2X5L2T5Z+657q/5a2X5L2T55qE6Zu26Zu254K55Zyo5a2X5L2T5bem5LiL6KeS77yM546w5Zyo6ZyA6KaB5bem5LiK6ISa77yM6ZyA6KaB5YW25LuW5a+56b2Q5pa55byP5Y+m6K+0XG5cblxuICAgICAgICAgICAgICAgIHRoaXMudHJlY3QuaCA9IHMgKiBjaW5mby55U2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWN0LncgPSBzICogY2luZm8ueFNpemU7XG5cbiAgICAgICAgICAgICAgICB4YWRkICs9IChjaW5mby54QWRkdmFuY2UgKiBzKTtcbiAgICAgICAgICAgICAgICBpZiAoeGFkZCA+PSByZWN0LncpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOy8v6LaF5Ye657uY5Yi26ZmQ5a6a5qGG77yM5LiN55S75LqGXG4gICAgICAgICAgICAgICAgZi5kcmF3KHRoaXMuc3ByaXRlQmF0Y2hlciwgY2luZm8sIHRoaXMudHJlY3QsIGNvbG9yLCBjb2xvcjIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59Ig0KICBdDQp9
