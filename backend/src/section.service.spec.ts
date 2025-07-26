import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SectionService } from './section.service';
import { LlmService } from './llm.service';
import { Section, SectionDocument } from './section.schema';
import { CreateSectionDto } from './dto/create-section.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SectionService', () => {
  let service: SectionService;
  let sectionModel: Model<SectionDocument>;
  let llmService: LlmService;

  const mockSectionModel = {
    new: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
  };

  const mockLlmService = {
    generateSections: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: getModelToken(Section.name),
          useValue: mockSectionModel,
        },
        {
          provide: LlmService,
          useValue: mockLlmService,
        },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
    sectionModel = module.get<Model<SectionDocument>>(getModelToken(Section.name));
    llmService = module.get<LlmService>(LlmService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new section successfully', async () => {
      const createSectionDto: CreateSectionDto = {
        idea: 'Test website idea',
      };

      const mockSections = ['Hero', 'About', 'Contact'];
      const mockSavedSection = {
        _id: '507f1f77bcf86cd799439011',
        idea: createSectionDto.idea,
        sections: mockSections,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockLlmService.generateSections.mockResolvedValue(mockSections);
      mockSectionModel.new.mockReturnValue(mockSavedSection);
      mockSectionModel.save.mockResolvedValue(mockSavedSection);

      const result = await service.create(createSectionDto);

      expect(mockLlmService.generateSections).toHaveBeenCalledWith(createSectionDto.idea);
      expect(mockSectionModel.new).toHaveBeenCalledWith({
        idea: createSectionDto.idea,
        sections: mockSections,
      });
      expect(mockSectionModel.save).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.data!.idea).toBe(createSectionDto.idea);
      expect(result.data!.sections).toEqual(mockSections);
    });

    it('should throw BadRequestException when creation fails', async () => {
      const createSectionDto: CreateSectionDto = {
        idea: 'Test website idea',
      };

      mockLlmService.generateSections.mockRejectedValue(new Error('LLM service error'));

      await expect(service.create(createSectionDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return paginated sections', async () => {
      const mockSections = [
        {
          _id: '507f1f77bcf86cd799439011',
          idea: 'Test idea 1',
          sections: ['Hero', 'About'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: '507f1f77bcf86cd799439012',
          idea: 'Test idea 2',
          sections: ['Contact', 'Services'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockSections),
      };

      mockSectionModel.find.mockReturnValue(mockQuery);
      mockSectionModel.countDocuments.mockResolvedValue(2);

      const result = await service.findAll(1, 10);

      expect(mockSectionModel.find).toHaveBeenCalled();
      expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    it('should throw BadRequestException when fetch fails', async () => {
      mockSectionModel.find.mockImplementation(() => {
        throw new Error('Database error');
      });

      await expect(service.findAll()).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a section by ID', async () => {
      const mockSection = {
        _id: '507f1f77bcf86cd799439011',
        idea: 'Test idea',
        sections: ['Hero', 'About'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockQuery = {
        exec: jest.fn().mockResolvedValue(mockSection),
      };

      mockSectionModel.findById.mockReturnValue(mockQuery);

      const result = await service.findOne('507f1f77bcf86cd799439011');

      expect(mockSectionModel.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(result.success).toBe(true);
      expect(result.data!._id).toBe('507f1f77bcf86cd799439011');
    });

    it('should throw NotFoundException when section not found', async () => {
      const mockQuery = {
        exec: jest.fn().mockResolvedValue(null),
      };

      mockSectionModel.findById.mockReturnValue(mockQuery);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('search', () => {
    it('should return search results', async () => {
      const mockSections = [
        {
          _id: '507f1f77bcf86cd799439011',
          idea: 'Bakery website',
          sections: ['Hero', 'Menu'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockSections),
      };

      mockSectionModel.find.mockReturnValue(mockQuery);

      const result = await service.search('bakery');

      expect(mockSectionModel.find).toHaveBeenCalledWith({
        $text: { $search: 'bakery' },
      });
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getStats', () => {
    it('should return statistics', async () => {
      mockSectionModel.countDocuments
        .mockResolvedValueOnce(100) // totalSections
        .mockResolvedValueOnce(5); // todaySections

      mockSectionModel.aggregate.mockResolvedValue([
        { _id: 'bakery', count: 10 },
        { _id: 'restaurant', count: 8 },
      ]);

      const result = await service.getStats();

      expect(mockSectionModel.countDocuments).toHaveBeenCalledTimes(2);
      expect(mockSectionModel.aggregate).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.data.totalSections).toBe(100);
      expect(result.data.todaySections).toBe(5);
      expect(result.data.popularIdeas).toHaveLength(2);
    });
  });
}); 