class DocumentChannel < ApplicationCable::Channel
  def subscribed
    stream_from "document_#{params[:id]}"
  end

  def receive(data)
    document = Document.find(params[:id])
    document.update(data.slice('content', 'title'))
    ActionCable.server.broadcast("document_#{params[:id]}", { title: document.title, content: document.content.body.to_s, updated_at: document.updated_at.to_s })
  end
end
