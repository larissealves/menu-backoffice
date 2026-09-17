import React, { useState, useEffect } from "react";

const ENDPOINT = `/api/`;

export default function NewDish({ showForm, loading, setLoading, listTags, listIngredients, listCategories }) {

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        type: "alert", //alert, error, success
    });

    const [showContent, setShowContent] = useState(false);

    const [formDish, setFormDish] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: '',
        isActive: true,
        tagsId: [],
        ingredientsId: [],
    });


    const checkForm = () => {
        if (!formDish.name.trim() ||
            !formDish.description.trim() ||
            !formDish.price ||
            !formDish.categoryId) {
            setMessageAlert({ message: 'Nome, preço, descrição e categoria são obrigatórios', type: 'error' });
            return null;
        }

        const formData = new FormData();

        formData.append('name', formDish.name);
        formData.append("price", formDish.price);
        formData.append("description", formDish.description);
        formData.append('categoryId', formDish.categoryId);
        formData.append('isActive', formDish.isActive);
        formData.append("tagsId", JSON.stringify(formDish.tagsId));
        formData.append('ingredientsId', JSON.stringify(formDish.ingredientsId));

        return formData;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading();
        setMessageAlert({ message: "", type: "" });
        const form = checkForm();

        if (!form) {
            setLoading();
            return;
        }

        try {
            const res = await fetch(`${ENDPOINT}dishes`,
                {
                    method: "POST",
                    body: form,
                }
            );

            if (!res.ok) {
                setMessageAlert({ message: 'Error ao salvar o prato', type: 'error' });
            }

            setMessageAlert({ message: 'SUCCESS', type: 'success' });
            fetchDishes();
            clearForm();

        } catch (error) {
            setMessageAlert({ message: 'Error ao salvar o prato', type: 'error' });
            console.log("erro aos salvar o prato", error);
        } finally {
            setLoading();
        }
    };

    const clearForm = () => setFormDish({
        name: "",
        price: '',
        description: "",
        categoryId: '',
        isActive: true,
        tagsId: [],
        ingredientsId: [],
    });

    useEffect(() => {
        if (!messageAlert) return;

        setShowContent(true);

        const timer = setTimeout(() => {
            setShowContent(false);
            setMessageAlert("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [messageAlert]);

    return (

        <div className="bg-[#FFFDF5] ">
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl bg-white "
            >
                <div className="mb-4 border-b border-[#EEE7D2] pb-3">
                    <p className="mt-0.5 text-xs text-[#8A8F82]">
                        Preencha as informações do prato abaixo.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3 md:grid-cols-3">

                    <div>
                        <label
                            htmlFor="dish-name"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Nome
                        </label>

                        <input
                            id="dish-name"
                            type="text"
                            disabled={loading}
                            value={formDish.name ?? ""}
                            placeholder="Ex.: Pizza Margherita"
                            onChange={(e) =>
                                setFormDish((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="w-full rounded-md border border-[#DDD8C7] px-3 py-2 text-sm text-[#3F5145] outline-none transition placeholder:text-[#B2B3A9] focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="dish-price"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Preço
                        </label>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8A8F82]">
                                R$
                            </span>

                            <input
                                id="dish-price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formDish.price ?? ""}
                                placeholder="0,00"
                                disabled={loading}
                                onChange={(e) =>
                                    setFormDish((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                                className="w-full rounded-md border border-[#DDD8C7] py-2 pl-9 pr-3 text-sm text-[#3F5145] outline-none transition placeholder:text-[#B2B3A9] focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="dish-category"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Categoria
                        </label>

                        <select
                            id="dish-category"
                            value={formDish.categoryId ?? ""}
                            disabled={loading}
                            onChange={(e) =>
                                setFormDish((prev) => ({
                                    ...prev,
                                    categoryId: e.target.value,
                                }))
                            }
                            className="w-full rounded-md border border-[#DDD8C7] bg-white px-3 py-2 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]  capitalize"
                        >
                            <option value="">
                                Selecione uma categoria
                            </option>

                            {listCategories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-3">
                    <label
                        htmlFor="dish-description"
                        className="mb-1 block text-xs font-semibold text-[#566357]"
                    >
                        Descrição
                    </label>

                    <textarea
                        id="dish-description"
                        rows={2}
                        value={formDish.description ?? ""}
                        disabled={loading}
                        placeholder="Descreva os ingredientes e características do prato..."
                        onChange={(e) =>
                            setFormDish((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        className="w-full resize-none rounded-md border border-[#DDD8C7] px-3 py-2 text-sm text-[#3F5145] outline-none transition placeholder:text-[#B2B3A9] focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                    />
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">

                    <div>
                        <label
                            htmlFor="dish-tags"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Tags
                        </label>

                        <select
                            id="dish-tags"
                            multiple
                            value={formDish.tagsId ?? []}
                            disabled={loading}
                            onChange={(e) =>
                                setFormDish((prev) => ({
                                    ...prev,
                                    tagsId: Array.from(
                                        e.target.selectedOptions,
                                        (option) => Number(option.value)
                                    ),
                                }))
                            }
                            className="h-24 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A] capitalize"
                        >
                            {listTags.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <p className="mt-1 text-[11px] text-[#A5A89E]">
                            Ctrl/Cmd para selecionar várias.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="dish-ingredients"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Ingredientes
                        </label>

                        <select
                            id="dish-ingredients"
                            multiple
                            value={formDish.ingredientsId ?? []}
                            disabled={loading}
                            onChange={(e) =>
                                setFormDish((prev) => ({
                                    ...prev,
                                    ingredientsId: Array.from(
                                        e.target.selectedOptions,
                                        (option) => Number(option.value)
                                    ),
                                }))
                            }
                            className="h-24 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]  capitalize"
                        >
                            {listIngredients.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <p className="mt-1 text-[11px] text-[#A5A89E]">
                            Ctrl/Cmd para selecionar várias.
                        </p>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-md bg-[#F5F1DF] px-3 py-2.5">
                    <div>
                        <p className="text-xs font-semibold text-[#566357]">
                            Prato ativo
                        </p>

                        <p className="text-[11px] text-[#8A8F82]">
                            Define se o prato ficará disponível.
                        </p>
                    </div>

                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            checked={formDish.isActive}
                            disabled={loading}
                            onChange={(e) =>
                                setFormDish((prev) => ({
                                    ...prev,
                                    isActive: e.target.checked,
                                }))
                            }
                            className="peer sr-only"
                        />

                        <div className="h-5 w-9 rounded-full bg-[#D6D3C4] transition peer-checked:bg-[#D9B64C] peer-focus:ring-2 peer-focus:ring-[#F6D77A] after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                    </label>
                </div>

                {messageAlert.message && showContent && (
                    <div
                        className={`mt-3 rounded-md border px-3 py-2 text-xs ${messageAlert.type === "error"
                            ? "border-red-200 bg-red-50 text-red-600"
                            : "border-[#CFE0CF] bg-[#EEF6EE] text-[#527052]"
                            }`}
                    >
                        {messageAlert.message}
                    </div>
                )}

                <div className="mt-4 flex justify-end border-t border-[#EEE7D2] pt-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-[#3F5145] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#506456] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Carregando..." : "Salvar prato"}
                    </button>
                </div>
            </form>
        </div>

    );
}
