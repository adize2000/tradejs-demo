var db = require('../accessDB')
  , util = require('util');


//GET
exports.companies = function (req, res) {
    console.log('*** companies');
    var top = req.query.$top;
    var skip = req.query.$skip;

    db.getCompanies(skip, top, function (err, data) {
        res.setHeader('X-InlineCount', data.count);
        if (err) {
            console.log('*** companies err');
            res.json({
                companies: data.companies
            });
        } else {
            console.log('*** companies ok');
            res.json(data.companies);
        }
    });
};

//GET
exports.shares = function (req, res) {
    console.log('*** shares');
    var top = req.query.$top;
    var skip = req.query.$skip;

    db.getShares(skip, top, function (err, data) {
        res.setHeader('X-InlineCount', data.count);
        if (err) {
            console.log('*** shares err');
            res.json({
                shares: data.shares
            });
        } else {
            console.log('*** shares ok');
            res.json(data.shares);
        }
    });
};

//GET
exports.updateShare = function (req, res) {
    console.log('*** update share');
    var share = req.body;

    db.updateShare(share, function (err, data) {
        if (err) {
            console.log('*** update shares err');
            res.json({ 'status': false });
        } else {
            console.log('*** update share ok');
            res.json({ 'status': true });
        }
    });
};

// GET
exports.customers = function (req, res) {
    console.log('*** customers');
    var top = req.query.$top;
    var skip = req.query.$skip;

    db.getCustomers(skip, top, function (err, data) {
        res.setHeader('X-InlineCount', data.count);
        if (err) {
            console.log('*** customers err');
            res.json({
                customers: data.customers
            });
        } else {
            console.log('*** customers ok');
            res.json(data.customers);
        }
    });
};

exports.customer = function (req, res) {
    console.log('*** customer');

    db.getCustomer(req.params.id, function (err, customer) {
        if (err) {
            console.log('*** customer err');
            res.json({
                customer: customer
            });
        } else {
            console.log('*** customer ok');
            res.json(customer);
        }
    });
};

exports.addCustomer = function (req, res) {
    console.log('*** addCustomer');
    db.getState(req.body.stateId, function (err, state) {
        if (err) {
            console.log('*** getState err');
            res.json({ 'status': false });
        } else {
            db.insertCustomer(req.body, state, function (err) {
                if (err) {
                    console.log('*** addCustomer err');
                    res.json(false);
                } else {
                    console.log('*** addCustomer ok');
                    res.json(req.body);
                }
            });
        }
    });
};

exports.editCustomer = function (req, res) {
    console.log('*** editCustomer');

    db.getState(req.body.stateId, function (err, state) {
        if (err) {
            console.log('*** getState err');
            res.json({ 'status': false });
        } else {
            db.editCustomer(req.params.id, req.body, state, function (err) {
                if (err) {
                    console.log('*** editCustomer err' + util.inspect(err));
                    res.json({ 'status': false });
                } else {
                    console.log('*** editCustomer ok');
                    res.json({ 'status': true });
                }
            });
        }
    });
};

exports.deleteCustomer = function (req, res) {
    console.log('*** deleteCustomer');

    db.deleteCustomer(req.params.id, function (err) {
        if (err) {
            console.log('*** deleteCustomer err');
            res.json({ 'status': false });
        } else {
            console.log('*** deleteCustomer ok');
            res.json({ 'status': true });
        }
    });
};

// GET
exports.states = function (req, res) {
    console.log('*** states');
    db.getStates(function (err, states) {
        if (err) {
            console.log('*** states err');
            res.json({
                states: states
            });
        } else {
            console.log('*** states ok');
            res.json(states);
        }
    });
};

exports.customersSummary = function (req, res) {
    console.log('*** customersSummary');
    var top = req.query.$top;
    var skip = req.query.$skip;

    db.getCustomersSummary(skip, top, function (err, summary) {
        res.setHeader('X-InlineCount', summary.count);
        if (err) {
            console.log('*** customersSummary err');
            res.json({
                customersSummary: summary.customersSummary
            });
        } else {
            console.log('*** customersSummary ok');
            res.json(summary.customersSummary);
        }
    });
};

exports.checkUnique = function (req, res) {
    console.log('*** checkUnique');

    var id = req.params.id,
    	value = req.query.value,
    	property = req.query.property;

    db.checkUnique(id, property, value, function (err, opStatus) {
        if (err) {
            console.log('*** checkUnique err');
            res.json({
                'status': false
            });
        } else {
            console.log('*** checkUnique ok');
            res.json(opStatus);
        }
    });
};

exports.login = function (req, res) {
    console.log('*** login');
    var userLogin = req.body.userLogin;
    var userName = userLogin.userName;
    var password = userLogin.password;

    //Simulate login
    res.json({ status: true });
};

exports.logout = function (req, res) {
    console.log('*** logout');

    //Simulate logout
    res.json({ status: true });
};





