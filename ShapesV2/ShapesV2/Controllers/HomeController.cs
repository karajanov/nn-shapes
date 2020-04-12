using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShapesV2.Models;

namespace ShapesV2.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {}

        public IActionResult Index() => View();

        public IActionResult Training() => View();

        public IActionResult Error() => View();  
    }
}
