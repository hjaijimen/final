const faker = require('faker');
const con = require('./database');


// Open the database connection
con.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Function to seed fake users
const seedUsers = (numUsers) => {
    for (let i = 0; i < numUsers; i++) {
        const email = faker.internet.email();
        const fullName = faker.name.findName();
        const profession = faker.name.jobTitle();
        const passwordHash = faker.internet.password();
        
        const user = {
            email,
            full_name: fullName,
            profession,
            password_hash: passwordHash
        };

        // Insert the user into the database
        con.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) {
                console.error('Error seeding user:', err);
                return;
            }
            console.log('User seeded:', result.insertId);
        });
    }
};

// Function to seed fake form posts
const seedFormPosts = (numPosts) => {
    const formTypes = ['Type 1', 'Type 2', 'Type 3'];
    const statuses = ['pending', 'approved', 'rejected'];

    for (let i = 0; i < numPosts; i++) {
        const userId = faker.random.number({ min: 1, max: 10 });
        const formType = faker.random.arrayElement(formTypes);
        const formData = JSON.stringify({
            field1: faker.random.word(),
            field2: faker.random.number(),
            field3: faker.date.past()
        });
        const submissionDate = faker.date.past();
        const status = faker.random.arrayElement(statuses);
        const reviewerId = faker.random.number({ min: 1, max: 10 });
        const reviewComments = faker.lorem.sentence();
        const reviewDate = faker.date.past();
        
        const formPost = {
            user_id: userId,
            form_type: formType,
            form_data: formData,
            submission_date: submissionDate,
            status,
            reviewer_id: reviewerId,
            review_comments: reviewComments,
            review_date: reviewDate
        };

        // Insert the form post into the database
        con.query('INSERT INTO form_posts SET ?', formPost, (err, result) => {
            if (err) {
                console.error('Error seeding form post:', err);
                return;
            }
            console.log('Form post seeded:', result.insertId);
        });
    }
};

// Function to seed fake regulatory updates
const seedRegulatoryUpdates = (numUpdates) => {
    for (let i = 0; i < numUpdates; i++) {
        const updateText = faker.lorem.sentence();
        const updateDate = faker.date.past();

        const regulatoryUpdate = {
            update_text: updateText,
            update_date: updateDate
        };

        // Insert the regulatory update into the database
        con.query('INSERT INTO regulatory_updates SET ?', regulatoryUpdate, (err, result) => {
            if (err) {
                console.error('Error seeding regulatory update:', err);
                return;
            }
            console.log('Regulatory update seeded:', result.insertId);
        });
    }
};

// Function to seed fake notifications
const seedNotifications = (numNotifications) => {
    for (let i = 0; i < numNotifications; i++) {
        const userId = faker.random.number({ min: 1, max: 10 });
        const notificationText = faker.lorem.sentence();
        const notificationDate = faker.date.past();
        const isRead = faker.random.boolean();
        
        const notification = {
            user_id: userId,
            notification_text: notificationText,
            notification_date: notificationDate,
            is_read: isRead
        };

        // Insert the notification into the database
        con.query('INSERT INTO notifications SET ?', notification, (err, result) => {
            if (err) {
                console.error('Error seeding notification:', err);
                return;
            }
            console.log('Notification seeded:', result.insertId);
        });
    }
};

// Function to seed fake statistics
const seedStatistics = (numStatistics) => {
    for (let i = 0; i < numStatistics; i++) {
        const userId = faker.random.number({ min: 1, max: 10 });
        const totalIncome = faker.finance.amount();
        const totalExpenses = faker.finance.amount();
        const netProfit = faker.finance.amount();
        const numInvoices = faker.random.number();
        const numPaymentsReceived = faker.random.number();
        const taxDeductions = faker.finance.amount();
        const socialSecurityContributions = faker.finance.amount();
        const businessGrowthRate = faker.finance.amount();
        const avgMonthlyIncome = faker.finance.amount();
        const profitMargin = faker.finance.amount();
        
        const statistic = {
            user_id: userId,
            total_income: totalIncome,
            total_expenses: totalExpenses,
            net_profit: netProfit,
            num_invoices: numInvoices,
            num_payments_received: numPaymentsReceived,
            tax_deductions: taxDeductions,
            social_security_contributions: socialSecurityContributions,
            business_growth_rate: businessGrowthRate,
            avg_monthly_income: avgMonthlyIncome,
            profit_margin: profitMargin
        };

        // Insert the statistic into the database
        con.query('INSERT INTO statistics SET ?', statistic, (err, result) => {
            if (err) {
                console.error('Error seeding statistic:', err);
                return;
            }
            console.log('Statistic seeded:', result.insertId);
        });
    }
};

// Function to seed fake financial declarations
const seedFinancialDeclarations = (numDeclarations) => {
    for (let i = 0; i < numDeclarations; i++) {
        const userId = faker.random.number({ min: 1, max: 10 });
        const year = faker.random.number({ min: 2000, max: 2023 });
        const month = faker.random.number({ min: 1, max: 12 });
        const totalIncome = faker.finance.amount();
        const totalExpenses = faker.finance.amount();
        const netProfit = faker.finance.amount();
        const numInvoices = faker.random.number();
        const numPaymentsReceived = faker.random.number();
        const taxDeductions = faker.finance.amount();
        const socialSecurityContributions = faker.finance.amount();
        const businessGrowthRate = faker.finance.amount();
        const avgMonthlyIncome = faker.finance.amount();
        const profitMargin = faker.finance.amount();
        const annualTaxLiability = faker.finance.amount();
        const otherDeductions = faker.finance.amount();
        const taxCredits = faker.finance.amount();
        const finalTaxLiability = faker.finance.amount();
        
        const financialDeclaration = {
            user_id: userId,
            year,
            month,
            total_income: totalIncome,
            total_expenses: totalExpenses,
            net_profit: netProfit,
            num_invoices: numInvoices,
            num_payments_received: numPaymentsReceived,
            tax_deductions: taxDeductions,
            social_security_contributions: socialSecurityContributions,
            business_growth_rate: businessGrowthRate,
            avg_monthly_income: avgMonthlyIncome,
            profit_margin: profitMargin,
            annual_tax_liability: annualTaxLiability,
            other_deductions: otherDeductions,
            tax_credits: taxCredits,
            final_tax_liability: finalTaxLiability
        };

        // Insert the financial declaration into the database
        con.query('INSERT INTO financial_declaration SET ?', financialDeclaration, (err, result) => {
            if (err) {
                console.error('Error seeding financial declaration:', err);
                return;
            }
            console.log('Financial declaration seeded:', result.insertId);
        });
    }
};

// Function to seed fake invoices
const seedInvoices = (numInvoices) => {
    const statuses = ['pending', 'paid'];

    for (let i = 0; i < numInvoices; i++) {
        const userId = faker.random.number({ min: 1, max: 10 });
        const clientName = faker.company.companyName();
        const amount = faker.finance.amount();
        const status = faker.random.arrayElement(statuses);
        const dueDate = faker.date.future();
        
        const invoice = {
            user_id: userId,
            client_name: clientName,
            amount,
            status,
            due_date: dueDate
        };

        // Insert the invoice into the database
        con.query('INSERT INTO invoices SET ?', invoice, (err, result) => {
            if (err) {
                console.error('Error seeding invoice:', err);
                return;
            }
            console.log('Invoice seeded:', result.insertId);
        });
    }
};

// Function to seed fake social charges
const seedSocialCharges = (numCharges) => {
    for (let i = 0; i < numCharges; i++) {
        const userId = faker.random.number({ min: 1, max: 10 });
        const amount = faker.finance.amount();
        const month = faker.date.past();
        
        const socialCharge = {
            user_id: userId,
            amount,
            month
        };

        // Insert the social charge into the database
        con.query('INSERT INTO social_charges SET ?', socialCharge, (err, result) => {
            if (err) {
                console.error('Error seeding social charge:', err);
                return;
            }
            console.log('Social charge seeded:', result.insertId);
        });
    }
};

// Function to seed fake income and expense entries
const seedIncomeExpenseEntries = (numEntries) => {
    const entryTypes = ['income', 'expense'];

    for (let i = 0; i < numEntries; i++) {
        const userId = faker.random.number({ min: 1, max: 10 });
        const amount = faker.finance.amount();
        const category = faker.random.word();
        const entryType = faker.random.arrayElement(entryTypes);
        const entryDate = faker.date.past();
        
        const incomeExpenseEntry = {
            user_id: userId,
            amount,
            category,
            entry_type: entryType,
            entry_date: entryDate
        };

        // Insert the income/expense entry into the database
        con.query('INSERT INTO income_expense_entries SET ?', incomeExpenseEntry, (err, result) => {
            if (err) {
                console.error('Error seeding income/expense entry:', err);
                return;
            }
            console.log('Income/expense entry seeded:', result.insertId);
        });
    }
};

// Seed fake data into all tables
seedUsers(500); // Seed 10 fake users
seedFormPosts(500); // Seed 20 fake form posts
seedRegulatoryUpdates(500); // Seed 5 fake regulatory updates
seedNotifications(500); // Seed 10 fake notifications
seedStatistics(500); // Seed 10 fake statistics
seedFinancialDeclarations(500); // Seed 5 fake financial declarations
seedInvoices(500); // Seed 20 fake invoices
seedSocialCharges(500); // Seed 10 fake social charges
seedIncomeExpenseEntries(500); // Seed 30 fake income and expense entries

// Close the database connection
con.end(err => {
    if (err) {
        console.error('Error closing database connection:', err);
        return;
    }
    console.log('Disconnected from database');
});
