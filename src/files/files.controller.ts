import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file upload' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
    console.log('Uploaded file:', file);
    if (!file) {
      throw new Error('File upload failed');
    }
    return await this.filesService.create(createFileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  @ApiResponse({ status: 200, description: 'Files retrieved successfully' })
  async findAll() {
    return await this.filesService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active files' })
  @ApiResponse({ status: 200, description: 'Active files retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No active files found' })
  async findAllActive() {
    return await this.filesService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a file by ID' })
  @ApiResponse({ status: 200, description: 'File retrieved successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async findOne(@Param('id') id: string) {
    return await this.filesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a file' })
  @ApiResponse({ status: 200, description: 'File updated successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return await this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async remove(@Param('id') id: string) {
    return await this.filesService.remove(id);
  }

  @Delete('deactivate/:id')
  @ApiOperation({ summary: 'Deactivate a file' })
  @ApiResponse({ status: 200, description: 'File status updated to inactive' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async deactivate(@Param('id') id: string) {
    return await this.filesService.deactivate(id);
  }
}
