import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ListDish from "./ListDish.jsx";
import NewDish from "./NewDish.jsx";
import FiltersDish from "./FiltersDish.jsx";
import ListDishPDF from "./z_remove/ListDishPDF.jsx";

import envConfig from "../../config/envConfig.js";
import { useAuth } from "../hooks/context/AuthContext.jsx";
const ENDPOINT = `/api/`;

export default function Home() {

    const { jwtToken, roles } = useAuth();

    const [listDish, setListDish] = useState([]);
    const [listTags, setListTags] = useState([]);
    const [listIngredients, setListIngredients] = useState([]);
    const [listCategories, setListCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [paginationTotalPages, setPaginationTotalPages] = useState(0);
    const PAGINATION_LIMIT = 4;

    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [filters, setFilters] = useState({
        tags: [],
        ingredients: [],
        category: '',
        name: '',
    });

    
    const permissions = {
        edit: roles.includes('edit'),
        view: roles.includes('view'),
        admin: roles.includes('admin'),
    }

    const definePermission = roles

    const fetchDropdowns = async () => {
        try {
            setShowLoading(true);
            const [tags, ingredients, categories] = await Promise.all([
                fetch(`${ENDPOINT}tags`, { credentials: 'include' }),
                fetch(`${ENDPOINT}ingredients`, { credentials: 'include' }),
                fetch(`${ENDPOINT}categories`, { credentials: 'include' }),
            ]);

            const dataTags = await tags.json();
            const dataIngredients = await ingredients.json();
            const dataCategories = await categories.json();

            if (!tags.ok || !categories.ok || !ingredients.ok) {
                console.log(`{${dataCategories}, \n, ${dataIngredients}, \n, ${dataTags}}`)
                return;
            }

            setListTags(dataTags.data);
            setListIngredients(dataIngredients.data);
            setListCategories(dataCategories.data);

        } catch (error) {
            setListTags([]);
            setListIngredients([]);
            setListCategories([]);
            console.log("Erro ao carregar os dados dos dropdowns! \n", error);
        } finally {
            setShowLoading(false);
        }
    };

    const fetchDishes = async () => {
        try {
            setShowLoading(true);
            const filterByName = !filters.name.trim() ? '' : filters.name;
            const filterByTags = filters.tags?.length && filters.tags[0] > 0 ? filters.tags.join(",") : '';
            const filterByingredients = filters.ingredients?.length && filters.ingredients[0] > 0 ? filters.ingredients.join(",") : '';

            const [dataListDish] = await Promise.all([
                fetch(`${ENDPOINT}dishes?tags=${filterByTags}&ingredients=${filterByingredients}&category=${filters.category}&name=${filterByName}&currentPage=${currentPage}&limit=${PAGINATION_LIMIT}`,
                    {
                        credentials: 'include',
                        headers: {
                            'authorization': `Bearer ${jwtToken}`
                        }
                    }),
            ]);

            const data = await dataListDish.json();

            if (!dataListDish.ok) {
                const error = new Error(data.error.message);
                error.code = data.error.code;
                throw error;
            }

            setListDish(data.data);
            setCurrentPage(data.pagination.currentPage);
            setPaginationTotalPages(data.pagination.totalPages);

        } catch (error) {
            setListDish([]);
            console.log("Erro ao carregar a lista de pratos! \n", error);

        } finally {
            setShowLoading(false);
        }
    };

    const clearFilters = () => {
        const newFilter = {
            ...filters,
            tags: [],
            ingredients: [],
            category: '',
            name: '',
        }
        updateFilters(newFilter);
    }

    const updateFilters = (value) => {
        const newFilter = {
            ...filters,
            tags: value.tags,
            ingredients: value.ingredients,
            category: value.category,
            name: value.name,
        }
        setFilters(newFilter);
        setCurrentPage(1);
    }

    useEffect(() => {
        fetchDropdowns();
    }, []);

    useEffect(() => {
        fetchDishes();
    }, [filters, currentPage]);

    return (
        <main className="min-h-screen bg-[#FFFDF5]">
            
            {/* Header */}
            <header className="border-b border-[#E8E1C8] bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-end gap-3 px-4 py-3 sm:px-6">

                    <div className="flex shrink-0 items-center gap-2">
                        {/*  =================== BOTÃO - PDF ===================  */}
                        {false && (
                            <PDFDownloadLink
                                document={<ListDishPDF listItems={listDish} />}
                                fileName="lista-de-pratos.pdf"
                            >
                                {({ showLoading }) => (
                                    <button
                                        type="button"
                                        disabled={showLoading}
                                        className="
                                    inline-flex items-center gap-2
                                    rounded-lg
                                    border border-[#E8E1C8]
                                    bg-white
                                    px-3 py-2
                                    text-sm font-medium
                                    text-[#3F5145]
                                    transition
                                    hover:border-[#D9B64C]
                                    hover:bg-[#FFFDF5]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                                    >
                                        <span>↓</span>

                                        <span className="hidden sm:inline">
                                            {showLoading
                                                ? "Gerando PDF..."
                                                : "Baixar PDF"}
                                        </span>

                                        <span className="sm:hidden">
                                            PDF
                                        </span>
                                    </button>
                                )}
                            </PDFDownloadLink>
                        )}

                        {/* =================== BOTÃO - Novo prato ===================  */}
                        <button
                            type="button"
                            onClick={() => setShowForm((prev) => !prev)}
                            disabled={showLoading || !permissions.edit}
                            title={`${!permissions.edit ? 'Sem permissão para criar/editar' : ''}`}
                            className="
                                inline-flex items-center gap-2
                                rounded-lg
                                bg-[#3F5145]
                                px-3 py-2
                                text-sm font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-[#506456]
                                hover:shadow
                                cursor-pointer
                            "
                        >
                            <span className="text-base leading-none">
                                {showForm ? "×" : "+"}
                            </span>

                            <span className="hidden sm:inline">
                                {showForm
                                    ? "Fechar formulário"
                                    : "Adicionar prato"}
                            </span>
                        </button>

                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
                {/*  =================== FORMULÁRIO  ===================  */}
                {showForm && (
                    <section
                        className="
                        mb-6
                        overflow-hidden
                        rounded-xl
                        border border-[#E8E1C8]
                        bg-white
                        shadow-sm
                    "
                    >
                        <div className="border-b border-[#E8E1C8] px-5 py-4">
                            <h2 className="text-sm font-semibold text-[#3F5145]">
                                Cadastrar prato
                            </h2>
                        </div>

                        <div className="p-5">
                            <NewDish
                                showLoading={showLoading}
                                setShowLoading={() =>
                                    setShowLoading((prev) => !prev)
                                }
                                listTags={listTags}
                                listIngredients={listIngredients}
                                listCategories={listCategories}
                                permissions={permissions}
                            />
                        </div>
                    </section>
                )}

                {/* =================== FILTROS =================== */}
                <section
                    className="
                    top-0
                    z-30
                    mb-6
                    rounded-xl
                    border border-[#E8E1C8]
                    bg-white/95
                    px-4
                    py-4
                    shadow-sm
                    backdrop-blur-md
                    sm:px-5
                "
                >
                    <div className="mb-3 text-left">
                        <h2 className="text-sm font-semibold text-[#3F5145]">
                            Filtros
                        </h2>
                    </div>

                    <div
                        className={`
                        transition-opacity
                        ${showLoading ? "pointer-events-none opacity-60" : ""}
                    `}
                    >
                        <FiltersDish
                            listTags={listTags}
                            listIngredients={listIngredients}
                            listCategories={listCategories}
                            listFilters={updateFilters}
                            clearFilters={clearFilters}
                            loading={showLoading}
                        />
                    </div>
                </section>

                {/*  =================== LISTAGEM  =================== */}
                <section
                    className="
                    overflow-hidden
                    rounded-xl
                    border border-[#E8E1C8]
                    bg-white
                    shadow-sm
                    z-5
                "
                >

                    <div
                        className="
                        flex
                        min-h-[57px]
                        items-center
                        justify-between
                        gap-3
                        border-b border-[#E8E1C8]
                        px-5 py-3
                        z-5
                    "
                    >
                        <h2 className="text-sm font-semibold text-[#3F5145]">
                            Listagem
                        </h2>

                        {showLoading && (
                            <div
                                className="
                                inline-flex
                                shrink-0
                                items-center
                                gap-2
                                rounded-lg
                                bg-[#E7EFE7]
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-[#3F5145]
                            "
                            >
                                <span
                                    className="
                                    h-2
                                    w-2
                                    animate-pulse
                                    rounded-full
                                    bg-[#D9B64C]
                                "
                                />

                                Atualizando...
                            </div>
                        )}
                    </div>

                    {!showLoading && (
                        <div className="p-4 sm:p-5 z-5">
                            <ListDish
                                dishes={listDish}
                                loading={showLoading}
                                setShowLoading={((prev) => !prev)}

                                setCurrentPagePrev={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                setCurrentPageNext={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(
                                            prev + 1,
                                            paginationTotalPages
                                        )
                                    )
                                }
                                currentPage={currentPage}
                                paginationTotalPages={paginationTotalPages}
                            />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );



}
