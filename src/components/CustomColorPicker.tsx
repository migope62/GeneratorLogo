import React from 'react';

interface CustomColorPickerProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ selectedColor, onColorChange }) => {
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        onColorChange(color);
    };

    return (
        <div className="custom-color-picker">
            <label htmlFor="fontSelector">Choisir une couleur : </label>
            <input 
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="color-input"
            />
        </div>
    );
};

export default CustomColorPicker;
