using Microsoft.EntityFrameworkCore.Migrations;

namespace Suzaknit.Data.Migrations
{
    public partial class instructions_metadata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Instructions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Level = table.Column<int>(nullable: false),
                    Url = table.Column<string>(nullable: true),
                    TranslationKey = table.Column<string>(nullable: true),
                    InstructionMetadataId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Instructions_Instructions_InstructionMetadataId",
                        column: x => x.InstructionMetadataId,
                        principalTable: "Instructions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Instructions_InstructionMetadataId",
                table: "Instructions",
                column: "InstructionMetadataId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Instructions");
        }
    }
}
