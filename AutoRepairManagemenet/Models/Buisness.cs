using System.ComponentModel.DataAnnotations;

namespace AutoRepairManagemenet.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string CarBrand { get; set; }
        public string CarNumber { get; set; }
        public string CarVin { get; set; }
    }

    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Position { get; set; }
    }

    public class AutoPart
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
    }

    public class Job
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
    }

    public class Order
    {
        [Key]
        public int Id { get; set; }
        public Client? Client { get; set; }
        public Employee? Employee { get; set; }
        public Job? Job { get; set; }
        public AutoPart? AutoPart { get; set; }
        public DateTime? DateTime { get; set; }
    }


    public class Document
    {
        [Key]
        public int Id { get; set; }
        public Order? Order { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public JobQuality JobQuality { get; set; }
        public ClientReview ClientReview { get; set; }
    }


    public enum OrderStatus
    {
        NotReady,
        Ready
    }

    public enum JobQuality
    {
        Low,
        Normal,
        High
    }

    public enum ClientReview
    {
        VeryBad,
        Bad,
        Normal,
        Good,
        Excellent
    }
}
