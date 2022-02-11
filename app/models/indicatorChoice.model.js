module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      choiceName: {
        type: String,
      },
      decrement: {
        type: String,
        default: '0',
      },
      id: {
        type: Number,
      },
      indicatorId: {
        type: Number,
      },
      sequence: {
        type: Number,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const IndicatorChoice = mongoose.model('indicatorChoice', schema);
  return IndicatorChoice;
};
