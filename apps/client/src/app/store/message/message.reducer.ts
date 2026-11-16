import { createEntityAdapter } from '@ngrx/entity';
import { Message } from '@knigolub/shared';
import { MessageState } from '../../core/models/message.state';
import { ACTIVE_OPERATION, OPERATION_STATUS } from '../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import {
  createMessage,
  createMessageFailure,
  createMessageSuccess,
  resetMessageStatus,
} from './actions/message.actions';

export const messageAdapter = createEntityAdapter<Message>();
const initialState: MessageState = messageAdapter.getInitialState({
  activeOperation: ACTIVE_OPERATION.IDLE,
  status: OPERATION_STATUS.IDLE,
  error: null,
});

export const messageReducer = createReducer(
  initialState,
  on(createMessage, (state) => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.CREATE,
    status: OPERATION_STATUS.LOADING,
    error: null,
  })),
  on(createMessageSuccess, (state, { message }) =>
    messageAdapter.addOne(message, {
      ...state,
      activeOperation: ACTIVE_OPERATION.IDLE,
      status: OPERATION_STATUS.SUCCESS,
      error: null,
    }),
  ),
  on(createMessageFailure, (state, { error }) => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.IDLE,
    status: OPERATION_STATUS.ERROR,
    error,
  })),
  on(resetMessageStatus, (state) => ({
    ...state,
    status: OPERATION_STATUS.IDLE,
  })),
);
