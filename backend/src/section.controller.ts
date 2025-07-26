import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  ValidationPipe, 
  UsePipes,
  HttpStatus,
  HttpCode,
  Logger
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionResponseDto, ApiResponseDto } from './dto/section-response.dto';

@Controller('sections')
export class SectionController {
  private readonly logger = new Logger(SectionController.name);

  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createSectionDto: CreateSectionDto): Promise<ApiResponseDto<SectionResponseDto>> {
    this.logger.log(`Creating section for idea: ${createSectionDto.idea}`);
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<ApiResponseDto<SectionResponseDto[]>> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    this.logger.log(`Fetching sections - page: ${pageNum}, limit: ${limitNum}`);
    return this.sectionService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<ApiResponseDto<SectionResponseDto>> {
    this.logger.log(`Fetching section with ID: ${id}`);
    return this.sectionService.findOne(id);
  }

  @Get('search/:query')
  @HttpCode(HttpStatus.OK)
  async search(@Param('query') query: string): Promise<ApiResponseDto<SectionResponseDto[]>> {
    this.logger.log(`Searching sections with query: ${query}`);
    return this.sectionService.search(query);
  }

  @Get('stats/overview')
  @HttpCode(HttpStatus.OK)
  async getStats(): Promise<ApiResponseDto<any>> {
    this.logger.log('Fetching application statistics');
    return this.sectionService.getStats();
  }
} 