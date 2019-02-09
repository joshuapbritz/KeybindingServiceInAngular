import { KeyBindService } from './services/key-bind.service';
import { Component } from '@angular/core';
import { merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private keybind: KeyBindService) {
    // Typical use case
    const metaUpKey$ = this.keybind
      .match('UP_ARROW', ['altKey'])
      .subscribe(() => alert('altKey + upArrow'));

    // Run the same function on multiple
    // bindings
    merge(
      this.keybind.match('LEFT_ARROW', ['altKey']),
      this.keybind.match('RIGHT_ARROW', ['altKey'])
    ).subscribe(() => alert('left or right arrow + alt'));

    setTimeout(() => {
      // stop listening to the binding after 10 seconds
      metaUpKey$.unsubscribe();
    }, 10000);
  }
}
