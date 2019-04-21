using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;

namespace bridgeweb.http
{
    public class http_tool
    {
        public static string Hex2Str(byte[] data)
        {
            string strout = "";
            for(var i=0;i<data.Length;i++)
            {
                strout += data[i].ToString("X02");
            }
            return strout;
        }
        public async static System.Threading.Tasks.Task<string> httpPost(string url,string username,string token,File file)
        {
            Bridge.Html5.XMLHttpRequest _http = new XMLHttpRequest();
            _http.Open("post", url, true);
            string returnv = "";
            _http.OnReadyStateChange = () =>
            {
                if (_http.ReadyState == AjaxReadyState.Done)
                {
                    returnv = _http.ResponseText;
                }
            };
            FormData formdata = new FormData();
            formdata.Append(file.Name, file);
            formdata.Append("user", username);
            formdata.Append("token", token);
            _http.Send(formdata);
            while (_http.ReadyState != AjaxReadyState.Done)
            {
                await System.Threading.Tasks.Task.Delay(100);
            }
            return returnv;
        }
        public async static System.Threading.Tasks.Task<string> httpGet(string url)
        {
            Bridge.Html5.XMLHttpRequest _http = new XMLHttpRequest();
            _http.Open("get", url, true);

            string returnv = "";
            _http.OnReadyStateChange = () =>
            {
                if (_http.ReadyState == AjaxReadyState.Done)
                {
                    returnv = _http.ResponseText;
                }
            };
            _http.Send();
            while (_http.ReadyState != AjaxReadyState.Done)
            {
                await System.Threading.Tasks.Task.Delay(100);
            }
            return returnv;
        }
        public async static System.Threading.Tasks.Task<string> httpJsonRPC(string url,string method,Object JsonArray)
        {
            var _url = url+ "?jsonrpc=2.0&id=1&method="+method +"&params=" + JSON.Stringify(JsonArray);
            return await httpGet(_url);
        }
    }
}