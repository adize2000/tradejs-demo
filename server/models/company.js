var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


var CompanySchema = new Schema({
  StreamDate : {
    type : String, required: true, trim: true
  },
  IdCode : {
    type : String, required: true, trim: true
  },
  UpdateCode : {
    type : String, required: true, trim: true
  },
  UpdateTmst : {
    type : String, required: true, trim: true
  },
  ExchangeId : {
    type : String, required: true, trim: true
  },
  MarketId : {
	  type : String, required: true, trim: true
  },
  Symbol : {
	  type : String, required: true, trim: true
  },
  Name : {
	  type : String, required: true, trim: true
  },
  Isin : {
	  type : String, required: true, trim: true
  },
  AbbreviatedName : {
	  type : String, required: true, trim: true
  },
  IssueCurrency : {
	  type : String, required: true, trim: true
  },
  TradingCurrency : {
	  type : String, required: true, trim: true
  },
  PriceType : {
	    type : Number, required: true
	  },
  ListingDate : {
	  type : String, required: true, trim: true
  },
  SharesListed : {
	  type : String, required: true, trim: true
  },
  TotalIssue : {
	  type : String, required: true, trim: true
  },
  ShareCapital : {
	  type : String, required: true, trim: true
  },
  ReferencePriceLowerLimit : {
	  type : Number, required: true
  },
  OCPCalcMethod : {
	  type : Number, required: true
  },
  OCPCalcPeriod : {
	  type : Number, required: true
  },
});

CompanySchema.index({ IdCode: 1, type: 1 }); // schema level

exports.CompanySchema = CompanySchema;
module.exports = mongoose.model('Company', CompanySchema);
