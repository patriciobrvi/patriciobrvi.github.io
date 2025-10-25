# Mostra un popup senzill compatible amb PowerShell v1/v2
$wshell = New-Object -ComObject WScript.Shell
$wshell.Popup("Intenta de nou", 0, "Missatge", 0)

# Obté el camí complet del propi script
$scriptPath = $MyInvocation.MyCommand.Path

# Pausa breu per assegurar-se que el popup s'ha tancat
Start-Sleep -Seconds 1

# Esborra el propi fitxer
Remove-Item -Path $scriptPath -Force
