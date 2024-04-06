import React from 'react';

interface ColorPickerProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onColorChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="colorPicker">Choisir une couleur : </label>
            <input
                type="color"
                id="colorPicker"
                value={selectedColor}
                onChange={handleChange}
            />
        </div>
    );
};

export default ColorPicker;
