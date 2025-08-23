import { createClient } from '@supabase/supabase-js';

// Данные из .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Создаём клиент один раз
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,       // хранить сессию
    autoRefreshToken: true,     // автообновление токена
    detectSessionInUrl: true,   // обработка токена из URL
  },
});

