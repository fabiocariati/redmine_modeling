class InteractionUseConcept < ActiveRecord::Base
  unloadable
  include Concept

  belongs_to :concept_model

  def attrs
    Concept.attributes(self, 'uml.InteractionUse')
  end

  def childs
    []
  end

  def save_childs(cell)
    Concept.save_childs(self, {}, cell)
  end

  def attrs_filter(attrs)
    Concept.attr(self, attrs)
  end
end
