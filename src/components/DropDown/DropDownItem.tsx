import { ComponentType } from "react";

function DropDownItem({
    Icon,
    text,
    onClick,
    isDanger = false,
}: {
    Icon: ComponentType<{
        className?: string;
    }>;
    text: string;
    isDanger?: boolean;
    onClick: () => void;
}) {
    const danger_style = isDanger ? "text-red-500" : "";
    return (
        <div
            className={"w-[150px] text-l flex " + danger_style}
            onClick={onClick}
        >
            <Icon className="mr-4"></Icon> {text}
        </div>
    );
}

export default DropDownItem;
