using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LSBlueZone.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedZones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Zones",
                columns: new[] { "Id", "Name", "PricePerHour" },
                values: new object[] { 1, "Vinewood", 15m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
