using AutoRepairManagemenet.Models;

namespace AutoRepairManagemenet.Services
{
    public interface IDataService
    {
        #region clients
        IEnumerable<Client> FetchClients();
        void AddOrUpdateClient(Client client);
        void RemoveClient(int id);

        #endregion

        #region employers
        IEnumerable<Employee> FetchEmployers();
        void AddOrUpdateEmployee(Employee employee);
        void RemoveEmployee(int id);
        #endregion

        #region jobs
        IEnumerable<Job> FetchJobs();
        void AddOrUpdateJob(Job job);
        void RemoveJob(int id);
        #endregion

        #region parts
        IEnumerable<AutoPart> FetchParts();
        void AddOrUpdatePart(AutoPart part);
        void RemovePart(int id);
        #endregion
        
        #region orders
        IEnumerable<Order> FetchOrders();
        void AddOrUpdateOrder(Order order);
        void RemoveOrder(int id);
        #endregion


        #region documents
        IEnumerable<Document> FetchDocuments();
        void AddOrUpdateDocument(Document document);
        void RemoveDocument(int id);
        #endregion



    }
}
