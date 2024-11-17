class Document < ApplicationRecord
  has_one_attached :file

  before_create :extract_file_content, if: -> { file.attached? && file.content_type == "text/plain" }

  private

  def extract_file_content
    self.content = file.download.force_encoding("UTF-8")
  end
end
