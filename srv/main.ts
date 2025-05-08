import cds, { Request , Service } from '@sap/cds'
import { Customers, SalesOrderHeaders } from '@cds-models/sales';


export default (service: Service) => {
    service.after('READ', 'Customers',(results: Customers) => {
        results.forEach(customer => {
            if (!customer.email?.includes('@')) {
                customer.email = `${customer.email}@microsoft.com`;
            }
        })
    });
    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const params = request.data;
        if (!params.customer_id) {
            return request.reject(400, 'Customer Inválido');
        }
        if (!params.items || params.items?.lenght === 0) {
            return request.reject(400, "Itens Inválidos");
        }
        const customerQuery = SELECT.one.from('sales.customers').where({ id: params.customer_id });
        const customer = await cds.run(customerQuery);
        if (!customer) {
            return request.reject(404, 'Customer não encontrado')
        }
        
    });
}