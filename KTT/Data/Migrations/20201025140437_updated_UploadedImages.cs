using Microsoft.EntityFrameworkCore.Migrations;

namespace KTT.Data.Migrations
{
    public partial class updated_UploadedImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Gallery",
                table: "Images",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gallery",
                table: "Images");
        }
    }
}
