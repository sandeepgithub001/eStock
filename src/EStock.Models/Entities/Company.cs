using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EStock.Models.Entities
{
    [Table("companies")]
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(10, ErrorMessage = "CompanyCode cannot exceed 10 characters.")]
        public string CompanyCode { get; set; }

        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(50, ErrorMessage = "Name cannot exceed 50 characters.")]
        public string CompanyName { get; set; }

        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(50, ErrorMessage = "CompanyCEO cannot exceed 50 characters.")]
        public string CompanyCeo { get; set; }
        
        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(20, ErrorMessage = "Turnover cannot exceed 20 characters.")]
        public string Turnover { get; set; }

        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(50, ErrorMessage = "Website cannot exceed 50 characters.")]
        public string Website { get; set; }

        [Required]
        [Column(TypeName = "varchar")]
        [StringLength(50, ErrorMessage = "StockExchange cannot exceed 50 characters.")]
        public string StockExchange { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

    }
}
