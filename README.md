# CREATE A KEYBINDING SERVICE IN ANGULAR

---

This is the example project for an Article on my blog. Check it out [here](https://joshbritz.co/codelabs/create-a-keybinding-service-in-angular).

---

To run this project, clone it to your device, open the folder, and run `npm install`.

Once the install is finished, run `npm start` to serve the project.

---

## How to use

Add the service to your constructor

```typescript
constructor(private keybind: KeyBindService) {}
```

Create your key binding matcher

```typescript
const metaKeyUpKey$ = this.keybind.match('UP_ARROW', ['altKey']);
```

Subscribe to the event to use it

```typescript
const subscription = metaKeyUpKey$.subscribe(() => alert('keybinding hit'))
```

Unsubscribe to stop listening to the event

```typescript
subscription.unsubscribe()
```
