import express from "express";
import { pool } from "./db.js"

export const router = express.Router();


router.get('/', async (req, res) => {
    try {
        res.json("")
    } catch (error){
        console.error("Oh dommage ! C'est cassé.", error)
    }
})

router.get('/vendeur', async (req,res) => {
    try {
        const { code } = req.query;
        const { rows } = await pool.query("SELECT id FROM vendeurs WHERE numero_vendeur = $1", [code]);
        res.json({ "status": "OK", "id": rows[0]?.id });
    } catch (error) {
        console.error("Vendeur Inconnu" , error);
        res.status(404).json({ error: error.message })
    }
});

router.get('/produits', async (req,res) => {
    try {
        const { rows } = await pool.query("SELECT id, nom, prix, description FROM produits");
        res.json({ "status": "OK", "produits": rows });
    } catch (error) {
        console.error("Probleme de requete /produits", error)
        res.status(500).json({ error: error.message })
    } 
});

router.post('/vente', async (req,res) => {
    try{

        const now = new Date();
        const dateJour = now.toISOString.slice(0,10);
        const heures = now.toTimeString().slice(0, 8);

        const {vendeur_id, lignes} = req.body;

        const vente = await pool.query(
            `INSERT INTO ventes (date, heure, vendeur_id)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [dateJour, heures, vendeur_id]
        );
        // contient l'objet d'id vente.rows[0]

        const { rows } = await pool.query(
            `INSERT INTO ventes_lignes (vente_id, produit_id, quantite)
            VALUES ($1, $2, $3)`,
            [vente.row[0].id, lignes[0].produit_id, lignes[0].quantite]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        console.error("Probleme d'écriture /ventes", error);
        res.status(500).json({ error: error.message });
    }
});


