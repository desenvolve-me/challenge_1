using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerWebApp.Domain.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string CPF { get; set; }
        [NotMapped]
        public string sBirthDate { get; set; }
    }
}
