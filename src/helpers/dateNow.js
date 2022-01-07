function dateNow() {
  const hora = new Date().getHours();
  const minuto = new Date().getMinutes();
  const segundo = new Date().getSeconds();
  const fecha = hora + ':' + minuto + ':' + segundo;
  const date = new Date().toISOString().split('T')[0];
  const fechaYHora = date + ' ' + fecha;
  return fechaYHora;
}

module.exports = dateNow;
