module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: {
        type: String,
      },
      id_regency: {
        type: String,
      },
      district: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const District = mongoose.model('district', schema);
  return District;
};
