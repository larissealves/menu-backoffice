function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#3F5145]/35">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EEE7D2] bg-[#FFFDF5] p-6" />
        </div>
    );
}

export default Loading;