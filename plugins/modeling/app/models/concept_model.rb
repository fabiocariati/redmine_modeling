class ConceptModel < ActiveRecord::Base
  unloadable
  belongs_to :specification

  def save_link(cell)
    attributes = Link.normalize_attrs(cell)
    if cell[:age] == 'new'
      link = self.links.build
    else

      link = Link.find(cell['id'])
      cell.delete('id')
    end
    link.attributes = attributes
    link.save
  end

  def save_concept(cell)
    model = (cell[:type].split('.')[1] + 'Concept').constantize
    concepts = self.send(model.table_name)
    if cell[:age] == 'new'
      concept = concepts.build
      #cell.delete('id')
    else
      concept = model.find(cell[:id])
    end

    concept.attributes = concept.attrs_filter(cell)
    concept.save

    concept.save_childs(cell)

    concept
  end

  def remove_deleted_cells(cells)
    if cells
      self.cells.each{|cell|
        unless cells.any? {|c| c['id'].to_s == cell['id'].to_s }
          self.remove_child(cell)
        end
      }
    else
      self.cells.each{|cell|
        self.remove_child(cell)
      }
    end
  end

  def remove_child(cell)
    if cell[:superType] == 'Link'
      Link.find(cell['id']).destroy if Link.exists? cell['id']
    else
      concept = (cell[:type].split('.')[1] + 'Concept').constantize
      concept.find(cell['id']).destroy
    end
  end

  def find_concepts?(cells)
    cells.each{|cell|
      found = false
      self.concept_types.each{|ct|
        if ct.exists?(cell[:id])
          found = true
        end
      }
      return false unless found
    }
    true
  end
end
