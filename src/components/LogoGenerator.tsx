import React, { useState } from 'react';
import FontSelector from './FontSelector';
import CustomColorPicker from './CustomColorPicker';
import * as htmlToImage from 'html-to-image';
import '../styles/logoGenerator.css';

interface LogoGeneratorProps { }

const LogoGenerator: React.FC<LogoGeneratorProps> = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
    const [textColor, setTextColor] = useState<string>('#000000');
    const [selectedFont, setSelectedFont] = useState<string>('Arial');
    const [fontSize, setFontSize] = useState<number>(16);
    const [fontWeight, setFontWeight] = useState<string>('normal');
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [generatedLogo, setGeneratedLogo] = useState<string>('');
    const [inputText, setInputText] = useState<string>('      Votre texte ici');
    const [image, setImage] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');
    const [logoWidth, setLogoWidth] = useState<number>(500);
    const [logoHeight, setLogoHeight] = useState<number>(500);
    const [logoShape, setLogoShape] = useState<string>('rectangle');

    // Fonction pour gérer le changement de couleur de fond sélectionnée
    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    // Fonction pour gérer le changement de couleur de texte sélectionnée
    const handleTextColorChange = (color: string) => {
        setTextColor(color);
    };

    // Fonction pour gérer le changement de police de caractères sélectionnée
    const handleFontChange = (font: string) => {
        setSelectedFont(font);
    };

    // Fonction pour gérer le changement de texte saisi par l'utilisateur
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    // Fonction pour gérer le changement de l'image importée
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Fonction pour gérer le changement de taille de police
    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(Number(event.target.value));
    };

    // Fonction pour gérer le changement de style de police
    const handleFontWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFontWeight(event.target.value);
    };

    // Fonction pour gérer le changement d'espacement des lettres
    const handleLetterSpacingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLetterSpacing(Number(event.target.value));
    };

   
    // Fonction pour gérer le changement de forme du logo
    const handleLogoShapeChange = (shape: string) => {
        setLogoShape(shape);
    };
    // Fonction pour gérer le changement de largeur du logo
    const handleLogoWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogoWidth(Number(event.target.value));
    };

    // Fonction pour gérer le changement de hauteur du logo
    const handleLogoHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogoHeight(Number(event.target.value));
    };


    // Fonction pour générer le logo en fonction des choix de l'utilisateur
    const generateLogo = () => {
        const logoText = `<span style="color: ${textColor}; font-family: ${selectedFont}; font-size: ${fontSize}px; font-weight: ${fontWeight}; letter-spacing: ${letterSpacing}px;">${inputText}</span>`;
        const logoImage = image ? `<img src="${image}" alt="Logo" style="width: ${logoWidth}px; height: ${logoHeight}px;" />` : '';

        const logo = `${logoText} ${logoImage}`;
        setGeneratedLogo(logo);
        setImageURL(image);
    };

    

    // Fonction pour gérer le téléchargement du logo généré
    const downloadImage = () => {
        if (generatedLogo) {
            const generatedLogoElement: HTMLElement | null = document.querySelector('.generated-logo');

            if (generatedLogoElement) {
                htmlToImage.toPng(generatedLogoElement, { width: 640, height: 448 })
                    .then(function (dataUrl) {
                        const link = document.createElement('a');
                        link.href = dataUrl;
                        link.download = 'logo.png';

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    })
                    .catch(function (error) {
                        console.error('Erreur lors de la conversion du logo en image PNG :', error);
                    });
            } else {
                console.error('Impossible de trouver l\'élément .generated-logo dans le DOM.');
            }
        }
    };


    return (
        <>
            <h1>Générez votre logo gratuitement</h1>
            <div className="container-wrapper">
            <div className='container'>
                    <label  htmlFor="img">Choisissez une forme :</label>
                    <select id="form" value={logoShape} onChange={(e) => handleLogoShapeChange(e.target.value)}>
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Cercle</option>
                    <option value="triangle">Triangle</option>
                    <option value="losange">Losange</option>
                    <option value="hexagone">Hexagone</option>
                    <option value="etoile">Etoile</option>
                </select>

                <div className="ColorPicker equal-height">
                    <CustomColorPicker selectedColor={backgroundColor} onColorChange={handleBackgroundColorChange} />
                </div>

                <div className="TextColorPicker equal-height">
                    <CustomColorPicker selectedColor={textColor} onColorChange={handleTextColorChange} />
                </div>

               
                <input id="text" type="text" value={inputText} onChange={handleTextChange} className="equal-height" />
                    <div className="FontSelector equal-height">
                        <FontSelector selectedFont={selectedFont} onFontChange={handleFontChange} />
                    </div>
                    <label  htmlFor="img">Télécharger le logo:</label>
                    <input id="img" type="file" accept="image/*" onChange={handleImageChange} className="equal-height" />

                <label htmlFor="fontSize">Taille de police:</label>
                <input type="number" id="fontSize" value={fontSize} onChange={handleFontSizeChange} className="equal-height" />

                <label htmlFor="fontWeight">Style de police:</label>
                <select id="fontWeight" value={fontWeight} onChange={handleFontWeightChange} className="equal-height">
                    <option value="normal">Normal</option>
                    <option value="bold">Gras</option>
                    <option value="italic">Italique</option>
                </select>

                <label htmlFor="letterSpacing">Espacement des lettres:</label>
                <input type="number" id="letterSpacing" value={letterSpacing} onChange={handleLetterSpacingChange} className="equal-height" />

                <label htmlFor="logoWidth">Largeur du logo:</label>
                <input type="number" id="logoWidth" value={logoWidth} onChange={handleLogoWidthChange} className="equal-height" />

                    <label  htmlFor="logoHeight">Hauteur du logo:</label>
                <input type="number" id="logoHeight" value={logoHeight} onChange={handleLogoHeightChange} className="equal-height" />

                <button onClick={generateLogo}>Générer le logo</button>
                <button onClick={downloadImage}>Télécharger le logo</button>
            </div>
                <div className={`container2 ${logoShape}`} style={{ backgroundColor: backgroundColor, width: `${logoWidth}px`, height: `${logoHeight}px` }}>
                    <div className="generated-logo" style={{ color: textColor }} dangerouslySetInnerHTML={{ __html: generatedLogo }}></div>
                </div>
            </div>

            
        </>
    );
};

export default LogoGenerator;