import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ 
  timestamps: true,
  collection: 'sections'
})
export class Section {
  @Prop({ 
    required: true, 
    trim: true,
    minlength: 3,
    maxlength: 500,
    index: true
  })
  idea: string;

  @Prop({ 
    required: true, 
    type: [String],
    validate: {
      validator: function(sections: string[]) {
        return sections.length >= 1 && sections.length <= 10;
      },
      message: 'Sections must have between 1 and 10 items'
    }
  })
  sections: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

// Add compound index for better query performance
SectionSchema.index({ idea: 'text' });
SectionSchema.index({ createdAt: -1 }); 