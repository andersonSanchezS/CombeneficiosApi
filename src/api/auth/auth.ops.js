// eslint configurations
/* eslint-disable no-useless-escape */
//
const connection = require('../../core/database');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { sendEmail } = require('../../helpers/sendMail');
const HttpException = require('../../exceptions/httpException');

module.exports = {
  register(
    type,
    document,
    name,
    lastName,
    email,
    password,
    phone,
    gender,
    birthDate,
    department,
    city,
    imgUrl,
    dateTime
  ) {
    return new Promise((resolve, reject) => {
      let titularId;
      let departmentString;
      // password encryption
      const passHash = CryptoJS.AES.encrypt(password, 'siacsas').toString();
      // regular expression to validate the password
      const regexPass = /^[a-z0-9_-]{4,30}$/;
      // regular expression to validate the email
      const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      // Condition to validate the regex password validation
      if (regexPass.test(password) === false) {
        reject(
          new HttpException('la contraseña debe tener Mínimo 4 caracteres', 400)
        );
        // condition to validate the regex email validation
      } else if (regexEmail.test(email) === false) {
        reject(new HttpException('correo electrónico invalido', 400));
      } else {
        // phone validation
        connection.query(
          'select telefono from users where telefono = ?',
          [phone],
          (error, results) => {
            if (error) {
              reject(new HttpException(error, 500));
            } else if (results.length > 0) {
              reject(new HttpException('telefono en uso', 400));
            } else {
              // query to get the last id of the users table
              connection.query(
                'SELECT MAX(id) AS id FROM users',
                async (error, results) => {
                  if (error) {
                    reject(new HttpException(error, 500));
                  }
                  if (results[0].id === null) {
                    titularId = 1;
                  } else {
                    titularId = results[0].id + 1;
                  }
                }
              );
              // query to verify that the mail is in use
              connection.query(
                'SELECT * from users where email = ?',
                [email],
                (error, results) => {
                  if (error) {
                    reject(new HttpException(error, 500));
                  } else if (results.length > 0) {
                    reject(new HttpException('correo electrónico en uso', 400));
                  } else {
                    // query to get the department name using her id
                    connection.query(
                      'SELECT departamento from departamentos d where id_departamento = ?',
                      [department],
                      (error, results) => {
                        if (error) {
                          reject(new HttpException(error, 500));
                        } else {
                          departmentString = results[0].departamento;
                        }
                      }
                    );

                    // query to verify document is no in use
                    connection.query(
                      'SELECT * FROM users where nro_documento = ?',
                      [document],
                      (error, results) => {
                        if (error) {
                          reject(new HttpException(error, 500));
                        } else if (results.length === 0) {
                          // insert a user in the database
                          connection.query(
                            'insert into users set ?',
                            {
                              tipo_id: type,
                              nro_documento: document,
                              nombres: name,
                              apellidos: lastName,
                              sexo: gender,
                              email: email,
                              fecha_nacimiento: birthDate,
                              departamento: departmentString,
                              ciudad: city,
                              contrasena: passHash,
                              telefono: phone,
                              imgUrl: imgUrl,
                              parentesco_id: 1,
                              tipo_usuario: 2,
                              titular_id: titularId,
                              created_at: dateTime,
                              updated_at: dateTime,
                              estado: 'activo',
                            },
                            (error, results) => {
                              if (error) {
                                reject(new HttpException(error, 500));
                              } else {
                                resolve('registro exitoso');
                              }
                            }
                          );
                        } else {
                          reject(
                            new HttpException(
                              'este usuario ya se encuentra registrado'
                            )
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  },
};
