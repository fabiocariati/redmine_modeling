class Link < ActiveRecord::Base
  unloadable
  belongs_to :concept_model

  def attrs
    {
        type: self.link_type,
        concept_model_id: self.concept_model_id,
        source: {id: self.source.to_s},
        target: {id: self.target.to_s},
        superType: 'Link',
        'id' => self.id
    }
  end

  def self.normalize_attrs(c)
    {
        link_type: c[:type],
        source: c[:source][:id],
        target: c[:target][:id],
    }
  end
end
