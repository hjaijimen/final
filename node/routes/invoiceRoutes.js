// routes/invoiceRoutes.js

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// GET all invoices
router.get('/', invoiceController.getAllInvoices);

// GET invoices by user_id
router.get('/:user_id', invoiceController.getInvoicesByUserId);

// POST a new invoice
router.post('/', invoiceController.createInvoice);

// PUT update an existing invoice
router.put('/:id', invoiceController.updateInvoice);

// DELETE an invoice
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
