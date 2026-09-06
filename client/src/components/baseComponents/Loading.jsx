function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />
        </div>
    );
}

export default Loading;