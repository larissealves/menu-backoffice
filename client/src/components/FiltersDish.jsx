import { useState } from "react";

export default function FiltersDish({ listCategories, listTags, listIngredients, listFilters, loading }) {

    const [filters, setFilters] = useState({
        tags: [],
        ingredients: [],
        category: '',
        name: '',
    });

    const [filterName, setFilterName] = useState();

    const updateFilters = (newValue) => {
        setFilters(newValue)
        listFilters(newValue);
    }


    return (
        <div className="bg-[#FFFDF5] p-3 sm:p-4">

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
                                onChange={(e) => setFilterName(e.target.value)}
                                placeholder="Buscar por nome..."
                                className="w-full rounded-md border border-[#DDD8C7] py-2 pl-3 pr-10 text-sm text-[#566357] outline-none transition placeholder:text-[#B2B3A9] focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                            />

                            <button
                                type="button"
                                disabled={loading || !filterName}
                                title="Digite o nome e clique para buscar"
                                onClick={() => {
                                    const newFilter = {
                                        ...filters,
                                        name: filterName,
                                    };

                                    updateFilters(newFilter);
                                }}
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
                                const newFilter = {
                                    ...filters,
                                    category: e.target.value,
                                };

                                updateFilters(newFilter);
                            }}

                            className="w-full rounded-md border border-[#DDD8C7] bg-white px-3 py-2 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                        >
                            <option value="">
                                Todas as categorias
                            </option>

                            {listCategories?.map((item) => (
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
                                    (option) => Number(option.value),
                                );

                                const newFilter = {
                                    ...filters,
                                    tags: selectedTags,
                                };

                                updateFilters(newFilter);
                            }}
                            className="h-20 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                        >
                            {listTags?.map((item) => (
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

                                const newFilter = {
                                    ...filters,
                                    ingredients: selectedIngredients,
                                };

                                updateFilters(newFilter);
                            }}
                            className="h-20 w-full rounded-md border border-[#DDD8C7] bg-white p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                        >
                            {listIngredients?.map((item) => (
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
                                const newFilter = {
                                    name: "",
                                    tags: [],
                                    ingredients: [],
                                    category: "",
                                };
                                setFilterName('');
                                updateFilters(newFilter);
                            }}
                            className="rounded-md border border-[#DDD8C7] px-3 py-1.5 text-xs font-medium text-[#697266] transition hover:bg-[#F5F1DF] cursor-pointer"
                        >
                            Limpar filtros
                        </button>
                    </div>
                ) : null}
            </section>

        </div>

    );
}
