interface RadioButtonProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: () => void;
    className?: string;
}

export const RadioButton = ({ label, name, value, checked, onChange, className }: RadioButtonProps) => {
    return (
        <label className={`flex items-center gap-2 transition-opacity cursor-pointer hover:opacity-80 ${className || ''}`}>
            <input
                type="radio"
                className="w-4 h-4 cursor-pointer accent-stone-400"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className="text-stone-800">{label}</span>
        </label>
    );
}