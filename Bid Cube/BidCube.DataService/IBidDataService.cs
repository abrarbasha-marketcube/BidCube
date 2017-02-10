using BidCube.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BidCube.DataService
{
    #region IBidService Interface declation
    public interface IBidDataService
    {
        /// <summary>
        /// Adds new bids 
        /// </summary>
        /// <param name="bids"> List of bids to be added</param>
        /// <returns></returns>
        bool AddBids(List<Bid> bids);

        /// <summary>
        /// Gets status history of a bid
        /// </summary>
        /// <param name="bidId">bid id</param>
        /// <returns></returns>
        List<Status_History> GetBidStatusHistory(int bidId);
    }

    #endregion

    #region IBidService Implementation
    public class BidDataService : IBidDataService
    {
        //public void Dispose()
        //{
        //    //throw new NotImplementedException();
        //}

        bool IBidDataService.AddBids(List<Bid> bids)
        {
            try
            {

            using (var db = new BidCubeEntities())
            {
                foreach (var bid in bids)
                {
                    db.Bid.Add(bid);
                }
                db.SaveChanges();
                return true;
            }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return false;
        }

        List<Status_History> IBidDataService.GetBidStatusHistory(int bidId)
        {
            List<Status_History> response = new List<Status_History>();

            using (var db = new BidCubeEntities())
            {
                response = db.Status_History.ToList();
            }
            return response;
        }
    }

    #endregion
}
