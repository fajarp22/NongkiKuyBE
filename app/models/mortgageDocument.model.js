module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      documentDescription: {
        type: String,
      },
      documentPath: {
        type: String,
      },
      documentType: {
        type: String,
      },
      mortgageCode: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const MortgageDocument = mongoose.model('mortgageDocument', schema);
  return MortgageDocument;
};
