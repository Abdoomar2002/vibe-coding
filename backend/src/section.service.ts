import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './section.schema';
import { LlmService } from './llm.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionResponseDto, ApiResponseDto } from './dto/section-response.dto';

@Injectable()
export class SectionService {
  private readonly logger = new Logger(SectionService.name);

  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    private readonly llmService: LlmService,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<ApiResponseDto<SectionResponseDto>> {
    try {
      this.logger.log(`Creating section for idea: ${createSectionDto.idea}`);
      
      // Generate sections using AI
      const sections = await this.llmService.generateSections(createSectionDto.idea);
      
      // Create new section document
      const createdSection = new this.sectionModel({
        idea: createSectionDto.idea,
        sections,
      });
      
      const savedSection = await createdSection.save();
      
      this.logger.log(`Section created successfully with ID: ${savedSection._id}`);
      
      return {
        success: true,
        data: this.mapToResponseDto(savedSection),
        message: 'Section created successfully',
      };
    } catch (error) {
      this.logger.error(`Error creating section: ${error.message}`);
      throw new BadRequestException('Failed to create section');
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<ApiResponseDto<SectionResponseDto[]>> {
    try {
      const skip = (page - 1) * limit;
      
      const sections = await this.sectionModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
      
      const total = await this.sectionModel.countDocuments();
      
      return {
        success: true,
        data: sections.map(section => this.mapToResponseDto(section)),
        message: `Retrieved ${sections.length} sections`,
      };
    } catch (error) {
      this.logger.error(`Error fetching sections: ${error.message}`);
      throw new BadRequestException('Failed to fetch sections');
    }
  }

  async findOne(id: string): Promise<ApiResponseDto<SectionResponseDto>> {
    try {
      const section = await this.sectionModel.findById(id).exec();
      
      if (!section) {
        throw new NotFoundException('Section not found');
      }
      
      return {
        success: true,
        data: this.mapToResponseDto(section),
        message: 'Section retrieved successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error fetching section: ${error.message}`);
      throw new BadRequestException('Failed to fetch section');
    }
  }

  async search(query: string): Promise<ApiResponseDto<SectionResponseDto[]>> {
    try {
      const sections = await this.sectionModel
        .find({
          $text: { $search: query }
        })
        .sort({ score: { $meta: 'textScore' } })
        .limit(20)
        .exec();
      
      return {
        success: true,
        data: sections.map(section => this.mapToResponseDto(section)),
        message: `Found ${sections.length} matching sections`,
      };
    } catch (error) {
      this.logger.error(`Error searching sections: ${error.message}`);
      throw new BadRequestException('Failed to search sections');
    }
  }

  async getStats(): Promise<ApiResponseDto<any>> {
    try {
      const totalSections = await this.sectionModel.countDocuments();
      const todaySections = await this.sectionModel.countDocuments({
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
      });
      
      const popularIdeas = await this.sectionModel.aggregate([
        {
          $group: {
            _id: '$idea',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      
      return {
        success: true,
        data: {
          totalSections,
          todaySections,
          popularIdeas,
        },
        message: 'Statistics retrieved successfully',
      };
    } catch (error) {
      this.logger.error(`Error fetching stats: ${error.message}`);
      throw new BadRequestException('Failed to fetch statistics');
    }
  }

  private mapToResponseDto(section: SectionDocument): SectionResponseDto {
    return {
      _id: section._id.toString(),
      idea: section.idea,
      sections: section.sections,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    };
  }
} 