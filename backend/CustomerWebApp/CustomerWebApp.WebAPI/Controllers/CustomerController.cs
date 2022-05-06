using CustomerWebApp.Application.DTOs;
using CustomerWebApp.Application.Interfaces;
using CustomerWebApp.WebAPI.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerWebApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private Validations validations = new Validations();

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("getAllCustomers")]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> FindAllCustomers()
        {
            var customers = await _customerService.GetAllCustomers();
            if (customers.Count() == 0) return NotFound();
            return Ok(customers);
        }

        [HttpGet("getCustomer/{cpf}")]
        public async Task<ActionResult<CustomerDTO>> FindCustomerByCpf(string cpf)
        {
            var customer = await _customerService.GetCustomerByCpf(cpf);
            if (customer == null) return NotFound();
            return Ok(customer);
        }

        [HttpPost("createCustomer")]
        public async Task<ActionResult<CustomerDTO>> CreateCustomer([FromBody] CustomerDTO customerDTO)
        {
            if (customerDTO == null) return BadRequest();

            //Validate the cpf value for the new customer
            if (!validations.ValidateCpf(customerDTO.CPF)) return UnprocessableEntity("CPF inválido");

            await _customerService.AddCustomer(customerDTO);
            return Ok("Cliente adicionado com sucesso");
        }

    }
}
