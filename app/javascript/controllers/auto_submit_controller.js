import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["form", "textarea"];

  connect() {
    this.timeout = null; // To debounce form submission
  }

  update() {

    clearTimeout(this.timeout);


    this.timeout = setTimeout(() => {
      this.formTarget.requestSubmit();
    }, 300);
  }
}
