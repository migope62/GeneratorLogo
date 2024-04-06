import React from 'react';
import LogoGenerator from '../components/LogoGenerator';
import "../styles/globals.css";
import "../styles/logoGenerator.css";

const HomePage: React.FC = () => {
    return (
        <div>
            <LogoGenerator />
        </div>
    );
};

export default HomePage;
