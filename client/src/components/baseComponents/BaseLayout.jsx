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
        <div className="min-h-screen flex flex-col bg-[#FFFDF5]">

            {/* Header */}
            <header className="border-b border-[#E8E1C8] bg-white">
                <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-6">

                    {/* Logo / Nome */}
                    <div className="flex shrink-0 items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#F6D77A]">
                            <img
                                src="../../../public/favicon.png"
                                alt=""
                                className="h-7 w-7 object-contain"
                            />
                        </div>

                        <div className="leading-tight">
                            <h1 className="text-lg font-bold tracking-tight text-[#3F5145] m-0">
                                MENU
                            </h1>
                        </div>
                    </div>


                    {/* Permissões */}
                    <div className="hidden items-center gap-2 md:flex">
                        <span className="mr-1 text-xs font-medium text-[#8A8F82]">
                            Permissões:
                        </span>

                        <span className="rounded-full bg-[#E7EFE7] px-3 py-1 text-xs font-semibold text-[#3F5145]">
                            Visualizar
                        </span>

                        <span className="rounded-full bg-[#F6D77A]/50 px-3 py-1 text-xs font-semibold text-[#6B5418]">
                            Editar
                        </span>

                        <span className="rounded-full bg-[#E7EFE7] px-3 py-1 text-xs font-semibold text-[#3F5145]">
                            Administrar
                        </span>
                    </div>


                    {/* Usuário */}
                    <div className="flex shrink-0 items-center gap-3">

                        <div className="hidden text-right sm:block leading-tight">
                            <p className="text-sm font-semibold capitalize text-[#3F5145]">
                                {user}
                            </p>

                            <p className="text-xs text-[#8A8F82]">
                                Usuário
                            </p>
                        </div>

                        {/* Avatar */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7EFE7]">
                            <span className="text-sm font-bold uppercase text-[#3F5145]">
                                {user?.charAt(0)}
                            </span>
                        </div>

                        {/* Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                    cursor-pointer
                    rounded-xl
                    border border-[#E8E1C8]
                    bg-[#FFFDF5]
                    px-4 py-2
                    text-sm font-semibold
                    text-[#3F5145]
                    transition
                    hover:border-[#F0CC5B]
                    hover:bg-[#F6D77A]
                    active:scale-95
                "
                        >
                            Sair
                        </button>

                    </div>
                </div>
            </header>


            {/* Conteúdo */}
            <main className="flex-1">
                <Outlet />
            </main>


            {/* Footer */}
            <footer className="border-t border-[#E8E1C8] bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    <p className="text-xs text-[#8A8F82]">
                        © 2026 My App
                    </p>

                    <p className="text-xs text-[#B0B3A8]">
                        Feito com carinho
                    </p>

                </div>
            </footer>

        </div>
    );
}