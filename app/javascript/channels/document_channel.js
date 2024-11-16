import consumer from "./consumer"

document.addEventListener("DOMContentLoaded", () => {
  const documentElement = document.getElementById("document-content");

  if (documentElement) {
    const id = documentElement.dataset.id;

    const channel = consumer.subscriptions.create(
      { channel: "DocumentChannel", id: id },
      {
        received(data) {
          documentElement.value = data.content;
        },
      }
    );

    documentElement.addEventListener("input", (event) => {
      channel.send({ content: event.target.value });
    });
  }
});
