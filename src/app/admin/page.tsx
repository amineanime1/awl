'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FaEnvelope, FaTruck, FaLeaf, FaQuestionCircle, FaPlus, FaEdit, FaEye // Added icons
} from 'react-icons/fa'
import { supabase } from '@/lib/supabase/client' // Import supabase client

interface DashboardStats {
  demandes: number
  demandesNouvelles: number
  services: number
  fleetVehicles: number
  environmentalCommitments: number
  faqItems: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ 
    demandes: 0,
    demandesNouvelles: 0,
    services: 0,
    fleetVehicles: 0,
    environmentalCommitments: 0,
    faqItems: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [])

  const fetchStats = async () => {
    if (!supabase) {
      console.warn('Supabase client not available - using default stats')
      setLoading(false)
      return
    }

    try {
      // Fetch counts from Supabase tables
      const [
        { count: demandesCount }, { count: demandesNouvellesCount },
        { count: servicesCount }, { count: fleetCount },
        { count: envCount }, { count: faqCount }
      ] = await Promise.all([
        supabase.from('demandes_transport').select('*', { count: 'exact', head: true }),
        supabase.from('demandes_transport').select('*', { count: 'exact', head: true }).eq('statut', 'nouvelle'),
        supabase.from('services').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('fleet_vehicles').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('environmental_commitments').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('faq_items').select('*', { count: 'exact', head: true }).eq('is_active', true)
      ])

      setStats({
        demandes: demandesCount || 0,
        demandesNouvelles: demandesNouvellesCount || 0,
        services: servicesCount || 0,
        fleetVehicles: fleetCount || 0,
        environmentalCommitments: envCount || 0,
        faqItems: faqCount || 0
      })
    } catch (error) { 
      console.error('Erreur lors du chargement des statistiques:', error) 
    } finally { 
      setLoading(false) 
    }
  }

  const statCards = [
    {
      name: 'Demandes de transport',
      value: stats.demandes,
      change: `${stats.demandesNouvelles} nouvelles`,
      changeType: 'increase',
      href: '/admin/demandes',
      icon: FaEnvelope,
      color: 'bg-blue-500'
    },
    {
      name: 'Services actifs',
      value: stats.services,
      change: 'Services configurés',
      changeType: 'neutral',
      href: '/admin/services',
      icon: FaTruck,
      color: 'bg-orange-500'
    },
    {
      name: 'Véhicules de flotte',
      value: stats.fleetVehicles,
      change: 'Véhicules disponibles',
      changeType: 'neutral',
      href: '/admin/fleet',
      icon: FaTruck,
      color: 'bg-purple-500'
    },
    {
      name: 'Engagements environnementaux',
      value: stats.environmentalCommitments,
      change: 'Engagements actifs',
      changeType: 'neutral',
      href: '/admin/environment',
      icon: FaLeaf,
      color: 'bg-green-500'
    },
    {
      name: 'Questions FAQ',
      value: stats.faqItems,
      change: 'Questions actives',
      changeType: 'neutral',
      href: '/admin/faq',
      icon: FaQuestionCircle,
      color: 'bg-red-500'
    }
  ]

  const quickActions = [
    {
      name: 'Gérer les demandes',
      description: 'Voir et traiter les demandes de transport',
      href: '/admin/demandes',
      icon: FaEnvelope,
      color: 'bg-blue-500'
    },
    {
      name: 'Modifier les services',
      description: 'Ajouter ou modifier les services proposés',
      href: '/admin/services',
      icon: FaTruck,
      color: 'bg-orange-500'
    },
    {
      name: 'Gérer la flotte',
      description: 'Modifier les véhicules de la flotte',
      href: '/admin/fleet',
      icon: FaTruck,
      color: 'bg-purple-500'
    },
    {
      name: 'Engagements environnementaux',
      description: 'Modifier les engagements écologiques',
      href: '/admin/environment',
      icon: FaLeaf,
      color: 'bg-green-500'
    },
    {
      name: 'Gérer la FAQ',
      description: 'Ajouter ou modifier les questions fréquentes',
      href: '/admin/faq',
      icon: FaQuestionCircle,
      color: 'bg-red-500'
    },
    {
      name: 'Modifier la mission',
      description: 'Changer le texte et l\'image de la mission',
      href: '/admin/mission',
      icon: FaEdit,
      color: 'bg-indigo-500'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'overview de votre site web</p>
        </div>
        <button onClick={fetchStats} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Actualiser</button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const IconComponent = stat.icon
          return (
            <div key={stat.name} className="bg-white shadow sm:rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center p-3 rounded-lg ${stat.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.change}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href={stat.href} className="font-medium text-blue-700 hover:text-blue-900">
                    Voir les détails →
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Link
                  key={action.name}
                  href={action.href}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div>
                    <span className={`inline-flex p-3 rounded-lg ${action.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{action.description}</p>
                  </div>
                  <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Besoin d'aide ?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Utilisez les sections ci-dessus pour gérer le contenu de votre site web. 
                Toutes les modifications sont sauvegardées automatiquement et apparaîtront 
                sur le site public après quelques minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 