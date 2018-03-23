# Headway
Headway is a lightweight library for tracking loading progress. It provides a mechanism for tracking and responding to completion of asynchronous tasks.

Use `Headway.track(..)` to wrap asynchronous code, then call `progress.update()` once the asychonous part(s) have completed.

### Contrived Example
1. Track two different image-loading tasks, one a weight of 1 and a second with a weight of 3:
```javascript
Headway.track(progress => {
  let img = new Image();
  img.src = '/path/to/someImage.png';
  img.onload = progress.update();
}); // default weight = 1

Headway.track(progress => {
  let img = new Image();
  img.src = '/path/to/someBiggerImage.png';
  img.onload = progress.update();
}, 3); // specific weight of 3
```
2. Respond to progress updates upon each tasks' completion:
```javascript
Headway.onUpdate(progress => {
  let progressPercent = progress.getPercentComplete();
  // progressPercent = 25 after task #1 completes, 100 after #2 completes.
  // e.g. update the status of a "loading bar" visual.
});
```
3. Respond to the completion of all tasks:
```javascript
Headway.onComplete(() => {
  // all tasks have completed.
  // e.g. start the game.
});
```
4. (Optional) Reset the progress tracker for re-use.
```javascript
Headway.reset();
```
