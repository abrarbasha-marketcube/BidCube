using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BidCube.Models
{
    public partial class StatusHistory
    {
        public int ID { get; set; }
        public System.Guid MCREF { get; set; }
        public string bid_status { get; set; }
        public string reply_status { get; set; }
        public string won_status { get; set; }
        public Nullable<System.DateTime> valid_from { get; set; }
        public Nullable<System.DateTime> valid_to { get; set; }
    }
}
