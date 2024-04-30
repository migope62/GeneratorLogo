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
        <>
        <div className="custom-color-picker">
            <SketchPicker
                color={selectedColor}
                onChange={handleColorChange}
                styles={{
                    default: {
                        picker: {
                            backgroundImage: 'linear-gradient(to right, #1A2980 0%, #26D0CE 51%, #1A2980 100%)', 
                            color: 'white', 
                        },
                    },
                }}
            />
            </div></>
    );
};

export default CustomColorPicker;
