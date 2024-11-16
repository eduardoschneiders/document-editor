class DocumentsController < ApplicationController
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
end
