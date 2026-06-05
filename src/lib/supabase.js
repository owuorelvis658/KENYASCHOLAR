import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jddzmwukfibneqvgjwws.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkZHptd3VrZmlibmVxdmdqd3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDg2MjksImV4cCI6MjA5NTQ4NDYyOX0.q9FvMXCphNqaV3LF__ynvsxgN98xujXAQ6oUZb7QSIY'
)