export class VisitorModel {

    _id: string;
    name: string;
    document: string;
    documentType: string;
    picture: File;
    obs: string;

    constructor(visitor: VisitorModel = null) {
        if (visitor) {
            this._id = visitor._id;
            this.name = visitor.name;
            this.document = visitor.document;
            this.documentType = visitor.documentType;
            this.picture = visitor.picture;
            this.obs = visitor.obs;
        }
    }

}