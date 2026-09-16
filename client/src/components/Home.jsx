import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ListDish from "./ListDish.jsx";
import NewDish from "./NewDish.jsx";
import FiltersDish from "./FiltersDish.jsx";
import ListDishPDF from "./z_remove/ListDishPDF.jsx";

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


    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);


    const [filters, setFilters] = useState({
        tags: [],
        ingredients: [],
        category: '',
        name: '',
    });

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
            setLoading(false);
        }
    };

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
                <NewDish
                    loading={loading}
                    setLoading={() => setLoading((prev) = !prev)}
                    listTags={listTags}
                    listIngredients={listIngredients}
                    listCategories={listCategories}
                />
            )}

            <FiltersDish
                listTags={listTags}
                listIngredients={listIngredients}
                listCategories={listCategories}
                listFilters={updateFilters}
                loading={loading}
            />

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
