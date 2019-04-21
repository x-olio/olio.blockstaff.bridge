using System;
using System.Collections.Generic;
using System.Linq;
using Bridge.Html5;
using Bridge.WebGL;

namespace bridgeweb
{
    public class app_blockserver
    {
        public static void Init()
        {
            server = new app_blockserver();

            server.InitHTML();

        }
        static HTMLInputElement AddInputBox(HTMLDivElement div, string title, string deftext)
        {
            var usernametitle = Document.CreateElement<HTMLSpanElement>("span");
            usernametitle.TextContent = title;
            div.AppendChild(usernametitle);
            var username = Document.CreateElement<HTMLInputElement>("input");
            username.Type = InputType.Text;
            username.Value = deftext;
            div.AppendChild(username);
            var br = Document.CreateElement<HTMLBRElement>("br");
            div.AppendChild(br);
            return username;
        }
        static HTMLInputElement AddPasswordBox(HTMLDivElement div, string title, string deftext)
        {
            var usernametitle = Document.CreateElement<HTMLSpanElement>("span");
            usernametitle.TextContent = title;
            div.AppendChild(usernametitle);
            var username = Document.CreateElement<HTMLInputElement>("input");
            username.Type = InputType.Password;
            username.Value = deftext;
            div.AppendChild(username);
            var br = Document.CreateElement<HTMLBRElement>("br");
            div.AppendChild(br);
            return username;
        }
        static HTMLInputElement AddFile(HTMLDivElement div, string title)
        {

            var usernametitle = Document.CreateElement<HTMLSpanElement>("span");
            usernametitle.TextContent = title;
            div.AppendChild(usernametitle);
            var username = Document.CreateElement<HTMLInputElement>("input");
            username.Type = InputType.File;
            div.AppendChild(username);
            var br = Document.CreateElement<HTMLBRElement>("br");
            div.AppendChild(br);
            return username;
        }
        static void AddHR(HTMLDivElement div)
        {
            HTMLHRElement hr = Document.CreateElement<HTMLHRElement>("hr");
            div.AppendChild(hr);
        }
        static HTMLButtonElement AddButton(HTMLDivElement div, string title)
        {
            var btn = Document.CreateElement<HTMLButtonElement>("button");
            btn.TextContent = title;
            div.AppendChild(btn);
            var br = Document.CreateElement<HTMLBRElement>("br");
            div.AppendChild(br);

            return btn;

        }
        static HTMLTextAreaElement AddTextArea(HTMLDivElement div, int width, int height)
        {
            var outputList = Document.CreateElement<HTMLTextAreaElement>("textarea");
            outputList.Style.Width = width + "px";
            outputList.Style.Height = height + "px";
            div.AppendChild(outputList);
            var br = Document.CreateElement<HTMLBRElement>("br");
            div.AppendChild(br);
            return outputList;
        }
        static app_blockserver server;

        HTMLTextAreaElement outputList;
        string loginuser = null;
        string logintoken = null;
        void InitHTML()
        {
            var div = Document.CreateElement<HTMLDivElement>("div");
            div.Style.Width = "100%";
            div.Style.Height = "100%";
            div.Style.Position = "absolute";
            div.Style.Overflow = "hidden";
            Document.Body.AppendChild(div);

            var username = AddInputBox(div, "username", "abc");
            var password = AddPasswordBox(div, "password", "00");
            var btnlogin = AddButton(div, "login");
            AddHR(div);

            this.outputList = AddTextArea(div, 800, 300);

            btnlogin.OnClick = async (e) =>
            {
                outputList.TextContent += "good day" + "\n";
                string[] myparams = new string[] { username.Value, password.Value };
                var result = await http.http_tool.httpJsonRPC("http://127.0.0.1/rpc", "user_login", myparams);
                var jsonresult = JSON.Parse(result);
                if (jsonresult["result"]["result"].As<bool>() == true)
                {
                    var token = jsonresult["result"]["token"].As<string>();
                    AddOutput("login token=" + token);
                    logintoken = token;
                    loginuser = username.Value;
                }
                else
                {
                    AddOutput("login fail");
                    loginuser = null;
                    logintoken = null;
                }

            };


            var file = AddFile(div, "upload a file.");
            file.OnChange = (e) =>
              {
                  AddOutput("size=" + file.Files[0].Size);
              };


            var btnupload = AddButton(div, "upload file");
            btnupload.OnClick = async (e) =>
            {
                var _file = file.Files[0];

                var size = _file.Size;
                AddOutput("size=" + size);
                var filestream = await _file.GetFileStreamAsync();
                byte[] buf = new byte[size];
                filestream.Read(buf, 0, buf.Length);

                string result = await http.http_tool.httpPost("http://127.0.0.1/uploadraw", "abc", logintoken, _file);
                AddOutput("result=" + result);
            };
        }

        void AddOutput(string txt)
        {
            outputList.TextContent += txt + "\n";
        }
    }
}