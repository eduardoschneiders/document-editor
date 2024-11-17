import consumer from "./consumer"

document.addEventListener("DOMContentLoaded", () => {
  const documentElement = document.getElementById("document_content");
  const UpdateAtElement = document.getElementById("document_last_updated");

  if (documentElement) {
    const id = documentElement.dataset.id;

    const channel = consumer.subscriptions.create(
      { channel: "DocumentChannel", id: id },
      {
        received(data) {
          documentElement.value = data.content;
          UpdateAtElement.textContent = data.updated_at
        },
      }
    );

    documentElement.addEventListener("input", (event) => {
      channel.send({ content: event.target.value });
    });
  }
});
