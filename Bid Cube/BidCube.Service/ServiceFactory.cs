using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BidCube.Service
{
    public class ServiceFactory
    {
        public static IService.Base GetService<T>() where T : IServiceBase, new()
        {
            return new T();
        }

    }

}
