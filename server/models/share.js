var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Company = require('./company')
  , ObjectId = Schema.ObjectId;


var ShareSchema = new Schema({
  StreamDate : {
    type : String, required: true, trim: true
  },
  IdCode : {
    type : String, required: true, trim: true
  },
  UpdateTmst : {
    type : String, required: true, trim: true
  },
  OrderbookStateCode : {
    type : String, required: true, trim: true
  },
  TimeExec : {
	  type : String, required: true, trim: true
  },
  AdjustedClosingPrice : {
	  type : String, required: true, trim: true
  },
  LastPrice : {
	  type : String, required: true, trim: true
  },
  LastTradeVolume : {
	  type : String, required: true, trim: true
  },
  FirstPrice : {
	  type : String, required: true, trim: true
  },
  HighPrice : {
	  type : String, required: true, trim: true
  },
  LowPrice : {
	  type : String, required: true, trim: true
  },
  DiffLastPrice : {
	  type : Number, required: true
  },
  DiffLastPricePercent : {
	  type : String, required: true, trim: true
  },
  AccumulatedVolume : {
	  type : String, required: true, trim: true
  },
  AccumulatedTurnover : {
	  type : String, required: true, trim: true
  },
  NumberOfTrades : {
	  type : String, required: true, trim: true
  },
  MarketCap : {
	  type : String, required: true, trim: true
  },
  TWAP : {
	  type : String, required: true, trim: true
  },
  OfficialClosingPrice : {
	  type : String, required: true, trim: true
  },
  company: {
	  type: Schema.Types.ObjectId, ref: 'Company'
  }
});

ShareSchema.index({ IdCode: 1, type: 1 }); // schema level

exports.ShareSchema = ShareSchema;
module.exports = mongoose.model('Share', ShareSchema);
