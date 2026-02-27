import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
    email: string;
    name: string;
}

interface AdminAuthState {
    user: AdminUser | null;
    isAuthenticated: boolean;
    login: (user: AdminUser) => void;
    logout: () => void;
}

export const useAdminAuth = create<AdminAuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'admin-auth-storage',
        }
    )
);
