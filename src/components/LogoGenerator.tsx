import React, { useState } from 'react';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';
import '../styles/LogoGenerator.css';

interface LogoGeneratorProps {
    // Définissez ici les éventuelles props que vous souhaitez utiliser
}

const LogoGenerator: React.FC<LogoGeneratorProps> = ({ }) => {
    // Déclaration des états pour les choix de l'utilisateur
    const [selectedColor, setSelectedColor] = useState<string>('#000000');
    const [selectedFont, setSelectedFont] = useState<string>('Arial');
    const [generatedLogo, setGeneratedLogo] = useState<string>('');

    // Fonction pour gérer le changement de couleur sélectionnée
    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    // Fonction pour gérer le changement de police de caractères sélectionnée
    const handleFontChange = (font: string) => {
        setSelectedFont(font);
    };
    // Ajoutez d'autres fonctions de gestion des changements pour d'autres choix de l'utilisateur

    // Fonction pour générer le logo en fonction des choix de l'utilisateur
    const generateLogo = () => {
        // Implémentez la logique de génération du logo en utilisant les choix de l'utilisateur  
        const logoText = 'Votre texte de logo ici'; 
        setGeneratedLogo(logoText); 
    };

    return (
        <div className='container'>
            {/* Interface utilisateur pour la sélection de couleur */}
            <div className="ColorPicker">
                <ColorPicker selectedColor={selectedColor} onColorChange={handleColorChange} /></div>

            {/* Interface utilisateur pour la sélection de police */}
            <div className="FontSelector">
                <FontSelector selectedFont={selectedFont} onFontChange={handleFontChange} />
            </div>

            <button onClick={generateLogo}>Générer le logo</button>

            {/* Affichage du logo généré */}
            {/* Affichez ici le logo généré en utilisant la valeur stockée dans l'état generatedLogo */}
            <div>{generatedLogo}</div>
        </div>

    );
};

export default LogoGenerator;
