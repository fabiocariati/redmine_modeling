class ObjectOrientedSpecification < Specification
  has_many :class_diagrams, class_name: 'ClassDiagram', foreign_key: :specification_id
end