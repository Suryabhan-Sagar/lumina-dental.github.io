import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

export interface Session {
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (data: any) => Promise<{ data: any; error: any }>;
  signUp: (data: any) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({ data: null, error: null }),
  signUp: async () => ({ data: null, error: null }),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = localStorage.getItem('mockSession');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        setSession(parsed);
        setUser(parsed.user);
      } catch (e) {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  const signIn = async ({ email }: any) => {
    const newUser = { id: Math.random().toString(), email, user_metadata: { full_name: email.split('@')[0] } };
    const newSession = { user: newUser };
    setUser(newUser);
    setSession(newSession);
    localStorage.setItem('mockSession', JSON.stringify(newSession));
    return { data: newSession, error: null };
  };

  const signUp = async ({ email, options }: any) => {
    const newUser = { id: Math.random().toString(), email, user_metadata: { full_name: options?.data?.full_name || email.split('@')[0] } };
    const newSession = { user: newUser };
    setUser(newUser);
    setSession(newSession);
    localStorage.setItem('mockSession', JSON.stringify(newSession));
    return { data: newSession, error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('mockSession');
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
