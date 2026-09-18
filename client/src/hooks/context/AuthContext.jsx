import { createContext, useContext, useEffect, useState } from "react";

const ENDPOINT = `/api/`;

const Auth = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [roles, setRoles ] = useState(null);
    const [jwtToken, setToken ] = useState(null);
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
                setRoles(data.roles);
                setToken(data.token);
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
            console.error('Erro ao fazer logout:', error.message);
        }finally{
            setLoginChecked(true);
            setLoading(false);
        }
    }

    return (
        <Auth.Provider value={{loginChecked, setLoginChecked, user, setUser, roles, setToken, jwtToken, setLoading, loading, logout }}>
            {children}
        </Auth.Provider>
    );
}

export function useAuth() {
    return useContext(Auth);
}
