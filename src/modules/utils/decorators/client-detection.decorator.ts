import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientType = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'] || '';
    const clientType = request.headers['x-client-type'];

    if (clientType) {
      return clientType;
    }

    if (/okhttp|CFNetwork|Dalvik/i.test(userAgent)) {
      return 'app';
    }

    if (
      /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile|BlackBerry/i.test(
        userAgent,
      )
    ) {
      return 'web';
    }

    return 'web';
  },
);
