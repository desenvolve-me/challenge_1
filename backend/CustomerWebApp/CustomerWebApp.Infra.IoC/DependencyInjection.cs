using CustomerWebApp.Application.Interfaces;
using CustomerWebApp.Application.Mappings;
using CustomerWebApp.Application.Services;
using CustomerWebApp.Domain.Interfaces;
using CustomerWebApp.Infra.Data.Context;
using CustomerWebApp.Infra.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CustomerWebApp.Infra.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
            b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

            services.AddScoped<ICustomerRepository, CustomerRepository>();

            services.AddAutoMapper(typeof(DomainToDTOMappingProfile));

            services.AddScoped<ICustomerService, CustomerService>();

            return services;
        }
    }
}
