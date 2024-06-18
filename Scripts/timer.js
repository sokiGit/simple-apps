const timer = document.getElementById("timer");
const start_stop = document.getElementById("start-stop");

var timer_running = false;
var remaining_time = 0; // ms

var starting_time = 6E4; // ms

start_stop.addEventListener("click", () => {
    timer_running = !timer_running;
    if (timer_running) {
        console.log("Running");
        let start_time = Date.now();
        remaining_time = starting_time;
        console.log("Prepare...");
        setInterval(() => {
            console.log("Interval");
            remaining_time -= Date.now() - start_time;
            console.log(remaining_time)
            timer.innerText = remaining_time.toString();
        }, 100);
    }
})