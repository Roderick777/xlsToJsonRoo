<template lang="pug">
    //- Al seleccionar un archivo excel este componente elmíte el evento "datosProcesados" 
    //- el cual retorna un objeto con datos relacionados al excel
    //- para acceder al array de json entregados por excel acceder a la propiedad datos
    div
        //- label.uk-label 
        //-     slot
        //- input( class="uk-input"                    
        //-     , @click="alElegirArchivo"
        //-     , v-model="nombreArchivo"
        //- )
        button.uk-button.btn-seleccionar( @click="alElegirArchivo" ) 
            slot
        input( type="file"
            , style="display: none"
            , ref="fileInput"
            , :accept="tipoArchivo"
            , @change="leerExcel($event, hoja)"
        )
        div.data__archivo( v-if="fileName.length > 0") #[div.titulo__data__archivo Nombre del archivo: ] 
            div.contenido__data__archivo {{ fileName }}
        div.data__archivo( v-if="hojasExcel != null" )
            div.titulo__data__archivo Hojas del excel   
            div.contenido__data__archivo
                span.hoja__data__archivo( v-for="(item, i) in hojasExcel" :key="'hoja_'+ i", @click="elegirHoja(item)" ) {{ item }}
</template>
<script>
import Util from '../assets/js/util.js'
export default {
    props:{
        hoja: {
            default: undefined,
        },
        tipoArchivo: {
            default: '*/*',
        }
    },
    data() {
        return {
            nombreArchivo       : '',
            fileName            : '',
            listaImportacion    : null,
            archivoExcel        : null,
            hojasExcel          : null,
        }
    },
    methods: {
        alElegirArchivo () { this.$refs.fileInput.click() },
        async leerExcelActual(e, hoja){
            debugger;
            hoja                    = ( hoja.length == 0 )? undefined : hoja;
            let dataExcel           = await Util.leerExcel(e.files, hoja)
            this.hojasExcel         = dataExcel.hojas
            this.fileName           = e.files[0].name;
            this.archivoExcel       = e.files[0]
            this.listaImportacion   = dataExcel.data
            this.$emit('datosProcesados', {
                datos: dataExcel.data,
                hoja: hoja      
            })
        },
        // async leerExcel(e){
        //     let dataExcel           = await Util.leerExcel(e.target.files)
        //     this.fileName           = e.target.files[0].name;
        //     this.archivoExcel       = e.target.files[0]
        //     this.listaImportacion   = dataExcel.data
        //     this.$emit('datosProcesados', {
        //         datos: dataExcel.data                
        //     })
        /* },*/
        async leerExcel(e, hoja){
            hoja                    = ( hoja.length == 0 )? undefined : hoja;
            let dataExcel           = await Util.leerExcel(e.target.files, hoja)
            this.hojasExcel         = dataExcel.hojas
            this.fileName           = e.target.files[0].name;
            this.archivoExcel       = e.target.files[0]
            this.listaImportacion   = dataExcel.data
            this.$emit('datosProcesados', {
                datos: dataExcel.data,
                hoja: (hoja == undefined)? dataExcel.hojas[0]: hoja            
            })
        },
        elegirHoja(item) {
            this.$emit('elegirHoja', item)
        }
    },
    watch: {
        hoja(valor) {
            // console.log('hoja cambio', valor)
            // console.log('hoja cambio', this.hojasExcel) 
            if(this.hojasExcel == null) { return }
            let existe = this.hojasExcel.find(k => k == valor);
            if(existe != undefined ) {
                // console.log(this.$refs.fileInput)
                this.leerExcelActual(this.$refs.fileInput, valor)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/estilo.scss';

.btn-seleccionar {
    width: 100%;
    background-color: $color-primary;
    color: $color-default;

    &:hover{
        background-color: rgba($color-primary, .9);
    }
}
.nombre-archivo {
    font-size: .8rem;
}
.data__archivo{
    margin-top: 10px;
    background-color: rgba($color-gray, .4);
    padding: 0px 10px 10px 10px;
    font-size: .7rem;
    .titulo__data__archivo{
        background-color: rgba($color-primary, .8);
        font-size: .8rem;
        color: $color-default;
        width: 150px;
        text-align: center;
        font-weight: 900;
    }
    .contenido__data__archivo{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .hoja__data__archivo{
        padding: 2px 5px;
        background-color: rgba(0,0,0, .4);
        color: $color-default;
        display: inline-block;
        margin-right: 2px;
        margin-bottom: 2px;
        transition: all .5s ease;
        cursor: pointer;
        &:hover{
            background-color: rgba(0,0,0, .7);
        }
    }
}

</style>