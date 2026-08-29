
function Identification({ code, onValider, onChange }) {
    return (
    <div className="identification">
         <input
                type="text"
                name="code"
                placeholder="Saisir votre code vendeur"
                value={code}
                onChange={onChange}
            />
        <button onClick={onValider}>Vérifier code</button>
    </div>
    )
}

export default Identification