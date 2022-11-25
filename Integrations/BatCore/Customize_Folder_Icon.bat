:: Buildblend BatCore
:: Customize_Folder_Icon.bat
:: Customize any folder's icon.

@echo off
color 5
TITLE Buildblend - Folder Icon Customizer
TYPE Buildblend!
echo.
echo BatCore Folder Icon Customizer
echo.
echo "Select a method." 
echo "A: Provide a folder path."
echo "B: Use current folder this Batch file is in."
echo "C: Cancel"
choice /c ABC /m "Press A, B, or C on your keyboard to select." /n
IF ERRORLEVEL 1 GOTO :provideFolderPath

:provideFolderPath
echo Coming Soon...
pause
GOTO :end
:end
color 2
echo Folder icon has been successfully customized!
echo Press any key to exit...
pause >nul
echo Exiting...