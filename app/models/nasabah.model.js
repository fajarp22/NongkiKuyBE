const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nama_nasabah: {
        type: String,
        uppercase: true,
        required: true,
      },
      identitasKtp: {
        type: String,
        uppercase: true,
        default: '-',
        required: true,
      },
      identitasSim: {
        type: String,
        uppercase: true,
        default: '-',
        required: true,
      },
      identitasNpwp: {
        type: String,
        uppercase: true,
        default: '-',
        required: true,
      },
      tempat_lahir: {
        type: String,
        uppercase: true,
        required: true,
      },
      tanggal_lahir: {
        type: Date,
        required: true,
      },
      nomor_telepon_rumah: {
        type: String,
        required: true,
        default: '0',
      },
      nomor_hp: {
        type: String,
        required: true,
        default: '0',
      },
      nama_ibu_kandung: {
        type: String,
        uppercase: true,
        required: true,
      },
      nama_darurat: {
        type: String,
        uppercase: true,
        required: true,
      },
      nomor_hp_darurat: {
        type: String,
        required: true,
      },
      status_hubungan: {
        type: String,
        uppercase: true,
        required: true,
      },
      alamat_ktp: {
        type: String,
        uppercase: true,
        required: true,
      },
      provinsi_ktp: {
        type: String,
        uppercase: true,
        required: true,
      },
      kota_ktp: {
        type: String,
        uppercase: true,
        required: true,
      },
      kecamatan_ktp: {
        type: String,
        uppercase: true,
        required: true,
      },
      kelurahan_ktp: {
        type: String,
        uppercase: true,
        required: true,
      },
      alamat_sekarang: {
        type: String,
        uppercase: true,
        required: true,
      },
      provinsi_sekarang: {
        type: String,
        uppercase: true,
        required: true,
      },
      kota_sekarang: {
        type: String,
        uppercase: true,
        required: true,
      },
      kecamatan_sekarang: {
        type: String,
        uppercase: true,
        required: true,
      },
      kelurahan_sekarang: {
        type: String,
        uppercase: true,
        required: true,
      },
      modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      modifiedAt: {
        type: Date,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  schema.plugin(mongoosePaginate);
  schema.plugin(aggregatePaginate);
  const Nasabah = mongoose.model('nasabah', schema);
  return Nasabah;
};
