import React from 'react';
import '../styles/logoGenerator.css'


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
        <>
        <div>
            <label htmlFor="fontselector">Choisir une police :</label >
            <select id="SelectorFont" value={selectedFont} onChange={handleChange}>
                {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                ))}
                </select>
            </div></>
    );
};

export default FontSelector;
