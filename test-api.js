// Script de test pour l'API de contact
const testData = {
  typeMarchandise: 'palettes',
  quantite: '5 palettes',
  chargementCodePostal: '75001',
  chargementDate: '2024-12-20',
  livraisonCodePostal: '75002',
  livraisonDate: '2024-12-21',
  nom: 'Test User',
  email: 'test@example.com',
  telephone: '0123456789',
  transportRegulier: 'non',
  informationsComplementaires: 'Test de l\'API'
}

async function testAPI() {
  try {
    console.log('Envoi des données de test:', JSON.stringify(testData, null, 2))
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const data = await response.json()
    
    console.log('Status:', response.status)
    console.log('Response:', data)
    
    if (!response.ok) {
      console.error('Erreur API:', data)
    }
  } catch (error) {
    console.error('Erreur lors du test:', error)
  }
}

testAPI() 