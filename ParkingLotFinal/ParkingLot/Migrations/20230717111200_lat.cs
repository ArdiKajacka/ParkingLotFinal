using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingLot.Migrations
{
	/// <inheritdoc />
	public partial class lat : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<decimal>(
				name: "Price",
				table: "Logs",
				type: "decimal(18,2)", // Modify the type to decimal with precision and scale
				nullable: false,
				oldClrType: typeof(int),
				oldType: "integer");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<int>(
				name: "Price",
				table: "Logs",
				type: "integer",
				nullable: false,
				oldClrType: typeof(decimal),
				oldType: "decimal(18,2)"); // Update the type to integer in the Down method if needed
		}
	}
}
