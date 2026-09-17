export default function Tooltip({
    className = "",
    tooltipContent,
    children,
}) {
    const shouldShowTooltip =
        typeof tooltipContent === "string" &&
        tooltipContent.length > 47;

    const getTooltipStyle = () => {
        switch (className) {
            case "message":
                return "bg-[#3F5145] text-white";

            case "alert":
                return "bg-[#F9E4A8] text-[#6B5418]";

            default:
                return "border border-[#E8E1C8] bg-[#FFFDF5] text-[#3F5145]";
        }
    };

    const getArrowStyle = () => {
        switch (className) {
            case "message":
                return "border-t-[#3F5145]";

            case "alert":
                return "border-t-[#F9E4A8]";

            default:
                return "border-t-[#FFFDF5]";
        }
    };

    return (
        <div className="group relative flex w-full items-center justify-center">
            <div className="flex w-full items-center justify-center">
                {children}
            </div>

            {shouldShowTooltip && (
                <div
                    className={`
                        pointer-events-none
                        absolute
                        bottom-full
                        left-1/2
                        z-[9999]
                        mb-2
                        w-max
                        max-w-[min(280px,calc(100vw-24px))]
                        -translate-x-1/2
                        break-all
                        whitespace-break-spaces
                        rounded-lg
                        px-3
                        py-2
                        text-center
                        text-xs
                        font-medium
                        leading-4
                        opacity-0
                        shadow-md
                        transition-opacity
                        duration-150
                        group-hover:opacity-100
                        ${getTooltipStyle()}
                    `}
                >
                    {tooltipContent}

                    <span
                        className={`
                            absolute
                            left-1/2
                            top-full
                            -translate-x-1/2
                            border-4
                            border-transparent
                            ${getArrowStyle()}
                        `}
                    />
                </div>
            )}
        </div>
    );
}