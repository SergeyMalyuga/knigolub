import { EntityState } from '@ngrx/entity';
import { ErrorResponse, Message } from '@knigolub/shared';
import { ActiveOperation } from '../types/active-operation.type';
import { OperationStatus } from '../types/operation-status.type';

export interface MessageState extends EntityState<Message> {
  activeOperation: ActiveOperation;
  status: OperationStatus;
  error: ErrorResponse | null;
}
