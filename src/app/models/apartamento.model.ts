export class ApartamentoModel {

    id: number;
    andar: number;
    numApto: number;

    constructor(apto: ApartamentoModel = null) {
        if (apto) {
            this.id = apto.id;
            this.andar = apto.andar;
            this.numApto = apto.numApto;
        }
    }

}