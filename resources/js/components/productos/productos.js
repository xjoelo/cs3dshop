import configService from '@/services/config'
const apiUrl = configService.apiUrl;

import Swal from 'SweetAlert2';
import moment from 'moment';
moment.locale('es-US');

export default {
  data() {
    return {
      id: 0,
      nombre: '',
      versionJuego: '',
      simulador: '',
      url: '',

      listDataProducts: {},
      //change image
      imagePreview: null,
      image: null,
      urlPath: `${apiUrl}/storage/`
    }
  },
  created() {
    this.getListDataProducts()
  },
  methods: {
    getListDataProducts(page = 1) {
      axios.get(`${apiUrl}producto/list?page=${page}`)
        .then(res => {
          this.listDataProducts = res.data
        })
    },
    sendFormProduct() {
      let formData = new FormData()
      formData.append('id',this.id)
      formData.append('nombre',this.nombre)
      formData.append('versionJuego',this.versionJuego)
      formData.append('simulador',this.simulador)
      formData.append('url',this.url)
      formData.append('imagen', this.image)

      if (this.id == 0) {
        axios.post(`${apiUrl}producto/create`,formData)
          .then(res => {
            Swal.fire('¡Bien!','Product Registrado con éxito','success')
             $('#modalProducto').modal('hide')
             this.getListDataProducts()
          })
      } else {
        axios.post(`${apiUrl}producto/update`,formData)
          .then(res => {
            Swal.fire('¡Bien!','Product Actualizado con éxito','success')
             $('#modalProducto').modal('hide')
             this.getListDataProducts()
          })
      }
    },
    openModalProduct() {
      this.clearInputs()
      $('#modalProducto').modal('show')
    },
    editDataProduct(dataProduct) {
      this.clearInputs()
      $('#modalProducto').modal('show')
      this.id = dataProduct.id
      this.nombre = dataProduct.nombre
      this.versionJuego = dataProduct.versionJuego
      this.simulador = dataProduct.simulador
      this.url = dataProduct.url
      this.imagePreview = `${this.urlPath}${dataProduct.imagen}`
    },
    deleteProduct(id) {
      Swal.fire({
        title: '¿Esta seguro eliminar el Producto?',
        text: "Este es un mensaje de confirmación",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFD900',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${apiUrl}producto/delete`, { id })
            .then(res => {
              Swal.fire('¡Bien!', 'Usuario Eliminado con exito', 'success')
              this.getListDataProducts()
            })
        }
      })
    },
    clearInputs() {
      this.id = 0
      this.nombre = ''
      this.versionJuego = ''
      this.simulador = ''
      this.url = ''
      this.image = null
      this.imagePreview = null

    },
    changeImage(e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      this.image = e.target.files[0]
      reader.onloadend = (e) => this.imagePreview = e.target.result
      reader.readAsDataURL(image)
    }
  },
}