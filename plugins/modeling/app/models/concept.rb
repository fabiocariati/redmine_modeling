module Concept
  def self.attr(model, attrs)
    names = model.attribute_names
    filtered = attrs.select{|k, v|
      names.include?(k)
    }

    if attrs[:position] && attrs[:position].class != Fixnum
      filtered['x'] = attrs[:position][:x]
      filtered['y'] = attrs[:position][:y]
    end

    filtered
  end

  def self.save_childs(model, child_classes, attrs)
    child_classes.each{ |c|
      if attrs[c[0].to_sym]
        attrs[c[0].to_sym].each{|m|
          if m[:id] && c[1].find(m[:id])
            child = c[1].find(m[:id])
          else
            child = model.send(c[1].table_name).build
          end
          child.attributes = Concept.attr(child, m)
          child.save
        }
      end
    }
  end
end
