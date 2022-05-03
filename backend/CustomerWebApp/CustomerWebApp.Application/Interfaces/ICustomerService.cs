using CustomerWebApp.Application.DTOs;

namespace CustomerWebApp.Application.Interfaces
{
    public interface ICustomerService
    {
        Task AddCustomer(CustomerDTO customerDTO);
        Task<IEnumerable<CustomerDTO>> GetAllCustomers();
        Task<CustomerDTO> GetCustomerByCpf(string cpf);
    }
}
