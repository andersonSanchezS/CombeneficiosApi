const formatDate = require('../../helpers/formatDate');
const dateNow = require('../../helpers/dateNow');
const { register } = require('./auth.ops');

exports.registerController = async (request, response, next) => {
  try {
    const type = request.body.tipo_id;
    const document = request.body.nro_documento;
    const name = request.body.nombres;
    const lastName = request.body.apellidos;
    const email = request.body.correo;
    const password = request.body.contrasena;
    const phone = request.body.telefono;
    const gender = request.body.sexo;
    const birthDate = request.body.fecha_nacimiento;
    const department = request.body.departamento;
    const city = request.body.ciudad;
    const imgUrl = `https://localhost:7000/public/users/${request.file.filename}`;
    const result = await register(
      type,
      document,
      name,
      lastName,
      email,
      password,
      phone,
      gender,
      formatDate(birthDate),
      department,
      city,
      imgUrl,
      dateNow()
    );
    response.status(200).json({
      error: false,
      msg: 'usuario creado',
      result,
    });
  } catch (error) {
    next(error);
  }
};
