import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) { }

  async create(createFileDto: CreateFileDto): Promise<File> {
    try {
      const file = this.fileRepository.create(createFileDto);
      return await this.fileRepository.save(file);
    } catch (error) {
      throw new InternalServerErrorException('Error creating file');
    }
  }

  async findAll(): Promise<File[]> {
    try {
      return await this.fileRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching files');
    }
  }

  async findAllActive(): Promise<File[]> {
    try {
      const files = await this.fileRepository.find({ where: { is_active: true } });
      if (!files || files.length === 0) {
        throw new NotFoundException('No active files found');
      }
      return files;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching active files');
    }
  }

  async findOne(id: string): Promise<File> {
    try {
      const file = await this.fileRepository.findOne({ where: { id } });
      if (!file) {
        throw new NotFoundException('File not found');
      }
      return file;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching file');
    }
  }

  async update(id: string, updateFileDto: UpdateFileDto): Promise<File> {
    try {
      await this.fileRepository.update(id, updateFileDto);
      const updatedFile = await this.fileRepository.findOne({ where: { id } });
      if (!updatedFile) {
        throw new NotFoundException('File not found');
      }
      return updatedFile;
    } catch (error) {
      throw new InternalServerErrorException('Error updating file');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.fileRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('File not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting file');
    }
  }

  async deactivate(id: string): Promise<{ message: string }> {
    try {
      const file = await this.fileRepository.findOne({ where: { id } });
      if (!file) {
        throw new NotFoundException('File not found');
      }

      file.is_active = false;
      await this.fileRepository.save(file);

      return { message: 'File status updated to inactive' };
    } catch (error) {
      throw new InternalServerErrorException('Error deactivating file');
    }
  }
}
