class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector
    this.targetDate = targetDate;

  }

  init() {
    const startTime = this.targetDate;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime <= 0) {

        return clearInterval(this.intervalId);
      }
      const time = this.getTimeComponents(deltaTime);
      this.updateClockface(time, this.selector);
    }, 1000);
  }

  getTimeComponents(time) {
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = this.pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const mins = this.pad(
        Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      );
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
      return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  updateClockface({ days, hours, mins, secs }, selector) {
    const timerSelector = document.querySelector(`${selector}`)
    timerSelector.querySelector('[data-value="days"]').textContent = `${days}`;
    timerSelector.querySelector('[data-value="hours"]').textContent = `${hours}`;
    timerSelector.querySelector('[data-value="mins"]').textContent = `${mins}`;
    timerSelector.querySelector('[data-value="secs"]').textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Apr 05 2022 22:36:40"),
});

timer.init();
