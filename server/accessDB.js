// Module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Company = require('./models/company')
  , Share = require('./models/share')
  , Customer = require('./models/customer')
  , State = require('./models/state')
  , util = require('util');

// connect to database
module.exports = {
    // Define class variable
    myEventID: null,

    // initialize DB
    startup: function (dbToUse) {
        mongoose.connect(dbToUse);
        // Check connection to mongoDB
        mongoose.connection.on('open', function () {
            console.log('We have connected to mongodb');
        });

    },

    // disconnect from database
    closeDB: function () {
        mongoose.disconnect();
    },

    // get all the customers
    getCompanies: function (skip, top, callback) {
        console.log('*** accessDB.getCompanies');
        var count = 0;
        Company.find({}, { '_id': 0, 'Symbol': 1, 'Name': 1, 'AbbreviatedName': 1, 'SharesListed': 1, 'TotalIssue': 1, 'ShareCapital': 1, 'UpdateTmst': 1 },
            function (err, companies) {
                count = companies.length;
            })
        .skip(parseInt(skip))
        .limit(parseInt(top))
        .exec(function (err, companies) {
        	Company.count().exec(function(err, count) {
	            callback(null, {
	                count: count,
	                companies: companies
	            });
        	});
        });
    },

    // get all the shares
    getShares: function (skip, top, callback) {
        console.log('*** accessDB.getShares');
        var count = 0;
        Share.find({}, { '_id': 0, 'StreamDate': 1, 'IdCode': 1, 'OfficialClosingPrice': 1, 'LastPrice': 1, 'LastTradeVolume': 1, 'FirstPrice': 1, 'HighPrice': 1, 'LowPrice': 1, 'AccumulatedVolume': 1, 'TimeExec': 1, 'company': 1 },
            function (err, shares) {
                count = shares.length;
            })
        .skip(parseInt(skip))
        .limit(parseInt(top))
        .populate('company')
        .exec(function (err, shares) {
        	Share.count().exec(function(err, count) {
	            callback(null, {
	                count: count,
	                shares: shares
	            });
        	});
        });
    },
    
    updateShare: function (req_body, callback) {
        console.log('*** accessDB.updateShare');

        Share.findOne({ 'StreamDate': req_body.StreamDate, 'IdCode': req_body.IdCode }, {}, function (err, share) {
            if (err) { return callback(err); }

            share.LastPrice = req_body.LastPrice || share.LastPrice;

            share.save(function (err) {
                if (err) { console.log('*** accessDB.updateShare err: ' + err); return callback(err); }
                callback(null);
            });

        });
    },
    
    // get all the customers
    getCustomers: function (skip, top, callback) {
        console.log('*** accessDB.getCustomers');
        var count = 0;
        Customer.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'stateId': 1, 'orders': 1, 'orderCount': 1, 'gender': 1, 'id': 1 },
            function (err, customers) {
                count = customers.length;
            })
        .skip(parseInt(skip))
        .limit(parseInt(top))
        .exec(function (err, customers) {
            Customer.count().exec(function(err, count) {
                callback(null, {
                    count: count,
                    customers: customers
                });
            });
        });
    },

    // get the customer summary
    getCustomersSummary: function (skip, top, callback) {
        console.log('*** accessDB.getCustomersSummary');
        var count = 0;
        Customer.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'stateId': 1, 'orders': 1, 'orderCount': 1, 'gender': 1, 'id': 1 },
        	function (err, customersSummary) {
        	console.log('Error in getCustomersSummary in Customer.find: '+err);
                count = customersSummary?customersSummary.length:0;
            })
      .skip(parseInt(skip))
      .limit(parseInt(top))
      .exec(function (err, customersSummary) {
          Customer.count().exec(function(err, count) {
              callback(null, {
                  count: count,
                  customersSummary: customersSummary
              });
          });
      });
    },

    // get a  customer
    getCustomer: function (id, callback) {
        console.log('*** accessDB.getCustomer');
        Customer.find({ 'id': id }, {}, function (err, customer) {
            callback(null, customer[0]);
        });
    },

    // insert a  customer
    insertCustomer: function (req_body, state, callback) {
        console.log('*** accessDB.insertCustomer');

        var customer = new Customer();
        var s = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        customer.firstName = req_body.firstName;
        customer.lastName = req_body.lastName;
        customer.email = req_body.email;
        customer.address = req_body.address;
        customer.city = req_body.city;
        customer.state = s;
        customer.stateId = state[0].id;
        customer.zip = req_body.zip;
        customer.gender = req_body.gender;
        customer.id = 1; // The id is calculated by the Mongoose pre 'save'.

        customer.save(function (err, customer) {
            if (err) { console.log('*** new customer save err: ' + err); return callback(err); }

            callback(null, customer.id);
        });
    },

    editCustomer: function (id, req_body, state, callback) {
        console.log('*** accessDB.editCustomer');

        var s = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        Customer.findOne({ 'id': id }, { '_id': 1, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'stateId': 1, 'gender': 1, 'id': 1 }, function (err, customer) {
            if (err) { return callback(err); }

            customer.firstName = req_body.firstName || customer.firstName;
            customer.lastName = req_body.lastName || customer.lastName;
            customer.email = req_body.email || customer.email;
            customer.address = req_body.address || customer.address;
            customer.city = req_body.city || customer.city;
            customer.state = s;
            customer.stateId = s.id;
            customer.zip = req_body.zip || customer.zip;
            customer.gender = req_body.gender || customer.gender;


            customer.save(function (err) {
                if (err) { console.log('*** accessDB.editCustomer err: ' + err); return callback(err); }

                callback(null);
            });

        });
    },

    // delete a customer
    deleteCustomer: function (id, callback) {
        console.log('*** accessDB.deleteCustomer');
        Customer.remove({ 'id': id }, function (err, customer) {
            callback(null);
        });
    },

    // get a  customer's email
    checkUnique: function (id, property, value, callback) {
        console.log('*** accessDB.checkUnique');
        console.log(id + ' ' + value)
        switch (property) {
            case 'email':
                Customer.findOne({ 'email': value, 'id': { $ne: id} })
                        .select('email')
                        .exec(function (err, customer) {
                            console.log(customer)
                            var status = (customer) ? false : true;
                            callback(null, {status: status});
                        });
                break;
        }

    },

    // get all the states
    getStates: function (callback) {
        console.log('*** accessDB.getStates');
        State.find({}, {}, function (err, states) {
            callback(null, states);
        });
    },

    // get a state
    getState: function (stateId, callback) {
        console.log('*** accessDB.getState');
        State.find({ 'id': stateId }, {}, function (err, state) {
            callback(null, state);
        });
    }


}
