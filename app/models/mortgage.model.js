const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      administrationFee: {
        type: Number,
      },
      branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cabangKantor',
      },
      // categoryName: {
      //   type: String,
      // },
      description: {
        type: String,
      },
      insuranceFee: {
        type: Number,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
      mortgageCode: {
        type: String,
      },
      mortgageCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nasabah',
      },
      productionYear: {
        type: Number,
      },
      serialNo: {
        type: String,
      },
      serviceInterest: {
        type: Number,
      },
      serviceLimit: {
        type: Number,
      },
      serviceOriginValue: {
        type: Number,
      },
      servicePercentage: {
        type: Number,
      },
      serviceReceived: {
        type: Number,
      },
      createdAt: {
        type: Date,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      latestPaymentMortgage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mortgagePayment',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      mortgageOriginCode: {
        type: String,
      },
      isRepayment: {
        type: Boolean,
        default: false,
      },
      isObsolete: {
        type: Boolean,
        default: false,
      },
      logMortgageCode: [
        {
          type: String,
        },
      ],
    },
    { timestamps: true }
  );
  schema.plugin(aggregatePaginate);

  const Mortgage = mongoose.model('mortgage', schema);
  return Mortgage;
};
