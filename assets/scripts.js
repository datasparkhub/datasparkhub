var Countdown = {
    countdownChecking: null,
    target: new Date("September 1, 2025 0:0:0").getTime(),
    init: function () {
        this.$ = {
            days: $('.countdown').find('.block.days .figure'),
            hours: $('.countdown').find('.block.hours .figure'),
            minutes: $('.countdown').find('.block.min .figure'),
            seconds: $('.countdown').find('.block.sec .figure')
        };
        this.count();
    },
    count: function () {
        this.countdownChecking = setInterval(()=>{
            var distance = this.target - new Date().getTime(),
                days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                seconds = Math.floor((distance % (1000 * 60)) / 1000),
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            if (distance < 0) {
                clearInterval(this.countdownChecking);
            } else {   
                if (parseInt(this.$.days.find('.top-back').find('span').text())!=days) {
                    this.animateFigure(this.$.days, days);
                }
                if (parseInt(this.$.hours.find('.top-back').find('span').text())!=hours) {
                    this.animateFigure(this.$.hours, hours);
                }
                if (parseInt(this.$.minutes.find('.top-back').find('span').text())!=minutes) {
                    this.animateFigure(this.$.minutes, minutes);
                }
                if (parseInt(this.$.seconds.find('.top-back').find('span').text())!=seconds) {
                    this.animateFigure(this.$.seconds, seconds);
                }
            }
        }, 1000);
    },
    animateFigure: function ($el, value) {
        var $top = $el.find('.top'),
            $bottom = $el.find('.bottom'),
            $back_top = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');
        $back_top.find('span').html(value);
        $back_bottom.find('span').html(value);
        TweenMax.to($top, 0.8, {
            ease: Quart.easeOut,
            rotationX: '-180deg',
            transformPerspective: 300,
            onComplete: function () {
                $top.html(value);
                $bottom.html(value);
                TweenMax.set($top, {
                    rotationX: 0
                });
            }
        });
        TweenMax.to($back_top, 0.8, {
            rotationX: 0,
            clearProps: 'all',
            ease: Quart.easeOut,
            transformPerspective: 300,
        });
    }
};
Countdown.init();