using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EStock.Models.Entities
{
    [Table("stocks")]
    public class Stock
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("FK_CompanyId")]
        [Required]
        public int CompanyId { get; set; }

        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(20, ErrorMessage = "StockPrice cannot exceed 20 characters.")]
        public decimal StockPrice { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public DateTime ModifiedOn { get; set; }

    }
}
