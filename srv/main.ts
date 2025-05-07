import { Customer, Customers } from '@cds-models/sales';

const customer: Customers = {
    email: 'teste@teste.com',
    firstName: 'Jonatas',
    lastName: 'Cardoso',
    id: '1234'
};

const customers = [customer]
const funcao = (variavel: string) =>console.log(variavel);

funcao('1234');
