using AutoMapper;
using CustomerWebApp.Application.DTOs;
using CustomerWebApp.Application.Interfaces;
using CustomerWebApp.Domain.Entities;
using CustomerWebApp.Domain.Interfaces;

namespace CustomerWebApp.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private ICustomerRepository _customerRepository;
        private IMapper _mapper;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository ??
                throw new ArgumentNullException(nameof(customerRepository));
            _mapper = mapper;
        }

        public async Task AddCustomer(CustomerDTO customerDTO)
        {
            var customerEntity = _mapper.Map<Customer>(customerDTO);
            await _customerRepository.AddCustomerAsync(customerEntity);
        }

        public async Task<IEnumerable<CustomerDTO>> GetAllCustomers()
        {
            var customersEntity = await _customerRepository.GetAllCustomersAsync();
            return _mapper.Map<IEnumerable<CustomerDTO>>(customersEntity);
        }

        public async Task<CustomerDTO> GetCustomerByCpf(string cpf)
        {
            var customerEntity = await _customerRepository.GetCustomerByCpfAsync(cpf);
            return _mapper.Map<CustomerDTO>(customerEntity);
        }
    }
}
