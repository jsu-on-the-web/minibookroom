import React from 'react';
import RadioButton from '../RadioButton/RadioButton';

interface RadioButtonGroupProps {
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>;
    selectedValue: string;
    onChange: (value: string) => void;
    className?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
    name,
    options,
    selectedValue,
    onChange,
    className,
}) => {
    return (
        <div className={`radio-button-group ${className || ''}`}>
            {options.map((option) => (
                    <RadioButton
                    label={option.label}
                    name={name}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={() => onChange(option.value)} />
            ))}
        </div>
    );
};

export default RadioButtonGroup;