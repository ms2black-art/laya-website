/*  Author Rick,Wayne */

function numberQaptcha(options){

    var defaultOptions={
        form: null,
        numberAmount: 4,
        topicPHP: '',
        imageContainer: null,
        triggerContainer: null,
        resetButton: null,
        send: function(){}
    };

    var answer = '';
    var qaptchaInput;   //answer input
    var timeInput;      //trigger time input
    var qaptchaStartTime;
    var triggerTimeRecord;
    this.options = $.extend({}, defaultOptions, options);

    this.trigger = function(data){

        //time record
        var triggerTime = (new Date()).getTime();
        triggerTimeRecord.push((triggerTime - qaptchaStartTime));
        timeInput.val(triggerTimeRecord.join(','));

        //answer rcord
        answer += data.toString();

        //send
        if(answer.length >= this.options.numberAmount){

            qaptchaInput.val(answer);
            this.options.send && this.options.send(this);
        }
        
    };

    this.init = function(){

        //init
        thisNumberQaptcha = this;
        answer = '';
        qaptchaStartTime = (new Date()).getTime();
        triggerTimeRecord = [];
        this.options.form.find('input[name="numberQaptcha"]').remove();
        this.options.form.find('input[name="numberQaptchaTime"]').remove();
        $(this.options.imageContainer).empty().addClass('loading');
        $(this.options.triggerContainer).empty();
        $(this.options.resetButton).off('click.numberQaptcha');

        //add input
        qaptchaInput = $('<input name="numberQaptcha" />').hide();
        this.options.form.append(qaptchaInput);
        timeInput = $('<input name="numberQaptchaTime" />').hide();
        this.options.form.append(timeInput);

        //create image
        var topic = $('<img />');
        topic.attr('src', this.options.topicPHP + '?t=' + (new Date()).getTime());
        topic.appendTo($(this.options.imageContainer));

        //create trigger
        for(var i=0;i<this.options.numberAmount;i++){
            var trigger = $('<div></div>').addClass('trigger').data('number', i);
            trigger.appendTo(this.options.triggerContainer);

            trigger.on('click.numberQaptcha',function(){
                $(this).off('click.numberQaptcha');
                $(this).addClass('active');
                thisNumberQaptcha.trigger($(this).data('number'));
            });
        }

        //create reset
        $(this.options.resetButton).on('click.numberQaptcha',function(){
            thisNumberQaptcha.init();
        });

        $(this.options.imageContainer).removeClass('loading');

    };

    this.destroy = function(){



    };
}