import {Directive, DOCUMENT, inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {CdkDrag, CdkDragEnd} from '@angular/cdk/drag-drop';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: '[appChatDragConstraint]',
  standalone: true
})
export class ChatDragConstraintDirective implements OnInit {
  @Input() minWidthVisible = 955;
  @Input() minHeightVisible = 110;

  private isBrowser = false;
  private readonly dragRef = inject(CdkDrag, {host: true});

  private document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private windowRef = this.document.defaultView;

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.dragRef.ended.subscribe((event: CdkDragEnd) => {
        this.clampPosition(event);
      });
    }
  }

  private clampPosition(event: CdkDragEnd): void {
    if (!this.isBrowser) return;

    const pos = event.source.getFreeDragPosition();
    const screenWidth = this.windowRef?.innerWidth ?? 0;
    const screenHeight = this.windowRef?.innerHeight ?? 0;

    const minX = -(screenWidth - this.minWidthVisible);
    const maxX = 0;

    const minY = -(screenHeight - this.minHeightVisible);
    const maxY = 0;

    const clampedX = Math.max(minX, Math.min(maxX, pos.x));
    const clampedY = Math.max(minY, Math.min(maxY, pos.y));

    if (pos.x !== clampedX || pos.y !== clampedY) {
      event.source.setFreeDragPosition({x: clampedX, y: clampedY});
    }
  }
}
