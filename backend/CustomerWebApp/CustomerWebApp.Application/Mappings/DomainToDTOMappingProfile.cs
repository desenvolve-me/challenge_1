using AutoMapper;
using CustomerWebApp.Application.DTOs;
using CustomerWebApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerWebApp.Application.Mappings
{
    public class DomainToDTOMappingProfile : Profile
    {
        public DomainToDTOMappingProfile()
        {
            CreateMap<Customer, CustomerDTO>().ReverseMap();
        }
    }
}
