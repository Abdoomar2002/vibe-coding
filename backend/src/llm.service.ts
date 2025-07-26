import { Injectable, Logger } from '@nestjs/common';
import { WebsiteType } from './interfaces/section.interface';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private readonly websiteTypes: WebsiteType[] = [
    {
      type: 'E-commerce',
      keywords: ['shop', 'store', 'buy', 'purchase', 'cart', 'checkout', 'product', 'retail', 'marketplace', 'ecommerce', 'e-commerce'],
      sections: ['Hero', 'Featured Products', 'Categories', 'Shopping Cart', 'Customer Reviews', 'Newsletter Signup']
    },
    {
      type: 'Restaurant/Food',
      keywords: ['restaurant', 'cafe', 'food', 'dining', 'menu', 'reservation', 'kitchen', 'chef', 'bakery', 'pizzeria', 'bar', 'pub'],
      sections: ['Hero', 'Menu', 'Reservations', 'Location & Hours', 'About Us', 'Contact']
    },
    {
      type: 'Blog/News',
      keywords: ['blog', 'news', 'article', 'content', 'publish', 'journal', 'magazine', 'editorial', 'media'],
      sections: ['Hero', 'Latest Articles', 'Categories', 'Subscribe', 'About', 'Contact']
    },
    {
      type: 'Portfolio/Creative',
      keywords: ['portfolio', 'creative', 'design', 'art', 'photography', 'freelance', 'agency', 'studio', 'artist', 'work'],
      sections: ['Hero', 'Portfolio', 'Services', 'About', 'Contact', 'Testimonials']
    },
    {
      type: 'Technology/Apps',
      keywords: ['app', 'software', 'tech', 'technology', 'mobile', 'web', 'development', 'startup', 'saas', 'platform'],
      sections: ['Hero', 'Features', 'Download', 'Pricing', 'Support', 'Contact']
    },
    {
      type: 'Health/Medical',
      keywords: ['health', 'medical', 'doctor', 'clinic', 'hospital', 'wellness', 'fitness', 'therapy', 'dental', 'pharmacy'],
      sections: ['Hero', 'Services', 'Appointments', 'About', 'Testimonials', 'Contact']
    },
    {
      type: 'Education',
      keywords: ['education', 'school', 'university', 'course', 'training', 'learning', 'academy', 'institute', 'tutorial'],
      sections: ['Hero', 'Courses', 'Enrollment', 'About', 'Faculty', 'Contact']
    },
    {
      type: 'Real Estate',
      keywords: ['real estate', 'property', 'house', 'apartment', 'rent', 'buy', 'agent', 'broker', 'listing'],
      sections: ['Hero', 'Properties', 'Services', 'About', 'Contact', 'Testimonials']
    },
    {
      type: 'Fitness/Sports',
      keywords: ['fitness', 'gym', 'workout', 'sports', 'training', 'exercise', 'health', 'wellness', 'coach'],
      sections: ['Hero', 'Classes', 'Membership', 'Schedule', 'Trainers', 'Contact']
    },
    {
      type: 'Music/Entertainment',
      keywords: ['music', 'entertainment', 'concert', 'band', 'artist', 'venue', 'tickets', 'performance', 'studio'],
      sections: ['Hero', 'Music', 'Events', 'Gallery', 'About', 'Contact']
    },
    {
      type: 'Travel/Tourism',
      keywords: ['travel', 'tourism', 'vacation', 'hotel', 'booking', 'destination', 'tour', 'guide', 'adventure'],
      sections: ['Hero', 'Destinations', 'Book Now', 'About', 'Gallery', 'Contact']
    },
    {
      type: 'Business Services',
      keywords: ['business', 'service', 'consulting', 'agency', 'corporate', 'professional', 'company', 'enterprise'],
      sections: ['Hero', 'Services', 'About', 'Team', 'Contact', 'Testimonials']
    },
    {
      type: 'Non-profit',
      keywords: ['non-profit', 'charity', 'donation', 'volunteer', 'cause', 'foundation', 'ngo', 'community'],
      sections: ['Hero', 'Mission', 'Donate', 'Get Involved', 'About', 'Contact']
    },
    {
      type: 'Personal/Blog',
      keywords: ['personal', 'blog', 'lifestyle', 'fashion', 'beauty', 'travel', 'food', 'family', 'life'],
      sections: ['Hero', 'About', 'Blog', 'Gallery', 'Contact', 'Newsletter']
    }
  ];

  async generateSections(idea: string): Promise<string[]> {
    this.logger.log(`Generating sections for idea: ${idea}`);
    
    try {
      const websiteType = this.analyzeWebsiteType(idea);
      const sections = this.getSectionsForType(websiteType);
      
      this.logger.log(`Generated ${sections.length} sections for ${websiteType} website`);
      return sections;
    } catch (error) {
      this.logger.error(`Error generating sections: ${error.message}`);
      return this.getDefaultSections();
    }
  }

  private analyzeWebsiteType(idea: string): string {
    const normalizedIdea = idea.toLowerCase();
    let bestMatch = { type: 'General', score: 0 };

    for (const websiteType of this.websiteTypes) {
      const score = this.calculateMatchScore(normalizedIdea, websiteType.keywords);
      if (score > bestMatch.score) {
        bestMatch = { type: websiteType.type, score };
      }
    }

    return bestMatch.type;
  }

  private calculateMatchScore(idea: string, keywords: string[]): number {
    let score = 0;
    
    for (const keyword of keywords) {
      if (idea.includes(keyword)) {
        score += 1;
        // Bonus for exact matches
        if (idea.includes(` ${keyword} `) || idea.startsWith(keyword) || idea.endsWith(keyword)) {
          score += 0.5;
        }
      }
    }

    return score;
  }

  private getSectionsForType(websiteType: string): string[] {
    const type = this.websiteTypes.find(t => t.type === websiteType);
    if (type) {
      // Return 4-6 sections randomly for variety
      const shuffled = [...type.sections].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 3) + 4);
    }
    
    return this.getDefaultSections();
  }

  private getDefaultSections(): string[] {
    return ['Hero', 'About', 'Services', 'Contact'];
  }

  async getWebsiteTypes(): Promise<WebsiteType[]> {
    return this.websiteTypes;
  }
} 