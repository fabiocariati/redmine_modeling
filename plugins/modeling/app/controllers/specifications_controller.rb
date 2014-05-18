class SpecificationsController < ApplicationController
  unloadable

  def index
    @project = Project.find(params[:project_id])
    @specifications = Specification.where(project_id: @project.id)

    @specifications = @specifications.map{|s| s.attributes.merge({concept_types: s.concept_types, }).merge({repository_types: s.repository_types, })}

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @specifications }
    end
  end

  def update
    params.delete(:graphs)
    params.delete(:authenticity_token)
    params.delete(:action)
    params.delete(:controller)
    params.delete(:concept_types)

    @specification = Specification.find(params[:id])
    @specification.attributes = params

    if @specification.repository_changed?
      #'plugins/modeling/repositories/repo_' + spec.id.to_s
    end

    @specification.save

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: {id: @specification.id} }
    end
  end

  def create
    params.delete(:graphs)
    params.delete(:authenticity_token)
    params.delete(:action)
    params.delete(:controller)

    @specification = Specification.create(params)

    unless params[:repository].empty?
      name = 'plugins/modeling/repositories/repo_' + @specification.id.to_s
      create_git_repo(@specification)
    end

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

  private

  def create_git_repo(spec)
    begin
      dir_path = 'plugins/modeling/repositories/repo_' + spec.id.to_s
      unless File.directory?(dir_path)
        g = Git.clone(spec.repository, dir_path)
      else
        logger.info "eeeeeeeeeeeeeeeeeeeeeiiiiiiiiiiiiiiiii"
      end
    rescue Exception
      # Colocar o tratamento
    end
  end
end
