import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useScholarships(category = null) {
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      let query = supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false })
      if (category) query = query.eq('category', category)
      const { data, error } = await query
      if (error) setError(error.message)
      else setScholarships(data || [])
      setLoading(false)
    }
    fetch()
  }, [category])

  return { scholarships, loading, error }
}

export function useScholarship(id) {
  const [scholarship, setScholarship] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    async function fetch() {
      setLoading(true)
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('id', id)
        .single()
      if (error) setError(error.message)
      else setScholarship(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  return { scholarship, loading, error }
}

export function useFeaturedScholarships() {
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('scholarships')
        .select('*')
        .or('is_featured.eq.true,is_new.eq.true,is_popular.eq.true')
        .order('created_at', { ascending: false })
        .limit(8)
      setScholarships(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { scholarships, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      setCategories(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { categories, loading }
}

export function useSiteStats() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('site_stats')
        .select('*')
      setStats(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { stats, loading }
}

export async function subscribeToAlerts({ email, phone }) {
  const { error } = await supabase
    .from('deadline_alerts')
    .insert({ email, phone })
  return { error }
}
