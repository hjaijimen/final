// fichier: models/DeclarationMensuelle.js
const mongoose = require('mongoose');

const DeclarationMensuelleSchema = new mongoose.Schema({
    mois: {
        type: Number,
        required: true
    },
    annee: {
        type: Number,
        required: true
    },
    totalRevenus: {
        type: Number,
        required: true
    },
    totalDepenses: {
        type: Number,
        required: true
    },
    revenuNet: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('DeclarationMensuelle', DeclarationMensuelleSchema);
