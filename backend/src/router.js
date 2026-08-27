import express from "express";

const router = express.Router();

router.get('/vendeur', async (req,res) => {
    try {
        const { code } = req.query;
        const { rows } = await pool.query("SELECT id FROM vendeurs WHERE numero_vendeur = $1", [code]);
        res.json({ "status": "OK", "code": rows[0] });
    } catch (error) {
        console.error("Probleme d'Id" , error);
        res.status(404).json({ error: error.message })
    }
});

router.get('/produits', async (req,res) => {
    try {
        const { rows } = await pool.query("SELECT id, nom, prix FROM produits");
        res.json({ "status": "OK", "produits": rows[0] });
    } catch (error) {
        console.error("Probleme de requete /produits", error)
        res.status(500).json({ error: error.message })
    } 
});

router.post('/vente', async (req,res) => {
    try{
        const { rows } = await pool.query(
            `INSERT INTO ventes (id, date, heure, vendeur_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [id, date, heure, vendeur_id]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        console.error("Probleme d'écriture /ventes", error);
        res.status(500).json({ error: error.message });
    }
});
