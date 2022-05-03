using CustomerWebApp.Domain.Entities;

namespace CustomerWebApp.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<IEnumerable<Customer>> GetAllCustomersAsync();
        Task<Customer> GetCustomerByCpfAsync(string cpf);
    }
}
