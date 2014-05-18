class JavaClassParser
  def self.get_class
    f = File.new('gittest/person.java', 'rb')
    content = f.read
    f.close
    class_first_line_regex = /[^\n}]*class[^{]*/
    bodies = content.split(class_first_line_regex).select{|b| !b.empty?}
    class_signs = content.scan class_first_line_regex
    methods = bodies.map{|b| b.scan(/[^\n]*\([^\(\)]*\){/m).map{|m|m.strip} }
    attributes = bodies.map{|b| b.scan(/[^\n;]*;/m).map{|a|a.strip} }
    class_signs.each_with_index.map{|s,i|
      {
        sign: s,
        methods: methods[i],
        attributes: attributes[i]
      }
    }
  end
end