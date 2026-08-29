import { useState } from "react";
import "./App.css";
import vendeur from "./vendeur.json";
import produits from "./produits.json";
import Identification from "./Identification";
import Article from "./Article";
import Panier from "./Panier";

function App() {
    const [code, setCode] = useState("");
    const [access, setAccess] = useState(false);
    const [panier, setPanier] = useState([]);

    const verifierCode = () => {
        const existe = vendeur.some((vendeur) => vendeur.code === code);
        setAccess(existe);
    };

    
    const ajouterAuPanier = (produit) => {
        setPanier([...panier, produit]);
    };

    return (
        <>
            <Identification 
            code={code}
            onChange={(element) => setCode(element.target.value)}
            onValider={verifierCode}
            />

            {access && (
            <>
            <Article produits={produits} onAjouter={ajouterAuPanier} />
            <Panier produits={panier}/>
        </>
            )}
        </>
    );
}

export default App;
