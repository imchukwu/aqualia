import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'RETAIL' | 'DISTRIBUTOR';
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'aqualia-auth-storage',
        }
    )
);

export default useAuthStore;
