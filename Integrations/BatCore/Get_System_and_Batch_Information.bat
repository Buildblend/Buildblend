:: Buildblend BatCore
:: Get_System_and_Batch_Information.bat
:: Retrieves information of the system and the current MSDOS.

@echo off
TITLE Buildblend - Get System and Batch Information
TYPE Buildblend!
echo.
echo BatCore Get System and Batch Information
echo.
echo System Information:
SYSTEMINFO
echo Current Disk Volume:
VOL
echo.
echo Batch Version:
VER
echo.
echo.
echo System Date and Time: %DATE%, %TIME%
echo.
echo.
echo.
pause