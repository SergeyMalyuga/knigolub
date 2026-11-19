import { createAction, props } from '@ngrx/store';
import { ErrorResponse, Message } from '@knigolub/shared';

export const createMessage = createAction(
  '[Chat Component] Create Message',
  props<{ text: string }>(),
);
export const createMessageSuccess = createAction(
  '[Message Effects] Create Message Success',
  props<{ message: Message }>(),
);
export const createMessageFailure = createAction(
  '[Message Effects] Create Message Failure',
  props<{ error: ErrorResponse }>(),
);

export const loadMessages = createAction('[Chat Component] Load Messages');
export const loadMessagesSuccess = createAction(
  '[Message Effects] Load Messages Success',
  props<{ messages: Message[] }>(),
);
export const loadMessagesFailure = createAction(
  '[Message Effects] Load Messages Failure',
  props<{ error: ErrorResponse }>(),
);

export const resetMessageStatus = createAction('[Message] Reset Message Status');
