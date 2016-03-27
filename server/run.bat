@ECHO off

tasklist /FI "IMAGENAME eq eclipse.exe" 2>NUL | find /I /N "eclipse.exe" >NUL
if not "%ERRORLEVEL%"=="0" start "Eclipse" /B "C:\eclipse\standard-latest-released\eclipse\eclipse.exe" -data C:\Development && @ECHO Started Eclipse, waiting 5s ... && ping -n 5 127.0.0.1 >nul

tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe" >NUL
if not "%ERRORLEVEL%"=="0" start "MongoDB" /I "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" && @ECHO Started MongoDB, waiting 5s ... && ping -n 5 127.0.0.1 >nul

tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe" >NUL
if not "%ERRORLEVEL%"=="0" @ECHO Starting TradeJS ... && cd C:\Development\TradeJS\WebContent\server && node-debug --save-live-edit server.js

