const timer = document.getElementById("timer");
const start_stop = document.getElementById("start-stop");

var timer_running = false;
var remaining_time = 0; // seconds

var starting_time = 60; // seconds

start_stop.addEventListener("click", (e) => {
    timer_running = !timer_running;
    if (timer_running) {
        console.log("Running");
        let start_time = Date.now();
        remaining_time = starting_time;
        console.log("Prepare...");
        let totalSeconds = 0
        setInterval(() => {
            totalSeconds += 1;
            console.log(totalSeconds);
        }, 1000)
        setInterval(() => {
            console.log("Interval");
            remaining_time -= Date.now() - start_time;
            let ms = (remaining_time%1E3)/10;
            let s = (remaining_time/1E3)%60;
            let m = (remaining_time/6E4)%60;
            let h = (remaining_time/3.6E5)%24;
            timer.innerText = h+":"+m+":"+s+":"+ms;
        }, 100);
    }
})