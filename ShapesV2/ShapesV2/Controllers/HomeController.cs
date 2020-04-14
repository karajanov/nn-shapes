using Microsoft.AspNetCore.Mvc;

namespace ShapesV2.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {}

        public IActionResult Index() => View();

        public IActionResult Preview() => View();

        public IActionResult Error() => View();  
    }
}
