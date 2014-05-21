class UseCaseConcept < ActiveRecord::Base
  unloadable
  include Concept

  belongs_to :use_case_diagram

  def attrs
    Concept.attributes(self, 'uml.UseCase')
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
