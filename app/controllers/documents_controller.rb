class DocumentsController < ApplicationController
  def new
    @document = Document.new
  end

  def create
    @document = Document.new(document_upload_params)

    if @document.save
      redirect_to @document, notice: "Document successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @document = Document.find(params[:id])
  end

  def update
    @document = Document.find(params[:id])
    if @document.update(document_params)
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @document }
      end
    else
      render :show, status: :unprocessable_entity
    end
  end

  private

  def document_params
    params.require(:document).permit(:content)
  end

  def document_upload_params
    params.require(:document).permit(:title, :file)
  end
end
