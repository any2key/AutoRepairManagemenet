using AutoRepairManagemenet.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoRepairManagemenet.Services
{
    public class DataService : IDataService
    {
        #region clients
        public void AddOrUpdateClient(Client client)
        {
            ArmEx.Run(db =>
            {
                var c = db.Clients.FirstOrDefault(e => e.Id == client.Id);

                if (c != null)
                {
                    c.CarNumber = client.CarNumber;
                    c.Name = client.Name;
                    c.CarVin = client.CarVin;
                    c.Phone = client.Phone;
                    c.CarBrand = client.CarBrand;
                }
                else
                {
                    db.Clients.Add(new Client()
                    {
                        CarBrand = client.CarBrand,
                        Phone = client.Phone,
                        Name = client.Name,
                        CarNumber = client.CarNumber,
                        CarVin = client.CarVin,
                    });
                }
                db.SaveChanges();

            });
        }



        public IEnumerable<Client> FetchClients()
        {
            return ArmEx.Run(db =>
            {
                return db.Clients.ToArray();
            });
        }



        public void RemoveClient(int id)
        {
            ArmEx.Run(db =>
            {
                var orders = db.Orders.Include(e => e.Client).Where(e => e.Client.Id == id);
                foreach (var o in orders)
                {
                    o.Client = null;
                }
                db.Clients.Remove(db.Clients.FirstOrDefault(e => e.Id == id));
                db.SaveChanges();
            });
        }


        #endregion

        #region employers
        public void AddOrUpdateEmployee(Employee employee)
        {
            ArmEx.Run(db =>
            {
                var c = db.Employers.FirstOrDefault(e => e.Id == employee.Id);

                if (c != null)
                {
                    c.Name = employee.Name;
                    c.Phone = employee.Phone;
                    c.Position = employee.Position;
                }
                else
                {
                    db.Employers.Add(new Employee()
                    {
                        Phone = employee.Phone,
                        Name = employee.Name,
                        Position = employee.Position

                    });
                }
                db.SaveChanges();

            });
        }
        public IEnumerable<Employee> FetchEmployers()
        {
            return ArmEx.Run(db =>
            {
                return db.Employers.ToArray();
            });
        }
        public void RemoveEmployee(int id)
        {
            ArmEx.Run(db =>
            {
                var orders = db.Orders.Include(e => e.Employee).Where(e => e.Employee.Id == id);
                foreach (var o in orders)
                {
                    o.Employee = null;
                }

                db.Employers.Remove(db.Employers.FirstOrDefault(e => e.Id == id));
                db.SaveChanges();
            });
        }
        #endregion

        #region jobs
        public IEnumerable<Job> FetchJobs()
        {
            return ArmEx.Run(db =>
            {
                return db.Jobs.ToArray();
            });
        }
        public void AddOrUpdateJob(Job job)
        {

            ArmEx.Run(db =>
            {
                var c = db.Jobs.FirstOrDefault(e => e.Id == job.Id);

                if (c != null)
                {
                    c.Name = job.Name;
                    c.Price = job.Price;
                }
                else
                {
                    db.Jobs.Add(new Job()
                    {
                        Name = job.Name,
                        Price = job.Price
                    });
                }
                db.SaveChanges();

            });

        }
        public void RemoveJob(int id)
        {
            ArmEx.Run(db =>
            {
                var orders = db.Orders.Include(e => e.Job).Where(e => e.Job.Id == id);
                foreach (var o in orders)
                {
                    o.Job = null;
                }

                db.Jobs.Remove(db.Jobs.FirstOrDefault(e => e.Id == id));
                db.SaveChanges();
            });
        }
        #endregion

        #region parts
        public IEnumerable<AutoPart> FetchParts()
        {
            return ArmEx.Run(db =>
            {
                return db.AutoParts.ToArray();
            });
        }
        public void AddOrUpdatePart(AutoPart part)
        {
            ArmEx.Run(db =>
            {
                var c = db.AutoParts.FirstOrDefault(e => e.Id == part.Id);

                if (c != null)
                {
                    c.Name = part.Name;
                    c.Price = part.Price;
                }
                else
                {
                    db.AutoParts.Add(new AutoPart()
                    {
                        Name = part.Name,
                        Price = part.Price
                    });
                }
                db.SaveChanges();

            });

        }
        public void RemovePart(int id)
        {
            ArmEx.Run(db =>
            {
                var orders=db.Orders.Include(e => e.AutoPart).Where(e => e.AutoPart.Id == id);
                foreach (var o in orders)
                {
                    o.AutoPart = null;
                }

                db.AutoParts.Remove(db.AutoParts.FirstOrDefault(e => e.Id == id));
                db.SaveChanges();
            });
        }
        #endregion


        #region orders
        public IEnumerable<Order> FetchOrders()
        {
            return ArmEx.Run(db =>
            {
                return db.Orders
                .Include(e => e.AutoPart)
                .Include(e => e.Client)
                .Include(e => e.Employee)
                .Include(e => e.Job)
                .ToArray();
            });
        }
        public void AddOrUpdateOrder(Order order)
        {
            ArmEx.Run(db =>
            {
                var c = db.Orders
                .Include(e => e.AutoPart)
                .Include(e => e.Client)
                .Include(e => e.Employee)
                .Include(e => e.Job)
                .FirstOrDefault(e => e.Id == order.Id);

                if (c != null)
                {
                    c.AutoPart = db.AutoParts.FirstOrDefault(e => e.Id == order.AutoPart.Id);
                    c.Job = db.Jobs.FirstOrDefault(e => e.Id == order.Job.Id);
                    c.Employee = db.Employers.FirstOrDefault(e => e.Id == order.Employee.Id);
                    c.Client = db.Clients.FirstOrDefault(e => e.Id == order.Client.Id);
                }
                else
                {
                    db.Orders.Add(new Order()
                    {
                        AutoPart = db.AutoParts.FirstOrDefault(e => e.Id == order.AutoPart.Id),
                        Job = db.Jobs.FirstOrDefault(e => e.Id == order.Job.Id),
                        Employee = db.Employers.FirstOrDefault(e => e.Id == order.Employee.Id),
                        Client = db.Clients.FirstOrDefault(e => e.Id == order.Client.Id),
                        DateTime = DateTime.Now,
                    });
                }
                db.SaveChanges();

            });
        }
        public void RemoveOrder(int id)
        {
            ArmEx.Run(db =>
            {
               var docs=db.Documents.Include(e => e.Order).Where(e => e.Order.Id == id);
                foreach (var d in docs)
                {
                    d.Order = null;
                }
                db.Orders.Remove(db.Orders.FirstOrDefault(e => e.Id == id));
                db.SaveChanges();
            });
        }
        #endregion


        #region documents
        public IEnumerable<Document> FetchDocuments()
        {
            return ArmEx.Run(db =>
            {
                return db.Documents
                .Include(e => e.Order)
                .ToArray();
            });
        }
        public void AddOrUpdateDocument(Document document) 
        {

            ArmEx.Run(db =>
            {
                var c = db.Documents
                .Include(e => e.Order)
                .FirstOrDefault(e => e.Id == document.Id);

                if (c != null)
                {
                    c.Order = db.Orders.FirstOrDefault(e => e.Id == document.Order.Id);
                    c.OrderStatus = document.OrderStatus;
                    c.JobQuality=document.JobQuality;
                    c.ClientReview = document.ClientReview;
                }
                else
                {
                    db.Documents.Add(new Document()
                    {
                        Order = db.Orders.FirstOrDefault(e => e.Id == document.Order.Id),
                        ClientReview = document.ClientReview,
                        JobQuality = document.JobQuality,
                        OrderStatus=document.OrderStatus
                    });
                }
                db.SaveChanges();

            });

        }
        public void RemoveDocument(int id) 
        {
            ArmEx.Run(db =>
            {
                db.Documents.Remove(db.Documents.FirstOrDefault(e => e.Id == id));
                db.SaveChanges();
            });

        }
        #endregion
    }
}
