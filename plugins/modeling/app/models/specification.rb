class Specification < ActiveRecord::Base
  unloadable
  has_many :concept_models, dependent: :destroy

  def concept_models_types
    self.class.reflect_on_all_associations(:has_many)
      .select{|o| o.name != :concept_models}
      .map{|o| {type: o.class_name, description: o.class_name.constantize.description}}
  end
end
