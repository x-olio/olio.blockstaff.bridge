using System;
using System.Collections.Generic;

namespace remaptool
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("js remap tool.");
            var slnpath = args[0];
            var projname = args[1];

            //find all csproj
            Dictionary<string, string> projnames = new Dictionary<string, string>();

            var allproj = System.IO.Directory.GetFiles(slnpath, "*.csproj", System.IO.SearchOption.AllDirectories);
            foreach (var proj in allproj)
            {
                var name = System.IO.Path.GetFileNameWithoutExtension(proj).ToLower();
                Console.WriteLine("projectname=" + name);
                projnames.Add(name, proj);
            }

            //find need fixed js
            List<string> fixedjs = new List<string>();
            var alljs = System.IO.Directory.GetFiles(System.IO.Path.Combine(slnpath, projname), "*.js", System.IO.SearchOption.AllDirectories);
            foreach (var file in alljs)
            {
                var name = System.IO.Path.GetFileNameWithoutExtension(file).ToLower();
                if (projnames.ContainsKey(name))
                {
                    Console.WriteLine("need fixed js=" + file);
                    fixedjs.Add(file);
                }
            }

            foreach (var js in fixedjs)
            {
                var name = System.IO.Path.GetFileNameWithoutExtension(js).ToLower();
                var projpath = projnames[name];
                Fixed(js, projpath);
            }
        }
        static void Fixed(string jspath, string csprojpath)
        {
            Console.WriteLine("==fix==" + jspath);
            var allstrs = System.IO.File.ReadAllLines(jspath);
            var lastline = allstrs[allstrs.Length - 1];

            //Console.WriteLine("lastline=" + lastline);

            string head = "//# sourceMappingURL=data:application/json;base64,";
            if (lastline.IndexOf(head) == 0)
            {
                var basesrc = lastline.Substring(head.Length);
                byte[] data = Convert.FromBase64String(basesrc);
                string srcjson = System.Text.Encoding.UTF8.GetString(data);
                var json = Newtonsoft.Json.Linq.JObject.Parse(srcjson);
                var srcs = json["sources"] as Newtonsoft.Json.Linq.JArray;

                var projname = System.IO.Path.GetFileNameWithoutExtension(jspath).ToLower();

                var jssrcpath = System.IO.Path.GetDirectoryName(jspath);
                var cssrcpath = System.IO.Path.GetDirectoryName(csprojpath);
                var changepath = System.IO.Path.GetRelativePath(jssrcpath, cssrcpath);
                //Console.WriteLine("jssrcpath =" + jssrcpath);
                //Console.WriteLine("srcproj =" + cssrcpath);
                //Console.WriteLine("changepath =" + changepath);
                
                for (var i = 0; i < srcs.Count; i++)
                {
                    var src = srcs[i].ToString();
                    var targetath = System.IO.Path.Combine(changepath, src);
                    targetath = targetath.Replace('\\', '/');
                    Console.WriteLine("srcfile =" + src + "=>" + targetath);
                    srcs[i] = targetath;
                }

                //fill lastline
                var jsondata = System.Text.Encoding.UTF8.GetBytes(json.ToString());
                allstrs[allstrs.Length - 1] = head + Convert.ToBase64String(jsondata);
                System.IO.File.WriteAllLines(jspath, allstrs, System.Text.Encoding.UTF8);
                Console.WriteLine("refix js path");
            }

        }
    }
}
