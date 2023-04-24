import { Injectable, InternalServerErrorException, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthentificationMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService
  ) {}

  async use(req: Request , res: Response, next: NextFunction) {
      const token = req.headers['auth-user'];

      if(!token) return next(new UnauthorizedException("auth-user header is missing."));

      try{
        const decoded = verify(token, process.env.JWT_SECRET, {"algorithms": ["HS256"]})
        if(!decoded) return next(new UnauthorizedException("Invalid token."));
        console.log(decoded["userId"])
        const user = await this.userService.findOne(decoded["userId"])
        req["user"] = user;
        next()
      }catch(err){
         return next(new UnauthorizedException("Invalid token."));
      }
      
  }
}