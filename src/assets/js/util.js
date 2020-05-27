import XLSX from 'xlsx';
export default {
    // Lee la entrada de un input file que haya recivido un json, devuelve la primera hoja de un excel en formato json, 
    // se sugiere que el excel tenga su información a partir desde la primera celda y primera columna para simplificar el uso de esta funcionalidad
    leerExcel(files, hoja){
        return new Promise((resolve, reject) => {
            try{
                let c               = this;
                let reader          = new FileReader();
                // let nombreArchivo   = files[0].name;
                reader.onload   = (e) => {
                    let workbook                = XLSX.read( new Uint8Array(e.target.result) , {type: 'array'});
                    hoja                        = (hoja == undefined )? workbook.SheetNames[0] : hoja
                    console.log('hojas', hoja)
                    let worksheet               = workbook.Sheets[hoja];
                    resolve({ 
                        data : XLSX.utils.sheet_to_json(worksheet),
                        hojas: workbook.SheetNames,
                    });
                };
                reader.readAsArrayBuffer(files[0]) // LEER ARCHIVO
            } catch (e) {
                reject(e)
            }
        });
    },
}