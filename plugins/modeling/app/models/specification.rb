class Specification < ActiveRecord::Base
  unloadable
  has_many :concept_models, dependent: :destroy

  def concept_types
    ['Class', 'UseCase', 'StateMachine', 'Activity', 'Sequence'] # Todo: tirar daqui
  end

  def repository_types
    ['JavaProject'] # Todo: tirar daqui
  end
end
