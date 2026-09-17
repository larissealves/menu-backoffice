import { useState } from "react";
import Popup from "../baseComponents/Popup";

import { useAuth } from "../../hooks/context/AuthContext";
import Loading from "../baseComponents/Loading";

import envConfig from "../../../config/envConfig.js";
const ENDPOINT = `/api/`;

export default function Login({ setLoading, loading, onSave }) {
    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    const [alertMessage, setAlertMessage] = useState("");

    const { setUser, setLoginChecked } = useAuth();

    const activeLoading = () => {
        setLoading();
    };

    const clearForm = () => {
        setForm({ name: '', password: '' });
        setAlertMessage('');
    };

    const checkForm = () => {
        setAlertMessage('');

        if (!form.name || !form.password) {
            setAlertMessage("Preencha todos os campos");
            return Error;
        }

        return true;
    };

    const handle = async () => {
        activeLoading();
        const formValid = checkForm();

        if (!formValid) return;

        try {
            const sendRequest = await fetch(`${ENDPOINT}login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(form)
                });

            const result = await sendRequest.json();

            if (!sendRequest.ok || !result.loggedIn) {
                setAlertMessage('Usuário não pode loggar. Verifique o cadastro.');
                console.log('Error: status ', sendRequest.status + ' => ' ,  result );
                return;
            }
            setUser(result.user);
            setLoginChecked(true);
            clearForm();
            //onSave();

        } catch (error) {
            console.log(error);
        } finally {
            activeLoading();
        }

    }

    
return (
    <Popup>
        <div className="flex w-full items-center justify-center bg-[#FFFDF5] p-4">
            <div className="w-full max-w-[400px]">
                <div className="overflow-hidden rounded-xl border border-[#E8E1C8] bg-white shadow-[0_12px_35px_rgba(63,81,69,0.10)]">

                    {/* Header */}
                    <div className="flex flex-col items-center border-b border-[#EEE7D2] px-6 py-7 text-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E7EFE7] text-lg">
                            🔐
                        </div>

                        <h1 className="text-xl font-bold text-[#3F5145] !mt-0">
                            Login
                        </h1>

                        <p className="mt-1 text-xs text-[#8A8F82]">
                            Entre com suas credenciais
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-6 py-7 sm:px-8">

                        <div className="mb-5">
                            <label
                                htmlFor="login-name"
                                className="mb-1.5 block text-center text-xs font-semibold text-[#566357]"
                            >
                                Usuário
                            </label>

                            <input
                                id="login-name"
                                type="text"
                                value={form.name}
                                autoComplete="username"
                                placeholder="Digite seu usuário"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    });

                                    setAlertMessage("");
                                }}
                                className="
                                    h-11
                                    w-full
                                    rounded-lg
                                    border border-[#E8E1C8]
                                    bg-[#FFFDF5]
                                    px-3.5
                                    text-center
                                    text-sm
                                    text-[#3F5145]
                                    outline-none
                                    transition
                                    placeholder:text-[#B2B3A9]
                                    hover:border-[#D9D2B9]
                                    focus:border-[#D9B64C]
                                    focus:bg-white
                                    focus:ring-2
                                    focus:ring-[#F6D77A]/30
                                "
                            />
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="login-password"
                                className="mb-1.5 block text-center text-xs font-semibold text-[#566357]"
                            >
                                Senha
                            </label>

                            <input
                                id="login-password"
                                type="password"
                                value={form.password}
                                autoComplete="current-password"
                                placeholder="Digite sua senha"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    });

                                    setAlertMessage("");
                                }}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Enter" &&
                                        form.name &&
                                        form.password &&
                                        !loading
                                    ) {
                                        handle();
                                    }
                                }}
                                className="
                                    h-11
                                    w-full
                                    rounded-lg
                                    border border-[#E8E1C8]
                                    bg-[#FFFDF5]
                                    px-3.5
                                    text-center
                                    text-sm
                                    text-[#3F5145]
                                    outline-none
                                    transition
                                    placeholder:text-[#B2B3A9]
                                    hover:border-[#D9D2B9]
                                    focus:border-[#D9B64C]
                                    focus:bg-white
                                    focus:ring-2
                                    focus:ring-[#F6D77A]/30
                                "
                            />
                        </div>

                        {alertMessage && (
                            <div className="mb-5 rounded-lg border border-[#E8D18B] bg-[#F9E4A8] px-3.5 py-3 text-center">
                                <p className="text-xs leading-5 text-[#6B5418]">
                                    {alertMessage}
                                </p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handle}
                            disabled={
                                loading ||
                                !form.name ||
                                !form.password
                            }
                            className={`
                                flex
                                h-11
                                w-full
                                items-center
                                justify-center
                                rounded-lg
                                px-4
                                text-sm
                                font-semibold
                                transition
                                active:scale-[0.99]
                                ${
                                    !loading &&
                                    form.name &&
                                    form.password
                                        ? "cursor-pointer bg-[#3F5145] text-white hover:bg-[#34443A]"
                                        : "cursor-not-allowed bg-[#C8C8BE] text-white"
                                }
                            `}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </div>

                    {/* GitHub */}
                    <div className="flex justify-center border-t border-[#EEE7D2] px-6 py-4">
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
                    </div>

                </div>
            </div>
        </div>
    </Popup>
);

}