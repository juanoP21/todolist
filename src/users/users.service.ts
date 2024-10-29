import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, private jwtService: JwtService,

  ) { }
  async create(createUserDto: CreateUserDto) {
    const { password, ...userdata } = createUserDto;
    // Check if user already exists
    const salt = bcrypt.genSaltSync();
    const userParse = {
      ...userdata,
      password: await bcrypt.hash(password, salt),
    };
    await this.userRepository.save(userParse);
    return { message: 'User created successfully' };

  }



  async login(userlogindata: LoginAuthDto): Promise<{ access_token: string }> {
    const { password } = userlogindata;
    const userExist = await this.userRepository.find({
      where: { email: userlogindata.email },
    });

    if (!userExist) throw new HttpException('User no exist', HttpStatus.CONFLICT);

    const isCheck = await bcrypt.compare(password, userExist[0].password);

    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const user = userExist[0];
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }



  findUserById(id: number) {
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }



  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
