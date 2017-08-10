# loadme
load resource when it is require, for prevent long time to lauch the webpage/app.

---------------------
addAlias(listLibrary): list of library using a key.
load(keyLibrary, callback): load a library by a key, when the library is loaded, run the callback.

---------------------
Simple example:

//loading libraries
        loadme.addAlias({
            jquery: [
                'https://code.jquery.com/jquery-1.11.3.min.js'
            ],
            bootstrap: [
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js'
            ],
            dropzone: [
                '/themes/front/plugins/dropzone/css/dropzone.css',
                '/themes/front/plugins/dropzone/dropzone.min.js'
            ],
            blockui: [
                '/themes/front/plugins/jquery-block-ui/jqueryblockui.min.js'
            ]
            ,
            validate: [
                '/themes/front/plugins/jquery-validation/jquery.validate.min.js',
                '/themes/front/plugins/jquery-validation/localization/messages_es.min.js'
            ],
            notify: [
                '/themes/front/plugins/pnotify/pnotify.core.min.css',
                '/themes/front/plugins/pnotify/pnotify.buttons.css',
                '/themes/front/plugins/pnotify/pnotify.core.min.js',
                '/themes/front/plugins/pnotify/pnotify.buttons.min.js'
            ],
            cloudzoom: [
                '/themes/front/plugins/cloudzoom/cloudzoom.js',
            ],
            elevatezoom: [
                '/themes/front/plugins/elevatezoom/jquery.elevateZoom-3.0.8.min.js',
            ]
        });

loadme.load('jquery', function () {
    loadme.load('bootstrap', function () {
        $(document).ready(function () {
            app.init();//start app
        });
    });
});
