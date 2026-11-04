import {OPERATION_STATUS} from '../constants/const';


export type OperationStatus = typeof OPERATION_STATUS[keyof typeof OPERATION_STATUS];
