    interface ButtonI{
        title : string;
        onClick : () => void;
        variant : "Primary" | "Secondary" | "Tertiary"
    }

    const variantP = {
        "Primary" : "h-[40px] w-[75%] bg-blue-950 text-white rounded-md",
        "Secondary" : "h-[40px] w-[7%] p-2 bg-white text-blue-800 rounded-md border border-slate-400",
        "Tertiary" : "h-[40px] w-[120px] p-2 bg-gray-800 text-white rounded-md border border-slate-400",
        "Fourth" : "h-[40px] underline bg-white text-blue-950 "
    }

    export function Button({title , onClick , variant} : ButtonI){
        return(
            <button className={`${variantP[variant]}`} onClick={onClick}>{title}</button>
        )
    }