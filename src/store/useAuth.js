import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export const useAuth = create((set) => ({
  user: null,
  loading: true,

  // Инициализация: проверка текущей сессии
  async init() {
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, loading: false });

    // Подписка на изменения сессии
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  // Регистрация
  async signUp({ email, password, name }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        name,
      });
    }
    return data;
  },

  // Вход
  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ user: data.user });
    return data;
  },

  // Выход
  async signOut() {
    await supabase.auth.signOut();
    set({ user: null });
  },

  // Удаление аккаунта (только профиль в БД, не auth.user)
  async deleteAccount() {
    const { user } = supabase.auth.getUser();
    if (!user) return;
    await supabase.from('profiles').delete().eq('id', user.id);
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
