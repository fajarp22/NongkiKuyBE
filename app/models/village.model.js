module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: {
        type: String,
      },
      id_district: {
        type: String,
      },
      village: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const Village = mongoose.model('village', schema);
  return Village;
};
