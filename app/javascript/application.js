// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "./channels"
import "@rails/activestorage"

import { Application } from "@hotwired/stimulus";
import * as ActiveStorage from "@rails/activestorage";

// Start ActiveStorage
ActiveStorage.start();

// Initialize Stimulus
const application = Application.start();



import "trix"
import "@rails/actiontext"
