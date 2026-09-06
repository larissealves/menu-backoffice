import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ListDishPDF from './ListDishPDF.jsx';

import envConfig from "../../config/envConfig.js";
const ENDPOINT = `${envConfig.vitApiUrl}/api/`;

export default function ListDish() {

    const [listDish, setListDish] = useState([]);
    const [listTags, setListTags] = useState([]);
    const [listIngredients, setListIngredients] = useState([]);
    const [listCategories, setListCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [paginationTotalPages, setPaginationTotalPages] = useState(0);
    const PAGINATION_LIMIT = 4;

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        type: "alert", //alert, error, success
    });

    const [showForm, setShowForm] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formDish, setFormDish] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: '',
        isActive: true,
        tagsId: [],
        ingredientsId: [],
    });

    const [filters, setFilters] = useState({
        tags: [],
        ingredients: [],
        category: '',
        name: '',
    });

    const [filterName, setFilterName] = useState();


    const fetchDropdowns = async () => {
        try {
            setLoading(true);
            const [tags, ingredients, categories] = await Promise.all([
                fetch(`${ENDPOINT}tags`, { credentials: 'include' }),
                fetch(`${ENDPOINT}ingredients`, { credentials: 'include' }),
                fetch(`${ENDPOINT}categories`, { credentials: 'include' }),
            ]);

            const dataTags = await tags.json();
            const dataIngredients = await ingredients.json();
            const dataCategories = await categories.json();

            setListTags(dataTags.data);
            setListIngredients(dataIngredients.data);
            setListCategories(dataCategories.data);

        } catch (error) {
            setListTags([]);
            setListIngredients([]);
            setListCategories([]);
            console.log("Erro ao carregar os dados dos dropdowns!");
        }finally {
            setLoading(false);
        }
    };

    const fetchDishes = async () => {
        try {
            setLoading(true);
            const filterByName = !filters.name.trim() ? '' : filters.name;
            const filterByTags = filters.tags?.length && filters.tags[0] > 0 ? filters.tags.join(",") : '';
            const filterByingredients = filters.ingredients?.length && filters.ingredients[0] > 0 ? filters.ingredients.join(",") : '';

            const [dataListDish] = await Promise.all([
                fetch(`${ENDPOINT}dishes?tags=${filterByTags}&ingredients=${filterByingredients}&category=${filters.category}&name=${filterByName}&currentPage=${currentPage}&limit=${PAGINATION_LIMIT}`,
                    { credentials: 'include' }),
            ]);

            const data = await dataListDish.json();

            setListDish(data.data);
            setCurrentPage(data.pagination.currentPage);
            setPaginationTotalPages(data.pagination.totalPages);

        } catch (error) {
            setListDish([]);
            console.log("Erro ao carregar a lista de pratos!");
        } finally {
            setLoading(false);
        }
    };

    const checkForm = () => {
        if (!formDish.name.trim() ||
            !formDish.description.trim() ||
            !formDish.price ||
            !formDish.categoryId) {
            setMessageAlert({ message: 'Nome, preço, descrição e categoria são obrigatórios', type: 'error' });
            setLoading(false);
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

        setLoading(true);
        setMessageAlert({ message: "", type: "" });
        const form = checkForm();

        if (!form) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`
                http://localhost:3000/api/dishes`,
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
            setLoading(false);
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

    const filterByName = () => {
        setFilters({ ...filters, name: filterName });
        setCurrentPage(1);
    }

    const testeLogin = async () => {
        const api = await fetch(`http://localhost:3000/api/login?userName=${'larisse'}&userPassword=${'larisse'}`)
    };

    useEffect(() => {
        fetchDropdowns();
        testeLogin();
    }, []);

    useEffect(() => {
        if (!messageAlert) return;

        setShowContent(true);

        const timer = setTimeout(() => {
            setShowContent(false);
            setMessageAlert("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [messageAlert]);

    useEffect(() => {
        fetchDishes();
    }, [filters, currentPage, paginationTotalPages]);


    return (

        <div className="min-h-screen bg-[#FFFDF5] p-3 sm:p-4">

            <div className="mx-auto mb-3 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => setShowForm((prev) => !prev)}
                    className="rounded-md bg-[#3F5145] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#506456] cursor-pointer"
                >
                    {showForm ? "Esconder formulário" : "+ Adicionar prato"}
                </button>

                <PDFDownloadLink
                    document={<ListDishPDF listItems={listDish} />}
                    fileName="lista-de-pratos.pdf"
                >
                    {({ loading }) => (
                        <button
                            type="button"
                            disabled={loading}
                            className="rounded-md bg-[#E9B949] px-4 py-2 text-sm cursor-pointer font-medium text-[#3F5145] hover:bg-[#E2AD38] disabled:opacity-50"
                        >
                            {loading ? "Gerando PDF..." : "Baixar PDF"}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mb-5 max-w-4xl rounded-xl bg-white p-4 shadow-sm border border-[#EEE7D2]"
                >
                    <div className="mb-4 border-b border-[#EEE7D2] pb-3">
                        <h2 className="text-xl font-bold text-[#3F5145]">
                            Cadastrar prato
                        </h2>

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
                                className="w-full rounded-md border border-[#DDD8C7] bg-white px-3 py-2 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
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
                                className="h-24 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
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
                                className="h-24 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
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
                            {loading ? "Salvando..." : "Salvar prato"}
                        </button>
                    </div>
                </form>
            )}

            <section className="mx-auto mb-5 max-w-6xl rounded-xl bg-white p-4 shadow-sm border border-[#EEE7D2]">

                <div className="mb-3">
                    <h2 className="text-base font-bold text-[#3F5145]">
                        Filtrar pratos
                    </h2>

                    <p className="mt-0.5 text-xs text-[#8A8F82]">
                        Use os filtros para encontrar um prato.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">

                    <div>
                        <label
                            htmlFor="name-filter"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Nome
                        </label>

                        <div className="relative">
                            <input
                                id="name-filter"
                                type="text"
                                value={filterName}
                                disabled={loading}
                                onChange={(e) => setFilterName(e.target.value)}
                                placeholder="Buscar por nome..."
                                className="w-full rounded-md border border-[#DDD8C7] py-2 pl-3 pr-10 text-sm text-[#566357] outline-none transition placeholder:text-[#B2B3A9] focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                            />

                            <button
                                type="button"
                                disabled={loading || !filterName}
                                title="Digite o nome e clique para buscar"
                                onClick={filterByName}
                                className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#8A8F82] transition hover:bg-[#F5F1DF] hover:text-[#3F5145] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                aria-label="Pesquisar"
                            >
                                🔍
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="category-filter"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Categoria
                        </label>

                        <select
                            id="category-filter"
                            value={filters.category ?? ""}
                            disabled={loading}
                            onChange={(e) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    category: e.target.value,
                                }));

                                setCurrentPage(1);
                            }}
                            className="w-full rounded-md border border-[#DDD8C7] bg-white px-3 py-2 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                        >
                            <option value="">
                                Todas as categorias
                            </option>

                            {listCategories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="tag-filter"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Tags
                        </label>

                        <select
                            id="tag-filter"
                            multiple
                            value={filters.tags ?? []}
                            disabled={loading}
                            onChange={(e) => {
                                const selectedTags = Array.from(
                                    e.target.selectedOptions,
                                    (option) => Number(option.value)
                                );

                                setFilters((prev) => ({
                                    ...prev,
                                    tags: selectedTags,
                                }));

                                setCurrentPage(1);
                            }}
                            className="h-20 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                        >
                            {listTags.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="ingredient-filter"
                            className="mb-1 block text-xs font-semibold text-[#566357]"
                        >
                            Ingredientes
                        </label>

                        <select
                            id="ingredient-filter"
                            multiple
                            value={filters.ingredients ?? []}
                            disabled={loading}
                            onChange={(e) => {
                                const selectedIngredients = Array.from(
                                    e.target.selectedOptions,
                                    (option) => Number(option.value)
                                );

                                setFilters((prev) => ({
                                    ...prev,
                                    ingredients: selectedIngredients,
                                }));

                                setCurrentPage(1);
                            }}
                            className="h-20 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                        >
                            {listIngredients.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {(filters.name || filterName ||
                    filters.category ||
                    filters.tags?.length ||
                    filters.ingredients?.length) ? (
                    <div className="mt-3 flex justify-end">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => {
                                setFilters({
                                    name: "",
                                    tags: [],
                                    ingredients: [],
                                    category: "",
                                });
                                setFilterName("");
                                setCurrentPage(1);
                            }}
                            className="rounded-md border border-[#DDD8C7] px-3 py-1.5 text-xs font-medium text-[#697266] transition hover:bg-[#F5F1DF] cursor-pointer"
                        >
                            Limpar filtros
                        </button>
                    </div>
                ) : null}
            </section>

            <section className="mx-auto grid max-w-6xl gap-4 grid-cols-2 lg:grid-cols-4">

                {listDish.length > 0 ? (
                    listDish.map((item) => (
                        <article
                            key={item.id}
                            className="flex flex-col rounded-xl border border-[#EEE7D2] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >

                            <div className="mb-3 border-b border-[#EEE7D2] pb-2">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                    Nome
                                </p>

                                <h3 className="mt-0.5 break-words text-base font-bold text-[#3F5145]">
                                    {item.dishName}
                                </h3>
                            </div>

                            <div className="mb-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                    Descrição
                                </p>

                                <p className="mt-0.5 line-clamp-2 break-words text-xs leading-relaxed text-[#697266]">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mb-3 grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                        Preço
                                    </p>

                                    <p className="mt-0.5 text-sm font-semibold text-[#3F5145]">
                                        R$ {item.price}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                        Criado em
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#697266]">
                                        {new Date(
                                            item.dishcreatedat
                                        ).toLocaleDateString("pt-BR")}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                    Categoria
                                </p>

                                <span className="mt-1 inline-block rounded-full bg-[#F6D77A] px-2.5 py-0.5 text-xs font-medium text-[#3F5145]">
                                    {item.categoryName}
                                </span>
                            </div>

                            <div className="mb-3">
                                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                    Tags
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {item.tagsname?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-[#3F5145] px-2 py-0.5 text-[10px] font-medium text-white"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                    Ingredientes
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {item.ingredientsname?.map(
                                        (ingredient, index) => (
                                            <span
                                                key={index}
                                                className="rounded-full border border-[#DDD8C7] bg-[#FFFDF5] px-2 py-0.5 text-[10px] text-[#697266]"
                                            >
                                                {ingredient}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto">
                                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A5A89E]">
                                    Imagens
                                </p>

                                <div className="flex h-28 w-30 items-center justify-center overflow-hidden rounded-md bg-[#F5F1DF] object-cover">
                                    {item.listImages?.length > 0 ? (
                                        item.listImages.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`${item.dishName} - imagem ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        ))
                                    ) : (
                                        <span className="text-xs text-[#A5A89E]">
                                            Sem imagem
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full rounded-xl border border-[#EEE7D2] bg-white px-4 py-10 text-center shadow-sm">
                        <p className="text-base font-semibold text-[#3F5145]">
                            Nenhum prato encontrado
                        </p>

                        <p className="mt-1 text-xs text-[#A5A89E]">
                            Tente alterar os filtros da pesquisa.
                        </p>
                    </div>
                )}
            </section>

            <div className="mx-auto mt-5 flex max-w-6xl items-center justify-center gap-2">

                <button
                    type="button"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1 || loading}
                    className="rounded-md border border-[#DDD8C7] bg-white px-3 py-1.5 text-xs font-medium text-[#566357] transition hover:bg-[#F5F1DF] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                    ← Anterior
                </button>

                <div className="rounded-md bg-[#F6D77A] px-3 py-1.5 text-xs font-semibold text-[#3F5145] shadow-sm">
                    {currentPage} / {paginationTotalPages}
                </div>

                <button
                    type="button"
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(prev + 1, paginationTotalPages)
                        )
                    }
                    disabled={
                        currentPage === paginationTotalPages ||
                        paginationTotalPages === 0 ||
                        loading
                    }
                    className="rounded-md border border-[#DDD8C7] bg-white px-3 py-1.5 text-xs font-medium text-[#566357] transition hover:bg-[#F5F1DF] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                    Próxima →
                </button>
            </div>
        </div>

    );
}
