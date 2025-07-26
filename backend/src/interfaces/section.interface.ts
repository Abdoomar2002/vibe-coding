export interface ISection {
  _id: string;
  idea: string;
  sections: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISectionDocument extends ISection, Document {}

export interface WebsiteType {
  type: string;
  keywords: string[];
  sections: string[];
} 