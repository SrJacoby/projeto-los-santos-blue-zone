using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LSBlueZone.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateZonesSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Los Santos International Airport");

            migrationBuilder.InsertData(
                table: "Zones",
                columns: new[] { "Id", "Name", "PricePerHour" },
                values: new object[,]
                {
                    { 2, "Docks", 8m },
                    { 3, "La Puerta", 7m },
                    { 4, "South Los Santos", 5m },
                    { 5, "East Los Santos", 5m },
                    { 6, "Vespucci", 11m },
                    { 7, "Little Seoul", 9m },
                    { 8, "Downtown Los Santos", 10m },
                    { 9, "La Mesa", 8m },
                    { 10, "Del Perro", 10m },
                    { 11, "Rockford Hills", 12m },
                    { 12, "Vinewood", 13m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.UpdateData(
                table: "Zones",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Vinewood");
        }
    }
}
