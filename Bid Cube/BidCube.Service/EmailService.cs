using MarketCubeMailAgent.Core;
using MarketCubeMailAgent.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BidCube.Service
{
    class EmailService
    {
        IEmailAgentService _emailService;
        public void Init()
        {
            _emailService = ServiceProvider.GetEmailAgentService();
        }

        public List<MarketCubeMailAgent.Core.Models.IEmailItem> SearchForEmailsBySubject(string subjectString)
        {
            List<MarketCubeMailAgent.Core.Models.IEmailItem> items = _emailService.SearchEmailBySubject(subjectString);
            return items;
        }

        public void SendEmail(MarketCubeMailAgent.Core.Models.IEmailItem emailToSend)
        {
            /*needed fields in IEmailItem:
             * newMail.Subject = "Test Email with Attachment";
             * newMail.Recipients = new Core.Models.Recipients();
             * newMail.Recipients.Add(new Core.Models.EmailAddress() { Address = "abrar.bashah@market-cube.com" });
             * newMail.Body = "Test Body";
             * newMail.Attachements = new System.Collections.Generic.List<Core.Models.EmailAttachment>();
             * newMail.Attachements.Add(new Core.Models.EmailAttachment() {
                Data= FileToByteArray(@"C:\Users\abrar\Desktop\Documentation\Bid Cube Documentation\Bid Cube Spec v5.xlsx"),
                Name ="spec.xlsx"
            });
            */
            MarketCubeMailAgent.Core.Models.IEmailItem newMail = new MarketCubeMailAgent.Core.Models.EmailItem();
            newMail = emailToSend;
            _emailService.SendEmail(newMail);
        }
    }
}
