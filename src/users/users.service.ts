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
    const { password, ...userdata } = createUserDto;// se desessctructura el password
    const salt = bcrypt.genSaltSync();
    const userParse = {
      ...userdata,
      password: await bcrypt.hash(password, salt),
    };// se agrega el password encriptado y se guarda en la base de datos
    await this.userRepository.save(userParse);
    return { message: 'User created successfully' };

  }



  async login(userlogindata: LoginAuthDto): Promise<{ access_token: string }> {
    const { password } = userlogindata;
    //validar si el usuario existe en la base de datos
    const userExist = await this.userRepository.find({
      where: { email: userlogindata.email },
    });

    if (!userExist) throw new HttpException('User no exist', HttpStatus.CONFLICT);

    const isCheck = await bcrypt.compare(password, userExist[0].password);
    //validar si la contraseña es correcta usando bcrypt
    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const user = userExist[0];
    //retornamos el token con la informacion del usuario
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

}
