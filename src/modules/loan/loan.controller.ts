import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseFilters,
  UseGuards,
  Patch,
  Param,
  Query,
  NotFoundException,
  Delete,
  Get,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { User, UserRole } from 'src/domain/user';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ParamIdDto } from './dto/param-id.dto';
import { FilterFindAllLoanDto } from './dto/filter-find-all-loan.dto';

@Controller('loan')
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createLoanDto: CreateLoanDto, @CurrentUser() user: User) {
    return this.loanService.create(createLoanDto, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param() param: ParamIdDto,
    @Query('action') action?: 'approve' | 'reject',
  ) {
    switch (action) {
      case 'approve':
        return this.loanService.approve(param.id);
      case 'reject':
        return this.loanService.reject(param.id);
      default:
        throw new NotFoundException();
    }
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param() param: ParamIdDto) {
    return this.loanService.delete(param.id);
  }

  @Get()
  @Roles(UserRole.MANAGER)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Query() filter: FilterFindAllLoanDto) {
    return this.loanService.findAll(filter);
  }

  @Get('my-loan')
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  myLoan(@CurrentUser() user: User) {
    return this.loanService.findAll({ user_id: user.id });
  }
}
