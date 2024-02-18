
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ipmcodordginsmosxniv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwbWNvZG9yZGdpbnNtb3N4bml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyNTQ1ODQsImV4cCI6MjAyMzgzMDU4NH0.WFSdMoPMiO1ftQA3TqUwAD-T9AZ9AztC1aTqfvcJfhU"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;