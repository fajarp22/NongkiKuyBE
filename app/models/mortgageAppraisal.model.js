module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      choiceName: {
        type: String,
        required: true,
      },
      decrement: {
        type: String,
        required: true,
      },
      indicatorName: {
        type: String,
        required: true,
      },
      mortgageCode: {
        type: String,
        // required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const MortgageAppraisal = mongoose.model('mortgageAppraisal', schema);
  return MortgageAppraisal;
};
