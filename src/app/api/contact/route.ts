import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== DÉBUT TRAITEMENT DEMANDE CONTACT ===')
    
    const body = await request.json()
    console.log('Body reçu:', JSON.stringify(body, null, 2))
    
    const { 
      typeMarchandise, 
      quantite, 
      chargementCodePostal, 
      chargementDate, 
      livraisonCodePostal, 
      livraisonDate, 
      nom, 
      email, 
      telephone, 
      transportRegulier, 
      informationsComplementaires 
    } = body

    console.log('Champs extraits:', {
      typeMarchandise,
      quantite,
      chargementCodePostal,
      chargementDate,
      livraisonCodePostal,
      livraisonDate,
      nom,
      email,
      telephone,
      transportRegulier,
      informationsComplementaires
    })

    // Validation des champs requis avec messages spécifiques
    const erreurs: string[] = []
    
    if (!typeMarchandise) erreurs.push('Le type de marchandise est obligatoire')
    if (!quantite) erreurs.push('La quantité est obligatoire')
    if (!chargementCodePostal) erreurs.push('Le code postal de chargement est obligatoire')
    if (!chargementDate) erreurs.push('La date de chargement est obligatoire')
    if (!livraisonCodePostal) erreurs.push('Le code postal de livraison est obligatoire')
    if (!livraisonDate) erreurs.push('La date de livraison est obligatoire')
    if (!nom) erreurs.push('Le nom est obligatoire')
    if (!email) erreurs.push('L\'adresse email est obligatoire')
    if (!telephone) erreurs.push('Le numéro de téléphone est obligatoire')
    if (!transportRegulier) erreurs.push('Veuillez indiquer si c\'est un transport régulier')

    if (erreurs.length > 0) {
      console.log('Erreurs de validation:', erreurs)
      return NextResponse.json(
        { 
          message: 'Veuillez corriger les erreurs suivantes :',
          erreurs,
          type: 'validation_error'
        },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Email invalide:', email)
      return NextResponse.json(
        { 
          message: 'L\'adresse email fournie n\'est pas valide. Veuillez vérifier le format.',
          type: 'email_error'
        },
        { status: 400 }
      )
    }

    // Validation du téléphone (format français basique)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    if (!phoneRegex.test(telephone.replace(/\s/g, ''))) {
      console.log('Téléphone invalide:', telephone)
      return NextResponse.json(
        { 
          message: 'Le numéro de téléphone fourni n\'est pas valide. Veuillez utiliser un format français (ex: 01 23 45 67 89).',
          type: 'phone_error'
        },
        { status: 400 }
      )
    }

    // Validation des dates
    const chargementDateObj = new Date(chargementDate)
    const livraisonDateObj = new Date(livraisonDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    console.log('Validation des dates:', {
      chargementDate,
      chargementDateObj: chargementDateObj.toISOString(),
      livraisonDate,
      livraisonDateObj: livraisonDateObj.toISOString(),
      today: today.toISOString(),
      chargementTimestamp: chargementDateObj.getTime(),
      todayTimestamp: today.getTime(),
      isChargementInPast: chargementDateObj.getTime() < today.getTime()
    })

    // Validation des dates avec messages spécifiques
    if (chargementDateObj.getTime() < today.getTime()) {
      console.log('Date de chargement dans le passé')
      return NextResponse.json(
        { 
          message: 'La date de chargement ne peut pas être dans le passé. Veuillez sélectionner une date future.',
          type: 'date_error'
        },
        { status: 400 }
      )
    }

    if (livraisonDateObj.getTime() < chargementDateObj.getTime()) {
      console.log('Date de livraison antérieure à la date de chargement')
      return NextResponse.json(
        { 
          message: 'La date de livraison ne peut pas être antérieure à la date de chargement. Veuillez corriger les dates.',
          type: 'date_error'
        },
        { status: 400 }
      )
    }

    // Validation des codes postaux (format français basique)
    const postalCodeRegex = /^\d{5}$/
    if (!postalCodeRegex.test(chargementCodePostal.replace(/\s/g, ''))) {
      return NextResponse.json(
        { 
          message: 'Le code postal de chargement n\'est pas valide. Veuillez entrer un code postal français à 5 chiffres.',
          type: 'postal_code_error'
        },
        { status: 400 }
      )
    }

    if (!postalCodeRegex.test(livraisonCodePostal.replace(/\s/g, ''))) {
      return NextResponse.json(
        { 
          message: 'Le code postal de livraison n\'est pas valide. Veuillez entrer un code postal français à 5 chiffres.',
          type: 'postal_code_error'
        },
        { status: 400 }
      )
    }

    // Sauvegarder en base de données avec Supabase
    const supabase = createServerSupabaseClient()
    
    if (!supabase) {
      console.error('Impossible de se connecter à Supabase')
      return NextResponse.json(
        { 
          message: 'Erreur de configuration de la base de données. Veuillez réessayer plus tard.',
          type: 'database_error'
        },
        { status: 500 }
      )
    }

    const demandeData = {
      type_marchandise: typeMarchandise,
      quantite,
      chargement_code_postal: chargementCodePostal.replace(/\s/g, ''),
      chargement_date: chargementDate,
      livraison_code_postal: livraisonCodePostal.replace(/\s/g, ''),
      livraison_date: livraisonDate,
      nom,
      email,
      telephone,
      transport_regulier: transportRegulier === 'oui',
      informations_complementaires: informationsComplementaires || null,
      statut: 'nouvelle'
    }

    console.log('Tentative d\'insertion en base de données:', demandeData)

    const { data: insertedData, error: insertError } = await supabase
      .from('demandes_transport')
      .insert([demandeData])
      .select()
      .single()

    if (insertError) {
      console.error('Erreur lors de l\'insertion en base de données:', insertError)
      return NextResponse.json(
        { 
          message: 'Erreur lors de la sauvegarde de votre demande. Veuillez réessayer.',
          type: 'database_error'
        },
        { status: 500 }
      )
    }

    console.log('Demande de transport sauvegardée avec succès:', insertedData)

    // TODO: Envoyer un email de confirmation au client
    // TODO: Envoyer une notification à l'équipe commerciale
    // TODO: Créer un devis automatique si possible

    console.log('=== FIN TRAITEMENT DEMANDE CONTACT - SUCCÈS ===')
    
    return NextResponse.json(
      { 
        message: 'Votre demande de transport a été reçue avec succès. Nous vous contacterons dans les plus brefs délais pour vous proposer un devis personnalisé.',
        demandeId: insertedData.id,
        type: 'success'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('=== ERREUR LORS DU TRAITEMENT ===')
    console.error('Erreur complète:', error)
    console.error('Stack trace:', error instanceof Error ? error.stack : 'Pas de stack trace')
    
    return NextResponse.json(
      { 
        message: 'Une erreur technique est survenue lors du traitement de votre demande. Veuillez réessayer dans quelques instants.',
        type: 'technical_error'
      },
      { status: 500 }
    )
  }
} 