define(['jquery', 'jquerycookie'], function ($) {
    function wrapWithjQuery(el) {
        if (el.jquery) {
            return el;
        }

        return $(el);
    }

    return {
        save: function (el, name) {
            var $el = wrapWithjQuery(el);
            var values = $el.serializeArray();

            values.length && $.cookie(name, JSON.stringify(values), {domain: location.hostname.split('.').slice(-2).join('.'), path: '/'});
        },
        load: function (el, name) {
            var data = JSON.parse($.cookie(name));
            var $form = wrapWithjQuery(el);

            for (var key in data) {
                var $el = $form.find('[name="' + data[key].name + '"]');

                if ($el.is(':radio')) {
                    $el.filter('[value="' + data[key].value + '"]').prop('checked', true);
                } else if ($el.is(':checkbox') && data[key].value) {
                    $el.prop('checked', true);
                } else if ($el.is('select')) {
                    $el.find('[value="' + data[key].value + '"]').prop('selected', true);
                } else {
                    $el.val(data[key].value);
                }
            }
        }
    };
});
