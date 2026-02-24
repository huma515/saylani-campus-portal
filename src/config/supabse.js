import {createClient} from '@supabase/supabase-js'

let apiKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bnl4YWt2eWtocGRpamVrZWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTczMjcsImV4cCI6MjA4NDgzMzMyN30.A-KqA7Ef6Iejn3uGRVJJUWGSr5QkbGgKGAtH8ELSS50'


let Urll='https://junyxakvykhpdijekegj.supabase.co'


const supabase = createClient(Urll,apiKey)


export default supabase