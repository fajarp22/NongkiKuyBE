module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      categoryId: {
        type: Number,
      },
      id: {
        type: Number,
      },
      indicatorName: {
        type: String,
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

  const CategoryIndicator = mongoose.model('categoryIndicator', schema);
  return CategoryIndicator;
};
