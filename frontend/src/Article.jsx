function Article ({ produits, onAjouter }) {
    return (
         <div className="options">
                    {produits.map((produit) => (
                        <button
                            key={produit.id}
                            onClick={() => onAjouter(produit)}>
                        
                            <p>
                                {produit.nom}, {produit.prix}€
                            </p>
                        </button>
                    ))}
            </div>
    )
}
export default Article