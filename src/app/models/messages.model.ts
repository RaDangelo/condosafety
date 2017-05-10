export class MessagesModel {

    public static SEVERITIES = {
        SUCCESS: 'success',
        INFO: 'info',
        WARNING: 'warning',
        ERROR: 'error'
    }

    message: string;
    status: number;
    severity: string;
    title?: string;


    constructor(message = '', title = '', status = 200, severity = 'success') {
        this.message = message;
        this.status = status;
        this.title = title;
        this.severity = severity;
    }
}