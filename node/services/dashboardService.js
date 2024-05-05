const con = require('../database');

// Function to calculate business growth rate
const calculateBusinessGrowthRate = (currentIncome, previousIncome) => {
    if (previousIncome === 0) {
        return 0; // Prevent division by zero
    }
    return ((currentIncome - previousIncome) / previousIncome) * 100;
};

// Function to calculate statistics for the dashboard
exports.calculateDashboardStatistics = async (user_id, period) => {
    try {
        // Get total income, total expenses, and net profit
        const { totalIncome, totalExpenses, netProfit } = await getTotalFinancialData(user_id, period);

        // Get number of invoices issued
        const numInvoices = await getNumInvoices(user_id, period);

        // Get number of payments received
        const numPaymentsReceived = await getNumPaymentsReceived(user_id, period);

        // Get tax deductions and social security contributions
        const { taxDeductions, socialSecurityContributions } = await getFinancialStats(user_id, period);

        // Get total income for the previous period
        const previousTotalIncome = await getPreviousTotalIncome(user_id, period);

        // Calculate business growth rate
        const businessGrowthRate = calculateBusinessGrowthRate(totalIncome, previousTotalIncome);

        // Get average monthly income
        const averageMonthlyIncome = totalIncome / (period === 'MONTH' ? 1 : 12); // Assuming period is either 'MONTH' or 'YEAR'

        // Calculate profit margin
        const profitMargin = (netProfit / totalIncome) * 100;

        // Return the calculated statistics
        return {
            totalIncome,
            totalExpenses,
            netProfit,
            numInvoices,
            numPaymentsReceived,
            taxDeductions,
            socialSecurityContributions,
            businessGrowthRate,
            averageMonthlyIncome,
            profitMargin
        };
    } catch (error) {
        console.error('Error calculating dashboard statistics:', error);
        throw new Error('Internal server error');
    }
};

// Function to get total income, total expenses, and net profit
const getTotalFinancialData = async (user_id, period) => {
    try {
        const financialData = await con.query(
            "SELECT SUM(total_income) AS total_income, SUM(total_expenses) AS total_expenses FROM financial_declaration WHERE user_id = ? AND DATE_FORMAT(created_at, ?) = DATE_FORMAT(NOW(), ?)",
            [user_id, period, period]
        );
        console.log('Financial data:', financialData);

        if (financialData.length === 0) {
            return { totalIncome: 0, totalExpenses: 0, netProfit: 0 };
        }

        // Access the result data from the financialData array
        const totalIncome = financialData[0].total_income || 0;
        const totalExpenses = financialData[0].total_expenses || 0;
        const netProfit = totalIncome - totalExpenses;
        return { totalIncome, totalExpenses, netProfit };
    } catch (error) {
        console.error('Error fetching financial data:', error);
        throw error;
    }
};


// Function to get number of invoices issued
const getNumInvoices = async (user_id, period) => {
    const invoices = await con.query(
        "SELECT COUNT(*) AS num_invoices FROM invoices WHERE user_id = ? AND DATE_FORMAT(due_date, ?) = DATE_FORMAT(NOW(), ?)",
        [user_id, period, period]
    );
    return invoices[0].num_invoices || 0;
};

// Function to get number of payments received
const getNumPaymentsReceived = async (user_id, period) => {
    const payments = await con.query(
        "SELECT COUNT(*) AS num_payments_received FROM income_expense_entries WHERE user_id = ? AND entry_type = 'income' AND DATE_FORMAT(entry_date, ?) = DATE_FORMAT(NOW(), ?)",
        [user_id, period, period]
    );
    return payments[0].num_payments_received || 0;
};

// Function to get tax deductions and social security contributions
const getFinancialStats = async (user_id, period) => {
    const financialStats = await con.query(
        "SELECT tax_deductions, social_security_contributions FROM financial_declaration WHERE user_id = ? AND DATE_FORMAT(created_at, ?) = DATE_FORMAT(NOW(), ?)",
        [user_id, period, period]
    );
    const taxDeductions = financialStats[0].tax_deductions || 0;
    const socialSecurityContributions = financialStats[0].social_security_contributions || 0;
    return { taxDeductions, socialSecurityContributions };
};

// Function to get total income for the previous period
const getPreviousTotalIncome = async (user_id, period) => {
    const previousFinancialData = await con.query(
        "SELECT SUM(total_income) AS total_income FROM financial_declaration WHERE user_id = ? AND DATE_FORMAT(created_at, ?) = DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 " + period + "), ?)",
        [user_id, period, period]
    );
    return previousFinancialData[0].total_income || 0;
};
