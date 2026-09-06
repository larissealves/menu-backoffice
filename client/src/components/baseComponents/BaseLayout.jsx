import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthContext.jsx';

export default function BaseLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <header className="border-b bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                           
                        </h1>
                    </div>

                   
                    <div className="flex items-center gap-4">

                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-800 capitalize">
                                {user}
                            </p>

                            <p className="text-xs text-gray-500">
                                Usuário
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-lg  px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300 cursor-pointer"
                        >
                            Sair
                        </button>

                    </div>
                </div>
            </header>


            {/* Conteúdo das telas */}
            <main className="flex-1">
                <Outlet />
            </main>


            {/* Footer */}
            <footer className="border-t bg-white">
                <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-gray-500">
                    © 2026 My App. Todos os direitos reservados.
                </div>
            </footer>

        </div>
    );
}