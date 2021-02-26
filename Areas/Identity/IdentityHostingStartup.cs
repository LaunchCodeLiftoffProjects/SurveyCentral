using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestCentral.Data;
using TestCentral.Models;

[assembly: HostingStartup(typeof(TestCentral.Areas.Identity.IdentityHostingStartup))]
namespace TestCentral.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            //This code links it to the MySQL Database

            builder.ConfigureServices((context, services) => {
                services.AddDbContext<TestDBContext>(options =>
                    options.UseMySql(
                        context.Configuration.GetConnectionString("DefaultConnection")));

                //Change options below to change password input parameters (alphanumeric, minimum length, etc.)

                services.AddDefaultIdentity<TestUser>(options => options.SignIn.RequireConfirmedAccount = false)
                    .AddEntityFrameworkStores<TestDBContext>();
            });
        }
    }
}