import { Inject } from '@nestjs/common';
import JunoProvider from './../juno.provider';

const InjectJunoProvider = () => Inject(JunoProvider);

export default InjectJunoProvider;
