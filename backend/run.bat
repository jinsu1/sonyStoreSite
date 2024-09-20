@ECHO off
CLS

json-server --watch .\data.json --port 3001 --static .\public

pause