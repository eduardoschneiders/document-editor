import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log('here')
    document.addEventListener("direct-upload:progress", this.updateProgress);
    document.addEventListener("direct-upload:start", this.startProgress);
    document.addEventListener("direct-upload:end", this.endProgress);
  }

  disconnect() {
    document.removeEventListener("direct-upload:progress", this.updateProgress);
    document.removeEventListener("direct-upload:start", this.startProgress);
    document.removeEventListener("direct-upload:end", this.endProgress);
  }

  startProgress(event) {
    console.log('start')
    const { id } = event.detail;
    const progressElement = document.getElementById('progress-bar').appendChild(document.createElement("progress"));
    progressElement.id = `progress-${id}`;
    progressElement.max = 100;
    progressElement.value = 0;
    event.target.insertAdjacentElement("afterend", progressElement);
  }

  updateProgress(event) {
    console.log('update')
    const { id, progress } = event.detail;
    console.log('id, progress: ', id, progress)
    const progressElement = document.querySelector(`#progress-${id}`);
    if (progressElement) {
      progressElement.value = progress;
    }
  }

  endProgress(event) {
    console.log('end')
    const { id } = event.detail;
    const progressElement = document.querySelector(`#progress-${id}`);
    if (progressElement) {
      progressElement.remove();
    }
  }
}
