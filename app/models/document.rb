class Document < ApplicationRecord
  has_one_attached :file
  has_rich_text :content

  before_create :extract_txt_file_content, if: -> { file.attached? && file.content_type == "text/plain" }
  before_create :extract_docx_file_content, if: -> { file.attached? && file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }

  private

  def extract_txt_file_content
    self.content = file.download.force_encoding("UTF-8")
  end

  def extract_docx_file_content
    doc = Docx::Document.open(file.download)
    self.content = doc.paragraphs.map(&:to_html).join("\n")
  end
end
