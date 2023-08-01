using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ParkingLot.Migrations
{
	/// <inheritdoc />
	public partial class AddMigrationInitial : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "ParkingSpots",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					TotalSpots = table.Column<int>(type: "integer", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_ParkingSpots", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "PricingPlans",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					HourlyPricing = table.Column<int>(type: "integer", nullable: false),
					DailyPricing = table.Column<int>(type: "integer", nullable: false),
					MinimumHours = table.Column<int>(type: "integer", nullable: false),
					Type = table.Column<bool>(type: "boolean", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_PricingPlans", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Subscriber",
				columns: table => new
				{
					IdCard = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					FirstName = table.Column<string>(type: "text", nullable: false),
					LastName = table.Column<string>(type: "text", nullable: false),
					Email = table.Column<string>(type: "text", nullable: false),
					Phone = table.Column<int>(type: "integer", nullable: false),
					PlateNumber = table.Column<int>(type: "integer", nullable: false),
					isDeleted = table.Column<bool>(type: "boolean", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Subscriber", x => x.IdCard);
				});

			migrationBuilder.CreateTable(
				name: "Subscriptions",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Code = table.Column<int>(type: "integer", nullable: false),
					SubscriberId = table.Column<int>(type: "integer", nullable: false),
					Price = table.Column<int>(type: "integer", nullable: false),
					DiscountValue = table.Column<int>(type: "integer", nullable: false),
					StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					isDeleted = table.Column<bool>(type: "boolean", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Subscriptions", x => x.Id);
					table.ForeignKey(
						name: "FK_Subscriptions_Subscriber_SubscriberId",
						column: x => x.SubscriberId,
						principalTable: "Subscriber",
						principalColumn: "IdCard",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Logs",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Code = table.Column<int>(type: "integer", nullable: false),
					SubscriptionId = table.Column<int>(type: "integer", nullable: true),
					CheckIn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					CheckOut = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					Price = table.Column<int>(type: "integer", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Logs", x => x.Id);
					table.ForeignKey(
						name: "FK_Logs_Subscriptions_SubscriptionId",
						column: x => x.SubscriptionId,
						principalTable: "Subscriptions",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Logs_SubscriptionId",
				table: "Logs",
				column: "SubscriptionId");

			migrationBuilder.CreateIndex(
				name: "IX_Subscriptions_SubscriberId",
				table: "Subscriptions",
				column: "SubscriberId");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Logs");

			migrationBuilder.DropTable(
				name: "ParkingSpots");

			migrationBuilder.DropTable(
				name: "PricingPlans");

			migrationBuilder.DropTable(
				name: "Subscriptions");

			migrationBuilder.DropTable(
				name: "Subscriber");
		}
	}
}