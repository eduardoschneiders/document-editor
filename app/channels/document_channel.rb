class DocumentChannel < ApplicationCable::Channel
  def subscribed
    stream_from "document_#{params[:id]}"
  end

  def receive(data)
    document = Document.find(params[:id])
    document.update(content: data["content"])
    ActionCable.server.broadcast("document_#{params[:id]}", { content: document.content, updated_at: document.updated_at.to_s })
  end
end
