class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;

    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    const startTime = this.targetDate;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      const time = this.getTimeComponents(deltaTime);
      this.updateClockface(time);
    }, 1000);
  }

  getTimeComponents(time) {
    if (time >= 0) {
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
    return clearInterval(this.intervalId);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  updateClockface({ days, hours, mins, secs }) {
    document.querySelector('[data-value="days"]').textContent = `${days}`;
    document.querySelector('[data-value="hours"]').textContent = `${hours}`;
    document.querySelector('[data-value="mins"]').textContent = `${mins}`;
    document.querySelector('[data-value="secs"]').textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2022"),
});

timer.start();
