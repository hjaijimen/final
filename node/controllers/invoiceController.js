// controllers/invoiceController.js

const con = require('../database');

// Get all invoices
exports.getAllInvoices = (req, res) => {
  const sql = 'SELECT * FROM invoices';
  con.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting invoices:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};

// Get invoices by user_id
exports.getInvoicesByUserId = (req, res) => {
  const { user_id } = req.params;
  const sql = 'SELECT * FROM invoices WHERE user_id = ?';
  con.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error getting invoices by user_id:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};

// Create a new invoice
exports.createInvoice = (req, res) => {
  const { user_id, client_name, amount, due_date } = req.body;
  const sql = 'INSERT INTO invoices (user_id, client_name, amount, due_date) VALUES (?, ?, ?, ?)';
  con.query(sql, [user_id, client_name, amount, due_date], (err, result) => {
    if (err) {
      console.error('Error creating invoice:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Invoice created successfully', id: result.insertId });
    }
  });
};


// Update an existing invoice
exports.updateInvoice = (req, res) => {
  const { invoice_id } = req.params;
  const { client_name, amount, due_date } = req.body;
  const sql = 'UPDATE invoices SET client_name = ?, amount = ?, due_date = ? WHERE invoice_id = ?';
  con.query(sql, [client_name, amount, due_date, invoice_id], (err, result) => {
    if (err) {
      console.error('Error updating invoice:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Invoice not found' });
    } else {
      res.json({ message: 'Invoice updated successfully' });
    }
  });
};

// Delete an invoice
exports.deleteInvoice = (req, res) => {
  const { invoice_id } = req.params;
  const sql = 'DELETE FROM invoices WHERE invoice_id = ?';
  con.query(sql, [invoice_id], (err, result) => {
    if (err) {
      console.error('Error deleting invoice:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Invoice not found' });
    } else {
      res.json({ message: 'Invoice deleted successfully' });
    }
  });
};
