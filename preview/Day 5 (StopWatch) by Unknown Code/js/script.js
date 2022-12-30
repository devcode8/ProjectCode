const timeunit = document.querySelectorAll('#timeunit .timer');
const action = document.querySelectorAll('#action .btn');

// hour time unit
function hours() {
    let counter = parseInt(timeunit[0].innerHTML);

    counter++;
    timeunit[0].innerHTML = counter < 10 ? `0${counter}` : counter;
}

// minute time unit
function minutes() {
    let counter = parseInt(timeunit[1].innerHTML);

    counter++;
    timeunit[1].innerHTML = counter < 10 ? `0${counter}` : counter;

    if (counter == 60) {
        timeunit[1].innerHTML = '00';
        hours();
    }
}

// second time unit
function seconds() {
    let counter = parseInt(timeunit[2].innerHTML);

    counter++;
    timeunit[2].innerHTML = counter < 10 ? `0${counter}` : counter;

    if (counter == 60) {
        timeunit[2].innerHTML = '00';
        minutes();
    }
}

function startTimer() {
    const interval = setInterval(() => {
        let counter = parseInt(timeunit[3].innerHTML);
        counter++;

        timeunit[3].innerHTML = counter < 10 ? `0${counter}` : counter;

        if (counter == 100) {
            timeunit[3].innerHTML = '00';
            seconds();
        }
    }, 10);

    // stop button
    action[1].onclick = () => {
        clearInterval(interval);
        // delete active class name on start button
        action[0].className = action[0].className.split(' ')[0];
    }
}

// start button
action[0].onclick = () => {
    if (action[0].className.search('active') === -1) {
        startTimer();
        // add active class name
        action[0].className += ' active';
    }
}

// reset button
action[2].onclick = () => {
    for (let i = 0; i < timeunit.length; i++) {
        timeunit[i].innerHTML = '00';
        // delete active class name on start button
        action[0].className = action[0].className.split(' ')[0];
    }
}