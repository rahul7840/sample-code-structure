import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserProfileModel } from 'src/model/users-model';
import * as jwt from 'jsonwebtoken';

export const UserId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const tokenFromHeader = request.headers?.authorization;
    const tokenFromCookie = request.cookies?.Authorization;

    console.log("tokenFromHeader: ", tokenFromHeader);
    console.log("tokenFromCookie: ", tokenFromCookie);

    let token = tokenFromHeader || tokenFromCookie;

    if (token) {
      token = token.replace("Bearer ", "");
    }

    if (!token) {
      return;
    }

    console.log("token in userid");

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    await UserProfileModel.findOne({
      where: { user_id: decoded.id },
    })
      .then((user) => {
        if (user) {
          request.headers['user_id'] = decoded.id;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return request.headers.user_id;
  },
);
