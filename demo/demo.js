(() => {
    // Track a three calls using the default weight (1).
    Headway.track(progress => {
        // load some image, update progress once loaded (or errored).
        let img = new Image();
        img.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

        img.onload = img.onerror = () => progress.update();
    });

    Headway.track(progress => {
        // update progress after waiting 1 - 2 seconds
        setTimeout(() => progress.update(), 1000 + (1000 * Math.random()));
    });

    Headway.track(progress => {
        // update progress after waiting 1 - 2 seconds
        setTimeout(() => progress.update(), 1000 + (1000 * Math.random()));
    });

    // Track a fourth call with a weight of 2 since we expect this one to do more work than some of the other calls.
    Headway.track(progress => {
        // update progress after waiting 1.5 - 2.5 seconds
        setTimeout(() => progress.update(), 1500 + (1000 * Math.random()));
    }, 2);

    // Track a fifth call with a weight of 3 since we expect this one to do the most work.
    Headway.track(progress => {
        // update progress after waiting 1.5 - 3 seconds
        setTimeout(() => progress.update(), 1500 + (1500 * Math.random()));
    }, 3);

    // Update the UI with the percentage of completed progress each time progress is updated.
    Headway.onUpdate(progress => {
        let progressPercent = progress.getPercentComplete();

        document.getElementById('progress-status').innerText = (Math.round(progressPercent * 100) / 100) + '%';
        document.getElementById('progress-bar').style.width = progressPercent + '%';
    });

    Headway.onComplete(() => {
        document.getElementById('progress-status').innerText = 'Complete!';
    })
})();