import React from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import '../styles/logoGenerator.css'

interface CustomColorPickerProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ selectedColor, onColorChange }) => {
    const handleColorChange = (color: ColorResult) => {
        onColorChange(color.hex);
    };

    return (
        <div className="custom-color-picker">
            <SketchPicker
                color={selectedColor}
                onChange={handleColorChange}
                width="50%"
                height="100%"
            />
        </div>
    );
};

export default CustomColorPicker;
