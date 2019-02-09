import { Injectable } from '@angular/core';
import { KeyNames, hasKeycode, KEYS } from './keycodes';
import { ModifierKey, hasModifierKey } from './modifiers';
import { Observable, fromEvent } from 'rxjs';

// You can add any extra config here.
// Anything set in this class will
// automatically be overwritten if
// that option is passed into the
// constructor
export class MatchConfig {
  public listenOn: EventTarget = window;

  constructor(init: Partial<MatchConfig>) {
    Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root',
})
export class KeyBindService {
  constructor() {}

  public match(
    // The name of the key to match
    matchKey: KeyNames,
    // A list of modifier keys that must
    // be present for the event to fire
    matchModifiers: ModifierKey[] = [],
    // Extra options
    options?: MatchConfig
  ): Observable<KeyboardEvent> {
    // Get your config. If no options or any of
    // its properties are null, the default
    // values are used
    const { listenOn } = new MatchConfig(options);

    return new Observable(observer => {
      const listener$ = fromEvent(listenOn, 'keydown');

      listener$.subscribe((event: KeyboardEvent) => {
        if (
          hasKeycode(event, KEYS[matchKey]) &&
          (!matchModifiers.length || hasModifierKey(event, ...matchModifiers))
        ) {
          observer.next(event);
        }
      });
    });
  }
}
