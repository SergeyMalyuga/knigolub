import {inject, Injectable} from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {ReviewDialogComponent} from '../../shared/components/review-dialog/review-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewDialogService {
  private dialog = inject(Dialog);

  public openReviewDialog() {
    this.dialog.open(ReviewDialogComponent, {
      backdropClass: 'review-backdrop',
      panelClass: 'review-dialog-panel',
    })
  }
}
