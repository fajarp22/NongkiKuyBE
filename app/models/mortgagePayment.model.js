module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      paymentDate: {
        type: Date,
        required: true,
      },
      paymentStatus: {
        type: String,
        required: true,
      },
      paymentLeft: {
        type: Number,
        required: true,
      },
      paymentValue: {
        type: Number,
        required: true,
      },
      interestValue: {
        type: Number,
        required: true,
      },
      mortgageCode: {
        type: String,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      isMigrated: {
        type: Boolean,
        default: false,
      },
      isRepayment: {
        type: Boolean,
        default: false,
      },
      paymentMethod: {
        type: String,
        default: 'cash',
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      newMortgageCode: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const MortgagePayment = mongoose.model('mortgagePayment', schema);
  return MortgagePayment;
};
