import {inject, Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {ICONS} from '../constants/const';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);

  public registerAll() {
    Object.values(ICONS).forEach(({name, url}) =>
      this.iconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(url)));
  }
}
