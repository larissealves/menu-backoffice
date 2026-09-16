import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ListDish from "./ListDish.jsx";
import NewDish from "./NewDish.jsx";
import ListDishPDF from './ListDishPDF.jsx';

import envConfig from "../../config/envConfig.js";
const ENDPOINT = `/api/`;

export default function Home() {

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

    useEffect(() => {
        fetchDropdowns();
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

            <NewDish 
                showForm={showForm}
                loading={loading} 
                setLoading={() => setLoading((prev) = !prev)} 
                listTags={listTags} 
                listIngredients={listIngredients} 
                listCategories={listCategories}
            />

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

            <ListDish 
                dishes={listDish}  
                loading={loading} 
                setCurrentPagePrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                setCurrentPageNext={() => setCurrentPage((prev) =>
                            Math.min(prev + 1, paginationTotalPages))}
                currentPage={currentPage} 
                paginationTotalPages={paginationTotalPages} 
            />
        </div>

    );
}
