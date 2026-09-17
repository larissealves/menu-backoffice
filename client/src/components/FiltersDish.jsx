import { useState } from "react";

export default function FiltersDish({ listCategories, listTags, listIngredients, listFilters, clearFilters, loading }) {

    const [filters, setFilters] = useState({
        tags: [],
        ingredients: [],
        category: '',
        name: '',
    });

    const [filterName, setFilterName] = useState();

    const hasFilter = 
        filters.name ||
        filterName ||
        filters.category ||
        filters.tags?.length ||
        filters.ingredients?.length
    

    const updateFilters = (newValue) => {
        setFilters(newValue)
    }

    const handleFilters = () => {
        listFilters(filters);
    }
    
    return (
        <div className="bg-[#FFFDF5] px-3 pb-3 sm:px-4">
            <section className="sticky top-0 z-[1000] mx-auto w-full max-w-6xl">
                {/* Cabeçalho */}
                <div className="relative z-[1000] flex min-h-[54px] w-full items-center justify-between gap-3 rounded-b-xl border border-t-0 border-[#E8E1C8] bg-white px-3 py-2.5 shadow-sm sm:px-4">

                    {/* Informações */}
                    <div className="flex min-w-0 flex-1 gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E7EFE7] text-sm">
                            🔎
                        </div>

                        <div className="min-w-0 flex-1 justify-items-start">
                            <p className="truncate text-sm font-semibold text-[#3F5145]">
                                Filtros
                            </p>

                            <p className="hidden text-[11px] text-[#8A8F82] sm:block">
                                Refine sua busca
                            </p>
                        </div>

                        {/* Contador */}
                        {(hasFilter) ? (
                            <span className="hidden shrink-0 rounded-full border border-[#E8E1C8] bg-[#FFFDF5] px-2.5 py-1 text-[10px] font-semibold text-[#697266] sm:inline-flex sm:text-[11px]">
                                {[
                                    filters.name || filterName ? 1 : 0,
                                    filters.category ? 1 : 0,
                                    filters.tags?.length ? 1 : 0,
                                    filters.ingredients?.length ? 1 : 0,
                                ].reduce((total, value) => total + value, 0)}{" "}
                                {[
                                    filters.name || filterName ? 1 : 0,
                                    filters.category ? 1 : 0,
                                    filters.tags?.length ? 1 : 0,
                                    filters.ingredients?.length ? 1 : 0,
                                ].reduce((total, value) => total + value, 0) === 1
                                    ? "critério"
                                    : "critérios"}
                            </span>
                        ) : null}
                    </div>

                    {/* Abrir filtros */}
                    <details className="relative z-[1100] shrink-0">
                        <summary className="flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-[#E8E1C8] bg-[#FFFDF5] px-3 text-xs font-semibold text-[#3F5145] transition hover:border-[#D9B64C] hover:bg-[#F6D77A]/30">
                            <span className="hidden">
                                filtros
                            </span>

                            <span className="text-[9px]">
                                ▼
                            </span>
                        </summary>

                        {/* Painel */}
                        <div
                            className="
                            fixed
                            left-2
                            right-2
                            top-[62px]
                            z-[9999]
                            max-h-[calc(100vh-72px)]
                            overflow-y-auto
                            rounded-xl
                            border
                            border-[#E8E1C8]
                            bg-white
                            p-3
                            shadow-2xl

                            sm:absolute
                            sm:left-auto
                            sm:right-0
                            sm:top-[calc(100%+8px)]
                            sm:max-h-[calc(100vh-100px)]
                            sm:w-[min(92vw,760px)]
                            sm:p-4
                        "
                        >
                            {/* Título */}
                            <div className="mb-4 border-b border-[#EEE7D2] pb-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h2 className="m-0 text-sm text-align-left font-bold text-[#3F5145] text-left">
                                            Filtrar pratos
                                        </h2>

                                        <p className="mt-0.5 text-[11px] text-[#8A8F82]">
                                            Escolha os critérios para encontrar um prato.
                                        </p>
                                    </div>

                                    {/* Limpar */}
                                    {(hasFilter) ? (
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
                                                updateFilters(newFilter);
                                                clearFilters();
                                            }}
                                            className="
                                            shrink-0
                                            cursor-pointer
                                            rounded-md
                                            border
                                            border-none
                                            px-2.5
                                            py-1.5
                                            text-[11px]
                                            font-medium
                                            text-[#697266]
                                            transition
                                            hover:bg-[#F5F1DF]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                            sm:px-3
                                            sm:py-2
                                            sm:text-xs
                                        "
                                        >
                                            {loading ? "Atualizando..." : "Limpar"}
                                        </button>
                                    ) : null}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {/* Nome */}
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
                                            onChange={(e) =>
                                                setFilterName(e.target.value)
                                            }
                                            placeholder="Buscar por nome..."
                                            className="w-full rounded-md border border-[#DDD8C7] py-2.5 pl-3 pr-10 text-sm text-[#566357] outline-none transition placeholder:text-[#B2B3A9] focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
                                        />

                                        <button
                                            type="button"
                                            disabled={true}
                                            onClick={() => {
                                                const newFilter = {
                                                    ...filters,
                                                    name: filterName,
                                                };

                                                updateFilters(newFilter);
                                            }}
                                            className="
                                                absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 
                                                cursor-default items-center justify-center rounded-md text-[#8A8F82] 
                                                transition hover:bg-[#F5F1DF] 
                                                hover:text-[#3F5145]"
                                                aria-label="Pesquisar
                                            "
                                        >
                                            🔍
                                        </button>
                                    </div>
                                </div>

                                {/* Categoria */}
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
                                        className="w-full rounded-md border border-[#DDD8C7] bg-white px-3 py-2.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A]"
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

                                {/* Tags */}
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

                                            updateFilters({
                                                ...filters,
                                                tags: selectedTags,
                                            });
                                        }}
                                        className="h-28 w-full cursor-pointer rounded-md border border-[#DDD8C7] bg-[#FFFDF5] p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A] sm:h-24"
                                    >
                                        {listTags?.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                                className="rounded px-2 py-2 sm:py-1.5"
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="mt-1 text-[10px] text-[#A0A49A]">
                                        Toque para selecionar ou remover
                                    </p>
                                </div>

                                {/* Ingredientes */}
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

                                            updateFilters({
                                                ...filters,
                                                ingredients: selectedIngredients,
                                            });
                                        }}
                                        className="h-28 w-full cursor-pointer rounded-md border border-[#DDD8C7] bg-[#FFFDF5] p-1.5 text-sm text-[#566357] outline-none transition focus:border-[#D9B64C] focus:ring-1 focus:ring-[#F6D77A] sm:h-24"
                                    >
                                        {listIngredients?.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                                className="rounded px-2 py-2 sm:py-1.5"
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="mt-1 text-[10px] text-[#A0A49A]">
                                        Toque para selecionar ou remover
                                    </p>
                                </div>
                            </div>

                            {/* Ações */}
                            <div className="mt-4 flex justify-end border-t border-[#EEE7D2] pt-3">
                                <button
                                    type="button"
                                    disabled={loading || !hasFilter}
                                    title="Selecione uma opção para filtrar"
                                    onClick={() => {
                                        handleFilters();
                                    }}
                                    className="
                                    w-full
                                    cursor-pointer
                                    rounded-md
                                    border
                                    border-[#DDD8C7]
                                    px-3
                                    py-2.5
                                    text-xs
                                    font-medium
                                    text-[#697266]
                                    transition
                                    hover:bg-[#F5F1DF]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    sm:w-auto
                                "
                                >
                                    {loading ? "Atualizando..." : "Filtrar"}
                                </button>
                            </div>
                        </div>
                    </details>
                </div>
            </section>
        </div>
    );
}