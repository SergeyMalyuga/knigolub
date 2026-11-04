import {EntityState} from '@ngrx/entity';
import {ClubReview, ErrorResponse} from '@knigolub/shared';
import {HttpErrorResponse} from '@angular/common/http';
import {OperationStatus} from '../types/operation-status.type';
import {ActiveOperation} from '../types/active-operation.type';


export interface ClubReviewState extends EntityState<ClubReview> {
  activeOperation: ActiveOperation;
  status: OperationStatus;
  error: HttpErrorResponse | ErrorResponse | string | null;
}
