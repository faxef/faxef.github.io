(function () {
    if (document.getElementById("timer")) {
        var date = document.getElementById("timer").attributes['data-timer'].value;
        var daysLabel = document.getElementById("timer").attributes['data-days'].value;
        var hoursLabel = document.getElementById("timer").attributes['data-hours'].value;
        var minutesLabel = document.getElementById("timer").attributes['data-minutes'].value;
        var secondsLabel = document.getElementById("timer").attributes['data-seconds'].value;
        var countDownDate = new Date(date.replace(' ', 'T')).getTime();

        var x = setInterval(function () {

            var now = Date.now();

            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("timer").innerHTML =
                "<div class='timer-item'>" +
                "<div class='description'>" + daysLabel + "</div>" +
                "<div class='value'>" + days + "</div>" +
                "</div>" +
                "<div class='timer-item'>" +
                "<div class='description'>" + hoursLabel + "</div>" +
                "<div class='value'>" + hours + "</div>" +
                "</div>" +
                "<div class='timer-item'>" +
                "<div class='description'>" + minutesLabel + "</div>" +
                "<div class='value'>" + minutes + "</div>" +
                "</div>" +
                "<div class='timer-item'>" +
                "<div class='description'>" + secondsLabel + "</div>" +
                "<div class='value'>" + seconds + "</div>" +
                "</div>";

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "<div class='timer-item'>" +
                    "<div class='description'>" + daysLabel + "</div>" +
                    "<div class='value'>0</div>" +
                    "</div>" +
                    "<div class='timer-item'>" +
                    "<div class='description'>" + hoursLabel + "</div>" +
                    "<div class='value'>0</div>" +
                    "</div>" +
                    "<div class='timer-item'>" +
                    "<div class='description'>" + minutesLabel + "</div>" +
                    "<div class='value'>0</div>" +
                    "</div>" +
                    "<div class='timer-item'>" +
                    "<div class='description'>" + secondsLabel + "</div>" +
                    "<div class='value'>0</div>" +
                    "</div>";
            }
        }, 1000);
    }

})();
