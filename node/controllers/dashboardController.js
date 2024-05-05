const con = require('../database');
const dashboardService = require('../services/dashboardService');
const notificationEventHandler = require('../event/notificationEventHandler'); // Import the notificationEventHandler

// Get dashboard statistics for a user
exports.getDashboardStatistics = (req, res) => {
    const { user_id } = req.params;

    con.query("SELECT * FROM statistics WHERE user_id = ?", [user_id],
        (err, result) => {
            if (err) {
                console.error('Error fetching dashboard statistics:', err);
                res.status(500).json({ message: 'Internalsdfsdf server error' });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                } else {
                    res.status(404).json({ message: "Statistics not found for the user" });
                }
            }
        }
    );
};

// Submit monthly declaration
exports.submitMonthlyDeclaration = (req, res) => {
    const { user_id } = req.params;
    const { month, year, total_income, total_expenses, net_profit, num_invoices, num_payments_received, tax_deductions, social_security_contributions, business_growth_rate, avg_monthly_income, profit_margin } = req.body;

    con.query("INSERT INTO financial_declaration (user_id, month, year, total_income, total_expenses, net_profit, num_invoices, num_payments_received, tax_deductions, social_security_contributions, business_growth_rate, avg_monthly_income, profit_margin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [user_id, month, year, total_income, total_expenses, net_profit, num_invoices, num_payments_received, tax_deductions, social_security_contributions, business_growth_rate, avg_monthly_income, profit_margin],
        (err, result) => {
            if (err) {
                console.error('Error submitting monthly declaration:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                // Emit event for creating monthly declaration
                notificationEventHandler.handleNotificationEvent('monthly_declaration', { userId: user_id, action: 'create', declarationData: req.body });
                res.status(201).json({ message: "Monthly declaration submitted successfully" });
            }
        }
    );
};

// Get annual declaration
exports.getAnnualDeclaration = (req, res) => {
    const { user_id } = req.params;

    con.query("SELECT * FROM financial_declaration WHERE user_id = ? GROUP BY year", [user_id],
        (err, result) => {
            if (err) {
                console.error('Error fetching annual declaration:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "Annual declaration not found for the user" });
                }
            }
        }
    );
};

// Update monthly declaration
exports.updateMonthlyDeclaration = (req, res) => {
    const { user_id, declaration_id } = req.params;
    const { month, year, total_income, total_expenses, net_profit, num_invoices, num_payments_received, tax_deductions, social_security_contributions, business_growth_rate, avg_monthly_income, profit_margin } = req.body;

    con.query("UPDATE financial_declaration SET month = ?, year = ?, total_income = ?, total_expenses = ?, net_profit = ?, num_invoices = ?, num_payments_received = ?, tax_deductions = ?, social_security_contributions = ?, business_growth_rate = ?, avg_monthly_income = ?, profit_margin = ? WHERE user_id = ? AND id = ?", 
        [month, year, total_income, total_expenses, net_profit, num_invoices, num_payments_received, tax_deductions, social_security_contributions, business_growth_rate, avg_monthly_income, profit_margin, user_id, declaration_id],
        (err, result) => {
            if (err) {
                console.error('Error updating monthly declaration:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                // Emit event for updating monthly declaration
                notificationEventHandler.handleNotificationEvent('monthly_declaration', { userId: user_id, action: 'update', declarationId: declaration_id, updatedData: req.body });
                res.status(200).json({ message: "Monthly declaration updated successfully" });
            }
        }
    );
};

// Delete monthly declaration
exports.deleteMonthlyDeclaration = (req, res) => {
    const { user_id, declaration_id } = req.params;

    con.query("DELETE FROM financial_declaration WHERE user_id = ? AND id = ?", [user_id, declaration_id],
        (err, result) => {
            if (err) {
                console.error('Error deleting monthly declaration:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                // Emit event for deleting monthly declaration
                notificationEventHandler.handleNotificationEvent('monthly_declaration', { userId: user_id, action: 'delete', declarationId: declaration_id });
                res.status(200).json({ message: "Monthly declaration deleted successfully" });
            }
        }
    );
};


// Get monthly declaration
exports.getMonthlyDeclaration = (req, res) => {
    const { user_id, declaration_id } = req.params;

    con.query("SELECT * FROM financial_declaration WHERE user_id = ? AND id = ?", [user_id, declaration_id],
        (err, result) => {
            if (err) {
                console.error('Error fetching monthly declaration:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                } else {
                    res.status(404).json({ message: "Monthly declaration not found for the user" });
                }
            }
        }
    );
};



// Example endpoint to get dashboard statistics
// exports.getDashboardStatistics = async (req, res) => {
//     const user_id = req.params.user_id;
//     const period = req.params.period || 'MONTH'; // Assuming you pass the period as a parameter
//     try {
//         const statistics = await dashboardService.calculateDashboardStatistics(user_id, period);
//         res.status(200).json(statistics);
//     } catch (error) {
//         console.error('Error fetching dashboard statistics:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// Get total social security contributions
exports.getTotalSocialSecurityContributions = async (req, res) => {
    const { user_id } = req.params;
    try {
        const totalContributions = await dashboardService.calculateTotalSocialSecurityContributions(user_id);
        res.status(200).json({ total_contributions: totalContributions });
    } catch (error) {
        console.error('Error calculating total social security contributions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};