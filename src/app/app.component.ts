import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { GuardsCheckEnd, NavigationCancel, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.removeGlobalLoader();
  }

  private removeGlobalLoader() {
    this.router.events
      .pipe(
        filter(event => event instanceof GuardsCheckEnd || event instanceof NavigationCancel),
        take(1)
      )
      .subscribe(() => {
        const loader = this.renderer.selectRootElement('#bankan-global-loader');
        this.renderer.setStyle(loader, 'display', 'none');
      });
  }
}
