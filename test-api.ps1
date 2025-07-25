# Script PowerShell pour tester l'API de contact
$testData = @{
    typeMarchandise = "palettes"
    quantite = "5 palettes"
    chargementCodePostal = "75001"
    chargementDate = "2025-02-20"
    livraisonCodePostal = "75002"
    livraisonDate = "2025-02-21"
    nom = "Test User"
    email = "test@example.com"
    telephone = "0123456789"
    transportRegulier = "non"
    informationsComplementaires = "Test de l'API"
}

$jsonData = $testData | ConvertTo-Json

Write-Host "Envoi des données de test:"
Write-Host $jsonData

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/contact" -Method POST -Body $jsonData -ContentType "application/json"
    Write-Host "Succès! Réponse:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 10)
} catch {
    Write-Host "Erreur:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Corps de la réponse:" -ForegroundColor Yellow
        Write-Host $responseBody
    }
} 