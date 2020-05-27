<template lang="pug">
    div
      div.carga.uk-text-center.uk-padding-small( v-if="cargando") #[span(uk-spinner, style="margin-right: 3px;")] Cargando 
      div( uk-grid )
        div( class="uk-width-1-3@m columna__accion")
          div.uk-padding-small
            h4( style="margin-bottom: 5px;" ) Filtros
            label.label Nombre del campo a filtrar
            input.input( type="text" v-model="campoFiltro") 
            label.label Texto a buscar
            input.input( type="text" v-model="textoBuscar") 
            ImportarExcel(
              class="uk-margin-top" 
              @elegirHoja="elegirHoja($event)"
              @datosProcesados="excelProcesado($event)"
              :hoja="nombreHoja" 
            ) Importar archivo excel
            div.alert.primary.small( v-if="dataExcel != null" )
              i( uk-icon="info")
              p #[b Puedes hacer click en una hoja para visualizar su contenido en JSON ]
        div( class="uk-width-2-3@m columna__data")
          div.uk-padding-small( v-if="dataExcel != null" )
            h4(v-if="hojaActual != null") Hoja visible: {{ this.hojaActual }}
            div.herramientas_json
              div.titulo__herramientas Herramientas
              label.label Tamaño de fuente (píxeles)
              input.input( type="number" min="5" max="24"  v-model="tamanoFuente") 
              button.button.secondary( @click="cambiarVista('html')" style="margin-right: 2px") Vista Html
              button.button.secondary( @click="cambiarVista('json')") Vista json
            pre.uk-margin-top( v-if="vista == 'json'" :style="'font-size:'+ tamanoFuente +'px;'") {{ dataExcel | buscador( textoBuscar, campoFiltro)}}
            table( v-if="vista == 'html' && encabezadosTabla != null" :style="'font-size:'+ tamanoFuente +'px;'")
              tr
                th( v-for="(encabezado, i ) in encabezadosTabla", :key="'encabezado'+ i") {{ encabezado }}
              tr( v-for="(fila, i) in dataExcel", :key="'fila'+i")
                td(v-for="(celda, j) in valoresHojaFila(fila, i)") {{ celda }}
          div( v-else )
            div.alert.primary Aquí podrás visualizar la data en formato JSON una vez importar el excel, por defecto se selecciona la primera hoja del archivo excel, si deseas ver la información de otro hoja, solo has click en los botones de hoja que apareceran en la sección de importacion despues de seleccionar un archivo excel.
</template>

<script>
import ImportarExcel from '../components/ImportarExcel';
export default {
    components: { ImportarExcel },
    data() {
      return {
        rutaImportacion   : '',
        dataExcel         : null,
        nombreHoja        : '',
        tags              : [],
        tag               : '',
        datosEnviar       : null,
        encabezadosTabla  : null,
        cargando          : false,
        textoBuscar       : null,
        campoFiltro       : null, 
        tamanoFuente      : 10,
        hojaActual        : null,
        vista             : 'json'
      }
    },
    methods: {
      excelProcesado(evento) {
        console.log('respuesta excel', evento)
        this.dataExcel  = evento.datos
        this.hojaActual = evento.hoja
        setTimeout( () => {
            this.encabezadosHoja(evento.datos)
        }, 1000)
      },
      encabezadosHoja(dataExcel) {
        this.encabezadosTabla = Object.keys(dataExcel[0])
        console.log(Object.keys(dataExcel[0]))
      },
      valoresHojaFila(item) {
        let valores = Object.values(item)
        return valores;
      },
      elegirHoja(evento) { //EVENTO QUE  SE EJECUTA AL HACER CLICK SOBRE UN ELEMENTO "Hoja" DEL COMPONENTE "ImportarExcel"
        this.nombreHoja = evento
      },
      cambiarVista(vista){
        this.vista = vista
      }
    },
    filters: {
      buscador(valor, textoBuscar, campoBuscar){
        if(textoBuscar != null && textoBuscar.length > 1 && (campoBuscar != null || campoBuscar.length > 0) ) {
          let valores = valor.filter((elemento) => {
            return (elemento[campoBuscar].toLowerCase().indexOf(textoBuscar.toLowerCase()) > -1);
          })
          return valores;
        } else {
          return valor
        }
      }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/estilo.scss';
    .carga {
        // border-radius: $default-border-radius;
        // background-color: $dark-color-accent;
        // color: $default-color;
    }
    .columna__accion{
      height: calc(100vh - 84px);
      box-shadow: 0px 5px 8px -3px rgba($color-primary, 0.5);
    }
    .columna__data{
        height: calc(100vh - 84px);
        padding-left: 0px;
        overflow-y: scroll;
        overflow-x: visible;
        z-index: 1;
    }
    .herramientas_json{
      position: fixed;
      top: 150px;
      right: 0px;
      background-color: rgba($color-gray, 1);
      padding: 0px 10px 10px 10px;
      font-size: .7rem;
      .titulo__herramientas{
        background-color: rgba($color-primary, .8);
        font-size: .8rem;
        color: $color-default;
        width: 150px;
        text-align: center;
        font-weight: 900;
      }
      .button{
        width: calc(50% -4px);
      }
    }
    pre{
      z-index: 1;
    }
</style>