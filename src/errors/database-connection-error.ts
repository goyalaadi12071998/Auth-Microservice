import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError {
    statusCode = 500
    reason = 'Error Connecting to datbase';
    constructor(){
        super('Error Connecting to datbase');
        Object.setPrototypeOf(this,DatabaseConnectionError);
    }
    serializeErrors(){
        return [
            {message : this.reason}
        ];
    }
}