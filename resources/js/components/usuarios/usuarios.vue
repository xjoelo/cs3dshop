<template>
  <div>

    <div class="modal fade" id="modalUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-300">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear Usuario</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-sm-12">
                <label for="fullName">Nombres y Apellidos *</label>
                <input v-model="fullName" type="text" class="form-control text-capitalize" id="fullName">
              </div>
              <div class="form-group col-sm-12">
                <label for="nroDocumento">
                  N° de Documento 
                  <span class="text-muted" style="font-size:10px">(Opcional)</span> 
                </label>
                <input v-model="nroDocumento" type="text" class="form-control" id="nroDocumento">
              </div>
              <div class="form-group col-sm-12">
                <label for="email">Correo Electrónico *</label>
                <input v-model="email" type="email" class="form-control" id="email">
              </div>
              <div class="form-group col-sm-12 mb-2">
                <label for="password">Contraseña *</label>
                <input v-model="password" type="password" class="form-control" id="password">
              </div>
              <div class="col-sm-12 mb-2">
                <label for="idRol">Rol *</label>
                <div class="input-group mb-3">
                  <select class="custom-select" id="idRol" v-model="idRol">
                    <option :value="1">Administrador</option>
                    <option :value="2">Cliente</option>
                  </select>
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
                <button type="button" class="btn btn-primary btn-block" @click="sendFormUser()"><i class="far fa-save"></i> Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalAddTruck" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Añadir Vehículos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-sm-12">
                <label for="fullName">Seleccione Vehículo</label>
                <div class="input-group">
                  <select class="custom-select" v-model="vehiculoSeleted" id="inputGroupSelect04" aria-label="Example select with button addon">
                    <option :value="null" > --Seleccione-- </option>
                    <option v-for="(vehiculos,index) in listDataVechiculos" :key="index" :value="vehiculos" > {{vehiculos.nombre}} - {{vehiculos.versionJuego}} </option>
                  </select>
                  <div class="input-group-append">
                    <button class="btn btn-warning" type="button" @click="addTruck()">Agregar</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th class="text-left">Nombre</th>
                        <th class="text-left">Versión Juego</th>
                        <th style="width: 50px;" class="text-danger"><i class="far fa-trash-alt"></i></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(vehiculo,index) in listVehiculoSeleted" :key="index">
                        <td> {{vehiculo.nombre}} </td>
                        <td>{{vehiculo.versionJuego}}</td>
                        <td> <button class="btn btn-danger"><i class="far fa-trash-alt mr-0"></i></button> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-12 row justify-content-center">
              <div class="col-sm-12 col-md-4">
                <button type="button" class="btn btn-danger btn-block" data-dismiss="modal"><i class="fas fa-ban"></i> Cancelar</button>
              </div>
              <div class="col-sm-12 col-md-4">
                <button type="button" class="btn btn-primary btn-block" @click="sendFormAddtruck()"><i class="far fa-save"></i> Guardar</button>
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
                <button class="btn btn-primary" @click="openModaluser()">
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
                    <th style="width:130px">Agregar Vehículo</th>
                    <th style="width:130px">Ver Vehículos</th>
                    <th style="width:150px">N° Documento</th>
                    <th class="text-left">Nombres y Apellidos</th>
                    <th class="text-left">Correo Electrónico</th>
                    <th class="text-left" style="width: 100px;">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user,index) in listDataUsers.data" :key="index">
                    <td class="text-center">
                      <button class="btn btn-sm btn-warning mr-0" title="Editar" @click="editDataUser(user)">
                        <i class="far fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-danger mr-0" title="Eliminar" @click="deleteUser(user.id)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="text-center"> 
                      <button 
                      @click="openModalAddTruck()"
                      class="btn btn-primary btn-block">
                        <i class="fas fa-truck"></i> 
                        Añadir
                      </button> 
                    </td>
                    <td class="text-center"> 
                      <button class="btn btn-primary btn-block">
                        <i class="far fa-eye"></i> 
                        Detalle
                      </button> 
                    </td>
                    <td class="text-center"> {{user.nroDocumento }} </td>
                    <td class="text-capitalize"> {{user.fullName}}</td>
                    <td> {{user.email}}</td>
                    <td> {{user.idRol == 1 ? 'Administrador' : 'Cliente'}} </td>
                  </tr>
                </tbody>
              </table>
              <pagination :data="listDataUsers" @pagination-change-page="getListDataUsers"></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/components/usuarios/usuarios.js"></script>