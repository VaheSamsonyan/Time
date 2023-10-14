let block = document.getElementById("block");
let time_button_block = document.getElementById("time_button_block");
let time_component;
let countdown_component;
let stopwatch_component;
let time_click_counter = 0;
let countdown_click_counter = 0;
let stopwatch_click_counter = 0;
let clock;
let TimeID;
let countDownID;
let StopwatchID;
const cities = [
  ["Yerevan", 4],
  ["Moscow", 3],
  ["New York", -4],
  ["Paris", 2],
  ["London", 1]
];
function addZero(number) {
  return ("0" + number).length > 2 ? number : ("0" + number);
}

function addZeroforMilliseconds(number) {
  return ("0" + number).length > 3 ? number : ("0" + number);
}

time_button_block.addEventListener("click", create_Time_component);

function create_Time_component() {
  clearCountdownComponent();
  clearStopwatchComponent();

  if (time_click_counter === 0) {
    time_component = document.createElement('div');
    time_component.setAttribute('id', 'component');
    block.append(time_component);

    let content = document.createElement('div');
    content.setAttribute('id', 'content');
    clock = document.createElement("div");
    clock.setAttribute('id', 'content');

    TimeID = setInterval(() => {
      let city_name = document.createElement("div");
      city_name.setAttribute("id", "content");
      city_name.innerText = cities[select.selectedIndex][0];
      const date = new Date();
      const localTime = date.getTime();
      const localOffset = date.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const offset = cities[select.selectedIndex][1];
      const city = utc + (3600000 * offset);
      const cityTimeNow = new Date(city).toLocaleString();
      time_component.style.width = "560px";
      clock.innerHTML = cityTimeNow;

    }, 1000);

    content.append(clock);
    let select = document.createElement("select");
    select.setAttribute('id', 'timezone');
    select.setAttribute('class', 'timezone_class');

    for (let i = 0; i < cities.length; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = cities[i][0];
      select.append(option);
    }

    content.append(select);
    time_component.append(content);
    time_click_counter++;
  }
}

let countdown_button_block = document.getElementById("countdown_button_block");
countdown_button_block.addEventListener('click', create_Countdown_component);

function cleartimeComponent() {
  clearInterval(TimeID);

  if (time_component) {
    time_component.remove();
    time_click_counter = 0;
  }
}

function clearCountdownComponent() {
  clearInterval(countDownID);

  if (countdown_component) {
    countdown_component.remove();
    countdown_click_counter = 0;
  }
}

function create_Countdown_component() {
  cleartimeComponent();
  clearStopwatchComponent();

  if (countdown_click_counter === 0) {
    countdown_component = document.createElement('div');
    countdown_component.setAttribute('id', 'component');
    block.append(countdown_component);

    let content = document.createElement('div');
    let hours = document.createElement("span");
    let minutes = document.createElement("span");
    let seconds = document.createElement("span");

    content.setAttribute('id', 'content');
    content.style.color = "orange";
    let set = document.createElement('button');
    set.setAttribute('class', 'button_block');
    set.innerText = "SET TIME";
    let start = document.createElement('button');
    start.setAttribute('class', 'button_block');
    start.innerText = "START";
    
    let reset = document.createElement('button');
    reset.setAttribute('class', 'button_block');
    reset.innerText = "RESET";

    let settedhour, settedminute, settedsecond;
    let targetDate;

    set.addEventListener('click', () => {
      start.disabled = false;
      start.classList.remove("disabled_style");
      clearInterval(countDownID);

      settedhour = parseInt(prompt("Enter hours"));
      settedminute = parseInt(prompt("Enter minutes"));
      settedsecond = parseInt(prompt("Enter seconds"));

      if (!isNaN(settedhour) && !isNaN(settedminute) && !isNaN(settedsecond)) {
        content.innerHTML = `${settedhour < 10 ? "0" + settedhour : settedhour}:${settedminute < 10 ? "0" + settedminute : settedminute}:${settedsecond < 10 ? "0" + settedsecond : settedsecond}`;
      } else {
        content.innerHTML = "Invalid input";
      }
    });

    function CountDown_Interval() {
      let millisecond = 1;
      let second = 1000 * millisecond;
      let minute = 60 * second;
      let hour = 60 * minute;
      let now = new Date().getTime();
      let milliseconds = targetDate - now;
      let hour_dif = Math.floor(milliseconds / hour);
      let minute_dif = Math.floor((milliseconds % hour) / minute);
      let second_dif = Math.floor((milliseconds % minute) / second);
      hours.innerHTML = addZero(hour_dif);
      minutes.innerHTML = addZero(minute_dif);
      seconds.innerHTML = addZero(second_dif + 1);

      content.innerHTML = `${hours.innerHTML}:${minutes.innerHTML}:${seconds.innerHTML}`;
      if (hours.innerHTML <= 0 && minutes.innerHTML <= 0 && seconds.innerHTML <= 0) {
        hours.innerHTML = '00';
        minutes.innerHTML = '00';
        seconds.innerHTML = '00';
        content.innerHTML = `${hours.innerHTML}:${minutes.innerHTML}:${seconds.innerHTML}`;
        start.disabled = true;
        start.classList.add("disabled_style");
        clearInterval(countDownID);
      }
    }

    function starter() {
      start.disabled = true;
      start.classList.add("disabled_style");
      targetDate = new Date();
      targetDate.setHours(targetDate.getHours() + settedhour);
      targetDate.setMinutes(targetDate.getMinutes() + settedminute);
      targetDate.setSeconds(targetDate.getSeconds() + settedsecond);
      countDownID = setInterval(CountDown_Interval, 1000);
    }

    start.addEventListener('click', starter);

    reset.addEventListener('click', () => {
      clearInterval(countDownID);
      start.disabled = true;
      start.classList.add("disabled_style");
      hours.innerHTML = '00';
      minutes.innerHTML = '00';
      seconds.innerHTML = '00';
      content.innerHTML = `${hours.innerHTML}:${minutes.innerHTML}:${seconds.innerHTML}`;
    });

    countdown_component.append(content, set, start, reset);
    countdown_click_counter++;
  }
}

let stopwatch_button_block = document.getElementById("stopwatch_button_block");
stopwatch_button_block.addEventListener('click', create_Stopwatch_Component);

function clearStopwatchComponent() {
  if (stopwatch_component) {
    stopwatch_component.remove();
    stopwatch_click_counter = 0;
  }
}

function create_Stopwatch_Component() {
  clearCountdownComponent();
  cleartimeComponent();

  if (stopwatch_click_counter === 0) {
    stopwatch_component = document.createElement('div');
    stopwatch_component.setAttribute('id', 'component');
    block.append(stopwatch_component);

    let content = document.createElement('div');
    content.setAttribute('id', 'content');

    stopwatch_component.style.width = '580px';
    let clocks = document.createElement('div');
    clocks.setAttribute('id', 'content');
    clocks.innerHTML = "00:00:00:000";
    content.append(clocks);

    let start = document.createElement('button');
    start.setAttribute('class', 'button_block');
    start.innerText = "START";

    let stop = document.createElement('button');
    stop.setAttribute('class', 'button_block');
    stop.innerText = "STOP";

    let reset = document.createElement('button');
    reset.setAttribute('class', 'button_block');
    reset.innerText = "RESET";

    let clear = document.createElement('button');
    clear.setAttribute('class', 'button_block');
    clear.innerText = "CLEAR";

    stopwatch_component.append(content, start, stop, reset);

    let resume = document.createElement("table");
    let row;
    let [start_time, workedtime] = [0, 0];
    let stopped = true;
    let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

    start.addEventListener('click', () => {
      if (stopped) {
        stopped = false;
        start_time = Date.now() - workedtime;
        StopwatchID = setInterval(update, 1);
      }
    });

    stop.addEventListener('click', () => {
      if (!stopped) {
        start.innerText = "CONTINUE";
        stopped = true;
        workedtime = Date.now() - start_time;
        clearInterval(StopwatchID);
      }
    });

    reset.addEventListener('click', () => {
      if( clocks.innerHTML != "00:00:00:000") {
      row = document.createElement("tr");
      row.innerHTML = clocks.innerHTML;
      resume.append(row);
      clearInterval(StopwatchID);
      start.innerText = "START";
      [start_time, workedtime, currenttime] = [0, 0];
      stopped = true;
      [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
      clocks.innerHTML = "00:00:00:000";
      stopwatch_component.append(clear, resume);
      }
    });


    clear.addEventListener('click', () => {
      resume.innerHTML = '';
      clear.remove();
    });

    function update() {
      workedtime = Date.now() - start_time;
      milliseconds = Math.floor((workedtime % 1000));
      seconds = Math.floor((workedtime / 1000) % 60);
      minutes = Math.floor((workedtime / (1000 * 60)) % 60);
      hours = Math.floor((workedtime / (1000 * 60 * 60)) % 60);
      clocks.innerHTML = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}:${addZeroforMilliseconds(milliseconds)}`;
    }

    stopwatch_click_counter++;
  }
}

