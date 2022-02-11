module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      branch: {
        type: String,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      date: {
        type: Date,
      },
      initialBalance: {
        type: Number,
        default: 0,
      },
      topUp: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );
  const BranchBalance = mongoose.model('branchBalance', schema);
  return BranchBalance;
};
