import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  env?: string;
  title = 'potpot';

  ngOnInit() {
    this.env = environment.env;
  }
}
