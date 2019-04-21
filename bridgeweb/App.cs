using Bridge;
using Bridge.WebGL;
using Bridge.Html5;
using Newtonsoft.Json;
using System;
using lighttool;
using System.Collections.Generic;

namespace bridgeweb
{
    public class App
    {
        static HTMLDivElement divMenu;
        public static void Main()
        {
            Bridge.Html5.Console.Info("hih");
            Bridge.Html5.Console.Info("bridge.blockstaff.menu");

            //init body
            Document.Body.Style.Overflow = "hidden";
            Document.Body.Style.Margin = "0px";

            InitMenuUI();
            //init divMenu



            AddMenu("canvastest", app_canvastest.Init);
            AddMenu("blockstaff.server.test", app_blockserver.Init);

        }
        static void InitMenuUI()
        {
            divMenu = Document.CreateElement<HTMLDivElement>("div");
            divMenu.Style.Position = "absolute";
            divMenu.Style.Top = "0px";
            Document.Body.AppendChild(divMenu);
        }
        static void AddMenu(string text,Action initfunc)
        {
            var btn = Document.CreateElement<HTMLButtonElement>("button");
            btn.TextContent = text;
            divMenu.AppendChild(btn);
            var hr = Document.CreateElement<HTMLBRElement>("br");
            divMenu.AppendChild(hr);
            btn.OnClick = (e) =>
            {
                DestroyMenuUI();
                initfunc();
            };
        }
        static void DestroyMenuUI()
        {
            Document.Body.RemoveChild(divMenu);
        }

    }
}