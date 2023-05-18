using Microsoft.EntityFrameworkCore;

namespace AutoRepairManagemenet
{
    public class ArmEx : AppDbContext
    {
        public ArmEx() : base()
        {

        }
        internal static void Run(Action<ArmEx> dbAction)
        {
            Run(db =>
            {
                dbAction(db);
                db.Database.CloseConnection();
                return true;
            });
        }

        internal static TResult Run<TResult>(Func<ArmEx, TResult> dbFunction)
        {
            using (var db = new ArmEx())
            {
                try
                {
                    return dbFunction(db);
                }
                catch (AggregateException)
                {
                    throw;
                }
            }
        }

        public override void Dispose()
        {
            Database.CloseConnection();
            base.Dispose();
        }
    }
}
