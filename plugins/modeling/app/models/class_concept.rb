class ClassConcept < ActiveRecord::Base
  unloadable
  include Concept

  belongs_to :class_diagram
  has_many  :method_concepts
  has_many :attribute_concepts

  def attrs
    Concept.attributes(self, 'uml.Class')
      .merge({methods: self.method_concepts.map{|m| m.attributes }})
      .merge({attributes: self.attribute_concepts.map{|a| a.attributes }})
  end

  def childs
    self.method_concepts.map{|m| m.attributes.merge(types: ['methods', MethodConcept]) } +
        self.attribute_concepts.map{|a| a.attributes.merge(types: ['attributes', AttributeConcept]) }
  end

  def save_childs(cell)
    Concept.save_childs(self, { methods: MethodConcept, attributes: AttributeConcept }, cell)
  end

  def attrs_filter(attrs)
    Concept.attr(self, attrs)
  end
end
