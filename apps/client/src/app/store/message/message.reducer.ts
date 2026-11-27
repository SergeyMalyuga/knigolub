import { createEntityAdapter } from '@ngrx/entity';
import { Message } from '@knigolub/shared';
import { MessageState } from '../../core/models/message.state';
import { ACTIVE_OPERATION, OPERATION_STATUS } from '../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import {
  createMessage,
  createMessageFailure,
  createMessageSuccess,
  loadMessages,
  loadMessagesFailure,
  loadMessagesSuccess,
  resetMessageStatus,
} from './actions/message.actions';
import { logout } from '../user/actions/user.actions';

export const messageAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});
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

  on(loadMessages, (state) => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.LOAD,
    status: OPERATION_STATUS.LOADING,
    error: null,
  })),
  on(loadMessagesSuccess, (state, { messages }) =>
    messageAdapter.addMany(messages, {
      ...state,
      activeOperation: ACTIVE_OPERATION.IDLE,
      status: OPERATION_STATUS.IDLE,
      error: null,
    }),
  ),
  on(loadMessagesFailure, (state, { error }) => ({
    ...state,
    error,
    activeOperation: ACTIVE_OPERATION.IDLE,
    status: OPERATION_STATUS.ERROR,
  })),

  on(logout, () => ({ ...initialState })),

  on(resetMessageStatus, (state) => ({
    ...state,
    status: OPERATION_STATUS.IDLE,
  })),
);
