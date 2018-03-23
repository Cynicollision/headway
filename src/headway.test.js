(() => {
    const Headway = require('./headway');

    describe('headway', function () {
        let currentPercentComplete = 0;
        let completed = false;

        beforeEach(() => {
            Headway.onUpdate(progress => currentPercentComplete = progress.getPercentComplete());
            Headway.onComplete(() => completed = true);
        });

        afterEach(() => {
            Headway.reset();
        });

        it('tracks overall percent complete as tasks finish', (done) => {
            let completeTask1 = completeTask2 = completeTask3 = null;

            let p1 = new Promise((resolve, reject) => completeTask1 = resolve);
            let p2 = new Promise((resolve, reject) => completeTask2 = resolve);
            let p3 = new Promise((resolve, reject) => completeTask3 = resolve);

            // track 1st task with default weight (1)
            Headway.track(progress => p1.then(() => progress.update()));

            // track 2nd task with default weight (1)
            Headway.track(progress => p2.then(() => progress.update()));

            // track 3rd task with weight of 2
            Headway.track(progress => p3.then(() => progress.update()), 2);
            
            expect(currentPercentComplete).toBe(0);

            completeTask1();

            Promise.all([p1]).then(() => {
                expect(currentPercentComplete).toBe(25);

                completeTask2();

                Promise.all([p2]).then(() => {
                    expect(currentPercentComplete).toBe(50);
                    
                    completeTask3();

                    Promise.all([p3]).then(() => {
                        expect(currentPercentComplete).toBe(100);
                        expect(completed).toBe(true);

                        done();
                    });
                });
            });
        });
    });
})();