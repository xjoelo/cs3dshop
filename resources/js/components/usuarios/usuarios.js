import configService from '@/services/config'
const apiUrl = configService.apiUrl;

import Swal from 'SweetAlert2';
import moment from 'moment';
moment.locale('es-US');

export default {
  data() {
    return {
      id: 0,
      nroDocumento: null,
      fullName: '',
      email: '',
      password: '',
      idRol: 2,

      listDataUsers: {},
      listDataVechiculos: [],
      vehiculoSeleted: null,
      listVehiculoSeleted: [],
    }
  },
  created() {
    this.getListDataUsers()
    this.getListDataVechiculos()
  },
  methods: {
    addTruck() {
      this.listVehiculoSeleted.push(this.vehiculoSeleted)
      this.vehiculoSeleted = null
    },
    openModalAddTruck() {
      $('#modalAddTruck').modal('show')
    },
    getListDataVechiculos() {
      axios.get(`${apiUrl}usuario/list-producto`)
        .then(res => {
          this.listDataVechiculos = res.data
        })
    },
    getListDataUsers(page = 1) {
      axios.get(`${apiUrl}usuario/list?page=${page}`)
        .then(res => {
          this.listDataUsers = res.data
        })
    },
    sendFormUser() {
      const data = {
        id: this.id,
        nroDocumento: this.nroDocumento,
        fullName: this.fullName,
        email: this.email,
        idRol: this.idRol
      }
      if (data.id == 0) {
        data.password = this.password
      } else {
        if (data.password != 'password') {
          data.password = this.password
        }
      }
      if (data.id == 0) {
        axios.post(`${apiUrl}usuario/create`,data)
          .then(res => {
            Swal.fire('¡Bien!','Usuario Registrado con exito','success')
            $('#modalUsuario').modal('hide')
            this.getListDataUsers()
          })
      } else {
        axios.post(`${apiUrl}usuario/update`,data)
          .then(res => {
            Swal.fire('¡Bien!','Usuario Actualizado con exito','success')
            $('#modalUsuario').modal('hide')
            this.getListDataUsers()
          })
      }
    },
    openModaluser() {
      this.clearInputs()
      $('#modalUsuario').modal('show')
    },
    editDataUser(dataUser) {
      this.clearInputs()
      $('#modalUsuario').modal('show')
      this.id = dataUser.id
      this.nroDocumento = dataUser.nroDocumento
      this.fullName = dataUser.fullName
      this.password = 'password'
      this.email = dataUser.email
      this.idRol = dataUser.idRol
    },
    deleteUser(id) {
      Swal.fire({
        title: '¿Esta seguro eliminar al Usuario?',
        text: "Este es un mensaje de confirmación",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFD900',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${apiUrl}usuario/delete`, { id })
            .then(res => {
              Swal.fire('¡Bien!', 'Usuario Eliminado con exito', 'success')
              this.getListDataUsers()
            })
        }
      })
    },
    clearInputs() {
      this.id = 0
      this.nroDocumento = ''
      this.fullName = ''
      this.password = ''
      this.idRol = 2
    },
  },
}