export default function ListDish({ dishes = [], loading, setCurrentPagePrev, setCurrentPageNext, currentPage, paginationTotalPages }) {
    return (
        <div className="bg-[#FFFDF5] p-3 sm:p-4">
            <section className="mx-auto grid max-w-6xl gap-4 grid-cols-2 lg:grid-cols-4">
                {dishes.length > 0 ? (
                            dishes.map((item) => (
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

                                        <div className="flex flex-wrap w-full items-center justify-center overflow-hidden rounded-md bg-[#F5F1DF] object-cover">
                                            {item.listImages?.length > 0 ? (
                                                item.listImages.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img}
                                                        alt={`${item.dishName} - imagem ${index + 1}`}
                                                        className="h-15 w-15 object-cover rounded-md m-2 transition duration-300 hover:scale-180"
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
                            <>
                                <div className="col-span-full rounded-xl border border-[#EEE7D2] bg-white px-4 py-10 text-center shadow-sm">
                                    <p className="text-base font-semibold text-[#3F5145]">
                                        Nenhum prato encontrado
                                    </p>

                                    <p className="mt-1 text-xs text-[#A5A89E]">
                                        Tente alterar os filtros da pesquisa.
                                    </p>
                                </div>

                            </>
                        )}
            </section>

            <div className="mx-auto mt-5 flex max-w-6xl items-center justify-center gap-2">

                <button
                    type="button"
                    onClick={() =>
                        setCurrentPagePrev()
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
                        setCurrentPageNext()
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
