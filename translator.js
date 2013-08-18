(function () {
    'use strict';

    var root = this;

    var TranslationStores = {
        DOM: function (options) {
            var translations = {};

            this.load = function () {
                var cls = getOpt(options, "class", "translation");
                forEach(document.getElementsByClassName(cls), function (el) {
                    var lang  = el.getAttribute('data-translation-lang'),
                        ident = el.getAttribute('data-translation-id');
                    translations[lang] = translations[lang] || {};
                    translations[lang][ident] = el.innerHTML;
                });
                return translations;
            };

            this.save = function (lang, key, value) {
                translations[lang][key] = value;
            };

            this.commit = function () {
                var cls = getOpt(options, "class", "translation");
                forEach(document.getElementsByClassName(cls), function (el) {
                    var lang  = el.getAttribute('data-translation-lang'),
                        ident = el.getAttribute('data-translation-id');
                    el.innerHTML = translations[lang][ident];
                });
            };
        },

        localStorage: function (options) {
            var translations = {};

            this.load = function () {
                translations = JSON.parse(localStorage.getItem('translations'));
            };

            this.save = function (lang, key, value) {
                translations[lang][key] = value;
            };

            this.commit = function () {
                localStorage.setItem('translations', JSON.stringify(translations));
            };
        },

        get: function (options) {
            var type = getOpt(options, "loader", "DOM");
            if (!this.hasOwnProperty(type)) {
                throw "Translation loader '"+type+"' is not valid.";
            }
            return new this[type](options);
        }

    };

    var Translator = function (options) {
        var loader = TranslationStores.get(options),
            that = this;

        this.highlight = function () {
            var cls = getOpt(options, "class", "translation"),
                highlightStyle;
            highlightStyle = document.createElement('style');
            highlightStyle.setAttribute('type', 'text/css');
            highlightStyle.id = 'translation-highlight-style';
            highlightStyle.innerHTML = '.translation { background: red; cursor: pointer; }';
            document.getElementsByTagName('head')[0].appendChild(highlightStyle);
        };

        this.removeHighlight = function () {
            var el = document.getElementById('translation-highlight-style');
            if (el) {
                el.remove();
            }
        };

        this.start = function () {
            var translations = loader.load();
            this.highlight();
            addElementTrigger();
            console.log("translations", translations);
        };

        this.translate = function (lang, key) {
            var value = prompt('Please type in your new translation:');
            if (value !== null) {
                loader.save(lang, key, value);
            }
        };

        this.stop = function () {
            loader.commit();
            this.removeHighlight();
        };

        function addElementTrigger() {
            var cls = getOpt(options, "class", "translation");
            forEach(document.getElementsByClassName(cls), function (el) {
                var lang  = el.getAttribute('data-translation-lang'),
                    ident = el.getAttribute('data-translation-id');
                el.addEventListener('click', function () {
                    that.translate(lang, ident);
                });
            });
        }
    };

    function forEach(elements, iterator, context) {
        if (Array.prototype.forEach && elements.forEach === Array.prototype.forEach) {
            return elements.forEach(iterator, context);
        } else {
            for (var i=0; i<elements.length; i++) {
                iterator.call(context, elements[i]);
            }
        }
    }

    function getOpt(options, key, defaultValue) {
        if (isDefined(options) && isDefined(options[key])) {
            return options[key];
        }
        return defaultValue;
    }

    function isDefined(obj) {
        return obj !== void 0;
    }

    if (typeof exports !== 'undefined') {
        module.exports = Translator;
    } else {
        root.Translator = Translator;
    }
}).call(this);