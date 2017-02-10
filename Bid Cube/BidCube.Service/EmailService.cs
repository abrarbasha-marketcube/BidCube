using OpenPop.Mime;
using OpenPop.Mime.Header;
using OpenPop.Pop3;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace BidCube.BidCubeUtilities
{
    public class EmailService
    {

        //TODO: finish method based on object being parsed. Will most likely be a Bid object
        public Guid CreateGuidForNewMessage(string messageID)
        {
            //if(messageID IS NOT in list of MessageIDs -- from header){
            return Guid.NewGuid();
            //}

        }
        /// <summary>
        /// Example showing:
        ///  - how to use UID's (unique ID's) of messages from the POP3 server
        ///  - how to download messages not seen before
        ///    (notice that the POP3 protocol cannot see if a message has been read on the server
        ///     before. Therefore the client need to maintain this state for itself)
        /// </summary>
        /// <param name="hostname">Hostname of the server. For example: pop3.live.com</param>
        /// <param name="port">Host port to connect to. Normally: 110 for plain POP3, 995 for SSL POP3</param>
        /// <param name="useSsl">Whether or not to use SSL to connect to server</param>
        /// <param name="username">Username of the user on the server</param>
        /// <param name="password">Password of the user on the server</param>
        /// <param name="seenUids">
        /// List of UID's of all messages seen before.
        /// New message UID's will be added to the list.
        /// Consider using a HashSet if you are using >= 3.5 .NETa
        /// </param>
        /// <returns>A List of new Messages on the server</returns>
        public static List<Message> FetchUnseenMessages(string hostname, int port, bool useSsl, string username, string password, List<string> seenUids)
        {
            // The client disconnects from the server when being disposed
            using (Pop3Client client = new Pop3Client())
            {
                // Connect to the server
                client.Connect(hostname, port, useSsl);

                // Authenticate ourselves towards the server
                client.Authenticate(username, password);

                // Fetch all the current uids seen
                List<string> uids = client.GetMessageUids();

                // Create a list we can return with all new messages
                List<Message> newMessages = new List<Message>();

                // All the new messages not seen by the POP3 client
                for (int i = 0; i < uids.Count; i++)
                {
                    string currentUidOnServer = uids[i];
                    if (!seenUids.Contains(currentUidOnServer))
                    {
                        // We have not seen this message before.
                        // Download it and add this new uid to seen uids

                        // the uids list is in messageNumber order - meaning that the first
                        // uid in the list has messageNumber of 1, and the second has 
                        // messageNumber 2. Therefore we can fetch the message using
                        // i + 1 since messageNumber should be in range [1, messageCount]
                        Message unseenMessage = client.GetMessage(i + 1);

                        // Add the message to the new messages
                        newMessages.Add(unseenMessage);

                        // Add the uid to the seen uids, as it has now been seen
                        seenUids.Add(currentUidOnServer);
                    }
                }

                // Return our new found messages
                return newMessages;
            }
        } //end FetchUnseenMessages()

        /// <summary>
        /// Example showing:
        ///  - how to fetch only headers from a POP3 server
        ///  - how to examine some of the headers
        ///  - how to fetch a full message
        ///  - how to find a specific attachment and save it to a file
        /// </summary>
        /// <param name="hostname">Hostname of the server. For example: pop3.live.com</param>
        /// <param name="port">Host port to connect to. Normally: 110 for plain POP3, 995 for SSL POP3</param>
        /// <param name="useSsl">Whether or not to use SSL to connect to server</param>
        /// <param name="username">Username of the user on the server</param>
        /// <param name="password">Password of the user on the server</param>
        /// <param name="messageNumber">
        /// The number of the message to examine.
        /// Must be in range [1, messageCount] where messageCount is the number of messages on the server.
        /// </param>
        public static void HeadersFromAndSubject(string hostname, int port, bool useSsl, string username, string password, int messageNumber)
        {
            // The client disconnects from the server when being disposed
            using (Pop3Client client = new Pop3Client())
            {
                // Connect to the server
                client.Connect(hostname, port, useSsl);

                // Authenticate ourselves towards the server
                client.Authenticate(username, password);

                // We want to check the headers of the message before we download
                // the full message
                MessageHeader headers = client.GetMessageHeaders(messageNumber);

                RfcMailAddress from = headers.From;
                string subject = headers.Subject;

                // Only want to download message if:
                //  - is from test@xample.com
                //  - has subject "Some subject"
                if (from.HasValidMailAddress && from.Address.Equals("test@example.com") && "Some subject".Equals(subject))
                {
                    // Download the full message
                    Message message = client.GetMessage(messageNumber);

                    // We know the message contains an attachment with the name "useful.pdf".
                    // We want to save this to a file with the same name
                    foreach (MessagePart attachment in message.FindAllAttachments())
                    {
                        if (attachment.FileName.Equals("useful.pdf"))
                        {
                            // Save the raw bytes to a file
                            File.WriteAllBytes(attachment.FileName, attachment.Body);
                        }
                    }
                }
            }
        } //end HeadersFromAndSubject()
    }
}