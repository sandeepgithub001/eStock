using BMS.Services.Implementation;
using BMS.Services.Middleware;
using EStock.DataAccess;
using EStock.DataAccess.Abstraction;
using EStock.DataAccess.Implementation;
using EStock.Models;
using EStock.Services.Abstraction;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace EStock.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            AppSettings.ConnectionStrings = Configuration.GetConnectionString("DefaultConnection");
            //services.GetConfiguaration(Configuration);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EStock.Api", Version = "v1" });
            });

            services.AddDbContext<EStockContext>(options => 
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"), 
                providerOptions => providerOptions.EnableRetryOnFailure())
               );

            services.AddTransient<IRequestProcessor, RequestProcessor>()
                    .AddTransient<IStockData, StockData>()
                    .AddTransient<ICompanyData, CompanyData>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                serviceScope.ServiceProvider.GetService<EStockContext>().Database.Migrate();
            }
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EStock.Api v1"));
            }

            app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());

            app.UseRouting();

            app.UseAuthorization();

            app.UseMiddleware<ExceptionHandlerMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
    public static class UserAppSetting
    {
        public static IServiceCollection GetConfiguaration(this IServiceCollection services, IConfiguration configuration)
        {
            _ = configuration.GetSection("AppSettings").Get<AppSettings>();
            return services;
        }
    }
}
