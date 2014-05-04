class SpecificationsController < ApplicationController
  unloadable

  def index
    @project = Project.find(params[:project_id])
    @specifications = Specification.where(project_id: @project.id)

    @specifications = @specifications.map{|s| s.attributes.merge({concept_models_types: s.concept_models_types, })}

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @specifications }
    end
  end

  def create
    logger.info params

    params.delete(:graphs)
    params.delete(:authenticity_token)
    params.delete(:action)
    params.delete(:controller)

    @specification = Specification.create(params)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: {id: @specification.id} }
    end
  end

  def destroy
    @specification = Specification.find(params[:id])

    @specification.destroy

    respond_to do |format|
      #Todo: ver o que mandar aqui
      format.json { render json: {} }
    end
  end
end