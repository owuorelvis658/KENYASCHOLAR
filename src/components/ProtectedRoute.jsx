import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  // Still checking – show nothing
  if (user === undefined) return null

  // Not logged in – show nothing (Admin.jsx handles its own login screen)
  if (!user) return null

  return children
}
