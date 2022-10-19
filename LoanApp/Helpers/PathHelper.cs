﻿using Microsoft.Extensions.Configuration;

namespace QuickApp.Helpers
{
    public class PathHelper
    {
        public IConfiguration _configuration;

        public PathHelper(IConfiguration configuration)
        {
            this._configuration = configuration;
        }
        public string DocumentPath
        {
            get
            {
                return _configuration["DocumentPath"];
            }
        }

        public string UserProfilePath
        {
            get
            {
                return _configuration["UserProfilePath"];
            }
        }
    }
}
