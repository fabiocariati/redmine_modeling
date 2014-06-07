class NodeConcept < ActiveRecord::Base
  unloadable
  include Concept

  belongs_to :directed_graph_diagram

  def attrs
    Concept.attributes(self, 'general.Node')
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
