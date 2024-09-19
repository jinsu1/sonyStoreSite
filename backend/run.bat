@ECHO off
CLS

json-server --watch .\data_01.json --port 3001 --static .\public

pause