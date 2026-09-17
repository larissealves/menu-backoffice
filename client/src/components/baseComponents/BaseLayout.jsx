import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthContext.jsx';

export default function BaseLayout() {
    const { user, roles, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#FFFDF5]">

            {/* Header */}
            <header className="border-b border-[#E8E1C8] bg-white">
                <div className="mx-auto flex min-h-[72px] w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">

                    {/* Logo / Nome + Permissões */}
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2">

                        {/* Logo / Nome */}
                        <div className="flex shrink-0 items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#F6D77A]">
                                <img
                                    src="/favicon.png"
                                    alt=""
                                    className="h-7 w-7 object-contain"
                                />
                            </div>

                            <div className="leading-tight">
                                <h1 className="m-0 text-lg font-bold tracking-tight text-[#3F5145]">
                                    MENU
                                </h1>
                            </div>
                        </div>

                        {/* Permissões */}
                        <div className="flex items-center gap-1.5 rounded-lg bg-[#E7EFE7] px-2.5 py-2 text-xs font-medium text-[#3F5145] sm:px-3">
                            <span className="hidden sm:inline">
                                Permissões:
                            </span>

                            {roles.map((item, index) => (
                                <span key={index} className="rounded-md bg-white px-2 py-1 lowercase">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>


                    {/* Usuário */}
                    <div className="flex shrink-0 items-center justify-end gap-3">

                        <div className="hidden text-right leading-tight sm:block">
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
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                    <p className="text-xs text-[#8A8F82]">
                        © 2026 My App
                    </p>

                    <p className="text-xs text-[#B0B3A8]">
                        <a
                            href="https://github.com/larissealves/menu-backoffice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                text-[#697266]
                                transition
                                hover:text-[#3F5145]
                                hover:underline
                            "
                        >
                            GitHub
                            <span className="text-[10px]">↗</span>
                        </a>
                    </p>

                    <p className="text-xs text-[#B0B3A8]">
                        Feito com carinho 💕
                    </p>

                </div>
            </footer>

        </div>
    );
}