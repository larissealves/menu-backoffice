import { createContext, useContext, useEffect, useState } from "react";

const ENDPOINT = 'http://localhost:3000/api/';
const Auth = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loginChecked, setLoginChecked] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${ENDPOINT}me`, {
            credentials: "include"
        })
            .then(async (res) => {
                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();
                setUser(data.user);
            })

            .catch(() => {
                setUser(null);
            })

            .finally(() => {
                setLoginChecked(true);
                setLoading(false);
            })

    }, []);

    async function logout() {
        try {
            setLoading(true);
            const res = await fetch(`${ENDPOINT}logout`, {
                credentials: "include"
            });

            if (res.ok) {
                setUser(null);
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }finally{
            loginChecked(true);
            setLoading(false);
        }
    }

    return (
        <Auth.Provider value={{loginChecked, setLoginChecked, user, setUser, setLoading, loading, logout }}>
            {children}
        </Auth.Provider>
    );
}

export function useAuth() {
    return useContext(Auth);
}
