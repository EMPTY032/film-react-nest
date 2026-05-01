import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TSKVLogger implements LoggerService {
  log(message: any) {
    console.log(
      `tskv\tlevel=log\tmessage=${message}\ttimestamp=${new Date().toISOString()}\n`,
    );
  }

  warn(message: any) {
    console.log(
      `tskv\tlevel=warn\tmessage=${message}\ttimestamp=${new Date().toISOString()}\n`,
    );
  }

  error(message: any) {
    console.log(
      `tskv\tlevel=error\tmessage=${message}\ttimestamp=${new Date().toISOString()}\n`,
    );
  }
}
