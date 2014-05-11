class ConceptModelsController < ApplicationController
  unloadable

  def show
    @specification = Specification.find(params[:specification_id])
    @concept_models = @specification.concept_models

    @concept_models = @concept_models.map{|s|
      unless s.type.nil?
        s.attributes.merge({ cells: s.cells })
      end
    }

    respond_to do |format|
      format.json { render json: @concept_models }
    end
  end

  def create
    params.delete(:cells)
    params.delete(:authenticity_token)
    params.delete(:action)
    params.delete(:controller)

    logger.info "------------------------------------"
    logger.info params[:type]
    model = (params[:type] + 'Diagram').constantize

    params.delete(:type)

    @concept_model = model.create(params)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @concept_model.attributes }
    end
  end

  def save
    @concept_model = ConceptModel.find(params[:id])

    cells = params[:cells]
    params.delete(:cells)

    @concept_model.attributes = params[:graph]
    @concept_model.name = params[:name] unless params[:name].nil?
    @concept_model.save

    @concept_model.remove_deleted_cells(cells)

    if cells
      cells.each{|cell|
        unless cell[:superType] == 'Link'
          concept = @concept_model.save_concept(cell)
          links = cells.select{|c| c[:superType] == 'Link'}
          links.each{|l|
            l[:source][:id] = concept.id if l[:source][:id] == cell[:id]
            l[:target][:id] = concept.id if l[:target][:id] == cell[:id]
          }
        end
      }
      cells.each{|cell|
        if cell[:superType] == 'Link'
          if @concept_model.find_concepts?([ cell[:source], cell[:target] ])
            @concept_model.save_link(cell)
          end
        end
      }
    end

    respond_to do |format|
      #Todo: ver o que mandar aqui
      format.json { render json: {} }
    end
  end

  def destroy
    @concept_model = ConceptModel.find(params[:id])

    @concept_model.destroy

    respond_to do |format|
      #Todo: ver o que mandar aqui
      format.json { render json: {} }
    end
  end

end