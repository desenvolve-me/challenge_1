using CustomerWebApp.Domain.Entities;
using CustomerWebApp.Domain.Interfaces;
using CustomerWebApp.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerWebApp.Infra.Data.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private ApplicationDbContext _context;

        public CustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            if (customer != null)
            {
                _context.Add(customer);
                await _context.SaveChangesAsync();
                return customer;
            }
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer> GetCustomerByCpfAsync(string cpf)
        {
            return await _context.Customers.Where(c => c.CPF == cpf).FirstOrDefaultAsync();
        }
    }
}
