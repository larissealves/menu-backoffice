export default function Popup({ children }) {
    const isEdit = true;
    const loading = false;
    const controlPopup = true;
    const handletoggleControlPopup = () => {

    }

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl h-auto max-h-[90vh] overflow-y-auto">

            {/*<div className="mb-4 flex items-center justify-between border-b pb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                    {isEdit ? 'Edit' : 'Create'} Tag
                </h2>

                !loading && (
                    <button
                        type="button"
                        onClick={handletoggleControlPopup}
                        className="cursor-pointer text-2xl font-bold leading-none text-gray-400 transition hover:text-gray-700"
                        aria-label="Close"
                    >
                        ×
                    </button>
                )
            </div>*/}

            {children}

        </div>
    </div>
);
}