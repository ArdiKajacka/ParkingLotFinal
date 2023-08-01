using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ParkingLot.DbContexts;
using Microsoft.EntityFrameworkCore;
using ParkingLot.Repositories;
using ParkingLot.DataStore;

namespace ParkingLot
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
			var builder = WebApplication.CreateBuilder(args);

			// Get the configuration from the appsettings.json file
			var configuration = new ConfigurationBuilder()
				.SetBasePath(builder.Environment.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.Build();

			builder.Services.AddCors(options =>
			{
				options.AddPolicy(name: MyAllowSpecificOrigins,
								  policy =>
								  {
									  policy.WithOrigins(
														  "http://localhost:4200")
											.AllowAnyHeader()
											.AllowAnyMethod();
								  });
			});

			builder.Services.AddControllers();

			// Configure the DbContext with the connection string
			builder.Services.AddDbContext<ParkingContext>(options =>
				options.UseNpgsql(configuration.GetConnectionString("ParkingDbConnection")));


			builder.Services.AddSingleton<ParkingSpotsData>();
			builder.Services.AddSingleton<PricingPlansData>();
			builder.Services.AddSingleton<SubscriberData>();
			builder.Services.AddSingleton<LogsData>();
			


			builder.Services.AddScoped<ParkingSpotRepository>();
			builder.Services.AddScoped<PricingPlansRepository>();
			builder.Services.AddScoped<SubscriberRepository>();
			builder.Services.AddScoped<SubscriptionsRepository>();
			builder.Services.AddScoped<LogsRepository>();
            builder.Services.AddScoped<complaintsRepository>();


            builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();
			app.UseAuthorization();
			app.UseCors(MyAllowSpecificOrigins);

			app.MapControllers();

			app.Run();
		}
	}
}
