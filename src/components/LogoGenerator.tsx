import React, { useState, useRef, useEffect } from 'react';
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
    const [image, setImage] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');
    const [logoWidth, setLogoWidth] = useState<number>(0);
    const [logoHeight, setLogoHeight] = useState<number>(0);
    const [logoShape, setLogoShape] = useState<string>('rectangle');
    const [containerReady, setContainerReady] = useState(false);
    const [customText, setCustomText] = useState<string>('Ecrire ici'); // Ajout de l'état pour le texte personnalisé
    const containerRef = useRef<HTMLDivElement>(null);

    // useEffect pour mettre à jour l'état containerReady lorsque l'élément référencé est rendu
    useEffect(() => {
        if (containerRef.current) {
            setContainerReady(true);
        }
    }, []);

    // Fonction pour gérer le changement de couleur de fond sélectionnée
    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };
  

    // Fonction pour gérer le changement du texte personnalisé
    const handleCustomTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomText(event.target.value);
    };

    // Fonction pour gérer le changement de couleur de texte sélectionnée
    const handleTextColorChange = (color: string) => {
        setTextColor(color);
    };

    // Fonction pour gérer le changement de police de caractères sélectionnée
    const handleFontChange = (font: string) => {
        setSelectedFont(font);
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

    

    // La fonction generateLogo utilise containerReady pour vérifier si l'élément référencé est prêt
    const generateLogo = () => {
        if (containerReady) {
            const logoText = `<span style="color: ${textColor}; font-family: ${selectedFont}; font-size: ${fontSize}px; font-weight: ${fontWeight}; letter-spacing: ${letterSpacing}px;">${customText}</span>`; // Utilisation du texte personnalisé
            const logoImage = image ? `<img src="${image}" alt="Logo" style="max-width: 100%; max-height: 100%;" />` : '';
            const logo = `${logoText} ${logoImage}`;
            setGeneratedLogo(logo);
            setImageURL(image);

            if (containerRef.current) {
                const width = logoWidth;
                const height = logoHeight;
                downloadImage(containerRef.current, width, height);
            } else {
                console.error("containerRef.current is null");
            }
        } else {
            console.error("Container is not ready yet");
        }
    };

    // Modifiez la fonction downloadImage() pour accepter un élément de type HTMLElement
    const downloadImage = (element: HTMLElement, width: number, height: number) => {
        htmlToImage
            .toPng(element, { width: width, height: height })
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
    };

    return (
        <>
            <div className="bigcontainer">
                <div className="container">
                    <CustomColorPicker selectedColor={backgroundColor} onColorChange={handleBackgroundColorChange} />
                    <label htmlFor="form">Choisissez une forme :</label>
                    <select id="form" value={logoShape} onChange={(e) => handleLogoShapeChange(e.target.value)}>
                        <option value="rectangle">Rectangle</option>
                        <option value="circle">Cercle</option>
                        <option value="triangle">Triangle</option>
                        <option value="losange">Losange</option>
                        <option value="hexagone">Hexagone</option>
                        <option value="etoile">Etoile</option>
                    </select>
                    <button onClick={() => {
                        const inputElement = document.getElementById('img');
                        if (inputElement) {
                            inputElement.click();
                        }
                    }}>Choisir un fichier</button>
                    <input id="img" type="file" accept="image/*" onChange={handleImageChange} className="equal-height" style={{ display: 'none' }} />
                    <label htmlFor="customText">Texte personnalisé:</label>
                    <input type="text" id="customText" value={customText} onChange={handleCustomTextChange} className="equal-height" />
                    <FontSelector selectedFont={selectedFont} onFontChange={handleFontChange} />
                    <label htmlFor="fontSize">Taille de police:</label>
                    <input type="number" id="fontSize" value={fontSize} onChange={handleFontSizeChange} className="equal-height" />
                    <label htmlFor="fontWeight">Poids de la police:</label>
                    <select id="fontWeight" value={fontWeight} onChange={handleFontWeightChange} className="equal-height">
                        <option value="normal">Normal</option>
                        <option value="bold">Gras</option>
                        <option value="italic">Italique</option>
                    </select>
                    <label htmlFor="letterSpacing">Espacement des lettres:</label>
                    <input type="number" id="letterSpacing" value={letterSpacing} onChange={handleLetterSpacingChange} className="equal-height" />
                    <label htmlFor="logoWidth">Largeur du logo:</label>
                    <input type="number" id="logoWidth" value={logoWidth} onChange={handleLogoWidthChange} className="equal-height" />
                    <label htmlFor="logoHeight">Hauteur du logo:</label>
                    <input type="number" id="logoHeight" value={logoHeight} onChange={handleLogoHeightChange} className="equal-height" />
                    
                    <button onClick={generateLogo}>Télécharger le logo</button>
                </div>
                <div className="mothercontainer2">
                    <div
                        ref={containerRef}
                        className={`container2 ${logoShape}`}
                        style={{
                            backgroundColor: backgroundColor,

                            fontFamily: selectedFont,
                            fontSize: `${fontSize}px`,
                            fontWeight: fontWeight,
                            letterSpacing: `${letterSpacing}px`,
                            color: textColor,

                        }}
                    ></div>

                </div>
            </div>
        </>
    );
};

export default LogoGenerator;
