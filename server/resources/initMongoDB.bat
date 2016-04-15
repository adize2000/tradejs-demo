@ECHO off
rem "C:\Program Files\MongoDB\Server\3.2\bin\mongo.exe" %CD%\initMongoData.js
rem "C:\Program Files\MongoDB\Server\3.2\bin\mongo.exe" %CD%\initCompanyMongoData.js
"C:\Program Files\MongoDB\Server\3.2\bin\mongo.exe" %CD%\initShareMongoData.js

ECHO -
ECHO Your data is loaded
pause