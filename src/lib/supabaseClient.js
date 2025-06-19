
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dukfipntjtxiyxziaegj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1a2ZpcG50anR4aXl4emlhZWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjg2NzIsImV4cCI6MjA2NTgwNDY3Mn0.HnxM42PSrxlg5nJZN03fjCQHdNiCsqM8slykqGEXUio';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
