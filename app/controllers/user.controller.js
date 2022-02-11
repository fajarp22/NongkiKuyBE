const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const config = require('../config/auth.config.js');
const db = require('../models/index.js');

moment.locale('id');

const User = db.user;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const aggregate = (filter) =>
  User.aggregate([
    {
      $lookup: {
        from: 'peranusers',
        localField: 'peran_user',
        foreignField: '_id',
        as: 'peranuser',
      },
    },
    { $unwind: '$peranuser' },
    {
      $lookup: {
        from: 'cabangkantors',
        localField: 'kode_cabang',
        foreignField: '_id',
        as: 'cabangkantor',
      },
    },
    { $unwind: '$cabangkantor' },
    {
      $match: {
        $and: [
          {
            $or: [
              {
                username: {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
              {
                nama_user: {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
              {
                'cabangkantor.kode_cabang': {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
              {
                'peranuser.peran': {
                  $regex: filter.searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&'
                  ),
                  $options: 'i',
                },
              },
            ],
          },
          {
            'cabangkantor.kode_cabang': {
              $regex: filter.branch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
          {
            'peranuser.peran': {
              $regex: filter.role.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
        ],
      },
    },
    {
      $project: {
        username: 1,
        nama_user: 1,
        'peranuser.peran': 1,
        'cabangkantor.kode_cabang': 1,
      },
    },
  ]);

module.exports.create = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    nama_user: req.body.nama_user,
    peran_user: req.body.peran_user,
    // status_user: req.body.status_user,
    kode_cabang: req.body.kode_cabang,
  });
  user
    .save(user)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Terjadi kesalahan pada saat pembuatan user. Error: ${err.message}`,
      });
    });
};

module.exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate('peran_user')
    .populate('kode_cabang')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      } else if (!user) {
        res.status(404).send({ message: 'Username atau password salah.' });
      } else {
        const validated = bcrypt.compareSync(req.body.password, user.password);
        if (!validated) {
          res.status(401).send({
            authToken: null,
            message: 'Username atau password salah.',
          });
        } else {
          const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 50400,
          });
          // TODO: remove send
          res.status(200).header('x-access-token', token).send({
            id: user.id,
            username: user.username,
            authToken: token,
          });
        }
      }
    });
};

module.exports.getUserByToken = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send();
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: 'Akses ditolak',
        });
      } else {
        User.findById(decoded.id)
          .lean()
          .populate('peran_user')
          .populate('kode_cabang')
          .select('kode_cabang nama_user peran_user')
          .then((data) => {
            if (!data)
              res.status(404).send({ message: 'Data user tidak ditemukan.' });
            else res.send(data);
          })
          .catch(() => {
            res
              .status(500)
              .send({ message: 'Terjadi kesalahan pada pencarian data user.' });
          });
      }
    });
  }
};

module.exports.findAll = (req, res) => {
  const { limit, offset } = getPagination(
    req.body.pageNumber - 1,
    req.body.pageSize
  );
  User.aggregatePaginate(aggregate(req.body), {
    sort: { [req.body.sortField]: req.body.sortOrder },
    lean: true,
    limit,
    offset,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.findOne = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('peran_user')
    .populate('kode_cabang')
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Data user tidak ditemukan.' });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: 'Terjadi kesalahan pada pencarian data user.' });
    });
};

module.exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data user tidak boleh kosong!',
    });
  } else {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: 'Data user tidak dapat diperbarui.',
          });
        } else res.send({ message: 'Data user sukses diperbarui.' });
      })
      .catch(() => {
        res.status(500).send({
          message: 'Terjadi kesalahan saat memperbarui data user.',
        });
      });
  }
};

module.exports.delete = (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Data user tidak dapat dihapus.',
        });
      } else {
        res.send({
          message: 'Data user sukses dihapus.',
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Terjadi kesalahan saat menghapus data user.',
      });
    });
};
