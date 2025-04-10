interface InputI{
    placeholder : string;
    reference : any;
    variant : "Primary"|"Secondary";
    type : string;
}

const variantSelector = {
    "Primary" : "h-[40px] w-[75%] border border-slate-400 rounded-md p-2",
    "Secondary" : "h-[40px] w-[90%] border border-slate-400 rounded-md p-2"
}

export function Input({placeholder , reference , variant , type}:InputI){
    return(
        <input type = {type} placeholder = {placeholder} ref = {reference} className={`${variantSelector[variant]}`}/>
    )
}