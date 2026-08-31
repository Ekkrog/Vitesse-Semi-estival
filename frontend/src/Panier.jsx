function Panier({ produits }) {
    const total = produits.reduce((somme,item) => somme + item.prix, 0)
    return (
        <div className="panier">
            <h2>Votre panier</h2>
            <ul>
                {produits.map((item, index) => (
                    <li key={index}>
                        {item.nom} - {item.prix}€ 
                    </li>
                ))}
            </ul>
            <p>Total: {total}€</p>
        </div>
    );
}

export default Panier;
