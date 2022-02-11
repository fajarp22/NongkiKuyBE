const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      kode_cabang: {
        type: String,
        unique: true,
        uppercase: true,
      },
      nama_cabang: {
        type: String,
        required: true,
      },
      alamat_cabang: {
        type: String,
        required: true,
      },
      kontak_cabang: {
        type: String,
        uppercase: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  schema.plugin(mongoosePaginate);
  const CabangKantor = mongoose.model('cabangKantor', schema);
  return CabangKantor;
};
