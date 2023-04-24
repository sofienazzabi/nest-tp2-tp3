import { Global, Module } from '@nestjs/common';
import { IT } from 'src/injection-token';
import { v4 as uuidv4 } from 'uuid';

const CommonProv = {
    provide: IT.COMMON_MODULE,
    useValue: uuidv4
}

@Global()
@Module({
    providers: [
        CommonProv
    ],
    exports: [
        CommonProv
    ]
})
export class CommonModuleModule { }