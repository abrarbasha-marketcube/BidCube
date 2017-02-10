﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BidCube.Models
{
    public class Bid
    {

        public int ID { get; set; }
        public Nullable<System.Guid> MCREF { get; set; }
        public string sales_rep { get; set; }
        public string bidding_manager { get; set; }
        public string email_subject { get; set; }
        public Nullable<int> reply_count { get; set; }
        public string bid_status { get; set; }
        public string client { get; set; }
        public Nullable<double> CPI { get; set; }
        public Nullable<double> LOI { get; set; }
        public Nullable<double> IR { get; set; }
        public Nullable<int> n_requested { get; set; }
        public Nullable<int> n_feasible { get; set; }
        public Nullable<int> target_age_minimum { get; set; }
        public Nullable<int> target_age_maximum { get; set; }
        public string target_gender { get; set; }
        public string target_notes { get; set; }
        public string email_body { get; set; }
        public Nullable<bool> include_bid_details { get; set; }
        public byte[] upload_reference { get; set; }
        public byte[] upload_attachment { get; set; }
        public string tags { get; set; }
        public System.DateTime last_update { get; set; }
        public string country_language { get; set; }
    }
}
