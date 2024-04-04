$(document).ready(function() {
    
    // select payment method
    const methods = $('.kco-method-panel')
    const methodExtension = $('#kco-method-extension')
    const pay = $('#pay')

    methods.click(function () {
        // do not run if selected
        if ($(this).attr('data-is-selected') == 'true') {
            return
        }

        // select method
        methods.attr('data-is-selected', 'false')
        $(this).attr('data-is-selected', 'true')
        
        // enable pay button if selected method is ready
        if ($(this).attr('id') == 'kco-method-manual' || ( $(this).attr('id') == 'kco-method-extension' && methodExtension.attr('data-state') == 'ready') ) {
            pay.removeClass('disabled')
            pay.attr('data-method', $(this).attr('id'))
            return
        }
        pay.addClass('disabled')
    })

    pay.click(function () {
        // disable all methods, but the selected
        methods.addClass('disabled')
        $('.kco-method-panel#' + pay.attr('data-method')).removeClass('disabled')

        // set selected method state to processing
        $('#' + pay.attr('data-method')).attr('data-state', 'processing')
    })

    const stopProcessing = $('.stop-processing')
    stopProcessing.click(function () {
        methods.attr('data-is-selected', 'false')
        methods.attr('data-state', 'init')
        methods.removeClass('disabled')
        pay.addClass('disabled')
    })

    // extension method
    // select account
    const accounts = $('.kco-account')
    accounts.click(function () {
        // do not run if account is selected or payment is processing
        if (methodExtension.attr('data-state') == 'processing' || methodExtension.attr('data-state') == 'ready') {
            return
        }

        // hide all but the selected account
        accounts.addClass('hide-in-ready hide-in-processing')
        $(this).removeClass('hide-in-ready hide-in-processing')
        
        // hide all but the selected extension
        var extension = $(this).attr('data-extension')
        $('.kco-label:not([data-extension="' + extension + '"])').addClass('hide-in-ready hide-in-processing')

        // change method state
        methodExtension.attr('data-state', 'ready')

        // enable pay button
        pay.attr('data-method', 'kco-method-extension')
        pay.removeClass('disabled')
    })

    // reset selected account
    var resetMethodExtension = $('#reset-method-extension')
    resetMethodExtension.click(function () {
        methodExtension.removeClass('state-ready')
        methodExtension.attr('data-state', 'init')
        
        $('.kco-label').removeClass('hide-in-ready')
        pay.addClass('disabled')
    })

    // collapse and exapnd toggle
    const colapseToggler = $('.kco-collapse-toggler')
    colapseToggler.click(function () {
        const collapsableParent = $($(this).parent())
        if (collapsableParent.hasClass('collapsed')) {
            collapsableParent.removeClass('collapsed')
            return
        }
        collapsableParent.addClass('collapsed')
    })

})
