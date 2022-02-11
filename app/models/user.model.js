const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      nama_user: {
        type: String,
        required: true,
      },
      status_user: {
        type: Boolean,
        required: true,
        default: true,
      },
      peran_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'peranUser',
      },

      kode_cabang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cabangKantor',
      },
    },
    { timestamps: true }
  );

  schema.plugin(aggregatePaginate);
  const User = mongoose.model('user', schema);
  return User;
};
