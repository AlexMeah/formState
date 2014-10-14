define(['jquery', 'chai', 'src/formState', 'jquerycookie'], function ($, chai, formState, jquerycookie) {
    var should = chai.should();

    describe('formState', function () {
        var form;
        var allActive = [{"name":"text","value":"text"},{"name":"checkbox","value":"checkbox"},{"name":"checkbox","value":"checkbox2"},{"name":"hidden","value":"hidden"},{"name":"radio","value":"radio"},{"name":"hidden","value":"option1"}];
        var allActive = [{"name":"text","value":"1"},{"name":"checkbox","value":"checkbox"},{"name":"checkbox","value":"checkbox2"},{"name":"hidden","value":"2"},{"name":"radio","value":"radio"},{"name":"hidden","value":"3"}];

        beforeEach(function () {
            if ($.cookie('test')) {
                $.removeCookie('test', {domain: location.hostname.split('.').slice(-2).join('.'), path: '/'}).should.be.true;
            }
            form = $('<form class="test-fixture" />');

            $('<input />', {
                name: 'text',
                type: 'text',
                value: 'text'
            }).appendTo(form);

            $('<input />', {
                name: 'checkbox',
                type: 'checkbox',
                value: 'checkbox'
            }).appendTo(form);

            $('<input />', {
                name: 'checkbox',
                type: 'checkbox',
                value: 'checkbox2'
            }).appendTo(form);

            $('<input />', {
                name: 'hidden',
                type: 'hidden',
                value: 'hidden'
            }).appendTo(form);

            $('<input />', {
                name: 'radio',
                type: 'radio',
                value: 'radio'
            }).appendTo(form);

            var select = $('<select />', {
                name: 'select',
                type: 'select'
            });

            $('<option />', {value: 'option1', text: 'option1', selected: true}).appendTo(select);
            $('<option />', {value: 'option2', text: 'option2'}).appendTo(select);
            $('<option />', {value: 'option3', text: 'option3'}).appendTo(select);

            select.appendTo(form);

            $('body').append(form);
        });

        afterEach(function () {
            $('.test-fixture').remove();
            if ($.cookie('test')) {
                $.removeCookie('test', {domain: location.hostname.split('.').slice(-2).join('.'), path: '/'}).should.be.true;
            }
        })

        it('should save any form type', function () {
            var count = 0;

            $('.test-fixture > *').each(function (i) {
                if ($(this).is(':radio')) {
                    $(this).filter('[value="radio"]').prop('checked', true);
                } else if ($(this).is(':checkbox')) {
                    $(this).prop('checked', true);
                } else if ($(this).is('select')) {
                    $(this).find('[value="option2"]').prop('selected', true);
                } else {
                    $(this).val(++count);
                }
            });

            formState.save('.test-fixture', 'test');

            $.cookie('test').should.equal('[{"name":"text","value":"1"},{"name":"checkbox","value":"checkbox"},{"name":"checkbox","value":"checkbox2"},{"name":"hidden","value":"2"},{"name":"radio","value":"radio"},{"name":"select","value":"option2"}]');
        });

        it('should load any form type', function () {
            var cookieValue = '[{"name":"text","value":"text"},{"name":"checkbox","value":"checkbox"},{"name":"checkbox","value":"checkbox2"},{"name":"hidden","value":"2"},{"name":"radio","value":"radio"},{"name":"select","value":"option3"}]';

            $.cookie('test', cookieValue, {domain: location.hostname.split('.').slice(-2).join('.'), path: '/'});
            $.cookie('test').should.equal(cookieValue);

            formState.load($('.test-fixture'), 'test');

            JSON.stringify($('.test-fixture').serializeArray()).should.equal($.cookie('test'));
        });
    });
});
