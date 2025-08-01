import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  nom: string
  email: string
  typeMarchandise: string
  quantite: string
  chargementCodePostal: string
  chargementDate: string
  livraisonCodePostal: string
  livraisonDate: string
  telephone: string
  transportRegulier: string
  informationsComplementaires?: string
  demandeId: string
}

export async function sendConfirmationEmail(data: EmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'AutoWave <contact@autowave.fr>',
      to: [data.email],
      subject: 'Confirmation de votre demande de transport - AutoWave',
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de demande de transport</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #17A9FF 0%, #0C79DF 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #17A9FF;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin: 10px 0;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-label {
              font-weight: bold;
              color: #555;
            }
            .detail-value {
              color: #333;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
            }
            .contact-info {
              background: #e8f4fd;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚛 AutoWave</h1>
            <h2>Confirmation de votre demande de transport</h2>
          </div>
          
          <div class="content">
            <p>Bonjour ${data.nom},</p>
            
            <p>Nous avons bien reçu votre demande de transport et nous vous en remercions.</p>
            
            <p><strong>Numéro de demande :</strong> ${data.demandeId}</p>
            
            <div class="details">
              <h3>📋 Détails de votre demande</h3>
              
              <div class="detail-row">
                <span class="detail-label">Type de marchandise :</span>
                <span class="detail-value">${data.typeMarchandise}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Quantité :</span>
                <span class="detail-value">${data.quantite}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Chargement :</span>
                <span class="detail-value">${data.chargementCodePostal} - ${new Date(data.chargementDate).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Livraison :</span>
                <span class="detail-value">${data.livraisonCodePostal} - ${new Date(data.livraisonDate).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Transport régulier :</span>
                <span class="detail-value">${data.transportRegulier === 'oui' ? 'Oui' : 'Non'}</span>
              </div>
              
              ${data.informationsComplementaires ? `
              <div class="detail-row">
                <span class="detail-label">Informations complémentaires :</span>
                <span class="detail-value">${data.informationsComplementaires}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="contact-info">
              <h4>📞 Nos coordonnées</h4>
              <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
              <p><strong>WhatsApp :</strong> +33 1 23 45 67 89</p>
              <p><strong>Email :</strong> contact@autowave.fr</p>
            </div>
            
            <p>Notre équipe commerciale va étudier votre demande et vous contacter dans les plus brefs délais pour vous proposer un devis personnalisé.</p>
            
            <p>En attendant, n'hésitez pas à nous contacter si vous avez des questions.</p>
            
            <p>Cordialement,<br>
            L'équipe AutoWave</p>
          </div>
          
          <div class="footer">
            <p>AutoWave - Transport de marchandises</p>
            <p>Cet email a été envoyé automatiquement suite à votre demande sur notre site web.</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error)
      return { success: false, error }
    }

    console.log('Email de confirmation envoyé avec succès:', emailData)
    return { success: true, data: emailData }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error)
    return { success: false, error }
  }
}

export async function sendNotificationEmail(data: EmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'AutoWave <notifications@autowave.fr>',
      to: ['commercial@autowave.fr'], // Email de l'équipe commerciale
      subject: `Nouvelle demande de transport - ${data.nom}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de transport</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #17A9FF 0%, #0C79DF 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #17A9FF;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin: 10px 0;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-label {
              font-weight: bold;
              color: #555;
            }
            .detail-value {
              color: #333;
            }
            .contact-info {
              background: #e8f4fd;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚛 AutoWave</h1>
            <h2>Nouvelle demande de transport</h2>
          </div>
          
          <div class="content">
            <p>Une nouvelle demande de transport a été reçue :</p>
            
            <div class="details">
              <h3>👤 Informations client</h3>
              <div class="detail-row">
                <span class="detail-label">Nom :</span>
                <span class="detail-value">${data.nom}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email :</span>
                <span class="detail-value">${data.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Téléphone :</span>
                <span class="detail-value">${data.telephone}</span>
              </div>
            </div>
            
            <div class="details">
              <h3>📦 Détails du transport</h3>
              <div class="detail-row">
                <span class="detail-label">Type de marchandise :</span>
                <span class="detail-value">${data.typeMarchandise}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Quantité :</span>
                <span class="detail-value">${data.quantite}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Chargement :</span>
                <span class="detail-value">${data.chargementCodePostal} - ${new Date(data.chargementDate).toLocaleDateString('fr-FR')}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Livraison :</span>
                <span class="detail-value">${data.livraisonCodePostal} - ${new Date(data.livraisonDate).toLocaleDateString('fr-FR')}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Transport régulier :</span>
                <span class="detail-value">${data.transportRegulier === 'oui' ? 'Oui' : 'Non'}</span>
              </div>
              ${data.informationsComplementaires ? `
              <div class="detail-row">
                <span class="detail-label">Informations complémentaires :</span>
                <span class="detail-value">${data.informationsComplementaires}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="contact-info">
              <h4>📋 Actions à effectuer</h4>
              <p>1. Contacter le client pour confirmer les détails</p>
              <p>2. Préparer un devis personnalisé</p>
              <p>3. Suivre la demande dans le système</p>
            </div>
            
            <p><strong>Numéro de demande :</strong> ${data.demandeId}</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email de notification:', error)
      return { success: false, error }
    }

    console.log('Email de notification envoyé avec succès:', emailData)
    return { success: true, data: emailData }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de notification:', error)
    return { success: false, error }
  }
} 