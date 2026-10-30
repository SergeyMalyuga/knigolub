import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ReviewDialogComponent } from '../../shared/components/review-dialog/review-dialog.component';
import { ReviewDialogData } from '../models/review-dialog-data.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewDialogService {
  private dialog = inject(Dialog);

  public openReviewDialog(data: ReviewDialogData): void {
    this.dialog.open(ReviewDialogComponent, {
      data,
      backdropClass: 'review-backdrop',
      panelClass: 'review-dialog-panel',
      ariaLabelledBy: 'review-title',
    });
  }
}
