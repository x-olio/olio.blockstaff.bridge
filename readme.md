# bridge.net olio 版本说明

0.需要使用vs2017 或者 vs2019

1.需要安装dotnetcore 3.0

安装dotnetcore 3.0 sdk 略，

打开 dotnetcore3.0 方法，vs工具-》选项-》项目和解决方案-》dotnet core-》使用dotnetcore sdk预览版


1.remaptool

因为bridge.net 在map文件的生成时没有考虑相对路径的问题，用vs直接下断点调试定位步到源码，需要通过remaptool工具修改map文件

该文件配置为 bridgeweb的 postbuild 命令行，具体可查阅。

使用dotnet core 3.0 编译

安装dotnetcore 3.0 sdk 略，

打开 dotnetcore3.0 方法，vs工具-》选项-》项目和解决方案-》dotnet core-》使用dotnetcore sdk预览版

2.bridgeweb

web项目，包含app.cs,编译为js使用.
包含启动html
包含网页用资源

3.libGraph

图形相关类库，编译为js使用
