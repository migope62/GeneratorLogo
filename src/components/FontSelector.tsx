import React from 'react';


interface FontSelectorProps {
    selectedFont: string;
    onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ selectedFont, onFontChange }) => {
    const fonts = ['Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New', 'Montserrat'];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFontChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="fontSelector">Choisir une police :</label >
            <select id="fontSelector" value={selectedFont} onChange={handleChange}>
                {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                ))}
                </select>
        </div>
    );
};

export default FontSelector;
