$(document).ready(function() {
    
    // select startProcessingment method
    const selectCurrency = $('#select-currency')
    const methods = $('.kco-method-panel')
    const methodExtension = $('#kco-method-extension')
    const startProcessing = $('#start-processing')
    const stopProcessing = $('.stop-processing')

    // select method
    methods.click(function () {
        // do not run if selected
        if ($(this).attr('data-is-selected') == 'true') {
            return
        }

        // select method
        methods.attr('data-is-selected', 'false')
        $(this).attr('data-is-selected', 'true')
        
        // enable startProcessing button if selected method is ready
        if ($(this).attr('id') == 'kco-method-manual' || ( $(this).attr('id') == 'kco-method-extension' && methodExtension.attr('data-state') == 'ready') ) {
            startProcessing.removeClass('disabled')
            startProcessing.attr('data-method', $(this).attr('id'))
            return
        }
        startProcessing.addClass('disabled')
    })

    // start processing
    startProcessing.click(function () {
        // disable currency selection
        selectCurrency.addClass('disabled')

        // disable all methods, but the selected
        methods.addClass('disabled')
        $('.kco-method-panel#' + startProcessing.attr('data-method')).removeClass('disabled')

        // set selected method state to processing
        $('#' + startProcessing.attr('data-method')).attr('data-state', 'processing')
    })
    
    // stop processing
    stopProcessing.click(function () {
        selectCurrency.removeClass('disabled')
        methods.attr('data-is-selected', 'false')
        methods.attr('data-state', 'init')
        methods.removeClass('disabled')
        $('.kco-label').removeClass('hide-in-ready hide-in-processing')
        startProcessing.addClass('disabled')
    })

    // extension method
    // select account
    const accounts = $('.kco-account')
    accounts.click(function () {
        // do not run if account is selected or startProcessingment is processing
        if (methodExtension.attr('data-state') == 'processing' || methodExtension.attr('data-state') == 'ready') {
            return
        }

        // hide all but the selected account
        accounts.addClass('hide-in-ready hide-in-processing')
        $(this).removeClass('hide-in-ready hide-in-processing')
        
        // hide all but the selected extension
        const extension = $(this).attr('data-extension')
        $('.kco-label:not([data-extension="' + extension + '"])').addClass('hide-in-ready hide-in-processing')

        // change method state
        methodExtension.attr('data-state', 'ready')

        // enable startProcessing button
        startProcessing.attr('data-method', 'kco-method-extension')
        startProcessing.removeClass('disabled')
    })

    // reset selected account
    var resetMethodExtension = $('#reset-method-extension')
    resetMethodExtension.click(function () {
        methodExtension.removeClass('state-ready')
        methodExtension.attr('data-state', 'init')
        
        $('.kco-label').removeClass('hide-in-ready')
        startProcessing.addClass('disabled')
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
