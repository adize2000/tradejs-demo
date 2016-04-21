@ECHO off

tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe" >NUL
if not "%ERRORLEVEL%"=="0" start "MongoDB" /I "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" && @ECHO Started MongoDB, waiting 5s ... && rem ping -n 5 127.0.0.1 >nul

start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --new-window "http://localhost:3000/#/price"

start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --new-window "http://localhost:3000/#/feeder"

tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe" >NUL
if not "%ERRORLEVEL%"=="0" @ECHO Starting TradeJS ... && cd C:\Development\TradeJS\server && node server.js && rem node-debug --save-live-edit server.js
