export class ComboUtils {
    localizaItemId(id: string, itens: Array<any>) {
        let item: any;
        for (let index = 0; index < itens.length; index++) {
            if (itens[index]._id === id) {
                item = itens[index];
                break;
            }
        }
        return item;
    }
}