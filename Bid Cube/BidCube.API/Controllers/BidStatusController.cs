using BidCube.Models;
using BidCube.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BidCube.API.Controllers
{
    public class BidStatusController : ApiController
    {

        private IBidService _bidService
        {
            get
            {
                var service = BidCube.Service.ServiceFactory.GetService<BidService>();
                return (IBidService)service;
            }

        }

        // GET: api/BidStatus/5
        public List<StatusHistory> Get(int bidid)
        {
            return _bidService.GetBidStatusHistory(bidid);
        }

        // POST: api/BidStatus
        public void Post(BidCube.Models.Bid bid)
        {
            var bids = new List<Bid>();
            bids.Add(bid);
            var status = _bidService.AddBids(bids);
        }

        // PUT: api/BidStatus/5
        public void Put(int id, BidCube.Models.Bid bid)
        {
        }

        // DELETE: api/BidStatus/5
        public void Delete(int id)
        {
        }
    }
}
