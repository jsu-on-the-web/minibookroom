interface ButtonProps {
    className?: string;
    text: string;
    onClick: () => void;
}

export const Button = ({ className, text, onClick }: ButtonProps) => {
    return (
        <button className={`transition-all duration-100 p-4 h-full flex items-center justify-center rounded-lg bg-stone-400 hover:bg-stone-500 hover:shadow-lg ${className || ''}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;