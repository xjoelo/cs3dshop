<template>
  <div>

    <div class="modal fade" id="modalProducto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">             
              <div class="row">
                <div class="col-sm-12 col-md-6">
                  <div class="form-group col-sm-12">
                    <label for="nombre">Nombre Producto *</label>
                    <input v-model="nombre" type="text" class="form-control text-capitalize" id="nombre">
                  </div>
                  <div class="form-group col-sm-12">
                    <label for="versionJuego">
                      Versión de juego *
                    </label>
                    <input v-model="versionJuego" type="text" class="form-control" id="versionJuego">
                  </div>
                  <div class="form-group col-sm-12">
                    <label for="simulador">Simulador *</label>
                    <input v-model="simulador" type="text" class="form-control" id="simulador">
                  </div>
                  <div class="form-group col-sm-12 mb-2">
                    <label for="url">URL *</label>
                    <input v-model="url" type="text" class="form-control" id="url">
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div class="form-group text-center" >
                    <label for="imagen">IMAGEN</label>
                    <div class="input-group input-group-primary  imagen" >
                      <input type="file" class="form-control imagen__input" id="imagenProduct" accept=".jpg,.jpeg,.png" @change="changeImage">
                      <img :src="imagePreview == null ? `${urlPath}productos/defaul-1x1.png` : imagePreview " class="col-sm-12 imagen__img" alt="Imagen">
                    </div>
                    <span class="text-muted small">Seleccione una imagen, tamaño recomendado 600x300</span>
                  </div>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <div class="col-12 row justify-content-center">
              <div class="col-sm-12 col-md-2">
                <button type="button" class="btn btn-danger btn-block" data-dismiss="modal"><i class="fas fa-ban"></i> Cancelar</button>
              </div>
              <div class="col-sm-12 col-md-2">
                <button type="button" class="btn btn-primary btn-block" @click="sendFormProduct()"><i class="far fa-save"></i> Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header" style="background-color: #FFD900;">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <h5>
                  <i class="fas fa-users mr-2"></i>
                  GESTIÓN DE USUARIOS
                </h5>
              </div>
              <div class="col-sm-12 col-md-6 text-right">
                <button class="btn btn-primary" @click="openModalProduct()">
                  <i class="far fa-plus-square"></i>
                  Crear Usuario
                </button>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col-sm-12 col-md-3">
                <div class="form-group">
                  <label>Fecha Inicio</label>
                  <input type="date" v-model="buscarFechaInicio" class="form-control" @change="getListDataOperativos()">
                </div>
              </div>
              <div class="col-sm-12 col-md-3">
                <div class="form-group">
                  <label>Fecha Final</label>
                  <input type="date" v-model="buscarFechaFinal" class="form-control" @change="getListDataOperativos()">
                </div>
              </div>
              <div class="col-sm-12 col-md-2">
                <label>Exportar</label>
                <div class="form-group">
                  <button @click="exportarExcel" class="btn btn-success pr-4 pl-4"><i class="far fa-file-excel"></i> Exportar Excel</button>
                </div>
              </div>
            </div> -->
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th style="width:100px">Opciones</th>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Versión del Juego</th>
                    <th class="text-left">Simulador</th>
                    <th class="text-left">URL</th>
                    <th class="text-center" style="width: 110px">Imagen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product,index) in listDataProducts.data" :key="index">
                    <td class="text-center">
                      <button class="btn btn-sm btn-warning mr-0" title="Editar" @click="editDataProduct(product)">
                        <i class="far fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-danger mr-0" title="Eliminar" @click="deleteProduct(product.id)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="text-capitalize"> {{product.nombre }} </td>
                    <td> {{product.versionJuego}}</td>
                    <td> {{product.simulador}}</td>
                    <td> {{product.url}}</td>
                    <td>
                      <img :src="`${urlPath}${product.imagen}`" height="50px" alt="">
                    </td>
                  </tr>
                </tbody>
              </table>
              <pagination :data="listDataProducts" @pagination-change-page="getListDataProducts"></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/components/productos/productos.js"></script>
<style>
  .imagen{
		width: 100%;
    height: 200px;
    margin: 0;
    padding: 0;
		/* min-height: 200px; */
		background-image : url('/products/defaul-1x1.png');
		background-position : center;
		background-repeat: no-repeat;
		text-align: center;
		position: relative;
		overflow: auto;
		border: 2px solid #FFD900;
		z-index:0;
	}
	.imagen__input{
		opacity: 0;
    width: 100%;
    margin: 0;
    padding: 0;
		height: 100%;
		cursor: pointer;
		z-index: 1000;
	}
	.imagen__img{
    /* opacity: .2; */
    margin: 0;
    padding: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
    z-index: -1;
    
	}
</style>