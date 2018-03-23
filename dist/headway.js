(() => {
    let elapsed = total = 0;
    let updateCallback = completeCallback = null;

    function Progress(weight) {
        this.weight = weight;
        total += weight;
    }

    Progress.prototype.update = function () {
        elapsed += this.weight;
        if (updateCallback) {
            updateCallback(this);
        }
        if (completeCallback && this.getPercentComplete() >= 100) {
            completeCallback();
        }
    };

    Progress.prototype.getPercentComplete = function() {
        return 100 * (elapsed / total);
    };

    let Headway = {
        track: (callback, weight) => callback(new Progress(weight || 1)),
        onUpdate: callback => updateCallback = callback,
        onComplete: callback => completeCallback = callback,
        reset: () => {
            elapsed = 0;
            total = 0;
        },
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Headway;
    }
    else {
        window.Headway = Headway;
    }
})();