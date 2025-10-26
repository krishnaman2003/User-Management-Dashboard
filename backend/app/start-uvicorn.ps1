# start-uvicorn.ps1 - run as Admin
$entries = netstat -a -n -o | findstr :8000
if ($entries) {
  Write-Host "Found processes using port 8000. Killing them..."
  forEach ($line in $entries) {
    $cols = $line -split '\s+' | Where-Object { $_ -ne "" }
    $procId = $cols[-1]
    try {
      taskkill /F /PID $procId /T | Out-Null
      Write-Host "Killed PID $procId"
    } catch {
      Write-Host "Failed to kill PID $procId (insufficient permissions or already stopped)"
    }
  }
  Start-Sleep -Milliseconds 400
} else {
  Write-Host "No process found on port 8000"
}
uvicorn app.main:app --reload --port 8000