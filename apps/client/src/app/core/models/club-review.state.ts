import {EntityState} from '@ngrx/entity';
import {ClubReview} from '@knigolub/shared';
import {HttpErrorResponse} from '@angular/common/http';


export interface ClubReviewState extends EntityState<ClubReview> {
  isLoading: boolean;
  error: HttpErrorResponse | string | null;
}
