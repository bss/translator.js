describe("Translator.js", function () {

    describe("translation trigger", function () {

        it("should append translation trigger to body element", function () {
            var triggers = document.getElementsByClassName('translation-panel-trigger');
            expect(triggers.length).toBe(1);
        });

        it("should show translation panel when trigger is ", function () {
            var trigger = document.getElementsByClassName('translation-panel-trigger')[0],
                panel  = document.getElementsByClassName('translation-panel')[0],
                hasBeenCalled  = false;

            expect(window.getComputedStyle(panel).getPropertyValue("display")).toBe('none');

            panel.addEventListener('show', function () {
                hasBeenCalled = true;
            });
            trigger.dispatchEvent(new Event('click'));

            waitsFor(function () {
                return hasBeenCalled;
            }, "Panel show was never trigged", 5000);


            runs(function () {
                expect(window.getComputedStyle(panel).getPropertyValue("display")).toBe('display');
            });

        });

    });

    describe("translation panel", function () {
        it("should append translation panel div to body element", function () {
            expect(document.getElementsByClassName('translation-panel').length).toBe(1);
        });
    });

});