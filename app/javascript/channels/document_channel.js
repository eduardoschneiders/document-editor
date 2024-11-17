import consumer from "./consumer"

document.addEventListener("DOMContentLoaded", () => {
  const documentElement = document.getElementById("document_content");
  const titleElement = document.getElementById("document_title");
  const UpdateAtElement = document.getElementById("document_last_updated");
  let timeoutId;

  if (documentElement) {
    const id = documentElement.dataset.id;
    console.log('id 2: ', id)

    const channel = consumer.subscriptions.create(
      { channel: "DocumentChannel", id: id },
      {
        received(data) {
          titleElement.value = data.title

          var divA = document.createElement("div");
          var divB = document.createElement("div");

          divA.innerHTML = documentElement.value;
          let contentA = divA.innerText.replace(/(\r\n|\n|\r)/gm, "").trim()

          divB.innerHTML = data.content;
          let contentB = divB.innerText.replace(/(\r\n|\n|\r)/gm, "").trim()

          if (contentA != contentB) {
            documentElement.editor.loadHTML(data.content);
          }

          UpdateAtElement.textContent = data.updated_at
        },
      }
    );

    documentElement.addEventListener("input", (event) => {
      clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          // console.log('event.target.value: ', event.target.value)
          channel.send({ content: event.target.value });
        }, 3000)

      });


    titleElement.addEventListener("input", (event) => {
      channel.send({ title: event.target.value });
    });
  }
});
