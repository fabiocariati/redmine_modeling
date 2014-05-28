class StateConcept < ActiveRecord::Base
  unloadable
  include Concept

  belongs_to :state_machine_diagram
  has_many  :event_concepts

  def attrs
    Concept.attributes(self, 'uml.State').merge({events: self.event_concepts.map{|m| m.attributes }})
  end

  def childs
    self.event_concepts.map{|m| m.attributes.merge(types: ['events', EventConcept]) }
  end

  def save_childs(cell)
    Concept.save_childs(self, { events: EventConcept }, cell)
  end

  def attrs_filter(attrs)
    Concept.attr(self, attrs)
  end
end
