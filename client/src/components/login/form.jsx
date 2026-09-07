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
            console.log(sendRequest);

            if (!sendRequest.ok || !result.loginIsValid) {
                setAlertMessage('Usuário não pode loggar. Verifique o cadastro.');
                console.log('Error: status ', sendRequest.status + ' => ' + result.message );
                return;
            }
            setUser(result.user);
            setLoginChecked(true);
            clearForm();
            //onSave();

        } catch (error) {
            console.log('Erro ao checar login do usuário.');
        } finally {
            activeLoading();
        }

    }

    return (
        <Popup>
            <div className="flex h-auto items-center justify-center bg-[#FFFDF5]">
                <div className="w-full max-w-md bg-white p-8">

                    <h1 className="mb-6 text-2xl font-bold text-[#3F5145]">
                        Login
                    </h1>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-[#3F5145]">
                            NAME:
                        </label>

                        <input
                            type="text"
                            value={form.name}
                            onChange={((e) => {
                                setForm({
                                    ...form,
                                    name: e.target.value
                                }); setAlertMessage('')
                            })
                            }
                            className="w-full rounded-lg border border-[#E8E1C8] px-4 py-2.5
               bg-[#FFFDF5] outline-none transition
               focus:border-[#D9B64C] focus:ring-2 focus:ring-[#F6D77A]/40"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-[#3F5145]">
                            PASSWORD:
                        </label>

                        <input
                            type="password"
                            value={form.password}
                            onChange={((e) => {
                                setForm({
                                    ...form,
                                    password: e.target.value
                                }); setAlertMessage('')
                            })
                            }
                            className="w-full rounded-lg border border-[#E8E1C8] px-4 py-2.5
               bg-[#FFFDF5] outline-none transition
               focus:border-[#D9B64C] focus:ring-2 focus:ring-[#F6D77A]/40"
                        />
                    </div>

                    <button
                        onClick={handle}
                        disabled={loading || !form.name || !form.password}
                        className=
                        {`w-full rounded-lg px-4 py-2.5 mb-4 
                font-semibold text-white transition
                active:scale-[0.98]
                ${!loading && form.name && form.password ?
                                "bg-[#3F5145] hover:bg-[#34443A] cursor-pointer" : "bg-[#C8C8BE] cursor-not-allowed"
                            }`
                        }
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                    {alertMessage && (
                        <p className="mb-4 rounded-lg bg-[#F9E4A8] p-3 text-sm text-[#6B5418]">
                            {alertMessage}
                        </p>
                    )}

                </div>
            </div>
        </Popup>

    );
}