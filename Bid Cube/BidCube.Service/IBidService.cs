using BidCube.DataService;
using BidCube.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BidCube.Service
{

    #region Base service
    public interface IServiceBase
    {
    }

    #endregion
    #region IBidService Interface declation
    public interface IBidService : IServiceBase
    {
        /// <summary>
        /// Adds new bids 
        /// </summary>
        /// <param name="bids"> List of bids to be added</param>
        /// <returns></returns>
        bool AddBids(List<BidCube.Models.Bid> bids);

        /// <summary>
        /// Gets status history of a bid
        /// </summary>
        /// <param name="bidId">bid id</param>
        /// <returns></returns>
        List<BidCube.Models.StatusHistory> GetBidStatusHistory(int bidId);
    }

    #endregion


    #region IBidService Implementation
    public class BidService : IBidService
    {
        bool IBidService.AddBids(List<Models.Bid> bids)
        {
            IBidDataService repo = new BidDataService();
            List<Entities.Bid> bidsEntities = new List<Entities.Bid>();
            foreach (var biditem in bids)
            { // transform model bid object to entity bid object here 
                Entities.Bid b = new Entities.Bid()
                {
                    bidding_manager = biditem.bidding_manager,
                    client = biditem.client,
                    CPI = biditem.CPI,
                    country_language = biditem.country_language,
                    email_body = biditem.email_body,
                    email_subject = biditem.email_subject,
                    IR = biditem.IR,
                    LOI = biditem.LOI,
                    last_update = biditem.last_update,
                    reply_count = biditem.reply_count,
                    sales_rep =  biditem.sales_rep,
                    bid_status = biditem.bid_status
                    // check all properties 

                };
                bidsEntities.Add(b);
            }
            return repo.AddBids(bidsEntities);
        }

        List<StatusHistory> IBidService.GetBidStatusHistory(int bidId)
        {
            List<StatusHistory> response = new List<StatusHistory>();
            IBidDataService repo = new BidDataService();

            response = repo.GetBidStatusHistory(bidId).Select(c => new StatusHistory()
            {
                bid_status = c.bid_status,
                ID = c.ID,
                MCREF = c.MCREF,
                reply_status = c.reply_status,
                valid_from = c.valid_from,
                valid_to = c.valid_to,
                won_status = c.won_status

            }).ToList();


            return response;
        }
    }
    #endregion
}
