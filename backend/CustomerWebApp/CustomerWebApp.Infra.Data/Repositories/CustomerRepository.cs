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
            var customers = await _context.Customers.ToListAsync();
            if (customers.Count > 0)
            {
                foreach (var customer in customers)
                {
                    customer.sBirthDate = customer.BirthDate.ToString().Substring(0, 10);
                }
            }
            return customers;
        }

        public async Task<Customer> GetCustomerByCpfAsync(string cpf)
        {
            var customer = await _context.Customers.Where(c => c.CPF == cpf).FirstOrDefaultAsync();
            if (customer != null)
            {
                customer.sBirthDate = customer.BirthDate.ToString().Substring(0, 10);
            }
            return customer;
        }
    }
}
